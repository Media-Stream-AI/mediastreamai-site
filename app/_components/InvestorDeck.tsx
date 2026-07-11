'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   Investor Deck — a footer entry point that opens a request form (name, work
   email, company / VC). On submit the details are posted to the Netlify
   "investor-deck" form (notification → chris@mediastreamai.com), then the
   MSAI SEED investor deck PDF is offered for download.
   ───────────────────────────────────────────────────────────────────────────── */

const DECK_URL = '/MSAI_SEED_Investor_Deck.pdf';
const FORM_NAME = 'investor-deck';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

export default function InvestorDeck() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const close = () => {
    setOpen(false);
    // reset after the modal animates away
    setTimeout(() => { setDone(false); setError(''); setForm({ name: '', email: '', company: '' }); }, 200);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError('Please enter your name, email and company / VC.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, 'bot-field': '', ...form }),
      });
      if (!res.ok) throw new Error('submit failed');
      setDone(true);
    } catch {
      setError('Something went wrong. Please email contact@mediastreamai.com.');
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
      >
        Investor Deck
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Request the MSAI investor deck"
          onClick={close}
        >
          <div
            className="relative my-auto w-full max-w-md rounded-2xl border border-white/12 bg-[#070d18] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.65)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>

            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-300/80">Media Stream AI</div>
            <h2 className="mt-1 text-xl font-bold text-white">SEED Investor Deck</h2>

            {done ? (
              <div className="mt-4 flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-white/70">
                  Thanks — your details have been sent to our team. Your download is ready.
                </p>
                <a
                  href={DECK_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-black hover:opacity-90"
                >
                  ⭳ Download the deck
                </a>
                <button onClick={close} className="text-xs text-white/40 hover:text-white/70">Close</button>
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Tell us who you are and we’ll unlock the deck. We’ll be in touch about the round.
                </p>
                <form onSubmit={submit} name={FORM_NAME} className="mt-4 space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-medium text-white/50">Full name*</span>
                    <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Jane Smith" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-medium text-white/50">Work email*</span>
                    <input required type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="jane@fund.com" />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-medium text-white/50">Company or VC*</span>
                    <input required value={form.company} onChange={set('company')} className={inputCls} placeholder="Acme Ventures" />
                  </label>
                  {/* honeypot */}
                  <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" onChange={() => {}} />
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
                  >
                    {sending ? 'Sending…' : 'Get the deck'}
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
