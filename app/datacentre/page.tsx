"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DataCentrePage() {
  return (
    <div className="bg-black text-white font-glacial">
      {/* Hero */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-horizon"
        >
          Canal-Cooled AI Data Centre
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg text-white/70 max-w-2xl mx-auto"
        >
          Sustainable, high-performance AI compute — cooled by Manchester’s canal
          network and designed for next-generation GPU workloads.
        </motion.p>
      </section>

      {/* Canal Cooling Visual */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/media/water-loop.svg"
              alt="Canal cooling loop"
              width={500}
              height={500}
              className="max-w-full h-auto mx-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-horizon">Green Cooling Technology</h2>
            <p className="mt-4 text-white/70">
              Our canal-cooled system reduces energy costs by up to 40% while
              ensuring stable thermal performance for GPU clusters. Using a
              closed-loop water exchange, we deliver carbon-efficient compute
              without compromising power density.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GPU Cluster */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-horizon text-center"
          >
            GPU Compute Clusters
          </motion.h2>
          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
            Purpose-built for training, inference, and real-time video AI.
          </p>
          <div className="mt-10">
            <Image
              src="/media/gpu-cluster.svg"
              alt="GPU cluster visualization"
              width={700}
              height={400}
              className="max-w-full h-auto mx-auto"
            />
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="w-full border border-white/10 text-left text-white/80 text-sm">
              <thead className="bg-white/5 font-horizon text-white">
                <tr>
                  <th className="px-4 py-3">Cluster</th>
                  <th className="px-4 py-3">GPU Type</th>
                  <th className="px-4 py-3">Per Node</th>
                  <th className="px-4 py-3">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">AI-TrainX</td>
                  <td className="px-4 py-3">NVIDIA H100</td>
                  <td className="px-4 py-3">8 GPUs / 80GB HBM3</td>
                  <td className="px-4 py-3">LLM Training</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">AI-Stream</td>
                  <td className="px-4 py-3">NVIDIA L40S</td>
                  <td className="px-4 py-3">4 GPUs / 48GB</td>
                  <td className="px-4 py-3">Inference / Media AI</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3">AI-Edge</td>
                  <td className="px-4 py-3">A100 80GB</td>
                  <td className="px-4 py-3">2 GPUs / 80GB</td>
                  <td className="px-4 py-3">Video + Edge AI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Cloud Services */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-horizon">Available Cloud Services</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Scale AI workloads with sovereign, sustainable compute.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "GPU Cloud",
                desc: "On-demand H100 / A100 instances",
              },
              {
                title: "Managed Training",
                desc: "Pre-optimised LLM + vision training pipelines",
              },
              {
                title: "Inference APIs",
                desc: "Deploy AI services at scale with ultra-low latency",
              },
              {
                title: "Hybrid Hosting",
                desc: "Bring your own models + datasets to secure UK compute",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="p-6 border border-white/10 bg-white/[0.03] rounded-2xl"
              >
                <h3 className="font-horizon text-xl">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Image
            src="/media/expansion-map.svg"
            alt="Expansion map"
            width={700}
            height={450}
            className="max-w-full h-auto mx-auto"
          />
          <div>
            <h2 className="text-3xl font-horizon">Expansion Roadmap</h2>
            <p className="mt-4 text-white/70">
              Our Manchester Canal-Side Data Centre launches in Q1 2026 as a
              sovereign UK compute cluster. Expansion into Germany and France is
              planned later in 2026 to support EU-based workloads with full
              compliance and low latency.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-horizon text-center">FAQ</h2>
          <div className="mt-10 space-y-6">
            <FAQ
              q="Why canal cooling?"
              a="Using Manchester’s canal network provides a renewable, cost-efficient cooling loop — cutting energy costs and improving sustainability."
            />
            <FAQ
              q="Can I bring my own models?"
              a="Yes, our Hybrid Hosting option allows you to upload datasets and models for training and inference inside our sovereign compute clusters."
            />
            <FAQ
              q="When will EU data centres be live?"
              a="Our UK Manchester hub launches Q1 2026, with expansion into Germany and France later in 2026."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 border border-white/10 bg-white/[0.03] rounded-2xl"
    >
      <h3 className="font-horizon text-lg">{q}</h3>
      <p className="mt-2 text-white/70">{a}</p>
    </motion.div>
  );
}