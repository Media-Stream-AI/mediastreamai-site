'use client';

// Apply for a role: details, a covering note and a CV, posted to
// /api/careers/apply, which emails it - CV attached - to the MSAI recruitment
// inbox so an interview can be arranged straight from the message.
//
// The file is validated here as well as on the server. Client-side validation
// is a courtesy (an instant, specific error instead of a 5 MB upload that
// fails), never the control: the route re-checks size and type on arrival.

import { useRef, useState } from 'react';
import { CheckCircle2, FileText, Loader2, Paperclip, Send, X } from 'lucide-react';
import { CAREERS_EMAIL, JOBS, SITES, fullTitle, type SiteId } from '@/lib/jobs';

const MAX_CV_BYTES = 5 * 1024 * 1024;
const ACCEPT = '.pdf,.doc,.docx,.odt,.rtf,.txt';
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.oasis.opendocument.text',
  'application/rtf',
  'text/rtf',
  'text/plain',
];

const field =
  'w-full rounded-xl border border-hair bg-white/5 px-4 py-3 text-mist outline-none transition-colors placeholder:text-muted/60 focus:border-cyan/50';
const labelClass = 'block text-xs uppercase tracking-[0.16em] text-muted';

export default function JobApplicationForm({
  /** Pre-selects a role; the visitor can still change it. */
  defaultRole,
  /** Narrows the role list to one site when the form sits on a site section. */
  site,
  className = '',
}: {
  defaultRole?: string;
  site?: SiteId;
  className?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [cvName, setCvName] = useState<string | null>(null);
  const [appliedFor, setAppliedFor] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const roles = site ? JOBS.filter((j) => j.site === site) : JOBS;
  // Grouped by site so a 43-role list stays navigable in a native select.
  const grouped = (['dundee', 'manchester'] as SiteId[])
    .map((id) => ({ site: SITES[id], jobs: roles.filter((j) => j.site === id) }))
    .filter((g) => g.jobs.length > 0);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) { setCvName(null); return; }
    if (f.size > MAX_CV_BYTES) {
      setError('That CV is over 5 MB. Please attach a smaller file.');
      e.target.value = '';
      setCvName(null);
      return;
    }
    if (f.type && !ALLOWED_TYPES.includes(f.type)) {
      setError('Please attach your CV as a PDF, Word, ODT, RTF or text file.');
      e.target.value = '';
      setCvName(null);
      return;
    }
    setCvName(f.name);
  }

  function clearFile() {
    if (fileRef.current) fileRef.current.value = '';
    setCvName(null);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    const slug = String(data.get('role') || '');
    const job = JOBS.find((j) => j.slug === slug);

    try {
      const res = await fetch('/api/careers/apply', { method: 'POST', body: data });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || 'Could not submit your application.');
      setAppliedFor(job ? fullTitle(job) : 'this role');
      setStatus('done');
      formRef.current?.reset();
      clearFile();
    } catch (err) {
      setStatus('idle');
      setError(
        err instanceof Error
          ? err.message
          : `Could not submit. Please email your CV to ${CAREERS_EMAIL}.`,
      );
    }
  }

  if (status === 'done') {
    return (
      <div className={`card-night p-8 text-center ${className}`}>
        <CheckCircle2 className="mx-auto h-10 w-10 text-cyan" />
        <h3 className="mt-4 font-display text-2xl text-mist">Application received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Thank you - your application for <span className="text-mist">{appliedFor}</span> and your CV are with
          our recruitment team. We review every application against the role requirements and contact
          shortlisted candidates to arrange an interview; the interview date is set individually with each
          candidate. A confirmation is on its way to your inbox.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6 px-6 py-3 text-sm">
          Apply for another role
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className={`card-night p-6 md:p-8 ${className}`} noValidate={false}>
      <h3 className="font-display text-2xl text-mist">Apply &amp; arrange an interview</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Send your CV and a short covering note against the role. Shortlisted candidates are invited to
        interview, with the date set individually.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block space-y-2">
          <span className={labelClass}>Role *</span>
          <select name="role" required defaultValue={defaultRole ?? ''} className={`${field} appearance-none`}>
            <option value="" disabled>Choose a role…</option>
            {grouped.map((g) => (
              <optgroup key={g.site.id} label={g.site.label}>
                {g.jobs.map((j) => (
                  <option key={j.slug} value={j.slug}>{fullTitle(j)}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className={labelClass}>Full name *</span>
            <input name="name" required autoComplete="name" placeholder="Full name" className={field} />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>Email *</span>
            <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" placeholder="07…" className={field} />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>Based in</span>
            <input name="location" autoComplete="address-level2" placeholder="Town or city" className={field} />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>Availability</span>
            <input name="availability" placeholder="e.g. 4 weeks' notice" className={field} />
          </label>
          <label className="block space-y-2">
            <span className={labelClass}>Right to work in the UK</span>
            <select name="rightToWork" defaultValue="" className={`${field} appearance-none`}>
              <option value="">Prefer not to say</option>
              <option value="Yes">Yes</option>
              <option value="Requires sponsorship">Requires sponsorship</option>
            </select>
          </label>
        </div>

        {/* CV */}
        <div className="space-y-2">
          <span className={labelClass}>CV *</span>
          <input
            ref={fileRef}
            id="cv"
            name="cv"
            type="file"
            required
            accept={ACCEPT}
            onChange={onFile}
            className="sr-only"
          />
          {cvName ? (
            <div className="flex items-center gap-3 rounded-xl border border-cyan/30 bg-cyan/[0.06] px-4 py-3">
              <FileText className="h-4 w-4 shrink-0 text-cyan" />
              <span className="min-w-0 flex-1 truncate text-sm text-mist">{cvName}</span>
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove CV"
                className="text-muted transition-colors hover:text-mist"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="cv"
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-hair bg-white/[0.03] px-4 py-4 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-mist"
            >
              <Paperclip className="h-4 w-4 shrink-0 text-cyan" />
              <span>Attach your CV — PDF, Word, ODT, RTF or text, up to 5 MB</span>
            </label>
          )}
        </div>

        <label className="block space-y-2">
          <span className={labelClass}>Covering note</span>
          <textarea
            name="message"
            rows={5}
            placeholder="Why this role, and what you bring to it. Mention any certifications — HV Authorised Person, SIA, F-Gas, NEBOSH, IPC — and we will ask you to bring them to interview."
            className={`${field} resize-y`}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-magenta/30 bg-magenta/[0.08] px-4 py-3 text-sm text-mist">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-glow mt-6 w-full justify-center py-3.5 text-base">
        {status === 'sending' ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Sending your application…</>
        ) : (
          <><Send className="h-5 w-5" /> Submit application</>
        )}
      </button>

      <p className="mt-4 text-[11px] leading-relaxed text-muted/70">
        Your application and CV go to <a href={`mailto:${CAREERS_EMAIL}`} className="underline hover:text-cyan">{CAREERS_EMAIL}</a>{' '}
        and are used only to consider you for this role, under our{' '}
        <a href="/privacy" className="underline hover:text-cyan">privacy policy</a>. Prefer email? Send your CV
        to that address with the role in the subject line.
      </p>
    </form>
  );
}
