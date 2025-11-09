'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SignupPopup() {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [show]);

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

    setSubmitted(true);

    const link = document.createElement('a');
    link.href = '/downloads/mother-uk-sovereign-llm.pdf';
    link.download = 'MOTHER_AI_UK_SOVEREIGN_LLM.pdf';
    link.click();

    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-6 overflow-y-auto">
      <div
        className="
          relative w-full max-w-[95%] sm:max-w-md bg-gray-900 rounded-2xl
          border border-white/10 p-4 sm:p-8 text-center shadow-xl
          overflow-y-auto max-h-[90vh]
        "
      >
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-3 text-white/60 hover:text-white text-xl sm:text-lg z-10"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full mb-3 sm:mb-6">
          <Image
            src="/media/mother-download.jpg"
            alt="MOTHER AI UK Sovereign LLM"
            width={360}
            height={220}
            className="rounded-lg mx-auto object-cover w-full max-h-[180px] sm:max-h-[240px]"
          />
        </div>

        {/* Form or message */}
        {!submitted ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Download the MOTHER AI Whitepaper
            </h2>
            <p className="text-white/70 mb-4 text-sm sm:text-base px-2">
              Enter your details to receive your copy of the UK’s first Sovereign LLM.
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 text-sm rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 text-sm rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2 font-semibold text-sm transition"
              >
                Download PDF
              </button>
            </form>
          </>
        ) : (
          <p className="text-green-400 font-medium mt-6 text-sm sm:text-base">
            ✅ Thank you! Your download has started.
          </p>
        )}
      </div>
    </div>
  );
}