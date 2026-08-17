// GET /api/trial-signup/export - download the captured trial signups as a CSV.
//
// Protected by TRIAL_EXPORT_KEY (pass ?key=… or an `x-export-key` header). Because the file holds
// personal data, the endpoint refuses to run unless the key is configured AND matches - there is no
// unauthenticated default. Reads TRIAL_CSV_PATH (default ./data/trial_signups.csv), then the /tmp
// fallback used by the capture route.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADER = "timestamp,name,age,email,consent,source\n";

export async function GET(req: NextRequest) {
  const expected = process.env.TRIAL_EXPORT_KEY;
  if (!expected) {
    return NextResponse.json(
      { error: "Export disabled: set TRIAL_EXPORT_KEY to enable downloads." },
      { status: 503 },
    );
  }
  const provided = req.nextUrl.searchParams.get("key") || req.headers.get("x-export-key");
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const candidates = [
    process.env.TRIAL_CSV_PATH || path.join(process.cwd(), "data", "trial_signups.csv"),
    "/tmp/intuitv_trial_signups.csv",
  ];
  let csv = HEADER;
  for (const p of candidates) {
    try {
      csv = await fs.readFile(p, "utf8");
      break;
    } catch {
      // try next
    }
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="intuitv_trial_signups.csv"`,
      "cache-control": "no-store",
    },
  });
}
