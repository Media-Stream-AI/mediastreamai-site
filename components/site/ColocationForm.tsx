'use client';

// MSAI Scotland colocation / GPU enquiry form. Posts to the existing hardened
// sales endpoint (/api/contact/sales) which fans the lead out to email / CRM /
// Mongo / CSV - so a lead is captured even if any single sink is unconfigured.
// The colocation-specific fields are packed into the `message` so no API change
// is needed.

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const POWER = ['Under 100 kW', '100–500 kW', '500 kW – 1 MW', '1–5 MW', '5 MW+'];
const DEPLOY = ['Colocation (racks / cages)', 'Private suite', 'GPU-as-a-Service', 'Build-to-suit'];
const WHEN = ['2026 · H1', '2026 · H2', '2027 · H1', '2027 · H2', 'Exploratory'];

export default function ColocationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const f = new FormData(e.currentTarget);
    const power = String(f.get('power') || '');
    const deploy = String(f.get('deploy') || '');
    const when = String(f.get('when') || '');
    const note = String(f.get('message') || '');
    const message = `Power: ${power} · Deployment: ${deploy} · Target: ${when}\n\n${note}`;

    try {
      const res = await fetch('/api/contact/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'),
          email: f.get('email'),
          company: f.get('company'),
          phone: f.get('phone'),
          interest: 'MSAI Scotland Colocation',
          message,
          source: 'colocation',
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Something went wrong.');
      }
      setStatus('ok');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'ok') {
    return (
      <div className="card-night border-cyan/30 glow-ring p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-cyan" />
        <h3 className="mt-4 text-xl font-semibold text-mist">Enquiry received</h3>
        <p className="mt-2 text-muted">
          Thanks - the MSAI Scotland team will be in touch within one business day with capacity,
          pricing and a site visit.
        </p>
      </div>
    );
  }

  const field = 'w-full rounded-xl bg-white/5 border border-hair px-4 py-3 text-mist placeholder:text-muted/60 outline-none focus:border-cyan/50 transition-colors';

  return (
    <form onSubmit={onSubmit} className="glass-night p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Full name" className={field} />
        <input name="company" placeholder="Company" className={field} />
        <input name="email" type="email" required placeholder="Work email" className={field} />
        <input name="phone" placeholder="Phone (optional)" className={field} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <select name="power" className={field} defaultValue="">
          <option value="" disabled>Power requirement</option>
          {POWER.map((p) => <option key={p} value={p} className="bg-night-800">{p}</option>)}
        </select>
        <select name="deploy" className={field} defaultValue="">
          <option value="" disabled>Deployment type</option>
          {DEPLOY.map((p) => <option key={p} value={p} className="bg-night-800">{p}</option>)}
        </select>
        <select name="when" className={field} defaultValue="">
          <option value="" disabled>Target window</option>
          {WHEN.map((p) => <option key={p} value={p} className="bg-night-800">{p}</option>)}
        </select>
      </div>
      <textarea name="message" rows={4} placeholder="Tell us about your workload - GPU type, rack count, networking, compliance…" className={field} />

      {status === 'error' && <p className="text-sm text-error-red">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-glow w-full sm:w-auto text-base px-7 py-3.5 disabled:opacity-60">
        {status === 'sending' ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Request capacity &amp; pricing <ArrowRight className="w-5 h-5" /></>}
      </button>
      <p className="text-xs text-muted">We reply within one business day. Your details are handled under UK GDPR and never shared.</p>
    </form>
  );
}
