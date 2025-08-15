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

      {/* Side-by-side product renders (replace old single image) */}
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
                {/* ⬇️ update to your filename in /public/media/ */}
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
                {/* ⬇️ update to your filename in /public/media/ */}
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

      {/* Cooling animation */}
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

      {/* GPU Cluster graphics + specs */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              {/* ⬇️ Replace with your GPU cluster visual: /public/media/gpu-cluster.svg */}
              <Image
                src="/media/gpu-cluster.svg"
                alt="GPU Array Visualization"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm">High-density GPU cluster with canal-cooled heat exchange.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <h3 className="text-xl sm:text-2xl">Cluster Specifications</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>• Modular pods: 8–32 GPUs per rack; mix of inference & training SKUs</li>
              <li>• Cooling delta-T optimised for canal water seasonal variance</li>
              <li>• Smart power scheduling with renewable-aware workloads</li>
              <li>• High-bandwidth fabric: 200–400 Gbps interconnect (pod dependent)</li>
              <li>• On-prem object storage caching for hot datasets</li>
              <li>• Secure tenant isolation & per-project metering</li>
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <MiniStat label="PUE (target)" value="≤ 1.10" />
              <MiniStat label="WUE (L/kWh)" value="~0.05" />
              <MiniStat label="Utilisation" value="85–95%" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sustainability & Performance cards */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl">Sustainability & Performance</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                t: "Water-assisted cooling",
                d: "Leverages canal flow for heat rejection; lower compressor load vs. traditional chillers.",
              },
              {
                t: "Habitat positive",
                d: "Canal cleaning & restoration program improves water quality and local biodiversity.",
              },
              {
                t: "Grid-friendly scheduling",
                d: "Shift non-urgent jobs to off-peak / high-renewable windows automatically.",
              },
              {
                t: "Telemetry-first",
                d: "Pump RPM, delta-T, flow rate & GPU temps feed live safety + efficiency models.",
              },
              {
                t: "Rapid scaling",
                d: "Containerised pods; deploy additional racks without redesign.",
              },
              {
                t: "Secure by design",
                d: "Network segmentation, per-tenant encryption, compliance-ready logging.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
              >
                <div className="text-lg">{c.t}</div>
                <p className="mt-2 text-white/70 text-sm">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl">How it works</h2>
          <div className="mt-8 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {[
              { n: 1, t: "Intake & Filter", d: "Pull canal water through debris screens & multi-stage filtration." },
              { n: 2, t: "Heat Exchange", d: "Closed-loop coolant rejects heat via plate exchangers & flow control." },
              { n: 3, t: "Smart Orchestration", d: "Telemetry drives pump speed, coolant flow & cluster scheduling." },
              { n: 4, t: "Return & Restore", d: "Water returned to canal with improved clarity; habitat protected." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="text-3xl font-semibold">{s.n}</div>
                <div className="mt-2 text-lg">{s.t}</div>
                <p className="mt-2 text-white/70 text-sm">{s.d}</p>
              </motion.div>
            ))}
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

/* ---------- Mini stat component (local) ---------- */
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 text-xl">{value}</div>
    </div>
  );
}

/* ---------- Self-contained SVG cooling animation ---------- */
function CoolingAnimation() {
  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 320"
        className="w-full h-[260px]"
        xmlns="http://www.w3.org/2000/svg"
      >
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

        {/* Base pipe */}
        <path
          d="M40,220 C240,220 220,120 420,120 S600,220 800,220 980,120 1160,120"
          fill="none"
          stroke="rgba(120,180,255,0.25)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Flow line */}
        <path
          d="M40,220 C240,220 220,120 420,120 S600,220 800,220 980,120 1160,120"
          fill="none"
          stroke="url(#pipe)"
          strokeWidth="6"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dasharray" values="0,140; 140,140" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="0; -140" dur="1.8s" repeatCount="indefinite" />
        </path>

        {/* Droplets */}
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
            <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" begin={`${-i * 0.25}s`} />
          </circle>
        ))}

        {/* Pumps */}
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
