"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   MOTHER AI  —  MOTHER CORE V.2 Released + Beta Signup
────────────────────────────────────────────────────────────────────────── */

export default function CountdownTimer() {
  const [minimised, setMinimised] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupState, setSignupState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => setMinimised((v) => !v), []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupState("loading");
    setSignupError("");
    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          source: "msai-site-countdown-overlay",
        }),
      });
      if (res.ok) {
        setSignupState("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setSignupError(data.error ?? "Something went wrong. Please try again.");
        setSignupState("error");
      }
    } catch {
      setSignupError("Network error. Please try again.");
      setSignupState("error");
    }
  };

  if (!mounted) return null;

  /* ── Minimised pill ── */
  if (minimised) {
    return (
      <button
        onClick={toggle}
        className="countdown-pill fixed bottom-4 right-4 z-[999] flex items-center gap-2
                   rounded-full border border-cyan-400/30 bg-black/70 px-4 py-2.5 sm:px-4 sm:py-2
                   text-xs font-mono text-cyan-300 backdrop-blur-xl
                   shadow-[0_0_24px_rgba(0,174,255,0.2)] hover:bg-black/90 hover:shadow-[0_0_32px_rgba(0,174,255,0.3)]
                   transition-all duration-300 active:scale-95"
      >
        <span className="countdown-dot inline-block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span>MOTHER CORE V.2 — Released!</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-1 opacity-50">
          <path d="M1 4 L5 8 L9 4" />
        </svg>
      </button>
    );
  }

  /* ── Full overlay ── */
  return (
    <div className="countdown-overlay pointer-events-none fixed inset-0 z-[998] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="pointer-events-auto countdown-card relative flex flex-col items-center
                    rounded-3xl border border-cyan-400/20 bg-black/60 backdrop-blur-2xl
                    px-6 py-8 sm:px-14 sm:py-12 mx-auto w-full max-w-[92vw] sm:max-w-lg
                    shadow-[0_0_80px_rgba(0,174,255,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]
                    my-4"
      >
        {/* Minimise button */}
        <button
          onClick={toggle}
          aria-label="Minimise overlay"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-1.5
                     rounded-full px-3 py-1.5 sm:px-2.5 sm:py-1.5
                     bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10
                     transition-all active:scale-95"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 5 L7 10 L12 5" />
          </svg>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">Hide</span>
        </button>

        {/* Orbital ring decoration */}
        <div className="countdown-ring absolute -inset-6 sm:-inset-8 rounded-full border border-cyan-500/10 pointer-events-none" />
        <div className="countdown-ring-inner absolute -inset-3 sm:-inset-4 rounded-full border border-cyan-400/5 pointer-events-none" />

        {/* Title */}
        <div className="flex flex-col items-center gap-1.5 mb-6 sm:mb-8">
          <span className="countdown-badge inline-block rounded-full border border-green-500/30 bg-green-500/10
                           px-4 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-green-300">
            Now Released!
          </span>
          <h2 className="countdown-title mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            MOTHER CORE <span className="text-cyan-400">V.2</span>
          </h2>
        </div>

        {/* MOTHER CORE V.2 Image — replaces countdown digits */}
        <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,174,255,0.15)]">
          <Image
            src="/mother-core-v2.png"
            alt="MOTHER CORE Reasoning V.2 3B — Sovereign AI Built for Thinking"
            width={500}
            height={350}
            className="w-full h-auto rounded-2xl"
            priority
          />
        </div>

        {/* Release announcement */}
        <div className="mt-6 sm:mt-8 text-center space-y-3 max-w-sm">
          <p className="text-sm sm:text-base text-white/80 font-semibold leading-relaxed">
            MOTHER CORE V.2 is released &mdash; please go to our{" "}
            <a
              href="[HUGGINGFACE_LINK]"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              HuggingFace
            </a>{" "}
            and follow instructions.
          </p>
          <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
            We will open for full public use after our BETA Testing phase&hellip;
          </p>
        </div>

        {/* ── BETA SIGNUP SECTION ── */}
        <div className="mt-6 sm:mt-8 w-full max-w-sm">
          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-cyan-400/15" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-semibold">
              Beta Testing
            </span>
            <div className="flex-1 h-px bg-cyan-400/15" />
          </div>

          <p className="text-center text-xs sm:text-sm font-semibold text-cyan-300 mb-4 leading-snug">
            Join us in BETA Testing — sign up with your name &amp; work email
          </p>

          {signupState === "success" ? (
            <div className="flex flex-col items-center gap-3 py-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-400/30">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-white/70 text-center">
                You&apos;re on the list! We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="flex flex-col gap-3 w-full">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-cyan-400/20
                           text-white text-sm placeholder-white/30
                           focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/50
                           transition-all"
              />
              <input
                type="email"
                placeholder="Work Email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-cyan-400/20
                           text-white text-sm placeholder-white/30
                           focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/50
                           transition-all"
              />

              {signupState === "error" && (
                <p className="text-xs text-red-400 text-center">{signupError}</p>
              )}

              <button
                type="submit"
                disabled={signupState === "loading"}
                className="w-full rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300
                           py-2.5 text-sm font-semibold tracking-wide
                           hover:bg-cyan-500/30 hover:border-cyan-400/60 hover:text-white
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all active:scale-95
                           shadow-[0_0_16px_rgba(0,174,255,0.15)]"
              >
                {signupState === "loading" ? "Signing up…" : "Sign Up for Beta Access"}
              </button>

              <p className="text-center text-[10px] text-white/25 leading-relaxed">
                No spam &bull; GDPR compliant &bull; UK Sovereign infrastructure
              </p>
            </form>
          )}
        </div>

        {/* ── CLICK HERE FOR DETAILS ── */}
        <div className="mt-5 w-full max-w-sm">
          <button
            onClick={() => setDetailsOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-2 rounded-xl
                       border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]
                       text-white/50 hover:text-white/80
                       py-2 text-xs font-medium uppercase tracking-wider
                       transition-all active:scale-95"
          >
            <span>{detailsOpen ? "Hide Details" : "Click Here for Details"}</span>
            <svg
              width="12" height="12" viewBox="0 0 14 14" fill="none"
              stroke="currentColor" strokeWidth="2"
              className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
            >
              <path d="M2 5 L7 10 L12 5" />
            </svg>
          </button>

          {detailsOpen && (
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-[12px] sm:text-[13px] text-white/60 leading-relaxed space-y-3">
              <p>
                <span className="text-cyan-300 font-semibold">MSAI</span> is looking for approximately{" "}
                <span className="text-white font-semibold">100,000 users</span> to fully test our system
                — each user will be given a{" "}
                <span className="text-cyan-300 font-semibold">Full Year Premium Account</span> as a Thank You.
              </p>

              <p>
                We are also looking for approximately{" "}
                <span className="text-white font-semibold">1,000 Enterprise level clients</span> (10+ employees)
                to test using either our{" "}
                <span className="text-white font-semibold">Open API Integration</span> — see integration details:{" "}
                <a
                  href="https://www.mediastreamai.com/open-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                >
                  Media Stream AI | Sovereign AI Infrastructure &amp; Platforms
                </a>
              </p>

              <p>
                We are also keen for users to explore{" "}
                <span className="text-white font-semibold">MOTHER Text 2 Video</span> and{" "}
                <span className="text-white font-semibold">MOTHER Code</span> — again,{" "}
                <span className="text-cyan-300 font-semibold">1 year full access</span> will be granted
                to all Beta Test Users.
              </p>

              <p className="text-white/80 font-semibold text-center pt-1">
                Please sign up above!
              </p>
            </div>
          )}
        </div>

        {/* Tap to dismiss hint on mobile */}
        <button
          onClick={toggle}
          className="mt-5 sm:hidden text-[10px] text-white/20 uppercase tracking-widest animate-pulse"
        >
          Tap to dismiss
        </button>
      </div>
    </div>
  );
}
