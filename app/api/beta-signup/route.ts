import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";

/* ──────────────────────────────────────────────────────────────────────────
   Media Stream AI — Beta Signup
   Stores signups in MongoDB Atlas → salesDB → beta_signups collection

   ⭐ BACKEND TEAM: download all emails as CSV:
      GET /api/beta-signup?secret=<BETA_CSV_SECRET>
      (set BETA_CSV_SECRET in Netlify env vars to secure it)
────────────────────────────────────────────────────────────────────────── */

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://salesuser:i1ENUKg2tSLK6O5t@msaisales.r9timmt.mongodb.net/salesDB?retryWrites=true&w=majority&appName=msaiSALES";

let cachedClient: MongoClient | null = null;

async function getCollection() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI);
    await cachedClient.connect();
  }
  return cachedClient.db("salesDB").collection("beta_signups");
}

/* POST — save a signup */
export async function POST(req: NextRequest) {
  try {
    const body  = await req.json();
    const name  = String(body.name  ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const source = String(body.source ?? "msai-site-countdown-overlay").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid email address" }, { status: 400 });
    }

    const col = await getCollection();
    await col.insertOne({
      name,
      email,
      source,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[beta-signup] POST error:", err);
    return NextResponse.json({ error: "Internal server error", detail: err?.message }, { status: 500 });
  }
}

/* GET — download all signups as CSV */
export async function GET(req: NextRequest) {
  const secret   = process.env.BETA_CSV_SECRET;
  const provided = req.nextUrl.searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const col  = await getCollection();
    const rows = await col.find({}).sort({ createdAt: 1 }).toArray();

    const q   = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      "timestamp,name,work_email,source",
      ...rows.map((r) =>
        [q(r.createdAt?.toISOString() ?? ""), q(r.name), q(r.email), q(r.source)].join(",")
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
    return NextResponse.json({ error: "Internal server error", detail: err?.message }, { status: 500 });
  }
}
