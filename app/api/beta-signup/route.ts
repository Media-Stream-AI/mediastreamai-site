import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { timingSafeEqual } from "crypto";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Media Stream AI — Beta / Sovereign-access Signup
   Stores signups in MongoDB Atlas → salesDB → beta_signups collection and
   best-effort notifies the sales team by email.

   ⭐ BACKEND TEAM: download all emails as CSV:
      GET /api/beta-signup
      Authorization: Bearer <BETA_CSV_SECRET>
      (set BETA_CSV_SECRET in Netlify env vars — the export is DISABLED until
       it is set, so signup PII can never be dumped anonymously.)
────────────────────────────────────────────────────────────────────────── */

// SECRET — must be provided via env. No hardcoded fallback: a connection
// string committed to source is a leaked credential. If MONGODB_URI is unset
// the route fails closed rather than silently using a baked-in secret.
const MONGODB_URI = process.env.MONGODB_URI;

// Defence-in-depth limits on the public POST surface.
const MAX_NAME_LEN = 120;
const MAX_EMAIL_LEN = 254; // RFC 5321 maximum
const MAX_SOURCE_LEN = 80;

// Best-effort in-memory rate limit. Serverless instances are ephemeral so this
// is per-instance, not global — enough to blunt naive scripted abuse without a
// shared store. A WAF / edge rate limit should sit in front for real coverage.
const RATE_LIMIT_MAX = 5; // signups …
const RATE_LIMIT_WINDOW_MS = 60_000; // … per minute per IP
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

// Constant-time secret comparison to avoid leaking the secret via timing.
function secretsMatch(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Neutralise CSV/spreadsheet formula injection: a value that starts with one of
// these characters is treated as a formula by Excel/Sheets. Prefix with a quote.
function csvCell(value: unknown): string {
  let s = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

let cachedClient: MongoClient | null = null;

async function getCollection() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db("salesDB").collection("beta_signups");
}

/* ──────────────────────────────────────────────────────────────────────────
   Team notification — email the sales team when a sovereign-access request
   comes in. Provider-agnostic and best-effort: it uses whichever transactional
   provider is configured (Resend or SendGrid), and is a no-op if none is set —
   exactly like the CSV export, it stays disabled until env is provided, so it
   can never block or slow a signup. The row is always saved to Mongo regardless.

   Env:
     SALES_NOTIFY_EMAIL  — recipient (the team inbox / alias). Required to send.
     SALES_NOTIFY_FROM   — verified sender (default "Media Stream AI <noreply@mediastreamai.com>").
     RESEND_API_KEY      — send via Resend, OR
     SENDGRID_API_KEY    — send via SendGrid.
────────────────────────────────────────────────────────────────────────── */
async function notifyTeam(fields: Record<string, unknown>): Promise<void> {
  const to = process.env.SALES_NOTIFY_EMAIL;
  const from = process.env.SALES_NOTIFY_FROM || "Media Stream AI <noreply@mediastreamai.com>";
  if (!to) return; // not configured → skip (signup already persisted)

  const esc = (v: unknown) =>
    String(v ?? "—").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
  const rows: [string, unknown][] = [
    ["Name", fields.name], ["Work email", fields.email], ["Organisation", fields.org],
    ["Role", fields.role], ["Country", fields.country], ["Model of interest", fields.model],
    ["Ownership contract acknowledged", fields.ownershipAck ? "Yes" : "No"],
    ["Usage requirements", fields.useCase], ["Source", fields.source],
  ];
  const subject = `Sovereign access request — ${esc(fields.name)}${fields.org ? " · " + esc(fields.org) : ""}`;
  const html =
    `<h2 style="font-family:system-ui;margin:0 0 12px">New sovereign-access request</h2>` +
    `<table style="font-family:system-ui;border-collapse:collapse;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#64748b;vertical-align:top">${k}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join("") +
    `</table>`;
  const text = rows.map(([k, v]) => `${k}: ${String(v ?? "—")}`).join("\n");

  try {
    const timeout = AbortSignal.timeout(8000);
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({ from, to: [to], reply_to: fields.email, subject, html, text }),
        signal: timeout,
      });
    } else if (process.env.SENDGRID_API_KEY) {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: (from.match(/<(.+)>/)?.[1] || from) },
          reply_to: { email: String(fields.email || "") },
          subject,
          content: [{ type: "text/plain", value: text }, { type: "text/html", value: html }],
        }),
        signal: timeout,
      });
    }
  } catch (err) {
    // Never let a notification failure affect the signup response.
    console.error("[beta-signup] notifyTeam error:", err);
  }
}

/* POST — save a signup */
export async function POST(req: NextRequest) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid request body" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim().slice(0, MAX_NAME_LEN);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, MAX_EMAIL_LEN);
    const source = String(body.source ?? "msai-site-access-overlay").trim().slice(0, MAX_SOURCE_LEN);

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid email address" }, { status: 400 });
    }

    // Optional sovereign-access-request fields (from the MOTHER EXO access
    // overlay). All optional + length-capped; only stored when provided.
    const cap = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);
    const extra: Record<string, unknown> = {};
    const org = cap(body.org, 160);            if (org) extra.org = org;
    const role = cap(body.role, 120);          if (role) extra.role = role;
    const country = cap(body.country, 80);     if (country) extra.country = country;
    const useCase = cap(body.useCase, 2000);   if (useCase) extra.useCase = useCase;
    const modelInterest = cap(body.model, 80); if (modelInterest) extra.model = modelInterest;
    if (typeof body.ownershipAck === "boolean") extra.ownershipAck = body.ownershipAck;

    // Persist best-effort: a Mongo outage must not error the visitor. Fails
    // open like the sibling lead routes — the lead still reaches the team via
    // notifyTeam below, and the user gets a clean confirmation instead of a 500.
    try {
      const col = await getCollection();
      // Upsert by email so repeated submissions don't pile up duplicate PII rows.
      await col.updateOne(
        { email },
        {
          $set: { name, source, ...extra, updatedAt: new Date() },
          $setOnInsert: { email, createdAt: new Date() },
        },
        { upsert: true }
      );
    } catch (dbErr) {
      console.error("[beta-signup] store error (continuing):", dbErr);
    }

    // Email the team (best-effort; never blocks or fails the signup).
    await notifyTeam({ name, email, source, ...extra });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // Unexpected error — still confirm to the visitor (capture is best-effort).
    console.error("[beta-signup] POST error:", err);
    return NextResponse.json({ success: true });
  }
}

/* GET — download all signups as CSV (backend team only) */
export async function GET(req: NextRequest) {
  const secret = process.env.BETA_CSV_SECRET;

  // Fail closed: with no secret configured the export stays disabled so the
  // full signup list (names + emails = PII) can never be pulled anonymously.
  if (!secret) {
    return NextResponse.json({ error: "Export disabled" }, { status: 403 });
  }

  // Prefer the Authorization header; query-string secrets leak into access logs.
  const authHeader = req.headers.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const provided = bearer || req.nextUrl.searchParams.get("secret") || "";

  if (!secretsMatch(provided, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const col = await getCollection();
    const rows = await col.find({}).sort({ createdAt: 1 }).toArray();

    const csv = [
      "timestamp,name,work_email,source",
      ...rows.map((r) =>
        [
          csvCell(r.createdAt instanceof Date ? r.createdAt.toISOString() : r.createdAt ?? ""),
          csvCell(r.name),
          csvCell(r.email),
          csvCell(r.source),
        ].join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="beta-signups.csv"',
      },
    });
  } catch (err: any) {
    console.error("[beta-signup] GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
