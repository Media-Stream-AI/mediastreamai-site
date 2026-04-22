'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
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
    <>
      {/* Backdrop - click to close */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
        onClick={handleClose}
      />

      {/* Centered compact modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-md animate-in zoom-in-95 fade-in duration-300 pointer-events-auto">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Prominent close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all shadow-lg"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Header image */}
            <div className="relative w-full h-32 sm:h-36">
              <Image
                src="/media/mother-download.jpg"
                alt="MOTHER AI UK Sovereign LLM"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
            </div>

            <div className="p-5 sm:p-6">
              {!submitted ? (
                <>
                  <div className="mb-4 pr-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="text-blue-400" size={20} />
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        Download MOTHER AI Whitepaper
                      </h2>
                    </div>
                    <p className="text-white/70 text-sm">
                      Get instant access to the UK&apos;s first Sovereign LLM whitepaper.
                    </p>
                  </div>

                  <form
                    name="MotherWhitepaper"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />

                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2.5 px-6 font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Download PDF Whitepaper
                    </button>
                  </form>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/50">
                    <span>✓ 100% UK Sovereign</span>
                    <span>✓ GDPR Compliant</span>
                    <span>✓ No Spam</span>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500/20 rounded-full mb-3">
                    <svg
                      className="w-7 h-7 text-green-400"
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
                  <h3 className="text-lg font-bold text-white mb-2">Thank you!</h3>
                  <p className="text-white/70 text-sm">
                    Your whitepaper download has started. Check your downloads folder.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
