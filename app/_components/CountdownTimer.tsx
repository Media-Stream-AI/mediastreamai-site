"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ───────────────────────────────────────────────────────────────
   MOTHER AI  —  MOTHER CORE V.2 Released + Beta Signup
─────────────────────────────────────────────────────────────── */

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
    <div
      className="countdown-overlay fixed inset-0 z-[998] flex items-center justify-center px-4 py-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={toggle}
    >
      <div
        className="countdown-card w-full max-w-md rounded-xl border border-cyan-400/20 bg-[#0A1525] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row with title + minimise button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <span className="countdown-badge inline-block self-start rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-green-300">
              Now Released
            </span>
            <h2 className="countdown-title text-lg sm:text-xl font-bold tracking-tight text-white">
              MOTHER CORE <span className="text-cyan-400">V.2</span>
            </h2>
          </div>
          <button
            onClick={toggle}
            aria-label="Minimise overlay"
            className="shrink-0 rounded-md p-1 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 5 L7 10 L12 5" />
            </svg>
          </button>
        </div>

        {/* MOTHER CORE V.2 Image */}
        <div className="relative w-full rounded-lg overflow-hidden mb-3">
          <Image
            src="/mother-core-v2.png"
            alt="MOTHER CORE Reasoning V.2 3B — Sovereign AI Built for Thinking"
            width={500}
            height={350}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Release announcement */}
        <p className="text-xs text-white/70 leading-snug mb-1">
          MOTHER CORE V.2 is released — head to our{" "}
          <a
            href="[HUGGINGFACE_LINK]"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
          >
            HuggingFace
          </a>{" "}
          and follow instructions.
        </p>
        <p className="text-[11px] text-white/40 mb-4">
          Full public access opens after BETA Testing.
        </p>

        {/* ── BETA SIGNUP SECTION ── */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-px bg-cyan-400/15" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/60 font-semibold">
            Beta Testing
          </span>
          <div className="flex-1 h-px bg-cyan-400/15" />
        </div>

        <p className="text-[11px] text-cyan-300 mb-3 text-center">
          Sign up with your name &amp; work email.
        </p>

        {signupState === "success" ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-400/30">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs text-white/70 text-center">
              You&apos;re on the list! We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-cyan-400/20 px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60"
            />
            <input
              type="email"
              placeholder="Work Email"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full rounded-md bg-black/40 border border-cyan-400/20 px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/60"
            />

            {signupState === "error" && (
              <p className="text-[11px] text-red-400 text-center">{signupError}</p>
            )}

            <button
              type="submit"
              disabled={signupState === "loading"}
              className="w-full rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 py-1.5 text-xs font-semibold hover:bg-cyan-500/30 hover:text-white disabled:opacity-50 transition-colors"
            >
              {signupState === "loading" ? "Signing up…" : "Sign Up for Beta Access"}
            </button>

            <p className="text-center text-[10px] text-white/30">
              No spam · GDPR compliant · UK Sovereign infrastructure
            </p>
          </form>
        )}

        {/* ── CLICK HERE FOR DETAILS ── */}
        <button
          onClick={() => setDetailsOpen((v) => !v)}
          className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/80 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors"
        >
          <span>{detailsOpen ? "Hide Details" : "Click Here for Details"}</span>
          <svg
            width="10" height="10" viewBox="0 0 14 14" fill="none"
            stroke="currentColor" strokeWidth="2"
            className={`transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
          >
            <path d="M2 5 L7 10 L12 5" />
          </svg>
        </button>

        {detailsOpen && (
          <div className="mt-2 rounded-md border border-white/10 bg-white/[0.02] p-3 text-[11px] text-white/60 leading-relaxed space-y-2">
            <p>
              <span className="text-cyan-300 font-semibold">MSAI</span> is looking for approximately{" "}
              <span className="text-white font-semibold">100,000 users</span> to fully test our system —
              each user will be given a{" "}
              <span className="text-cyan-300 font-semibold">Full Year Premium Account</span> as a Thank You.
            </p>

            <p>
              We are also looking for approximately{" "}
              <span className="text-white font-semibold">1,000 Enterprise level clients</span> (10+ employees)
              to test using our{" "}
              <span className="text-white font-semibold">Open API Integration</span> — see integration details:{" "}
              <a
                href="https://www.mediastreamai.com/open-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
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
    </div>
  );
}
