"use client";

import Link from "next/link";
import { DataCentreStrip } from "@/components/DataCentreStrip";
import { CoolingRibbon } from "@/components/CoolingRibbon";
import { LeadCapture } from "@/components/LeadCapture";
import { Section, Card, Button } from "@/components/ui";
import { DcNetworkMap } from "@/components/DcNetworkMap";

export default function Page() {
  return (
    <>
      {/* Lead form overlay */}
      <LeadCapture />

      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden">
          {/* background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black" />

          <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-16 flex flex-col lg:flex-row items-center gap-10">
            {/* Hero Text Block */}
            <div className="flex-1 z-10 text-center lg:text-left">
              <p className="uppercase tracking-[0.3em] text-xs text-white/60">
                UK / EU SOVEREIGN AI INFRASTRUCTURE
              </p>

              <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
                Transforming Global Media with{" "}
                <span className="text-blue-400">Sovereign AI Infrastructure</span>.
              </h1>

              <p className="mt-4 text-white/70 max-w-3xl mx-auto lg:mx-0">
                Media Stream AI delivers next-generation data centres engineered for AI training and
                inference under full UK and EU Sovereignty. Our canal-cooled, low-carbon
                infrastructure powers MOTHER AI — the UK’s first sovereign LLM — enabling enterprises
                and broadcasters to train, deploy and scale AI compliantly under GDPR and the EU AI Act.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                <Link href="/mother" className="inline-block">
                  <Button>Meet MOTHER AI (Sovereign LLM)</Button>
                </Link>
                <Link href="/sovereign-infrastructure" className="inline-block">
                  <Button variant="secondary">Sovereign DC Network</Button>
                </Link>
                <Link href="/water-cooling" className="inline-block">
                  <Button variant="ghost">Water Cooling & Heat Exchange</Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1">
              <img
                src="/media/home-hero.jpg"
                alt="Media Stream AI Data Centre – Sovereign Canal-Cooled Infrastructure"
                className="w-full rounded-2xl border border-white/10 shadow-lg object-cover aspect-[16/9]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* ================= DATA CENTRE STRIP ================= */}
        <div className="mt-8">
          <DataCentreStrip />
        </div>

        {/* ================= NETWORK MAP SECTION ================= */}
        <Section className="py-16">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Sovereign Data Centre Network
          </h2>
          <p className="text-white/70 max-w-3xl mb-10 text-center md:text-left mx-auto md:mx-0">
            Our AI-ready data centres in Manchester (MediaCityUK), Sunderland, Düsseldorf (Germany)
            and Kingston (Jamaica) form a unified low-latency compute mesh. Every site meets
            stringent GDPR and EU AI Act compliance standards for fully sovereign AI development.
          </p>
          <DcNetworkMap />
        </Section>

        {/* ================= MOTHER AI PROMO ================= */}
        <Section className="py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-6 bg-black/40 border-white/10">
              <h2 className="text-3xl font-bold">MOTHER AI — The UK’s First Sovereign LLM</h2>
              <p className="text-white/70 mt-2">
                Built, trained, and hosted within British infrastructure, MOTHER AI orchestrates
                30+ production models covering personalization, scheduling, tagging, summarization,
                forecasting, compliance, and ESG optimization.
              </p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc pl-4">
                <li>Transformer architecture with secure tool-use and orchestration layers.</li>
                <li>Full provenance registry & auditability (UK GDPR / EU AI Act ready).</li>
                <li>Runs on NVIDIA H200 training clusters and RDU inference nodes.</li>
              </ul>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link href="/mother"><Button>Explore MOTHER</Button></Link>
                <a href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
                  <Button variant="secondary">Open mother.mediastreamai.com</Button>
                </a>
              </div>
              <p className="text-[11px] text-white/40 mt-4">
                See “MOTHER AI — United Kingdom’s First Sovereign LLM” overview.
              </p>
            </Card>

            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/media/home-hero.jpg"
                alt="MOTHER AI powering Media Stream AI Data Centres"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Section>

        {/* ================= COOLING SYSTEM ================= */}
        <CoolingRibbon />

        {/* ================= LINKS TO OTHER PROPERTIES ================= */}
        <Section className="py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold">MOTHER AI Portal</h3>
              <p className="text-white/70 text-sm mt-1">
                Access models, manage agents, and monitor compute usage in real-time.
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
              <p className="text-white/70 text-sm mt-1">
                Personalized Connected-TV experiences powered by MOTHER AI.
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
