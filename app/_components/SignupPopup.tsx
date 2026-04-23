'use client';
import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const STORAGE_KEY_CLOSED = 'whitepaperPopupClosed';
const STORAGE_KEY_SUBMITTED = 'whitepaperPopupSubmitted';

export default function SignupPopup() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  // Respect prior dismissal or submission before scheduling the popup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const wasClosed = localStorage.getItem(STORAGE_KEY_CLOSED);
    const wasSubmitted = localStorage.getItem(STORAGE_KEY_SUBMITTED);
    if (wasClosed || wasSubmitted) return;

    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append('form-name', 'MotherWhitepaper');
    form.append('name', formData.name);
    form.append('email', formData.email);

    await fetch('/', {
      method: 'POST',
      body: form,
    });

    // Remember the user completed the form so the popup never reappears
    localStorage.setItem(STORAGE_KEY_SUBMITTED, 'true');

    setSubmitted(true);

    const link = document.createElement('a');
    link.href = '/downloads/mother-uk-sovereign-llm.pdf';
    link.download = 'MOTHER_AI_UK_SOVEREIGN_LLM.pdf';
    link.click();

    setTimeout(() => setShow(false), 3000);
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY_CLOSED, 'true');
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-[#0A1525] border border-white/10 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Download size={16} className="text-blue-400" />
            Download MOTHER AI Whitepaper
          </h2>
          <button onClick={handleClose} aria-label="Close popup">
            <X className="w-4 h-4 text-white/60 hover:text-white" />
          </button>
        </div>

        {!submitted ? (
          <>
            <p className="text-xs text-white/60 mb-4">
              Get instant access to the UK&apos;s first Sovereign LLM whitepaper.
            </p>

            <form
              name="MotherWhitepaper"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <input type="hidden" name="form-name" value="MotherWhitepaper" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Work Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              />

              <p className="text-[10px] text-white/40">
                ✓ 100% UK Sovereign · ✓ GDPR Compliant · ✓ No Spam
              </p>

              <button
                type="submit"
                className="w-full rounded-md bg-blue-500/90 hover:bg-blue-500 transition text-xs py-2 font-medium flex items-center justify-center gap-2"
              >
                <Download size={14} />
                Download PDF Whitepaper
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-3">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold mb-1">Thank you!</h3>
            <p className="text-xs text-white/60">
              Your whitepaper download has started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
