"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Droplets,
  Cloud,
  Zap,
  ShieldCheck,
  Globe2,
  MapPin,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function DataCentrePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="h-[70vh] relative flex items-center justify-center text-center">
        <Image
          src="/media/AI DATA CENTRE - WHITE.png"
          alt="AI Data Centre"
          width={240}
          height={240}
          className="relative z-10 mx-auto"
        />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-12 text-4xl md:text-6xl font-horizon text-white"
        >
          Canal-Cooled AI Data Centre
        </motion.h1>
        <div className="grid-bg absolute inset-0" />
      </section>

      {/* Intro */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-horizon mb-4">
            Sustainable Power for AI
          </h2>
          <p className="font-glacial text-white/70 leading-relaxed">
            Our Manchester-based AI Data Centre is uniquely designed around
            canal-side cooling technology, using the natural water system to
            reduce energy consumption and deliver a sustainable alternative to
            traditional server farms.
          </p>
          <p className="mt-4 font-glacial text-white/70 leading-relaxed">
            At its core, the facility hosts cutting-edge NVIDIA GPU clusters,
            powering Media Stream AI’s in-house LLMs and providing clients with
            scalable AI compute capacity for cloud playout, generative content,
            and real-time rendering.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden">
          <Image
            src="/media/MRF_AddOn_Schematic.png"
            alt="Cooling schematic"
            width={700}
            height={500}
            className="rounded-xl relative z-10"
          />
          <div className="absolute inset-0 neon-glow" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature
            icon={<Droplets className="h-6 w-6" />}
            title="Canal Cooling"
            desc="Sustainable water-based cooling reduces energy footprint by up to 40%."
          />
          <Feature
            icon={<Cpu className="h-6 w-6" />}
            title="GPU Clusters"
            desc="NVIDIA H100 & A100 servers for AI inference, training & broadcast playout."
          />
          <Feature
            icon={<Cloud className="h-6 w-6" />}
            title="Cloud Services"
            desc="Private LLM hosting, real-time TV playout APIs, and generative rendering."
          />
          <Feature
            icon={<Zap className="h-6 w-6" />}
            title="High Performance"
            desc="Low-latency compute designed for media workloads and AI innovation."
          />
        </div>
      </section>

      {/* Spec Table */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-horizon mb-6">GPU Specification Table</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/[0.05] text-white/80 font-glacial">
                <tr>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">GPU Model</th>
                  <th className="px-4 py-3">VRAM</th>
                  <th className="px-4 py-3">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-glacial text-white/70">
                <tr className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">Inference (Real-Time)</td>
                  <td className="px-4 py-3">A100 / H100 mix</td>
                  <td className="px-4 py-3">40–80 GB</td>
                  <td className="px-4 py-3">
                    Personalization, content tagging, live playout AI
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">Training (Batch)</td>
                  <td className="px-4 py-3">H100 Pods</td>
                  <td className="px-4 py-3">80 GB</td>
                  <td className="px-4 py-3">
                    LLM fine-tuning, distributed AI training, media models
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3">Rendering / VP</td>
                  <td className="px-4 py-3">RTX / A-Series</td>
                  <td className="px-4 py-3">24–48 GB</td>
                  <td className="px-4 py-3">
                    Generative video, VP studio pipelines, real-time rendering
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-horizon mb-6">FAQ</h2>
          <FAQ
            q="How does canal cooling work?"
            a="We circulate canal water through a closed-loop heat exchange system, avoiding chemical treatments while dramatically cutting cooling energy costs."
          />
          <FAQ
            q="What is your Power Usage Effectiveness (PUE)?"
            a="Our projected PUE is under 1.2, significantly more efficient than the 1.6–1.8 seen in legacy data centres."
          />
          <FAQ
            q="Can workloads stay within the UK/EU for compliance?"
            a="Yes. Manchester (Q1 2026) guarantees UK data residency. EU clusters (Germany & France, 2026) ensure GDPR compliance."
          />
          <FAQ
            q="What uptime guarantees do you offer?"
            a="We provide 99.99% uptime SLAs, supported by redundant power feeds and fibre interconnects."
          />
          <FAQ
            q="How is pricing structured?"
            a="Clients can provision by the hour, reserve GPU pods monthly, or establish private sovereign clusters."
          />
        </div>
      </section>
    </main>
  );
}

/* --- UI Components --- */
function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 p-6 bg-white/[0.03] hover:bg-white/[0.06] transition hover:scale-[1.02]">
      <div className="flex items-center gap-3 text-white/90">
        <span className="rounded-lg bg-white/10 p-3">{icon}</span>
        <span className="font-horizon text-lg">{title}</span>
      </div>
      <p className="mt-3 text-sm text-white/70 font-glacial">{desc}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-horizon text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-white/60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <p className="mt-2 text-white/70 font-glacial">{a}</p>}
    </div>
  );
}