// POST /api/trial-signup - capture a free-trial lead (Name / Age / Email + consent) to a CSV.
//
// The CSV is the team's downloadable record of trial signups (see ./export). Rows are appended to
// TRIAL_CSV_PATH (default ./data/trial_signups.csv); on read-only serverless filesystems this falls
// back to /tmp so the endpoint never 500s. IMPORTANT: the runtime CSV holds personal data and is
// gitignored - it must never be committed. For durable storage, point TRIAL_CSV_PATH at a mounted
// volume, or wire this handler to your database.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { forwardLeadToSalesPlatform } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADER = "timestamp,name,age,email,consent,source\n";

function csvEscape(v: unknown): string {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function csvPaths(): string[] {
  const primary = process.env.TRIAL_CSV_PATH || path.join(process.cwd(), "data", "trial_signups.csv");
  return [primary, "/tmp/intuitv_trial_signups.csv"];
}

async function appendRow(row: string): Promise<boolean> {
  for (const p of csvPaths()) {
    try {
      await fs.mkdir(path.dirname(p), { recursive: true });
      try {
        await fs.access(p);
      } catch {
        await fs.writeFile(p, HEADER, "utf8"); // new file → write header first
      }
      await fs.appendFile(p, row, "utf8");
      return true;
    } catch {
      // try the next candidate path (e.g. read-only cwd on serverless → /tmp)
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

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const ageNum = parseInt(String(body.age ?? ""), 10);
  const consent = body.consent === true || body.consent === "true";
  const source = String(body.source || "intuitv").trim().slice(0, 64);

  if (!name || name.length > 120) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!Number.isFinite(ageNum) || ageNum < 13 || ageNum > 120)
    return NextResponse.json({ error: "Please enter a valid age (13+)." }, { status: 400 });
  if (!consent) return NextResponse.json({ error: "Consent is required to start your trial." }, { status: 400 });

  const row =
    [new Date().toISOString(), name, ageNum, email, "yes", source].map(csvEscape).join(",") + "\n";

  const ok = await appendRow(row);
  if (!ok) return NextResponse.json({ error: "Could not save signup. Please try again." }, { status: 500 });

  // Push the trial lead into the MSAI sales platform (non-blocking).
  void forwardLeadToSalesPlatform({
    name, email, interest: "IntuiTV free trial (3 months)", message: `age: ${ageNum}`,
    source, segment: "IntuiTV Trials",
  });

  return NextResponse.json({ success: true, offer: "3-months-free", trialCap: 25000 });
}
