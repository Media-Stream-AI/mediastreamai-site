import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cpu, Database, Droplets, ShieldCheck, Globe } from "lucide-react";

export default function DataCentrePage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <Image
          src="/media/AI DATA CENTRE - WHITE.png"
          alt="AI Data Centre"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-horizon">
            Canal-Cooled AI Data Centre
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/70 font-glacial">
            Sustainable, sovereign compute for next-generation AI workloads.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">The Future of Compute</h2>
        <p className="mt-6 text-white/70 max-w-3xl font-glacial">
          Media Stream AI’s canal-side facility uses **natural water cooling** to deliver
          environmentally efficient AI compute. Built in Manchester, UK, the site provides
          hyperscale GPU clusters with reduced energy footprint, perfect for broadcasters,
          researchers, and enterprises requiring secure, sovereign AI processing.
        </p>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-white/[0.03] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Droplets className="h-6 w-6" />}
            title="Canal-Cooled Sustainability"
            desc="Harnessing canal water to reduce heat and energy use."
          />
          <Feature
            icon={<Cpu className="h-6 w-6" />}
            title="GPU Clusters"
            desc="NVIDIA H100/A100 racks optimized for training & inference."
          />
          <Feature
            icon={<Database className="h-6 w-6" />}
            title="Cloud Compute"
            desc="On-demand AI services, APIs, and elastic scaling."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Data Sovereignty"
            desc="UK-hosted clusters for compliance and GDPR readiness."
          />
          <Feature
            icon={<Globe className="h-6 w-6" />}
            title="Global Expansion"
            desc="EU sites coming in Germany & France from 2026."
          />
        </div>
      </section>

      {/* GPU Spec Table */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">GPU Specifications</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border border-white/10 rounded-2xl overflow-hidden">
            <thead className="bg-white/[0.05]">
              <tr>
                <th className="px-6 py-3 font-horizon">Processor</th>
                <th className="px-6 py-3 font-horizon">Cores</th>
                <th className="px-6 py-3 font-horizon">Memory</th>
                <th className="px-6 py-3 font-horizon">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-6 py-4 font-glacial">NVIDIA H100</td>
                <td className="px-6 py-4 font-glacial">16,896 CUDA</td>
                <td className="px-6 py-4 font-glacial">80GB HBM3</td>
                <td className="px-6 py-4 font-glacial">AI Training</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-glacial">NVIDIA A100</td>
                <td className="px-6 py-4 font-glacial">6,912 CUDA</td>
                <td className="px-6 py-4 font-glacial">40GB/80GB HBM2e</td>
                <td className="px-6 py-4 font-glacial">Inference</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-glacial">NVIDIA L40S</td>
                <td className="px-6 py-4 font-glacial">18,176 CUDA</td>
                <td className="px-6 py-4 font-glacial">48GB GDDR6</td>
                <td className="px-6 py-4 font-glacial">Rendering & Simulation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Expansion */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-t border-white/10">
        <h2 className="text-3xl sm:text-4xl font-horizon">Data Sovereignty & Expansion</h2>
        <p className="mt-6 text-white/70 font-glacial max-w-3xl">
          Our first sovereign cluster in Manchester, UK, will go live in Q1 2026, ensuring UK
          businesses can host AI workloads under UK law. Additional sovereign clusters are planned
          in **Germany and France** during 2026 to serve the EU with full GDPR compliance.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/[0.03] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-6">
            <FAQ q="What makes canal-cooling unique?" a="We repurpose nearby canal water for heat exchange, dramatically cutting energy usage while maintaining optimal GPU performance." />
            <FAQ q="Can I rent compute directly?" a="Yes. Clients can purchase dedicated racks, or use our elastic AI Cloud platform for on-demand GPU access." />
            <FAQ q="Are workloads compliant with GDPR?" a="Yes. Our Manchester facility ensures data sovereignty in the UK, with EU-based clusters coming in 2026." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
    >
      <div className="flex items-center gap-3 text-white">
        <span className="bg-white/10 p-2 rounded-lg">{icon}</span>
        <h3 className="text-lg font-horizon">{title}</h3>
      </div>
      <p className="mt-3 text-white/70 font-glacial">{desc}</p>
    </motion.div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
      <h3 className="font-horizon text-lg">{q}</h3>
      <p className="mt-2 text-white/70 font-glacial">{a}</p>
    </div>
  );
}