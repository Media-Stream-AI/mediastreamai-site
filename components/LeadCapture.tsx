// components/LeadCapture.tsx
"use client";
import { useState, useEffect } from "react";

export function LeadCapture() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("lead_seen");
    if (!seen) setTimeout(() => setOpen(true), 1500);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90vw] max-w-md rounded-2xl border border-white/10 bg-black p-6 text-white">
        <h3 className="text-xl font-semibold">Get the MOTHER AI Overview (PDF)</h3>
        <p className="text-white/70 text-sm mt-1">Enter your details to download.</p>
        <form
          name="msai-pdf"
          method="POST"
          data-netlify="true"
          className="mt-4 space-y-3"
          onSubmit={() => sessionStorage.setItem("lead_seen", "1")}
        >
          <input type="hidden" name="form-name" value="msai-pdf" />
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          />
          <input
            name="email"
            required
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Download PDF</button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Not now
            </button>
          </div>
        </form>
        <a
          href="/docs/MSAI_MOTHER_UK_Sovereign_LLM.pdf"
          className="block text-xs text-white/50 mt-3 underline"
          download
        >
          Direct link (backup)
        </a>
      </div>
    </div>
  );
}
