"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function DataCentrePage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-horizon"
          >
            Canal-Cooled AI Data Centre
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 text-base sm:text-lg text-white/70 font-glacial"
          >
            Sustainable, sovereign compute for next-generation AI workloads.
          </motion.p>
        </div>

        {/* Optional logo in the hero; safe to remove if you prefer a cleaner look */}
        <div className="mt-8">
          <Image
            src="/media/AI DATA CENTRE - WHITE.png"
            alt="AI Data Centre"
            width={180}
            height={180}
            className="mx-auto opacity-80"
            priority
          />
        </div>

        {/* subtle grid overlay */}
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
      </section>

      {/* CANAL COOLING (SVG + copy) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Use <img> for SVGs to avoid Next Image SVG quirks */}
            <img
              src="/media/water-loop.svg"
              alt="Canal cooling closed loop"
              className="max-w-full h-auto mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-horizon">Green Cooling Technology</h2>
            <p className="mt-4 text-white/70 font-glacial">
              Our canal-cooled system reduces energy use by leveraging a closed-loop heat exchanger
              that draws from the local canal network. This cuts cooling overheads while maintaining
              stable thermal performance for dense GPU racks.
            </p>
            <ul className="mt-6 text-white/80 space-y-2 font-glacial">
              <li>• Closed-loop water exchange (no chemical treatment)</li>
              <li>• Lower PUE targets vs. legacy DCs</li>
              <li>• Built for high-density AI hardware</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* GPU CLUSTERS (SVG + table) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl text-center font-horizon"
          >
            GPU Compute Clusters
          </motion.h2>
          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto font-glacial">
            Purpose-built for training, inference, and real-time media AI.
          </p>

          <div className="mt-10">
            <img
              src="/media/gpu-cluster.svg"
              alt="GPU cluster visualization"
              className="max-w-full h-auto mx-auto"
            />
          </div>

          <div className="overflow-x-auto mt-10">
            <table className="w-full text-left border border-white/10 rounded-2xl overflow-hidden">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 font-horizon">Cluster</th>
                  <th className="px-6 py-3 font-horizon">GPU Type</th>
                  <th className="px-6 py-3 font-horizon">Per Node</th>
                  <th className="px-6 py-3 font-horizon">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80 font-glacial">
                <tr>
                  <td className="px-6 py-4">AI-TrainX</td>
                  <td className="px-6 py-4">NVIDIA H100</td>
                  <td className="px-6 py-4">8x H100, 80GB HBM3</td>
                  <td className="px-6 py-4">LLM training / fine-tuning</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">AI-Stream</td>
                  <td className="px-6 py-4">NVIDIA L40S</td>
                  <td className="px-6 py-4">4x L40S, 48GB</td>
                  <td className="px-6 py-4">Inference / media personalization</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">AI-Edge</td>
                  <td className="px-6 py-4">NVIDIA A100 80GB</td>
                  <td className="px-6 py-4">2x A100, 80GB</td>
                  <td className="px-6 py-4">Low-latency video + edge AI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CLOUD SERVICES */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-horizon">Available Cloud Services</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto font-glacial">
            Scale AI workloads with sovereign, sustainable compute.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "GPU Cloud", d: "On-demand H100 / A100 instances." },
              { t: "Managed Training", d: "Optimised LLM & vision training pipelines." },
              { t: "Inference APIs", d: "Ultra-low-latency deployment at scale." },
              { t: "Hybrid Hosting", d: "Bring your models & datasets to UK compute." }
            ].map((item, i) => (
              <motion.div
                key={item.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] card-glow text-left"
              >
                <div className="text-lg font-horizon">{item.t}</div>
                <p className="mt-2 text-white/70 text-sm font-glacial">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA SOVEREIGNTY & EXPANSION */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src="/media/expansion-map.svg"
            alt="Expansion map"
            className="max-w-full h-auto mx-auto"
          />
          <div>
            <h2 className="text-3xl sm:text-4xl font-horizon">Data Sovereignty & Expansion</h2>
            <p className="mt-4 text-white/70 font-glacial">
              Our first sovereign cluster in <b>Manchester, UK (Q1 2026)</b> ensures UK data residency.
              Additional EU data centres are planned in <b>Germany (2026)</b> and <b>France (2026)</b> to
              support GDPR-aligned workloads with low latency across Europe.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon text-center">FAQ</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <FAQ
              q="Why canal cooling?"
              a="A closed-loop heat exchange using canal water cuts cooling energy while keeping GPUs at optimal temperature — greener, cheaper, and stable."
            />
            <FAQ
              q="Can I bring my own models?"
              a="Yes. Use Hybrid Hosting to deploy private models and datasets on sovereign UK compute, or burst into EU once the 2026 sites go live."
            />
            <FAQ
              q="What’s the uptime?"
              a="Our architecture targets 99.99% SLA with redundant power and diverse fibre paths."
            />
            <FAQ
              q="How do I buy capacity?"
              a="Provision on-demand GPU instances, reserve monthly pods, or discuss a dedicated private cluster that matches your workload profile."
            />
          </div>

          <div className="text-center mt-12">
            <a href="/contact" className="btn btn-primary">Request Capacity</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Local UI helpers ---------- */

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="text-lg font-horizon">{q}</div>
      <p className="mt-2 text-white/70 font-glacial">{a}</p>
    </motion.div>
  );
}