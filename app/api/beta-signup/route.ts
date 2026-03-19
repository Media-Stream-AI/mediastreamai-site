import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

/* ──────────────────────────────────────────────────────────────────────────
   Media Stream AI  —  Beta Signup API
   Saves Name + Work Email to /data/beta-signups.csv

   ⭐ BACKEND TEAM — CSV FILE LOCATION:
      <project-root>/data/beta-signups.csv

   To download all signups, visit:
      GET /api/beta-signup?secret=<BETA_CSV_SECRET>
   (Set BETA_CSV_SECRET in your .env file)
   ────────────────────────────────────────────────────────────────────────── */

const CSV_PATH = join(process.cwd(), "data", "beta-signups.csv");
const CSV_HEADER = "timestamp,name,work_email,source\n";

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim().toLowerCase();
    const source = (body.source ?? "msai-countdown-overlay").toString().trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "name and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "invalid email address" },
        { status: 400 }
      );
    }

    if (!existsSync(CSV_PATH)) {
      writeFileSync(CSV_PATH, CSV_HEADER, "utf-8");
    }

    const timestamp = new Date().toISOString();
    const row =
      [
        escapeCsv(timestamp),
        escapeCsv(name),
        escapeCsv(email),
        escapeCsv(source),
      ].join(",") + "\n";

    appendFileSync(CSV_PATH, row, "utf-8");

    return NextResponse.json({ success: true, message: "Signup recorded" });
  } catch (err) {
    console.error("[beta-signup] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   GET  —  Download the full CSV
   Usage: GET /api/beta-signup?secret=<BETA_CSV_SECRET>
   ────────────────────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const secret = process.env.BETA_CSV_SECRET;
  const provided = req.nextUrl.searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!existsSync(CSV_PATH)) {
    return new NextResponse(CSV_HEADER, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="beta-signups.csv"`,
      },
    });
  }

  const { readFileSync } = await import("fs");
  const csv = readFileSync(CSV_PATH, "utf-8");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="beta-signups.csv"`,
    },
  });
}
