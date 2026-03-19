import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Media Stream AI — Beta Signup
   ⭐ BACKEND TEAM: emails are saved to  <project-root>/data/beta-signups.csv
   Download all signups: GET /api/beta-signup?secret=<BETA_CSV_SECRET>
────────────────────────────────────────────────────────────────────────── */

const CSV_PATH = join(process.cwd(), "data", "beta-signups.csv");
const CSV_HEADER = "timestamp,name,work_email,source\n";

function q(v: string) {
  return `"${v.replace(/"/g, '""')}"`;
}

function ensureCsv() {
  const dir = dirname(CSV_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(CSV_PATH)) writeFileSync(CSV_PATH, CSV_HEADER, "utf-8");
}

/* POST — save a signup */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name  = String(body.name  ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const source = String(body.source ?? "msai-site-countdown-overlay").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid email address" }, { status: 400 });
    }

    ensureCsv();
    const row = `${q(new Date().toISOString())},${q(name)},${q(email)},${q(source)}\n`;
    appendFileSync(CSV_PATH, row, "utf-8");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[beta-signup] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* GET — download the CSV (set BETA_CSV_SECRET in .env to protect) */
export async function GET(req: NextRequest) {
  const secret   = process.env.BETA_CSV_SECRET;
  const provided = req.nextUrl.searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  ensureCsv();
  const csv = readFileSync(CSV_PATH, "utf-8");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="beta-signups.csv"',
    },
  });
}
