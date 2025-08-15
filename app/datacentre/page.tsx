"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DataCentrePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          Canal Side AI Data Centre
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Canal cleaning + GPU cooling technology — restoring waterways while powering a sustainable AI GPU cluster.
        </p>
      </section>

      {/* Side-by-side images (replace the old single image) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="relative w-full aspect-square">
                {/* ⬇️ Update this filename to match what you placed in /public/media/ */}
                <Image
                  src="/media/datacentre1.png"
                  alt="Water Intake Cooling Unit"
                  fill
                  className="object-contain rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <p className="mt-3 text-white/70 text-sm">Water intake & filtration assembly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="relative w-full aspect-square">
                {/* ⬇️ Update this filename to match what you placed in /public/media/ */}
                <Image
                  src="/media/datacentre2.png"
                  alt="Canal Side AI Data Centre Unit"
                  fill
                  className="object-contain rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <p className="mt-3 text-white/70 text-sm">Canal Side AI Data Centre cooling skid</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cooling animation (kept below the images) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl">Cooling Flow (Concept)</h2>
          <p className="mt-3 text-white/70 text-sm max-w-3xl">
            Visualising intake → filtration → heat exchange → return. Animated for concept only; not to scale.
          </p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden">
            <CoolingAnimation />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">Partner with us</h2>
          <p className="mt-4 text-white/70">
            Deploy sustainable AI compute with canal-powered cooling infrastructure.
          </p>
          <a href="/contact" className="btn btn-primary mt-6">
            Talk to our team
          </a>
        </div>
      </section>
    </div>
  );
}

/**
 * Minimal self-contained SVG cooling animation:
 * flowing “water” line with animated particles and pump icons.
 * No external deps, safe for SSR/CSR.
 */
function CoolingAnimation() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 320"
        className="w-full h-[260px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <linearGradient id="pipe" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#69c3ff" />
            <stop offset="100%" stopColor="#6bffde" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="320" fill="url(#grid)" />

        {/* Pipe path */}
        <path
          d="M40,220 C240,220 220,120 420,120 S600,220 800,220 980,120 1160,120"
          fill="none"
          stroke="rgba(120,180,255,0.25)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Flowing water line */}
        <path
          d="M40,220 C240,220 220,120 420,120 S600,220 800,220 980,120 1160,120"
          fill="none"
          stroke="url(#pipe)"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0,140; 140,140"
            dur="1.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0; -140"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </path>

        {/* Moving droplets */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle key={i} r="4" fill="#8be9ff">
            <animateMotion
              dur={`${5 + (i % 6) * 0.5}s`}
              repeatCount="indefinite"
              keyPoints="0;1"
              keyTimes="0;1"
              rotate="auto"
              path="M40,220 C240,220 220,120 420,120 S600,220 800,220 980,120 1160,120"
              begin={`${-i * 0.35}s`}
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="2.2s"
              repeatCount="indefinite"
              begin={`${-i * 0.25}s`}
            />
          </circle>
        ))}

        {/* Pump icons (simple) */}
        {[
          { x: 410, y: 120 },
          { x: 800, y: 220 },
        ].map((p, idx) => (
          <g key={idx} transform={`translate(${p.x - 18}, ${p.y - 18})`}>
            <rect width="36" height="36" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <circle cx="18" cy="18" r="9" fill="none" stroke="#9ad8ff" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
