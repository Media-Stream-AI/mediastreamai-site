"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Netlify requires posting to a STATIC file for form handling
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      if (!res.ok) throw new Error("Form submit failed");
      router.push("/thanks");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setPending(false);
    }
  }

  return (
    <div className="bg-black text-white">
      <section className="relative overflow-hidden text-center px-6 py-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-horizon">Contact Sales</h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg font-glacial">
          Tell us about your goals — we’ll follow up with a tailored demo.
        </p>
      </section>

      <section className="section border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <form name="contact" onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <input type="hidden" name="form-name" value="contact" />
            {/* honeypot (must match __forms.html) */}
            <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input name="name" required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
              </div>
              <div>
                <label className="text-sm text-white/70">Work Email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">Company</label>
              <input name="company" className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
            </div>

            <div className="mt-4">
              <label className="text-sm text-white/70">How can we help?</label>
              <textarea name="message" rows={6} required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
            </div>

            <button disabled={pending} className="btn btn-primary mt-6">
              {pending ? "Sending…" : "Send"}
            </button>
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}