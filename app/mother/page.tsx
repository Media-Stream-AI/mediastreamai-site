"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "@/components/ui";

export default function MotherPage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center text-center lg:text-left">
        <Image
          src="/dc-mother-hero.jpg"
          alt="MOTHER AI inside the Data Centre"
          fill
          priority
          className="object-cover object-center brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p className="uppercase tracking-[0.3em] text-xs text-white/70">
            UK / EU SOVEREIGN AI INFRASTRUCTURE
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
            MOTHER AI — <span className="text-blue-400">Sovereign LLM</span>
          </h1>
          <p className="mt-5 text-white/80 max-w-2xl mx-auto lg:mx-0">
            The UK’s first sovereign LLM: built, trained, and hosted within
            British infrastructure, aligned with UK GDPR and EU AI Act
            obligations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
            <a href="https://mother.mediastreamai.com" target="_blank" rel="noreferrer">
              <Button>Open Mother Portal</Button>
            </a>
            <Link href="/models">
              <Button variant="secondary">Explore Models</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-20">
        <Card className="p-6 bg-black/40 border-white/10">
          <h3 className="font-semibold text-lg mb-2">Compliance</h3>
          <p className="text-sm text-white/70">
            Dataset & checkpoint versioning, audit logs, bias testing, and
            explainability layer.
          </p>
        </Card>

        <Card className="p-6 bg-black/40 border-white/10">
          <h3 className="font-semibold text-lg mb-2">Security</h3>
          <p className="text-sm text-white/70">
            Air-gapped training paths and zero external access to proprietary
            models by default.
          </p>
        </Card>

        <Card className="p-6 bg-black/40 border-white/10">
          <h3 className="font-semibold text-lg mb-2">Commercialisation</h3>
          <p className="text-sm text-white/70">
            SaaS, usage-based APIs, and OEM licensing with sovereign residency
            controls.
          </p>
        </Card>
      </section>

      <footer className="text-center text-xs text-white/40 pb-8">
        © 2025 Media Stream AI Limited — All rights reserved.
      </footer>
    </main>
  );
}