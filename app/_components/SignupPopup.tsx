'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SignupPopup() {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

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

    // Trigger PDF download
    const link = document.createElement('a');
    link.href = '/downloads/mother-uk-sovereign-llm.pdf';
    link.download = 'MOTHER_AI_UK_SOVEREIGN_LLM.pdf';
    link.click();

    // Auto-close after 3s
    setTimeout(() => setShow(false), 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-6 overflow-y-auto">
      <div
        className="
          bg-gray-900 rounded-2xl border border-white/10 text-center relative
          w-full max-w-[90%] sm:max-w-md p-5 sm:p-8 shadow-xl
        "
      >
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-4 text-white/60 hover:text-white text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <div className="w-full mb-4 sm:mb-6">
          <Image
            src="/media/mother-download.jpg"
            alt="MOTHER AI UK Sovereign LLM"
            width={400}
            height={250}
            className="rounded-lg mx-auto object-cover w-full sm:w-[400px]"
          />
        </div>

        {/* Form / Message */}
        {!submitted ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Download the MOTHER AI Whitepaper
            </h2>
            <p className="text-white/70 mb-4 text-sm sm:text-base">
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
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 rounded-lg py-2 font-semibold transition"
              >
                Download PDF
              </button>
            </form>
          </>
        ) : (
          <p className="text-green-400 font-medium mt-6">
            ✅ Thank you! Your download has started.
          </p>
        )}
      </div>
    </div>
  );
}