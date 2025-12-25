'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Download } from 'lucide-react';

export default function SignupPopup() {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Don't lock scroll - let users browse while popup is visible
  useEffect(() => {
    // Show after a delay to not be intrusive
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

    setSubmitted(true);

    const link = document.createElement('a');
    link.href = '/downloads/mother-uk-sovereign-llm.pdf';
    link.download = 'MOTHER_AI_UK_SOVEREIGN_LLM.pdf';
    link.click();

    setTimeout(() => setShow(false), 3000);
  };

  const handleClose = () => {
    setShow(false);
    // Save to localStorage so it doesn't show again this session
    localStorage.setItem('whitepaperPopupClosed', 'true');
  };

  // Check if user already closed it
  useEffect(() => {
    const wasClosed = localStorage.getItem('whitepaperPopupClosed');
    if (wasClosed) {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  // Minimized state - small tab at bottom
  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom duration-300">
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-lg shadow-2xl transition-all group"
        >
          <Download size={20} />
          <span className="hidden sm:inline font-semibold">Download Whitepaper</span>
          <span className="sm:hidden font-semibold">Whitepaper</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop - subtle, not blocking */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40" onClick={() => setMinimized(true)} />

      {/* Bottom Overlay Popup */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-7xl mx-auto px-4 pb-4 sm:pb-6">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="grid md:grid-cols-[300px_1fr] gap-0">
              {/* Left: Image (hidden on mobile, shown on tablet+) */}
              <div className="hidden md:block relative h-full min-h-[280px]">
                <Image
                  src="/media/mother-download.jpg"
                  alt="MOTHER AI UK Sovereign LLM"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900" />
              </div>

              {/* Right: Form Content */}
              <div className="p-4 sm:p-6 md:p-8 relative">
                {/* Close and Minimize Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setMinimized(true)}
                    className="text-white/60 hover:text-white transition-colors p-1"
                    aria-label="Minimize"
                    title="Minimize"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close popup"
                  >
                    <X size={20} />
                  </button>
                </div>

                {!submitted ? (
                  <>
                    {/* Mobile Image */}
                    <div className="md:hidden mb-4 -mx-4 -mt-4">
                      <Image
                        src="/media/mother-download.jpg"
                        alt="MOTHER AI UK Sovereign LLM"
                        width={600}
                        height={180}
                        className="w-full h-[140px] object-cover"
                      />
                    </div>

                    {/* Heading */}
                    <div className="mb-4 pr-12">
                      <div className="flex items-center gap-2 mb-2">
                        <Download className="text-blue-400" size={24} />
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          Download MOTHER AI Whitepaper
                        </h2>
                      </div>
                      <p className="text-white/70 text-sm sm:text-base">
                        Get instant access to the UK's first Sovereign LLM whitepaper. 
                        Learn how MOTHER AI delivers 100% UK/EU data residency.
                      </p>
                    </div>

                    {/* Form */}
                    <form
                      name="MotherWhitepaper"
                      method="POST"
                      data-netlify="true"
                      onSubmit={handleSubmit}
                      className="grid sm:grid-cols-2 gap-3"
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
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      
                      <button
                        type="submit"
                        className="sm:col-span-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-3 px-6 font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                      >
                        <Download size={20} />
                        Download PDF Whitepaper
                      </button>
                    </form>

                    {/* Trust Indicators */}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        ✓ 100% UK Sovereign
                      </span>
                      <span className="flex items-center gap-1">
                        ✓ GDPR Compliant
                      </span>
                      <span className="flex items-center gap-1">
                        ✓ No Spam
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Thank you!
                    </h3>
                    <p className="text-white/70">
                      Your whitepaper download has started. Check your downloads folder.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
