"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ───────────────────────────────────────────────────────────────
   MOTHER EXO  —  'World Model' & Humanoid Training Simulator
   Direct link to robotics.mediastreamai.com + HUMANOID Teacher signup
─────────────────────────────────────────────────────────────── */

const PLATFORM_URL = "https://robotics.mediastreamai.com";

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
          source: "msai-site-mother-exo-humanoid-teacher",
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
        <span>MOTHER EXO — World Model &amp; Humanoid Sim</span>
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
        className="countdown-card w-full max-w-md rounded-xl border border-cyan-400/20 bg-[#05080F] p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row with title + minimise button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <span className="countdown-badge inline-block self-start rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-cyan-200">
              British Sovereign AI
            </span>
            <h2 className="countdown-title text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              MOTHER&nbsp;EXO
            </h2>
            <p className="text-[11px] text-white/60 leading-snug">
              &lsquo;World Model&rsquo; &amp; Humanoid Training Simulator
            </p>
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

        {/* MOTHER EXO creative — direct link to the platform */}
        <a
          href={PLATFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full rounded-lg overflow-hidden mb-3 border border-cyan-400/15 hover:border-cyan-400/40 transition-colors"
        >
          <Image
            src="/mother-exo-world-model.png"
            alt="MOTHER EXO — British sovereign Humanoid World Model & Training Simulator"
            width={620}
            height={350}
            className="w-full h-auto"
            priority
          />
          <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="mb-3 rounded-full bg-cyan-500/90 px-4 py-1.5 text-xs font-semibold text-black">
              Check out the Simulator →
            </span>
          </span>
        </a>

        {/* Direct CTA to robotics.mediastreamai.com */}
        <a
          href={PLATFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black py-2 text-sm font-bold hover:opacity-90 transition-opacity mb-1"
        >
          Enter the World Model &amp; Humanoid Sim →
        </a>
        <p className="text-center text-[10px] text-white/40 mb-4">
          robotics.mediastreamai.com
        </p>

        {/* ── HUMANOID TEACHER SIGNUP SECTION ── */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-px bg-cyan-400/15" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/60 font-semibold">
            Become a Humanoid Teacher
          </span>
          <div className="flex-1 h-px bg-cyan-400/15" />
        </div>

        <p className="text-[11px] text-cyan-300 mb-3 text-center leading-snug">
          Want to teach MOTHER EXO? Sign up for access to our online teaching SIM.
        </p>

        {signupState === "success" ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-400/30">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs text-white/70 text-center">
              You&apos;re on the list! We&apos;ll be in touch with your teaching SIM access shortly.
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
              placeholder="Email"
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
              {signupState === "loading" ? "Signing up…" : "Sign Up as a Humanoid Teacher"}
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
              <span className="text-cyan-300 font-semibold">MOTHER EXO</span> is a British sovereign
              humanoid <span className="text-white font-semibold">World Model</span> &mdash; designed,
              owned and trained in the UK.
            </p>

            <p>
              Approved <span className="text-white font-semibold">Humanoid Teachers</span> get a login to
              our online teaching SIM, where you help train MOTHER EXO inside the live{" "}
              <span className="text-white font-semibold">Humanoid Training Simulator</span>.
            </p>

            <p>
              Explore the full platform &mdash; simulator, vision stack and capture&rarr;train studio &mdash; at{" "}
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                robotics.mediastreamai.com
              </a>
            </p>

            <p className="text-white/80 font-semibold text-center pt-1">
              Sign up above to teach MOTHER EXO!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
