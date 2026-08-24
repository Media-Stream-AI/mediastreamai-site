'use client';

// Lead-gated document download. The visitor gives name + email (with consent);
// we capture the lead into the MSAI sales platform via /api/contact/sales, then
// release the file. Used for white papers and due-diligence dossiers. (Statutory
// EU AI Act Art. 53 summaries are also offered ungated elsewhere, as the law
// requires them to be publicly available.)
//
// The file is released by clicking a generated <a download>, not window.open:
// the release happens after an await, so it is no longer inside the click
// gesture and every popup blocker eats a window.open there - which is why the
// download appeared to do nothing.
//
// Capture is also best-effort. A visitor who has handed over their details has
// done their part; if a sink is down we log it and still hand over the
// document rather than refusing it.

import { useState } from 'react';
import { FileDown, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function GatedDownload({
  file,
  title,
  subtitle,
}: {
  file: string;
  title: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [openDays, setOpenDays] = useState<string[]>([]);

  function toggleOpenDay(site: string) {
    setOpenDays((current) =>
      current.includes(site) ? current.filter((s) => s !== site) : [...current, site]);
  }

  function release() {
    if (typeof document === 'undefined') return;
    const a = document.createElement('a');
    a.href = file;
    a.download = file.split('/').pop() || '';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const f = new FormData(e.currentTarget);
    const invited = openDays.length
      ? ` Invited to the ${openDays.join(' and ')} factory open day${openDays.length > 1 ? 's' : ''}.`
      : '';
    try {
      await fetch('/api/contact/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          company: f.get('company'),
          interest: `Document download: ${title}`,
          message: `Requested: ${title} (${file}).${invited}`,
          source: `download:${file}`,
          openDays,
        }),
      });
    } catch (err) {
      console.error('lead capture failed, releasing the document anyway', err);
    }
    setStatus('done');
    release();
  }

  const field = 'w-full rounded-xl bg-white/5 border border-hair px-4 py-3 text-mist placeholder:text-muted/60 outline-none focus:border-cyan/50 transition-colors';

  return (
    <>
      <button
        onClick={() => { setOpen(true); setStatus('idle'); }}
        className="card-night card-hover p-4 flex items-center gap-3 text-sm text-mist text-left w-full"
      >
        <FileDown className="w-4 h-4 text-cyan shrink-0" />
        <span>
          <span className="block">{title}</span>
          {subtitle && <span className="block text-xs text-muted">{subtitle}</span>}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-night/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="glass-night w-full max-w-md p-6 md:p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 text-muted hover:text-mist"><X className="w-5 h-5" /></button>

            {status === 'done' ? (
              <div className="text-center py-4">
                <CheckCircle2 className="mx-auto h-10 w-10 text-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-mist">Your download is ready</h3>
                <p className="mt-2 text-sm text-muted">If it didn’t start automatically, use the link below.</p>
                <a href={file} download className="btn-glow mt-5 inline-flex text-sm px-6 py-2.5">
                  Open {title} <FileDown className="w-4 h-4" />
                </a>
                {openDays.length > 0 && (
                  <p className="mt-4 text-xs text-muted">
                    We’ll be in touch about the {openDays.join(' and ')} open day{openDays.length > 1 ? 's' : ''}.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5 mb-1">
                  <FileDown className="w-5 h-5 text-cyan" />
                  <h3 className="text-lg font-semibold text-mist">Download {title}</h3>
                </div>
                <p className="text-sm text-muted mb-5">Enter your details and we’ll open the document. We’ll only contact you about MSAI.</p>
                <form onSubmit={onSubmit} className="space-y-3">
                  <input name="name" required placeholder="Full name" className={field} />
                  <input name="email" type="email" required placeholder="Work email" className={field} />
                  <input name="company" placeholder="Company (optional)" className={field} />

                  <div className="rounded-xl border border-hair bg-white/[0.03] p-3.5">
                    <p className="text-xs leading-relaxed text-mist">
                      By downloading our white paper you’re invited to join us at one of our factory
                      open days in Dundee or Manchester.
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
                      {['Dundee', 'Manchester'].map((site) => (
                        <label key={site} className="flex items-center gap-2 text-xs text-muted">
                          <input
                            type="checkbox"
                            className="accent-cyan"
                            checked={openDays.includes(site)}
                            onChange={() => toggleOpenDay(site)}
                          />
                          {site === 'Dundee' ? 'Scotland · Dundee' : 'Manchester'}
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 text-xs text-muted">
                    <input type="checkbox" required className="mt-0.5 accent-cyan" />
                    {/* One text node: as separate flex children the sentence broke into
                        three columns around the link. */}
                    <span>
                      I agree to MSAI processing my details under the{' '}
                      <a href="/privacy" className="text-cyan hover:underline">Privacy Notice</a>{' '}
                      and to being contacted about this request.
                    </span>
                  </label>
                  <button type="submit" disabled={status === 'sending'} className="btn-glow w-full text-sm px-6 py-3 disabled:opacity-60">
                    {status === 'sending' ? <><Loader2 className="w-4 h-4 animate-spin" /> Preparing…</> : <>Get the download <FileDown className="w-4 h-4" /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
