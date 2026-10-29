'use client';

// A lead-capture lightbox over a whole page. The page renders underneath,
// blurred - visible enough to show there is real substance behind it, not
// legible enough to read - until the visitor gives a name, work email and
// company. The details are captured into the MSAI sales platform through
// /api/contact/sales, the same sink every other CTA on the site uses.
//
// This is a marketing gate, not an access control: the markup is present in
// the page, so nothing genuinely sensitive may be placed behind it. Anything
// classified belongs behind authentication on a separate surface, never here.
//
// The unlock is remembered for the browser session so following a link away
// and back does not ask twice.

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';

export default function AccessGate({
  storageKey,
  eyebrow,
  title,
  body,
  interest,
  source,
  points = [],
  children,
}: {
  /** sessionStorage key that remembers the unlock for this surface. */
  storageKey: string;
  eyebrow: string;
  title: string;
  body: string;
  /** What the lead is about, as it lands in the sales platform. */
  interest: string;
  /** Which surface captured it. */
  source: string;
  points?: string[];
  children: React.ReactNode;
}) {
  // Start locked on both server and client so the two renders agree, then
  // unlock in an effect if this session already registered.
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(storageKey) === 'granted') setUnlocked(true);
    } catch {
      // Private mode or blocked storage: just show the gate.
    }
    setReady(true);
  }, [storageKey]);

  // While the gate is up the page behind it must not scroll away underneath.
  useEffect(() => {
    if (unlocked || !ready) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [unlocked, ready]);

  const grant = useCallback(() => {
    try { window.sessionStorage.setItem(storageKey, 'granted'); } catch { /* non-fatal */ }
    setUnlocked(true);
  }, [storageKey]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          company: f.get('company'),
          interest,
          message: `Requested access to ${title}.`,
          source,
        }),
      });
      if (!res.ok) throw new Error(`capture failed: ${res.status}`);
    } catch (err) {
      // A visitor who has handed over their details has done their part - if
      // the sink is down we log it and still let them in, rather than holding
      // the page hostage to our own outage.
      console.error('access-gate lead capture failed, granting access anyway', err);
    }
    grant();
  }

  const field =
    'w-full rounded-xl border border-hair bg-white/5 px-4 py-3 text-mist outline-none transition-colors placeholder:text-muted/60 focus:border-ember/50';

  return (
    <div className="relative">
      <div
        className={
          unlocked
            ? ''
            : 'pointer-events-none max-h-[100svh] select-none overflow-hidden blur-[7px] saturate-50'
        }
        aria-hidden={unlocked ? undefined : true}
      >
        {children}
      </div>

      {ready && !unlocked && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-night/70 px-4 py-10 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-gate-title"
            className="w-full max-w-lg rounded-3xl border border-ember/25 bg-night-800/95 p-7 shadow-panel md:p-9"
          >
            <span className="chip !border-ember/30 !text-ember" style={{ background: 'rgba(245,158,11,0.08)' }}>
              <Lock className="h-3.5 w-3.5" /> {eyebrow}
            </span>
            <h2 id="access-gate-title" className="mt-5 font-display text-3xl leading-[0.95] md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>

            {points.length > 0 && (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-mist">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember" /> {p}
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label className="block">
                <span className="sr-only">Full name</span>
                <input name="name" required autoComplete="name" placeholder="Full name" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Work email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="Work email" className={field} />
              </label>
              <label className="block">
                <span className="sr-only">Company or organisation</span>
                <input name="company" required autoComplete="organization" placeholder="Company or organisation" className={field} />
              </label>
              <button type="submit" disabled={status === 'sending'} className="btn-ember w-full justify-center py-3.5 text-base">
                {status === 'sending' ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Verifying…</>
                ) : (
                  <>View MOTHER Defence</>
                )}
              </button>
            </form>

            <p className="mt-4 text-[11px] leading-relaxed text-muted/70">
              Your details are used to contact you about this enquiry and are handled under our{' '}
              <a href="/privacy" className="underline hover:text-ember">privacy policy</a>. This page carries
              OFFICIAL / commercial-in-confidence material only; classified briefings are delivered separately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
