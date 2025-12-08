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
        {/* ================= NEW HERO SECTION ================= */}
        <section className="relative bg-black text-white overflow-hidden py-8">
          {/* === BACKGROUND IMAGE === */}
          <img
            src="/images/home-background.png"
            alt="MSAI Background"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-75"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/60" />

          {/* === HORIZONTAL STRIP OF SQUARES === */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Scroll hint arrow overlay */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-end pr-3">
              <span className="text-xs text-white/60 mr-1 hidden sm:inline">Scroll</span>
              <span className="text-xl animate-pulse">➜</span>
            </div>

            <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4 pr-10 scrollbar-hide">
              {/* GPUaaS Square */}
              <a
                href="https://gpu.mediastreamai.com"
                target="_blank"
                rel="noreferrer"
                className="relative group flex-shrink-0"
              >
                <img
                  src="/images/square-gpu.png"
                  alt="GPU Cloud Platform"
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-semibold text-white">GPUaaS</span>
                </div>
              </a>

              {/* MSAI Robotics Square */}
              <Link href="/robotics" className="relative group flex-shrink-0">
                <img
                  src="/images/square-robotics.png"
                  alt="MSAI Robotics"
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-semibold text-white">MSAI Robotics</span>
                </div>
              </Link>

              {/* AI Director VP Studio Square */}
              <Link href="/vp-studio" className="relative group flex-shrink-0">
                <img
                  src="/images/square-ai-director.png"
                  alt="AI Director VP Studio"
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-semibold text-white">AI Director</span>
                </div>
              </Link>

              {/* IntuiTV Square */}
              <a
                href="https://www.intuitv.app"
                target="_blank"
                rel="noreferrer"
                className="relative group flex-shrink-0"
              >
                <img
                  src="/images/square.intuitv.png"
                  alt="IntuiTV"
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-semibold text-white">IntuiTV</span>
                </div>
              </a>

              {/* Canal Cooling Square */}
              <Link href="/data-centre" className="relative group flex-shrink-0">
                <img
                  src="/images/square-canal-cooling.png"
                  alt="Canal Cooling System"
                  className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl transition-transform group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-lg font-semibold text-white">Canal Cooling</span>
                </div>
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
                src="/media/images/H200.png"
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
                MOTHER AI — The UK's First Sovereign LLM
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
                See "MOTHER AI — United Kingdom's First Sovereign LLM" overview.
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

        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </main>
    </>
  );
}

