'use client';

import { useEffect, useState } from 'react';

const INTERESTS = ['Request a Demo', 'Talk to Sales', 'General enquiry'];

export default function ContactPage() {
  const [interest, setInterest] = useState('Request a Demo');
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('interest');
      if (q) {
        const match = INTERESTS.find((i) => i.toLowerCase().includes(q.toLowerCase()));
        if (match) setInterest(match);
      }
    } catch {}
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/contact/sales', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, interest, source: 'intuitv.app/contact' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setMessage((err as Error).message);
    }
  }

  const input =
    'w-full rounded-xl bg-white/5 border border-hair px-4 py-3 text-mist placeholder:text-muted focus:outline-none focus:border-cyan/50';

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl mb-3">
        Let&apos;s talk <span className="text-gradient">IntuiTV</span>
      </h1>
      <p className="text-muted mb-10">
        Book a demo or speak with our team. We&apos;ll get straight back to you.
      </p>

      {status === 'done' ? (
        <div className="card-night rounded-2xl border border-hair p-8">
          <h2 className="text-2xl font-semibold text-mist mb-2">Thanks - message received ✅</h2>
          <p className="text-muted">
            Our team at MediaStreamAI will be in touch shortly. For anything urgent, email{' '}
            <a className="text-cyan" href="mailto:contact@mediastreamai.com">contact@mediastreamai.com</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => setInterest(i)}
                className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                  interest === i ? 'bg-cyan/15 text-cyan border-cyan/50' : 'border-hair text-muted hover:border-cyan/50'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <input className={input} placeholder="Your name" value={form.name} onChange={set('name')} required />
          <input className={input} type="email" placeholder="Work email" value={form.email} onChange={set('email')} required />
          <div className="grid sm:grid-cols-2 gap-4">
            <input className={input} placeholder="Company" value={form.company} onChange={set('company')} />
            <input className={input} placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} />
          </div>
          <textarea className={input} rows={4} placeholder="How can we help?" value={form.message} onChange={set('message')} />
          {status === 'error' && <p className="text-red-400 text-sm">{message}</p>}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-glow inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            {status === 'sending' ? 'Sending…' : `Send - ${interest}`}
          </button>
          <p className="text-muted text-xs">
            Goes straight to our team at contact@mediastreamai.com. We&apos;ll never share your details.
          </p>
        </form>
      )}
    </section>
  );
}
