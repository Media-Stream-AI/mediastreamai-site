// app/page.tsx
import Link from "next/link";
import { DataCentreStrip } from "@/components/DataCentreStrip";
import { CoolingRibbon } from "@/components/CoolingRibbon";
import { LeadCapture } from "@/components/LeadCapture";
import { Section, Card, Button } from "@/components/ui";

export default function Page() {
  return (
    <>
      <LeadCapture />{/* overlay asks for name+email and triggers PDF download */}
      <main className="min-h-screen bg-black text-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black" />
          <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-white/60">
              UK / EU SOVEREIGN AI INFRASTRUCTURE
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
              Media Stream AI — Canal-Cooled Sovereign Compute for{" "}
              <span className="text-blue-400">Training</span> &{" "}
              <span className="text-blue-400">Inference</span>.
            </h1>
            <p className="mt-4 text-white/70 max-w-3xl">
              GPUaaS & RDUaaS delivered from our UK and EU data centres with GDPR and EU AI Act alignment.
              Host your models on NVIDIA H200 training clusters and SambaNova RDUs for cost-efficient inference.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
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

            <div className="mt-10">
              <DataCentreStrip />
            </div>
          </div>
        </section>

        {/* MOTHER AI PROMO (with DC image tile) */}
        <Section className="py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-6 bg-black/40 border-white/10">
              <h2 className="text-3xl font-bold">MOTHER AI — the UK’s First Sovereign LLM</h2>
              <p className="text-white/70 mt-2">
                Built, trained and hosted on British infrastructure. Designed for orchestration across
                personalisation, scheduling, tagging, summarisation, safety, forecasting and ESG optimisation.
              </p>
              <ul className="mt-4 space-y-2 text-white/80 text-sm list-disc pl-4">
                <li>Transformer LLM with tool-use across 30+ production models.</li>
                <li>Full provenance registry and auditability (UK GDPR / EU AI Act ready).</li>
                <li>Runs on NVIDIA H200 (training) and RDUs (inference) in our sovereign DCs.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Link href="/mother"><Button>Explore MOTHER</Button></Link>
                <a href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
                  <Button variant="secondary">Open mother.mediastreamai.com</Button>
                </a>
              </div>
              {/* reference to your whitepaper */}
              <p className="text-[11px] text-white/40 mt-4">
                See “MOTHER AI — United Kingdom’s First Sovereign LLM” overview. 0
              </p>
            </Card>

            {/* Use your DC image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <img
                src="/images/dc-mother-hero.jpg"
                alt="MOTHER AI inside the data centre ring"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Cooling system ribbon */}
        <CoolingRibbon />

        {/* Links to sister properties */}
        <Section className="py-16">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold">MOTHER AI Portal</h3>
              <p className="text-white/70 text-sm mt-1">Use our models & agents, manage keys and billing.</p>
              <a className="mt-4 inline-block" href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
                <Button variant="secondary">mother.mediastreamai.com</Button>
              </a>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold">IntuiTV</h3>
              <p className="text-white/70 text-sm mt-1">Personalised CTV experiences powered by MOTHER AI.</p>
              <a className="mt-4 inline-block" href="https://www.intuitv.app" target="_blank" rel="noreferrer">
                <Button variant="secondary">www.intuitv.app</Button>
              </a>
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
}