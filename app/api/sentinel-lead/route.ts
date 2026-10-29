// POST /api/sentinel-lead — capture a MOTHER SENTINEL (data-centre tech) lead.
//
// Fed by the site-wide SentinelPopup. Keeps the capture deliberately light
// (name optional, work email required) and pushes the lead into the MSAI sales
// platform so it lands as a qualified "MOTHER SENTINEL" enquiry. A local CSV
// append is kept as a best-effort fallback sink; on read-only serverless
// filesystems it falls back to /tmp so the endpoint never 500s.
//
// IMPORTANT: the runtime CSV holds personal data and is gitignored — it must
// never be committed. For durable storage, point SENTINEL_CSV_PATH at a mounted
// volume, or rely on the sales-platform forward (the primary sink).

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { forwardLeadToSalesPlatform } from "../../../lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADER = "timestamp,name,email,source\n";
const MAX_NAME = 120;
const MAX_EMAIL = 254;

function csvEscape(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csvPaths(): string[] {
  const primary =
    process.env.SENTINEL_CSV_PATH || path.join(process.cwd(), "data", "sentinel_leads.csv");
  return [primary, "/tmp/sentinel_leads.csv"];
}

async function appendRow(row: string): Promise<boolean> {
  for (const p of csvPaths()) {
    try {
      await fs.mkdir(path.dirname(p), { recursive: true });
      try {
        await fs.access(p);
      } catch {
        await fs.writeFile(p, HEADER, "utf8");
      }
      await fs.appendFile(p, row, "utf8");
      return true;
    } catch {
      // try the next candidate path
    }
  }
  return false;
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, MAX_NAME) || "Website visitor";
  const email = String(body.email || "").trim().slice(0, MAX_EMAIL);
  const source = String(body.source || "sentinel-popup").trim().slice(0, 64);

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // Best-effort local record (never blocks the response on failure).
  const row = [new Date().toISOString(), name, email, source].map(csvEscape).join(",") + "\n";
  void appendRow(row);

  // Primary sink: push the lead into the MSAI sales platform (non-blocking).
  void forwardLeadToSalesPlatform({
    name,
    email,
    interest: "MOTHER SENTINEL — data-centre tech (walkthrough request)",
    source,
    segment: "MOTHER SENTINEL",
  });

  // Fail open: the viewer always gets a thank-you.
  return NextResponse.json({ success: true });
}
