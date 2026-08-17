import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Atom, Cpu, Search, ShieldCheck, CheckCircle2, Circle, Zap } from 'lucide-react';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'MOTHER Quantum-AI - Sovereign Quantum-Enhanced RAG',
  description:
    'MOTHER is developing a production-grade, national-scale reasoning model with quantum-enhanced RAG retrieval - PennyLane quantum circuits and swap-test similarity over 1.67M chunks at T=0 determinism. Sovereign, air-gapped, live in production.',
};

export const dynamic = 'force-dynamic';

const STATS = [
  { k: 'PennyLane', v: 'Quantum circuits' },
  { k: '1.67M', v: 'Chunks · swap-test' },
  { k: 'T=0', v: 'Deterministic reasoning' },
  { k: 'Air-gapped', v: 'Sovereign' },
];

const PIPELINE = [
  { icon: Search, title: 'Query enters', body: 'A TRM classifies intent and routes the request.' },
  { icon: Atom, title: 'Quantum circuit', body: 'PennyLane prepares a superposition over the corpus.' },
  { icon: Zap, title: 'Swap-test RAG', body: '1.67M chunks retrieved by quantum similarity.' },
  { icon: Cpu, title: 'CORE reasons', body: 'MOTHER CORE reasons deterministically at T=0.' },
  { icon: ShieldCheck, title: 'Verified answer', body: 'Auditable, air-gapped, fully sovereign.' },
];

const APPROACH = [
  { title: 'PilotOS + MOTHER', body: 'Quantum RAG runs on PilotOS with MOTHER 7B and 70B - a production reasoning stack, not a research demo.' },
  { title: 'Sovereign', body: 'Trained, hosted and served in Britain on MSAI infrastructure. Weights and data stay on your estate.' },
  { title: 'Air-gapped', body: 'Runs fully air-gapped for regulated and defence workloads - no external calls in the loop.' },
  { title: 'Live in production', body: 'Serving now on port 8004 with PennyLane circuits, not a roadmap item.' },
];

const STATUS = [
  { name: 'MOTHER CORE 7B', detail: 'Step 262,000+', state: 'Production', live: true },
  { name: 'MOTHER LLM 7B', detail: 'Step 302,000+', state: 'Running', live: true },
  { name: 'Quantum RAG', detail: 'Port 8004 · PennyLane', state: 'Live', live: true },
  { name: 'MOTHER CORE 70B', detail: '4× H200 tensor-parallel', state: 'Planned', live: false },
];

export default function Page() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="absolute inset-0 -z-[5] opacity-70" style={{ backgroundImage: 'radial-gradient(60% 100% at 50% 0%, rgba(168,85,247,0.18), transparent 60%)' }} />
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="chip"><Atom className="w-3.5 h-3.5 text-violet" /> Quantum-AI · in development</span>
              <span className="chip">UK sovereign</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9]">
              A British class of LLM,<br /><span className="text-gradient">fused with quantum intelligence.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              MOTHER is developing a production-grade, national-scale reasoning model with quantum-enhanced RAG
              retrieval, using PennyLane quantum circuits and swap-test similarity to search, verify and reason
              over <span className="text-mist">1.67M chunks</span> at <span className="text-mist">T=0</span> determinism.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-glow text-base px-7 py-3.5">Get API access <ArrowRight className="w-5 h-5" /></Link>
              <Link href="/model-family" className="btn-ghost text-base px-7 py-3.5">The AI brain</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-hair bg-night-800/40">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 divide-x divide-hair">
          {STATS.map((s) => (
            <div key={s.v} className="px-4 py-8 text-center">
              <div className="font-display text-3xl text-gradient">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-12">
            <span className="chip mb-5">Quantum RAG pipeline</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Search. Verify. <span className="text-gradient">Reason.</span></h2>
            <p className="mt-4 text-muted text-lg">Every answer is retrieved by a quantum circuit and reasoned deterministically - then audited.</p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-5">
            {PIPELINE.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="card-night card-hover h-full p-5 relative">
                  <span className="absolute right-4 top-4 font-mono text-xs text-muted/50">{String(i + 1).padStart(2, '0')}</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white/5 text-violet"><p.icon className="w-5 h-5" /></span>
                  <h3 className="mt-3 text-sm font-semibold text-mist">{p.title}</h3>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="pb-8">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-8">
            <span className="chip mb-5">Our approach</span>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">Sovereign, air-gapped, <span className="text-gradient">live in production.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APPROACH.map((a) => (
              <Reveal key={a.title}>
                <div className="card-night card-hover h-full p-5">
                  <h3 className="text-base font-semibold text-mist">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTION STATUS */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-10">
            <span className="chip mb-5">Production status</span>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">Running <span className="text-gradient">right now.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUS.map((s) => (
              <Reveal key={s.name}>
                <div className="card-night p-5 h-full">
                  <div className="flex items-center gap-2">
                    {s.live ? <CheckCircle2 className="w-4 h-4 text-cyan" /> : <Circle className="w-4 h-4 text-muted/50" />}
                    <span className={`text-xs uppercase tracking-widest ${s.live ? 'text-cyan' : 'text-muted'}`}>{s.state}</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-mist">{s.name}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-800/60 px-6 py-16 md:py-20 text-center">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(60% 120% at 50% 0%, rgba(168,85,247,0.18), transparent 60%)' }} />
              <div className="relative">
                <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-3xl mx-auto">Reason at quantum speed.</h2>
                <p className="mt-4 text-muted text-lg max-w-xl mx-auto">Build on MOTHER CORE, LLM 7B and Quantum RAG via a sovereign REST API - free tier and enterprise plans.</p>
                <Link href="/contact" className="mt-8 inline-flex btn-glow text-base px-7 py-3.5">Get API access <ArrowRight className="w-5 h-5" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
