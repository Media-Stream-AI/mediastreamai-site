"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

/* -------------------- Auto-fit hook (keeps text ≤ maxLines) -------------------- */
function useFitLines<T extends HTMLElement>(maxLines = 2, minSize = 18, step = 1) {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const computeLines = () => {
      const style = window.getComputedStyle(el);
      const lh = parseFloat(style.lineHeight || "0");
      if (!lh) return 1;
      const lines = Math.ceil(el.scrollHeight / lh);
      return lines;
    };

    const fit = () => {
      if (!el) return;
      // reset to CSS size first, then shrink only if needed
      el.style.fontSize = "";
      let size = parseFloat(window.getComputedStyle(el).fontSize || "32");
      // guard: if CSS computed < min, keep it
      if (size < minSize) size = minSize;
      el.style.fontSize = size + "px";

      let lines = computeLines();
      while (lines > maxLines && size > minSize) {
        size -= step;
        el.style.fontSize = size + "px";
        lines = computeLines();
      }
    };

    const ro = new ResizeObserver(fit);
    ro.observe(el);
    fit();

    return () => ro.disconnect();
  }, [maxLines, minSize, step]);

  return ref;
}

/* ================================== PAGE ================================== */
export default function TechnologyPage() {
  // Headings that must be ≤ 2 lines, never split words
  const h1Ref = useFitLines<HTMLHeadingElement>(2, 22, 0.5);
  const h2LeftRef = useFitLines<HTMLHeadingElement>(2, 18, 0.5);
  const h2RightRef = useFitLines<HTMLHeadingElement>(2, 18, 0.5);
  const h2SchedRef = useFitLines<HTMLHeadingElement>(2, 18, 0.5);
  const h2HlsRef = useFitLines<HTMLHeadingElement>(2, 18, 0.5);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-4 sm:px-6 py-20 sm:py-24">
        <motion.h1
          ref={h1Ref}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            font-horizon tracking-tight leading-[1.08]
            text-4xl sm:text-5xl md:text-6xl
            max-w-[22ch] sm:max-w-[26ch] md:max-w-[28ch] mx-auto
            break-normal hyphens-none
          "
          style={{
            wordBreak: "normal",
            overflowWrap: "normal",
            WebkitHyphens: "none",
            hyphens: "none",
            textWrap: "balance" as any,
          }}
        >
          Personalisation Technology
        </motion.h1>

        <p
          className="mt-5 text-white/70 mx-auto
                     text-base sm:text-lg leading-relaxed
                     max-w-[42ch] sm:max-w-[60ch]
                     break-normal hyphens-none"
          style={{
            wordBreak: "normal",
            overflowWrap: "normal",
            WebkitHyphens: "none",
            hyphens: "none",
            textWrap: "pretty" as any,
          }}
        >
          Our Personalisation LLM fuses biometric signals, behaviour, and context to select the right content — privately and transparently.
        </p>
      </section>

      {/* Biometric Signals Mind Map + Privacy */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Mind Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <h2
              ref={h2LeftRef}
              className="text-2xl sm:text-3xl leading-tight break-normal hyphens-none"
              style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                WebkitHyphens: "none",
                hyphens: "none",
                textWrap: "balance" as any,
              }}
            >
              Biometric Signals → Mind Map
            </h2>

            <p
              className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed break-normal hyphens-none"
              style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                WebkitHyphens: "none",
                hyphens: "none",
              }}
            >
              Real-time signals like EEG, HRV, GSR and inferred mood blend with behavioural data (session context,
              prior viewing) and live context (weather, time of day). The map below shows how features flow into our Personalisation LLM,
              which selects content aligned to attention, comfort and preference.
            </p>

            <div className="mt-6 rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-3 sm:p-4">
              <BiometricMindMap />
            </div>

            <ul
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-white/80 break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              <li>• EEG: focus/engagement features (alpha/theta balance)</li>
              <li>• HRV: relaxation / arousal proxy (RMSSD/SDNN)</li>
              <li>• GSR: moment-to-moment excitement</li>
              <li>• Mood: multi-signal inference (opt-in)</li>
              <li>• Behaviour: dwell, skips, completion, repeats</li>
              <li>• Context: time, weather, device, ambient light</li>
            </ul>
          </motion.div>

          {/* Privacy Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <h2
              ref={h2RightRef}
              className="text-2xl sm:text-3xl leading-tight break-normal hyphens-none"
              style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                WebkitHyphens: "none",
                hyphens: "none",
                textWrap: "balance" as any,
              }}
            >
              Privacy & Opt-In
            </h2>

            <p
              className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              Personalised TV is optional, transparent and privacy-first. You stay in control.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { t: "Explicit Opt-In", d: "Granular consent by signal type, with per-device controls." },
                { t: "On-Device First", d: "Signal features derived locally where possible; raw data never leaves the device by default." },
                { t: "Edge Anonymisation", d: "Ephemeral IDs, k-anonymity buckets, and DP noise for cohort metrics." },
                { t: "Transparent Logs", d: "View and revoke history, export preferences, consent receipts." },
                { t: "Minimal Retention", d: "Short TTL for session features; long-term only if explicitly enabled." },
                { t: "Compliance-Ready", d: "GDPR/CCPA aligned; DPIA and DSR processes in place." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div
                    className="text-base break-normal hyphens-none"
                    style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
                  >
                    {c.t}
                  </div>
                  <p
                    className="mt-1 text-xs sm:text-sm text-white/70 leading-relaxed break-normal hyphens-none"
                    style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
                  >
                    {c.d}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-5 text-white/60 text-[11px] sm:text-xs break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              Note: biometric features are <span className="underline decoration-dotted">derived representations</span> —
              not raw medical signals — and are processed with consent and strict safeguards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LLM → Schedule + HLS */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LLM → Schedule */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <h2
              ref={h2SchedRef}
              className="text-2xl sm:text-3xl leading-tight break-normal hyphens-none"
              style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                WebkitHyphens: "none",
                hyphens: "none",
                textWrap: "balance" as any,
              }}
            >
              Personalisation LLM → Schedule Builder
            </h2>

            <p
              className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              The LLM turns preferences, context and constraints into a personalised schedule: format variety, pacing,
              ad-load targets, content diversity and safety rules — all tuned for each viewer.
            </p>

            <ul
              className="mt-6 space-y-2 text-sm sm:text-base text-white/80 break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              <li>• Multi-objective ranking (engagement, novelty, diversity & fatigue-avoidance)</li>
              <li>• Session pacing (short/long form balance, ad breaks aligned to natural boundaries)</li>
              <li>• Safety / suitability filters (broadcaster policy & parental controls)</li>
              <li>• Exploration vs. comfort trade-off (context-aware discovery)</li>
            </ul>

            <div className="mt-6 rounded-2xl bg-white/[0.02] ring-1 ring-white/10 p-3 sm:p-4">
              <HLSFlow />
            </div>
          </motion.div>

          {/* HLS Optimisations */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <h2
              ref={h2HlsRef}
              className="text-2xl sm:text-3xl leading-tight break-normal hyphens-none"
              style={{
                wordBreak: "normal",
                overflowWrap: "normal",
                WebkitHyphens: "none",
                hyphens: "none",
                textWrap: "balance" as any,
              }}
            >
              AI-Optimised HLS Playout
            </h2>

            <p
              className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              Adaptive bitrate ladders and LL-HLS tuned per viewer, device and network — reducing bandwidth and latency while preserving QoE.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-white/80">
              {[
                {
                  t: "Adaptive Ladder",
                  d: "AI selects per-title/per-device ladders, GOP alignment and keyframe cadence to minimize rebuffering.",
                },
                {
                  t: "Predictive Prefetch",
                  d: "Prefetch likely next segments at the edge; cut start-up delay and seek cost.",
                },
                {
                  t: "Congestion-Aware",
                  d: "Live throughput estimation adjusts rendition switches long before stalls occur.",
                },
                {
                  t: "Edge Intelligence",
                  d: "Edge hints + client telemetry feed back into real-time scheduling and caching.",
                },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div
                    className="text-base break-normal hyphens-none"
                    style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
                  >
                    {c.t}
                  </div>
                  <p
                    className="mt-1 text-xs sm:text-sm text-white/70 leading-relaxed break-normal hyphens-none"
                    style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
                  >
                    {c.d}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-6 text-[11px] sm:text-xs text-white/60 break-normal hyphens-none"
              style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
            >
              The result: lower average bitrate for the same MOS, faster zapping, fewer rebuffers, and consistent latency in LL-HLS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl leading-tight max-w-[26ch] mx-auto break-normal hyphens-none"
            style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none", textWrap: "balance" as any }}
          >
            Bring personalisation to your platform
          </h2>
          <p
            className="mt-4 text-white/70 mx-auto max-w-[45ch] break-normal hyphens-none"
            style={{ wordBreak: "normal", overflowWrap: "normal", hyphens: "none" }}
          >
            We integrate with your CMS, encoder and CDN — end to end, privacy-first.
          </p>
          <a href="/contact" className="btn btn-primary mt-6">Talk to our team</a>
        </div>
      </section>
    </div>
  );
}

/* -------------------- Biometric Mind Map (Animated SVG) -------------------- */
function BiometricMindMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <svg
        viewBox="0 0 900 520"
        className="w-full h-[300px] sm:h-[360px] md:h-[420px]"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Biometric signals mind map feeding the Personalisation LLM"
      >
        {/* Background grid */}
        <defs>
          <pattern id="mm-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <linearGradient id="neonA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7ed2ff" />
            <stop offset="100%" stopColor="#7affd0" />
          </linearGradient>
          <linearGradient id="neonB" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6a6ff" />
            <stop offset="100%" stopColor="#8ad0ff" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="900" height="520" fill="url(#mm-grid)" />

        {/* Brain node */}
        <g transform="translate(450,180)">
          <circle r="64" fill="rgba(150,200,255,0.12)" stroke="url(#neonA)" strokeWidth="2" />
          <path
            d="M-38,8 C-40,-26,-6,-44,10,-28 C34,-58,76,-28,48,4 C68,18,52,52,18,40 C8,62,-34,56,-38,26"
            fill="none"
            stroke="url(#neonB)"
            strokeWidth="2"
          >
            <animate attributeName="stroke-dasharray" values="4 10; 10 10" dur="2s" repeatCount="indefinite" />
          </path>
          <text x="0" y="88" fontSize="12" textAnchor="middle" fill="rgba(255,255,255,0.7)">
            Brain Features
          </text>
        </g>

        {/* Input nodes */}
        {[
          { x: 170, y: 80, label: "EEG" },
          { x: 120, y: 190, label: "HRV" },
          { x: 180, y: 300, label: "GSR" },
          { x: 720, y: 110, label: "Behaviour" },
          { x: 760, y: 220, label: "Weather" },
          { x: 710, y: 320, label: "Prev. Viewing" },
          { x: 450, y: 420, label: "Mood" },
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`}>
            <circle r="26" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <circle r="8" fill="url(#neonA)">
              <animate attributeName="r" values="6;8;6" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
            </circle>
            <text x="0" y="42" fontSize="12" textAnchor="middle" fill="rgba(255,255,255,0.7)">
              {n.label}
            </text>
          </g>
        ))}

        {/* Edges to brain */}
        {[
          "M170,80 C260,80 330,140 450,180",
          "M120,190 C220,190 320,160 450,180",
          "M180,300 C260,300 340,240 450,180",
          "M720,110 C640,120 560,150 450,180",
          "M760,220 C640,210 560,190 450,180",
          "M710,320 C640,280 560,230 450,180",
          "M450,420 C450,360 450,240 450,180",
        ].map((d, idx) => (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke="rgba(130,180,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dasharray" values="0 8; 8 8" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0; -16" dur="1.8s" repeatCount="indefinite" />
          </path>
        ))}

        {/* Merge → LLM */}
        <g transform="translate(450,180)">
          <path d="M-8,-92 h16 v-22 h-16 z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
          <text x="0" y="-100" fontSize="11" textAnchor="middle" fill="rgba(255,255,255,0.7)">Merge</text>
          <path d="M0,-92 C0,-120 0,-150 0,-170" fill="none" stroke="url(#neonB)" strokeWidth="2">
            <animate attributeName="stroke-dasharray" values="0 6; 6 6" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.4s" repeatCount="indefinite" />
          </path>
        </g>

        {/* LLM selector node */}
        <g transform="translate(450,20)">
          <rect x="-110" y="0" width="220" height="50" rx="10" fill="rgba(140,160,255,0.12)" stroke="url(#neonA)" />
          <text x="0" y="30" fontSize="14" textAnchor="middle" fill="white">Personalisation LLM</text>
        </g>

        {/* Output */}
        <path d="M450,70 C450,100 450,120 450,140" fill="none" stroke="rgba(140,180,255,0.8)" strokeWidth="2.5">
          <animate attributeName="stroke-dasharray" values="0 10; 10 10" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="0; -20" dur="1.2s" repeatCount="indefinite" />
        </path>
        <g transform="translate(450,160)">
          <rect x="-160" y="0" width="320" height="54" rx="12" fill="rgba(120,200,255,0.10)" stroke="rgba(160,210,255,0.35)" />
          <text x="0" y="32" fontSize="13" textAnchor="middle" fill="white">
            Selected Content (Format • Genre • Length • Safety)
          </text>
        </g>
      </svg>
    </div>
  );
}

/* -------------------- HLS Flow (Animated SVG) -------------------- */
function HLSFlow() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <svg
        viewBox="0 0 980 360"
        className="w-full h-[220px] sm:h-[260px] md:h-[300px]"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="HLS optimisation flow from LLM to viewer"
      >
        <defs>
          <pattern id="hls-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <linearGradient id="hls-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7ed2ff" />
            <stop offset="100%" stopColor="#6bffde" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="980" height="360" fill="url(#hls-grid)" />

        {/* Blocks */}
        {[
          { x: 40, y: 60, w: 170, h: 56, t: "Personalisation LLM" },
          { x: 260, y: 60, w: 150, h: 56, t: "Schedule Builder" },
          { x: 450, y: 60, w: 140, h: 56, t: "Encoder" },
          { x: 620, y: 60, w: 150, h: 56, t: "ABR Ladder" },
          { x: 810, y: 60, w: 130, h: 56, t: "CDN / Edge" },
          { x: 810, y: 230, w: 130, h: 56, t: "Viewer (LL-HLS)" },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x},${b.y})`}>
            <rect width={b.w} height={b.h} rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
            <text x={b.w / 2} y={34} fontSize="13" textAnchor="middle" fill="white">{b.t}</text>
          </g>
        ))}

        {/* Connections */}
        {[
          "M210,88 L260,88",
          "M410,88 L450,88",
          "M590,88 L620,88",
          "M770,88 L810,88",
          "M875,116 C875,160 875,200 875,230",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(140,180,255,0.5)" strokeWidth="3" strokeLinecap="round">
            <animate attributeName="stroke-dasharray" values="0 12; 12 12" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" values="0; -24" dur="1.6s" repeatCount="indefinite" />
          </path>
        ))}

        {/* Moving packets */}
        {[
          { path: "M210,88 L260,88", dur: 1.5 },
          { path: "M410,88 L450,88", dur: 1.6 },
          { path: "M590,88 L620,88", dur: 1.6 },
          { path: "M770,88 L810,88", dur: 1.6 },
          { path: "M875,116 C875,160 875,200 875,230", dur: 1.8 },
        ].map((p, i) => (
          <circle key={i} r="5" fill="url(#hls-line)">
            <animateMotion path={p.path} dur={`${p.dur}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;0" dur={`${p.dur}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Side notes */}
        <g transform="translate(450,140)">
          <text x="0" y="0" fontSize="11" fill="rgba(255,255,255,0.75)">Per-title ladder, tuned keyframe interval</text>
          <text x="0" y="18" fontSize="11" fill="rgba(255,255,255,0.75)">Predictive prefetch, congestion-aware switching</text>
          <text x="0" y="36" fontSize="11" fill="rgba(255,255,255,0.75)">Edge hints + client telemetry feedback</text>
        </g>
      </svg>
    </div>
  );
}