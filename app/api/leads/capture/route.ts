import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────
   POST /api/leads/capture

   Server-side proxy to the MSAI CRM lead-capture API. The upstream API key is
   read from the LEADS_API_KEY environment variable and injected here, so the
   credential is NEVER shipped to the browser. The client posts the same JSON
   payload to this same-origin route with no Authorization header.

   Replaces the previous pattern where a live bearer token was hard-coded in the
   client components (app/contact/page.tsx, app/open-api/page.tsx) and therefore
   present in the shipped JS bundle.
───────────────────────────────────────────────────────────────────────── */

const UPSTREAM = "https://api.mediastreamai.com/api/leads/capture";

export async function POST(req: NextRequest) {
  const key = process.env.LEADS_API_KEY;
  if (!key) {
    // Missing config: let the client fall back to its local route.
    return NextResponse.json(
      { ok: false, error: "LEADS_API_KEY not configured on the server" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream unreachable" }, { status: 502 });
  }
}
