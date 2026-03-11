import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

/* ─────────────────────────────────────────────────────────────────────────
   POST /api/api-access
   Fallback lead capture → appends to CSV in /data/api-leads.csv
   Called when the primary CRM API is unreachable.
───────────────────────────────────────────────────────────────────────── */

const DATA_DIR = join(process.cwd(), "data");
const CSV_PATH = join(DATA_DIR, "api-leads.csv");

const CSV_HEADER = [
  "timestamp",
  "tier",
  "first_name",
  "last_name",
  "email",
  "company",
  "job_title",
  "country",
  "use_case",
  "monthly_volume",
  "source",
  "url",
  "referrer",
].join(",");

function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const lead = body.lead ?? {};
    const meta = body.metadata ?? {};

    const nameParts = (lead.name ?? "").split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ");

    const row = [
      new Date().toISOString(),
      body.tier ?? meta.requested_tier ?? "",
      firstName,
      lastName,
      lead.email ?? "",
      lead.company ?? "",
      lead.role ?? "",
      lead.country ?? "",
      meta.use_case ?? "",
      meta.monthly_volume ?? "",
      body.source ?? "website",
      meta.url ?? "",
      meta.referrer ?? "",
    ]
      .map(escapeCSV)
      .join(",");

    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true });
    }

    // Write header if file is new
    if (!existsSync(CSV_PATH)) {
      await appendFile(CSV_PATH, CSV_HEADER + "\n", "utf8");
    }

    await appendFile(CSV_PATH, row + "\n", "utf8");

    return NextResponse.json({ ok: true, stored: "csv" }, { status: 200 });
  } catch (err) {
    console.error("[api-access route] CSV write error:", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
