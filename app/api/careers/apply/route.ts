// POST /api/careers/apply - job applications with a CV attached.
//
// Everything lands at contact@mediastreamai.com (CAREERS_EMAIL) with the CV as
// an attachment, so a recruiter can read the application and arrange an
// interview without leaving the inbox. The same record is fanned out to the
// MSAI sales platform and a gitignored CSV so an application is never lost to
// a single sink being down - the request succeeds if it was captured anywhere.
//
// The CV itself is only ever attached to the email. It is not written to the
// CSV, not sent to the lead platform and not stored on the server: a CV is
// personal data and the fewer copies exist, the better.

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { sendApplicationAcknowledgement, sendJobApplication } from '@/lib/email';
import { forwardLeadToSalesPlatform } from '@/lib/leads';
import { getJob, fullTitle, SITES } from '@/lib/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SEGMENT = 'MSAI Recruitment';
const MAX_CV_BYTES = 5 * 1024 * 1024;

/** Formats a recruiter would actually open. Anything else is refused rather
 *  than forwarded blind. */
const ALLOWED_CV_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.oasis.opendocument.text': 'odt',
  'application/rtf': 'rtf',
  'text/rtf': 'rtf',
  'text/plain': 'txt',
};

function csvEscape(v: unknown): string {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Strips directory parts and anything a mail client would rather not see. */
function safeFilename(name: string, fallbackExt: string): string {
  const base = (name.split(/[\\/]/).pop() || `cv.${fallbackExt}`).trim();
  const cleaned = base.replace(/[^A-Za-z0-9._ -]/g, '_').slice(0, 120);
  return cleaned || `cv.${fallbackExt}`;
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const str = (k: string) => String(form.get(k) ?? '').trim();

  const name = str('name');
  const email = str('email');
  const roleSlug = str('role');

  if (!name || name.length > 160) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const job = getJob(roleSlug);
  if (!job) {
    return NextResponse.json({ error: 'Please choose the role you are applying for.' }, { status: 400 });
  }

  const roleTitle = fullTitle(job);
  const site = SITES[job.site];

  // ---- CV ------------------------------------------------------------------
  let cv: { filename: string; contentType: string; base64: string } | undefined;
  const file = form.get('cv');
  if (file && typeof file === 'object' && 'arrayBuffer' in file) {
    const f = file as File;
    if (f.size > 0) {
      if (f.size > MAX_CV_BYTES) {
        return NextResponse.json({ error: 'Your CV is over 5 MB. Please attach a smaller file.' }, { status: 400 });
      }
      const ext = ALLOWED_CV_TYPES[f.type];
      if (!ext) {
        return NextResponse.json(
          { error: 'Please attach your CV as a PDF, Word, ODT, RTF or text file.' },
          { status: 400 },
        );
      }
      const buf = Buffer.from(await f.arrayBuffer());
      cv = { filename: safeFilename(f.name, ext), contentType: f.type, base64: buf.toString('base64') };
    }
  }

  const application = {
    name,
    email,
    phone: str('phone'),
    roleTitle,
    roleSlug,
    siteLabel: site.label,
    location: str('location'),
    availability: str('availability'),
    rightToWork: str('rightToWork'),
    message: str('message'),
    cv,
  };

  let captured = false;

  // 1. email → contact@mediastreamai.com, with the CV attached.
  try {
    await sendJobApplication(application);
    captured = true;
  } catch (e) {
    console.error('careers application email failed', e);
  }

  // 2. MSAI sales platform - the lead system. No CV: it is not a lead field.
  if (
    await forwardLeadToSalesPlatform({
      name,
      email,
      company: application.location || site.label,
      phone: application.phone,
      interest: `Job application: ${roleTitle}`,
      message: application.message,
      source: `careers:${roleSlug}`,
      segment: SEGMENT,
      role_slug: roleSlug,
      site: site.label,
      availability: application.availability,
      right_to_work: application.rightToWork,
      cv_attached: Boolean(cv),
    })
  ) {
    captured = true;
  }

  // 3. CSV fallback (gitignored) so an application is never lost. No CV here.
  try {
    const p = process.env.CAREERS_CSV_PATH || path.join(process.cwd(), 'data', 'applications.csv');
    const header =
      'timestamp,name,email,phone,role,role_slug,site,location,availability,right_to_work,cv_attached,message\n';
    for (const dest of [p, '/tmp/applications.csv']) {
      try {
        await fs.mkdir(path.dirname(dest), { recursive: true });
        try { await fs.access(dest); } catch { await fs.writeFile(dest, header, 'utf8'); }
        const row = [
          new Date().toISOString(), name, email, application.phone, roleTitle, roleSlug, site.label,
          application.location, application.availability, application.rightToWork,
          cv ? cv.filename : 'no', application.message,
        ].map(csvEscape).join(',') + '\n';
        await fs.appendFile(dest, row, 'utf8');
        captured = true;
        break;
      } catch { /* try /tmp */ }
    }
  } catch (e) {
    console.error('careers csv failed', e);
  }

  if (!captured) {
    return NextResponse.json(
      { error: 'Could not submit your application. Please email your CV to contact@mediastreamai.com.' },
      { status: 500 },
    );
  }

  // 4. Acknowledge the candidate. Best-effort - the application is already in.
  try {
    await sendApplicationAcknowledgement(application);
  } catch (e) {
    console.error('careers acknowledgement failed', e);
  }

  return NextResponse.json({ success: true, role: roleTitle });
}
