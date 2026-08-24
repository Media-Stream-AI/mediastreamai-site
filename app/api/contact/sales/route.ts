// POST /api/contact/sales - IntuiTV demo / sales enquiries.
//
// Captures the customer's details and fans them out to:
//   1. email  → contact@mediastreamai.com (SALES_EMAIL) via SendGrid,
//   2. sales platform → SALES_PLATFORM_WEBHOOK, tagged segment "IntuiTV Customers",
//   3. MongoDB collection `intuitv_customers` (the record of record),
//   4. a gitignored CSV fallback so a lead is never lost if the above are unconfigured.
// Any single sink failing does not drop the lead - the request succeeds if it was captured anywhere.

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { sendSalesContactNotification } from '@/lib/email';
import { forwardLeadToSalesPlatform } from '@/lib/leads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SEGMENT = 'IntuiTV Customers';

function csvEscape(v: unknown): string {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const interest = String(body.interest || 'General enquiry').trim();
  // Factory open days a document download opted into, e.g. ["Dundee"].
  const openDays = Array.isArray(body.openDays)
    ? body.openDays.map((v: unknown) => String(v).trim()).filter(Boolean).slice(0, 4)
    : [];
  const record = {
    name,
    email,
    company: String(body.company || '').trim(),
    phone: String(body.phone || '').trim(),
    interest,
    message: String(body.message || '').trim(),
    source: String(body.source || 'intuitv.app').trim(),
    open_days: openDays.join(' | '),
    segment: SEGMENT,
  };

  if (!name || name.length > 160) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });

  let captured = false;

  // 1. email → contact@mediastreamai.com
  try {
    await sendSalesContactNotification(record);
    captured = true;
  } catch (e) {
    console.error('sales email failed', e);
  }

  // 2. MSAI sales platform (sales.mediastreamai.com) - the lead system.
  if (await forwardLeadToSalesPlatform({ ...record, segment: SEGMENT })) captured = true;

  // 3. MongoDB (record of record) - optional
  try {
    const { getMongoDb } = await import('@/lib/db');
    const db = await getMongoDb();
    await db.collection('intuitv_customers').insertOne({ ...record, status: 'new', created_at: new Date() });
    captured = true;
  } catch (e) {
    console.error('sales mongo insert failed', e);
  }

  // 4. CSV fallback (gitignored) so a lead is never lost
  try {
    const p = process.env.SALES_CSV_PATH || path.join(process.cwd(), 'data', 'intuitv_customers.csv');
    const header = 'timestamp,name,email,company,phone,interest,message,source,open_days,segment\n';
    for (const dest of [p, '/tmp/intuitv_customers.csv']) {
      try {
        await fs.mkdir(path.dirname(dest), { recursive: true });
        try { await fs.access(dest); } catch { await fs.writeFile(dest, header, 'utf8'); }
        const row = [new Date().toISOString(), record.name, record.email, record.company, record.phone,
          record.interest, record.message, record.source, record.open_days, SEGMENT].map(csvEscape).join(',') + '\n';
        await fs.appendFile(dest, row, 'utf8');
        captured = true;
        break;
      } catch { /* try /tmp */ }
    }
  } catch (e) {
    console.error('sales csv failed', e);
  }

  if (!captured) return NextResponse.json({ error: 'Could not submit. Please email contact@mediastreamai.com.' }, { status: 500 });
  return NextResponse.json({ success: true, segment: SEGMENT });
}
