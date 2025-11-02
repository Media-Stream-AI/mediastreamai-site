// app/mother/page.tsx
import { Section, Card, Button } from "@/components/ui";
import Link from "next/link";

export default function Page() {
  return (
    <Section className="py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold">MOTHER AI — Sovereign LLM</h1>
          <p className="text-white/70 mt-2">
            The UK’s first sovereign LLM: built, trained and hosted within British infrastructure, aligned with UK GDPR
            and EU AI Act obligations. MOTHER orchestrates 30+ production models and media agents for personalisation,
            scheduling, tagging, summarisation, safety, forecasting and ESG optimisation.
          </p>
          <ul className="mt-4 text-sm text-white/80 list-disc pl-4 space-y-2">
            <li>Transformer LLM + tool interface to specialised sub-models.</li>
            <li>Provenance registry for datasets and checkpoints; audit-ready.</li>
            <li>Runs on NVIDIA H200 (training) and RDUs for efficient inference.</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
              <Button>Open Mother Portal</Button>
            </a>
            <Link href="/models"><Button variant="secondary">Explore Models</Button></Link>
          </div>
          <p className="text-[11px] text-white/40 mt-4">
            See sovereign LLM document for mission, architecture, governance and future roadmap. 3
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img src="/images/dc-mother-hero.jpg" alt="MOTHER inside the DC" className="w-full h-full object-cover"/>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <Card className="p-6">
          <h3 className="font-semibold">Compliance</h3>
          <p className="text-sm text-white/70 mt-2">Dataset & checkpoint versioning, audit logs, bias testing and explainability layer.</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Security</h3>
          <p className="text-sm text-white/70 mt-2">Air-gapped training paths and zero external access to proprietary models by default.</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Commercialisation</h3>
          <p className="text-sm text-white/70 mt-2">SaaS, usage-based APIs and OEM licensing with sovereign residency controls.</p>
        </Card>
      </div>
    </Section>
  );
}