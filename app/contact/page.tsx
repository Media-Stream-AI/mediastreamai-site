"use client";

import { Section, Container, Card, H2, Lead } from "../../components/Blocks";
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

    // Netlify requires posting to a STATIC file for forms
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      if (!res.ok) throw new Error("Failed to submit form");
      router.push("/thanks");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setPending(false);
    }
  }

  return (
    <Section className="border-t-0">
      <Container>
        <H2>Talk to Sales</H2>
        <Lead>Tell us about your goals — we’ll follow up with a tailored demo.</Lead>

        <Card className="p-6 mt-8">
          {/* No data-netlify here; detection happens via public/__forms.html */}
          <form name="contact" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            {/* Honeypot matches the static form */}
            <p className="hidden">
              <label>Don’t fill this out: <input name="bot-field" /></label>
            </p>

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
              <textarea name="message" rows={5} required className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none" />
            </div>

            <button disabled={pending} className="mt-6 px-6 py-3 rounded-2xl bg-white text-black">
              {pending ? "Sending…" : "Send"}
            </button>
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
          </form>
        </Card>
      </Container>
    </Section>
  );
}
