'use client';

import { useEffect, useState, type FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { X, ArrowRight, ExternalLink, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   MOTHER EXO — site access overlay.
   Shown once per browser (dismissable). Presents the MOTHER EXO hero, the MSAI
   sovereignty mission, a sovereign-access request form (details + usage +
   ownership-contract acknowledgement + model of interest) and the Hugging Face
   early-test link. Form posts to /api/beta-signup (MongoDB salesDB).
   ───────────────────────────────────────────────────────────────────────────── */

const SEEN_KEY = 'msai.access.overlay.v1';
const HF_URL = 'https://huggingface.co/MediaStreamAI/MOTHER_CORE_V3';
const HF_EXO_URL = 'https://huggingface.co/MediaStreamAI/MOTHER_EXO';

const MODELS = [
  'MOTHER EXO — World Model',
  'MOTHER CORE — Reasoning',
  'MOTHER DeepVision — Vision',
  'MOTHER LLM — General',
  'MOTHER Code',
  'MOTHER Defence',
  'Humanoid MOTHER EXO',
  'Full model family',
  'Not sure yet',
];


export default function AccessOverlay() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', org: '', role: '', country: '', model: MODELS[0], useCase: '', ownershipAck: false });

  useEffect(() => {
    try { if (!localStorage.getItem(SEEN_KEY)) setOpen(true); } catch { /* private mode */ }
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* */ }
    setOpen(false);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Name and work email are required.'); return; }
    if (!form.ownershipAck) { setError('Please acknowledge the sovereign ownership-contract requirement.'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'mother-exo-access-overlay' }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || 'Submission failed');
      try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* */ }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="MOTHER EXO — sovereign access">
      <div className="relative my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/12 bg-[#070d18] shadow-[0_24px_90px_rgba(0,0,0,0.65)]">
        <button onClick={dismiss} aria-label="Close" className="absolute right-3 top-3 z-10 rounded-lg border border-white/15 bg-black/40 p-1.5 text-white/60 hover:bg-white/10 hover:text-white">
          <X size={16} />
        </button>

        {/* hero image */}
        <div className="relative h-36 w-full">
          <img src="/dc-mother-hero.jpg" alt="MOTHER — British sovereign AI" className="h-full w-full object-cover object-center" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#070d18] via-[#070d18]/45 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] font-semibold tracking-widest text-white/75 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> BRITISH SOVEREIGN AI
            </span>
            <h1 className="mt-1.5 text-3xl font-extrabold leading-none tracking-tight"
              style={{ backgroundImage: 'linear-gradient(100deg,#5cf3ff,#5aa8ff 45%,#a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              MOTHER EXO
            </h1>
          </div>
        </div>

        <div className="max-h-[calc(92vh-9rem)] overflow-y-auto p-5">
          {done ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 size={40} className="text-emerald-400" />
              <h3 className="mt-4 text-xl font-bold text-white">Request received</h3>
              <p className="mt-2 max-w-xs text-sm text-white/60">Thank you. Our sovereign team will be in touch about ownership, deployment and licensing.</p>
              <button onClick={dismiss} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white">
                Enter the platform <ArrowRight size={16} />
              </button>
              <a href={HF_EXO_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                Explore MOTHER EXO on Hugging Face <ExternalLink size={13} />
              </a>
            </div>
          ) : (
            <>
              {/* strong point */}
              <p className="text-sm leading-relaxed text-white/70">
                <b className="text-white">AI should be owned — not rented.</b> Every MOTHER foundation and frontier world model is legally transferred to sovereign nations and enterprises — full weights, dataset provenance and licensing. You own the intelligence you create.
              </p>

              {/* Hugging Face early-test */}
              <a href={HF_URL} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-3.5 hover:border-amber-500/50">
                <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-amber-500/15 text-amber-300 text-lg">🤗</span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-200">Try the early test model on Hugging Face <ExternalLink size={13} /></span>
                  <span className="mt-1 block text-xs leading-relaxed text-white/55">
                    MOTHER CORE V3 is an <b className="text-white/75">early test release</b> — much earlier than our finished full-corpus model (<b className="text-white/75">8.5M</b>) with code, reasoning and the full agent fleet.
                  </span>
                </span>
              </a>

              {/* MOTHER EXO — World Model on Hugging Face */}
              <a href={HF_EXO_URL} target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-start gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.06] p-3.5 hover:border-cyan-500/50">
                <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-cyan-500/15 text-cyan-200 text-lg">🤗</span>
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan-200">MOTHER EXO — World Model on Hugging Face <ExternalLink size={13} /></span>
                  <span className="mt-1 block text-xs leading-relaxed text-white/55">
                    Explore the <b className="text-white/75">MOTHER EXO</b> embodied world model — one mind for land, sea and air.
                  </span>
                </span>
              </a>

              {/* access form */}
              <form onSubmit={submit} className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-300/80">Request sovereign access</div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Full name*"><input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Jane Smith" /></Field>
                  <Field label="Work email*"><input required type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="jane@org.gov.uk" /></Field>
                  <Field label="Organisation"><input value={form.org} onChange={set('org')} className={inputCls} placeholder="Ministry / Enterprise" /></Field>
                  <Field label="Role"><input value={form.role} onChange={set('role')} className={inputCls} placeholder="CTO / Programme lead" /></Field>
                  <Field label="Country"><input value={form.country} onChange={set('country')} className={inputCls} placeholder="United Kingdom" /></Field>
                  <Field label="Model of interest">
                    <select value={form.model} onChange={set('model')} className={inputCls}>
                      {MODELS.map((m) => <option key={m} value={m} className="bg-[#0d0d0d] text-white">{m}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Usage requirements">
                  <textarea value={form.useCase} onChange={set('useCase')} rows={2} className={inputCls} placeholder="Intended use, data residency, scale, timeline, on-prem vs hosted…" />
                </Field>
                <label className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-white/70">
                  <input type="checkbox" checked={form.ownershipAck} onChange={set('ownershipAck')} className="mt-0.5 h-4 w-4 flex-none accent-cyan-500" />
                  <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-cyan-400 flex-none" /> I understand sovereign deployment requires an ownership / licensing contract.</span>
                </label>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button type="submit" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                  {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Request sovereign access <ArrowRight size={16} /></>}
                </button>
                <button type="button" onClick={dismiss} className="w-full py-1 text-center text-xs text-white/40 hover:text-white/70">Skip for now — explore the platform</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full rounded-lg border border-white/12 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-cyan-500/50 focus:outline-none';
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-white/50">{label}</span>
      {children}
    </label>
  );
}
