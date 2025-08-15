"use client";

import { motion } from "framer-motion";

const rows = [
  { title: "Broadcasters", desc: "Personalized linear streams (plussed channels) without changing your ad tech." },
  { title: "Studios & Catalog Owners", desc: "Mood-aware VOD packaging and dynamic trailers." },
  { title: "FAST Operators", desc: "Per-viewer lineup generation and content safety controls." },
  { title: "Sports & Live", desc: "Contextual highlights, localizations, and compliant ad breaks." }
];

export default function SolutionsPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          Solutions
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Plug-and-play components you can adopt independently or as a full stack.
        </p>
      </section>

      {/* Grid of solutions */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rows.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
            >
              <div className="text-white/90 text-lg">{r.title}</div>
              <div className="text-white/70 text-sm mt-2">{r.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">Outcomes we target</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Outcome stat="+12–25%" label="Session length" />
            <Outcome stat="+8–15%" label="Ad yield" />
            <Outcome stat="−20–40%" label="Churn" />
            <Outcome stat="Minutes, not weeks" label="Channel setup" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Outcome({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center card-glow">
      <div className="text-3xl sm:text-4xl">{stat}</div>
      <div className="text-white/70 text-sm mt-2">{label}</div>
    </div>
  );
}