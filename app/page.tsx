"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Cpu, Play, Boxes, Shield, Sparkles,
  Server, Lock, Globe, Brain, Cog, Radio,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import PillarVisual from "@/components/site/PillarVisual";
import StackDiagram from "@/components/site/StackDiagram";
import { VideoBackdrop, VideoFrame } from "@/components/site/VideoFX";

const PILLARS = [
  {
    id: "models",
    variant: "models" as const,
    eyebrow: "MOTHER Model Family",
    title: "One sovereign",
    gradient: "brain.",
    href: "/model-family",
    cta: "Explore the models",
    accent: "cyan",
    blurb:
      "A 7B sovereign world-model family - MOTHER CORE (48L · 3072d), DeepVision, speech, memory and 26 trained heads - perceiving, reasoning and predicting in one model. Owned, hosted and trained in Britain.",
    points: [
      { icon: Brain, label: "CORE 7B reasoning backbone" },
      { icon: Sparkles, label: "Vision · speech · memory heads" },
      { icon: Lock, label: "Open-weight · EU AI Act Art. 53" },
    ],
  },
  {
    id: "intuitv",
    variant: "intuitv" as const,
    eyebrow: "IntuiTV · IntuiStudio",
    title: "AI television,",
    gradient: "end to end.",
    href: "/intuitv",
    cta: "Enter IntuiTV",
    accent: "iris",
    image: {
      src: "/intuitv-family-watching.webp",
      alt: "A family on the sofa watching an AI-generated jungle adventure episode on their television",
      label: "personalised channel · living room",
    },
    blurb:
      "The consumer platform where you create the show and the star - plus IntuiStudio: a browser-native Creator editor with Premiere/After-Effects-grade tooling, and a 24/7 Playout engine driving real channels.",
    points: [
      { icon: Play, label: "Personalised AI channels" },
      { icon: Sparkles, label: "IntuiStudio Creator editor" },
      { icon: Radio, label: "Playout · 24/7 scheduling" },
    ],
  },
  {
    id: "exo",
    variant: "exo" as const,
    eyebrow: "MOTHER EXO · 2027",
    title: "A frontier world model",
    gradient: "that acts.",
    href: "/exo",
    cta: "Inside MOTHER EXO",
    accent: "violet",
    badge: "2027 RELEASE",
    blurb:
      "A true world model on the CORE 7B backbone - latent vision + action dynamics - driving the MOTHER Robotics platform: design, simulate and build embodied systems from humanoids to autonomous flight.",
    points: [
      { icon: Boxes, label: "World model · latent dynamics" },
      { icon: Cog, label: "Robotics design & build" },
      { icon: Cpu, label: "Runs on sovereign GB10 / DGX" },
    ],
  },
  {
    id: "defence",
    variant: "defence" as const,
    eyebrow: "MOTHER Defence",
    title: "Sovereign, auditable,",
    gradient: "dual-use.",
    href: "/defence",
    cta: "MOTHER Defence",
    accent: "ember",
    blurb:
      "Safety-critical embodied AI with a signed, auditable action filter - a Guardian layer that vetoes unsafe actions, red-line enforcement, and on-prem deployment where weights and data never leave your control.",
    points: [
      { icon: Shield, label: "Guardian signed action filter" },
      { icon: Lock, label: "On-prem · air-gap capable" },
      { icon: Server, label: "Human-in-the-loop by design" },
    ],
  },
];

const STATS = [
  { k: "100%", v: "UK sovereign" },
  { k: "2", v: "UK sovereign sites" },
  { k: "70B", v: "MOTHER parameters" },
  { k: "10 MW", v: "Colo available now" },
];

const SECTORS = [
  "Media & Broadcasting", "Film & TV Production", "Creative Industries",
  "Advertising", "Government & Defence", "Research & Education",
];

const MORE = [
  { title: "MOTHER Compute", blurb: "GPU-as-a-Service on NVIDIA B300 and H200, with AMD Instinct. PUE ~1.15 free cooling.", href: "/colocation", accent: "text-ember" },
  { title: "Quantum-AI", blurb: "Quantum-enhanced RAG for fast, verifiable search and reasoning. Sovereign, air-gapped, live.", href: "/quantum", accent: "text-violet" },
  { title: "Build on MOTHER", blurb: "MOTHER CORE, LLM 7B, Quantum RAG and T2V via a sovereign REST API. Free tier and enterprise.", href: "/contact", accent: "text-cyan" },
];

const MARQUEE = [
  "MOTHER CORE 7B", "DeepVision", "IntuiTV", "IntuiStudio Creator", "Playout",
  "MOTHER EXO", "World Model", "Robotics", "MOTHER Defence", "Guardian",
  "GB10 Blackwell", "UK Sovereign", "On-prem by default",
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-32">
        <VideoBackdrop src="/video/datacentre-aerial.mp4" className="-z-[5]" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip mx-auto mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
              British Sovereign AI · full-stack UK company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-display leading-[0.9] mx-auto max-w-5xl"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
          >
            <span className="text-mist">The whole stack.</span>{" "}
            <span className="text-gradient">Sovereign by design.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto mt-7 max-w-2xl text-lg md:text-xl text-muted leading-relaxed"
          >
            MSAI is a full-stack UK and European sovereign AI company. Sovereignty is ownership across every layer -
            the land, power and data centres, the sovereign compute, the MOTHER models, and the products,
            robotics and defence built on top. Designed, owned and trained in Britain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/exo" className="btn-glow text-base px-7 py-3.5 group">
              See inside the platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/model-family" className="btn-ghost text-base px-7 py-3.5">
              The AI brain
            </Link>
          </motion.div>

          {/* stat band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-hair bg-hair"
          >
            {STATS.map((s) => (
              <div key={s.v} className="bg-night-800/70 px-4 py-6">
                <div className="font-display text-2xl md:text-3xl text-gradient">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative border-y border-hair py-4 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span key={m + dup} className="flex items-center gap-8 text-sm uppercase tracking-[0.18em] text-muted whitespace-nowrap">
                  {m} <span className="text-cyan/50">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= FULL STACK ================= */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-12">
            <span className="chip mb-5">Vertically integrated</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Sovereignty is ownership <span className="text-gradient">across every layer.</span>
            </h2>
            <p className="mt-4 text-muted text-lg">
              Most AI companies rent a slice of the stack. Sovereignty is ownership across every layer - from the
              UK freehold, power and cooling at the foundation, up through sovereign compute, the MOTHER
              models, and the products, robotics and defence built on top.
            </p>
          </Reveal>
          <Reveal>
            <StackDiagram />
          </Reveal>
        </div>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal className="max-w-2xl">
            <span className="chip mb-5">What we build on it</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Four platforms. <span className="text-gradient">One sovereign stack.</span>
            </h2>
            <p className="mt-4 text-muted text-lg">
              From personalised television to embodied robotics and defence-grade autonomy - all running
              on infrastructure and models we build and own in Britain.
            </p>
          </Reveal>

          <div className="mt-16 space-y-20 md:space-y-28">
            {PILLARS.map((p, i) => (
              <Reveal key={p.id}>
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="chip">{p.eyebrow}</span>
                      {p.badge && (
                        <span className="chip !text-ember !border-ember/30" style={{ background: "rgba(245,158,11,0.08)" }}>
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-3xl md:text-5xl leading-[0.95]">
                      {p.title}<br />
                      <span className={p.accent === "ember" ? "text-gradient-ember" : "text-gradient"}>{p.gradient}</span>
                    </h3>
                    <p className="mt-5 text-muted text-lg leading-relaxed max-w-xl">{p.blurb}</p>
                    <ul className="mt-6 space-y-3">
                      {p.points.map((pt) => (
                        <li key={pt.label} className="flex items-center gap-3 text-mist">
                          <span className={`flex h-9 w-9 items-center justify-center rounded-lg border border-hair ${p.accent === "ember" ? "text-ember" : "text-cyan"} bg-white/5`}>
                            <pt.icon className="w-4 h-4" />
                          </span>
                          <span className="text-[15px]">{pt.label}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={p.href} className={`mt-8 inline-flex items-center gap-2 font-medium ${p.accent === "ember" ? "text-ember" : "text-cyan"} link-grow`}>
                      {p.cta} <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="relative">
                    <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-40 ${p.accent === "ember" ? "bg-ember/20" : "bg-iris/20"}`} />
                    <PillarVisual variant={p.variant} image={p.image} className="relative card-hover" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MORE FROM MSAI ================= */}
      <section className="pb-4">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5">
            {MORE.map((m) => (
              <Reveal key={m.title}>
                <Link href={m.href} className="card-night card-hover h-full p-6 flex flex-col group">
                  <h3 className={`text-lg font-semibold ${m.accent}`}>{m.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{m.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-mist">
                    Explore <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTORS ================= */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-10">
            <span className="chip mb-5">Sectors</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Built for <span className="text-gradient">regulated industries.</span>
            </h2>
            <p className="mt-4 text-muted text-lg">
              Sovereign AI for the sectors where data residency, auditability and trust are non-negotiable.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SECTORS.map((s) => (
              <Reveal key={s}>
                <div className="card-night card-hover px-5 py-6 text-center h-full flex items-center justify-center">
                  <span className="text-mist font-medium">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INFRASTRUCTURE ================= */}
      <section className="relative py-20 md:py-28">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ember/20 bg-gradient-to-br from-ember/[0.08] via-night-800/60 to-night-800/60 p-8 md:p-14">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip !text-ember !border-ember/30" style={{ background: "rgba(245,158,11,0.08)" }}>
                      MSAI Infrastructure
                    </span>
                    <span className="chip !text-emerald-300 !border-emerald-400/30" style={{ background: "rgba(52,211,153,0.08)" }}>
                      ● Phase Two power · confirmed
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[0.95]">
                    Your hardware,<br /><span className="text-gradient-ember">our infrastructure.</span>
                  </h2>
                  <p className="mt-5 text-muted text-lg max-w-xl">
                    MSAI Scotland (Dundee): 10 MW of colocation available now, with{" "}
                    <span className="text-mist">Phase Two power confirmed</span> - island-mode gas-CHP scaling to
                    100 MWth. Confirmed GPU deployments: 2,048× NVIDIA H200 (Oct 2026) and 1,600× B300 (2026–27).
                  </p>
                  <Link href="/colocation" className="mt-8 btn-ember inline-flex text-base">
                    MSAI Scotland · colocation <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="space-y-4">
                  <VideoFrame src="/video/dc3-twin.mp4" label="DC3 · digital twin" />
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { k: "10 MW", v: "Colo now" }, { k: "2,048×", v: "H200 · 2026" },
                      { k: "1,600×", v: "B300 · 26–27" }, { k: "100 MWth", v: "Phase Two" },
                      { k: "PUE 1.15", v: "Free-cooled" }, { k: "GB10", v: "Blackwell" },
                    ].map((s) => (
                      <div key={s.v} className="card-night p-3 text-center">
                        <div className="font-display text-base text-ember">{s.k}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-widest text-muted">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-800/60 px-6 py-16 md:py-24 text-center">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.18), transparent 60%)" }} />
              <div className="relative">
                <span className="chip mx-auto mb-6"><Globe className="w-3.5 h-3.5 text-cyan" /> Sovereign by design</span>
                <h2 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl mx-auto">
                  Build on a brain that <span className="text-gradient">stays in Britain.</span>
                </h2>
                <p className="mt-5 text-muted text-lg max-w-xl mx-auto">
                  Partner with us, deploy on sovereign infrastructure, or apply to test and teach the MOTHER model family.
                </p>
                <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact" className="btn-glow text-base px-7 py-3.5">Get in touch <ArrowRight className="w-5 h-5" /></Link>
                  <Link href="/exo" className="btn-ghost text-base px-7 py-3.5">Enter the platform</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
