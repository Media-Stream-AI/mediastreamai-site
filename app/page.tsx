"use client";

import Link from "next/link";
import { DataCentreStrip } from "@/components/DataCentreStrip";
import { CoolingRibbon } from "@/components/CoolingRibbon";
import { Section, Card, Button } from "@/components/ui";
import { DcNetworkMap } from "@/components/DcNetworkMap";

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-visible">
        {/* ================= HERO SECTION ================= */}
        <section className="relative flex flex-col items-center justify-center text-center lg:text-left min-h-[100dvh] overflow-visible">
          <img
            src="/media/home-hero.jpg"
            alt="Media Stream AI – Canal-Cooled Sovereign Compute"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-10 sm:py-16">
            <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-white/70">
              UK / EU SOVEREIGN AI INFRASTRUCTURE
            </p>

            <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold leading-tight">
              Canal-Cooled Sovereign Compute for{" "}
              <span className="text-blue-400">AI Training</span> &{" "}
              <span className="text-blue-400">Inference</span>.
            </h1>

            <p className="mt-5 text-white/80 max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed">
              Media Stream AI provides GPUaaS &amp; RDUaaS across UK and EU sovereign data centres —
              fully aligned with GDPR and the EU AI Act. Train and deploy your models on NVIDIA H200 / B200
              clusters and SambaNova RDUs within renewable, canal-cooled infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href="https://gpu.mediastreamai.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block"
              >
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-transform hover:scale-[1.03]">
                  Launch GPU Cloud Platform
                </Button>
              </a>

              <Link href="/mother" className="inline-block">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-transform hover:scale-[1.03]">
                  Meet MOTHER AI (Sovereign LLM)
                </Button>
              </Link>

              <Link href="/sovereign-infrastructure" className="inline-block">
                <Button variant="secondary">Sovereign DC Network</Button>
              </Link>

              <Link href="/water-cooling" className="inline-block">
                <Button variant="ghost">Water Cooling &amp; Heat Exchange</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= DATA CENTRE STRIP ================= */}
        <DataCentreStrip />

        {/* ================= NETWORK MAP ================= */}
        <Section className="py-16 overflow-visible">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Sovereign Data Centre Network
          </h2>
          <p className="text-white/70 max-w-3xl mb-10 text-center md:text-left mx-auto md:mx-0 text-base sm:text-lg leading-relaxed">
            Our data centres in Manchester (MediaCity UK), Sunderland, Düsseldorf (Germany), and Kingston (Jamaica)
            form a unified low-latency mesh ensuring your AI workloads remain within compliant,
            sovereign boundaries.
          </p>
          <DcNetworkMap />
        </Section>

        {/* ================= GPU CLOUD PROMO ================= */}
        <Section className="py-16 overflow-visible">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <img
                src="/images/h200-8x.png"
                alt="GPU Cloud – H200 Cluster"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            <Card className="p-6 bg-black/40 border-white/10">
              <h2 className="text-3xl font-bold mb-2">
                MSAI GPU Cloud — Sovereign Compute as a Service
              </h2>
              <p className="text-white/70 leading-relaxed">
                Instantly deploy 8× GPU H200 / B200 clusters or SambaNova RDU nodes in sovereign,
                ESG-aligned data centres. Ideal for LLM training, inference, and enterprise AI experimentation under UK / EU data jurisdiction.
              </p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc pl-4">
                <li>8× GPU nodes with NVLink / InfiniBand fabric.</li>
                <li>400 Gb/s sovereign backbone (Manchester–Düsseldorf).</li>
                <li>Canal-cooled Lenovo Neptune racks – 65 % cooling energy savings.</li>
                <li>Full AI Act / GDPR compliance and data residency guarantee.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://gpu.mediastreamai.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-transform hover:scale-[1.03]">
                    Launch GPU Cloud
                  </Button>
                </a>
                <Link href="/clusters">
                  <Button variant="secondary">View Pricing &amp; Specs</Button>
                </Link>
              </div>
            </Card>
          </div>
        </Section>

        {/* ================= MOTHER AI PROMO ================= */}
        <Section className="py-16 overflow-visible">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-6 bg-black/40 border-white/10">
              <h2 className="text-3xl font-bold">
                MOTHER AI — The UK’s First Sovereign LLM
              </h2>
              <p className="text-white/70 mt-2 leading-relaxed">
                Built, trained, and hosted on British infrastructure. Designed for orchestration across
                personalization, tagging, scheduling, summarization, safety, forecasting, and ESG optimization.
              </p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc pl-4">
                <li>Transformer architecture powering 30 + production models.</li>
                <li>Full provenance registry &amp; auditability (UK GDPR / EU AI Act ready).</li>
                <li>Runs on NVIDIA H200 and RDU inference clusters in sovereign DCs.</li>
              </ul>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link href="/mother">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-transform hover:scale-[1.03]">
                    Explore MOTHER
                  </Button>
                </Link>
                <a
                  href="https://mother.mediastreamai.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary">Open mother.mediastreamai.com</Button>
                </a>
              </div>
              <p className="text-[11px] text-white/40 mt-4">
                See “MOTHER AI — United Kingdom’s First Sovereign LLM” overview.
              </p>
            </Card>

            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/media/images/dc-mother-hero.jpg"
                alt="MOTHER AI inside Sovereign Data Centre Network"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Section>

        {/* ================= COOLING SYSTEM ================= */}
        <CoolingRibbon />

        {/* ================= LINKS ================= */}
        <Section className="py-16 overflow-visible">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold">GPU Cloud Platform</h3>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">
                Hire sovereign 8× GPU clusters and SambaNova RDUs on-demand.
              </p>
              <a
                className="mt-4 inline-block"
                href="https://gpu.mediastreamai.com"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary">gpu.mediastreamai.com</Button>
              </a>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold">MOTHER AI Portal</h3>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">
                Access models, manage agents, and monitor sovereign compute usage.
              </p>
              <a
                className="mt-4 inline-block"
                href="https://mother.mediastreamai.com"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary">mother.mediastreamai.com</Button>
              </a>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold">IntuiTV</h3>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">
                Personalized Connected TV powered by MOTHER AI.
              </p>
              <a
                className="mt-4 inline-block"
                href="https://www.intuitv.app"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary">www.intuitv.app</Button>
              </a>
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
}