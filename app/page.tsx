"use client";

// The MSAI home page. Its one job is to make a visitor understand, without
// scrolling twice, that Media Stream AI is a European FULL-STACK sovereign AI
// company: we own the land and power, the data centres and their cooling, the
// compute, the models, the applications built on them, and the robots they
// end up inside. The page is therefore ordered as the stack itself - compute
// at the bottom, physical AI at the top - rather than as a product tour.

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Boxes, Shield, Sparkles, Factory,
  Server, Lock, Globe, Brain, Radio, Snowflake, Zap, Bot, AppWindow, Eye,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import StackDiagram from "@/components/site/StackDiagram";
import { VideoBackdrop, VideoFrame } from "@/components/site/VideoFX";
import { MOTHER_MODELS, FAMILY_PARAMETERS, FAMILY_COUNT, MOTHER_AI_SITE } from "@/lib/mother-models";

/* ------------------------------------------------------------------ */
/* Headline figures                                                    */
/* ------------------------------------------------------------------ */

const STATS = [
  { k: FAMILY_PARAMETERS, v: "MOTHER AI parameters" },
  { k: "34 MW IT", v: "Total current compute" },
  { k: "25 MW IT", v: "Upgrade Q4 2027" },
  { k: "25 MW", v: "Colo available now" },
];

const MARQUEE = [
  "Sovereign compute", "MOTHER CORE", "MOTHER LLM", "MOTHER T2V", "MOTHER DeepVision",
  "MOTHER EXO", "IntuiTV Studio", "AUTM.ai", "IntuiStudio", "IntuiTV", "Playout",
  "MOTHER Defence", "Horizon free cooling", "Manchester humanoid factory",
];

/* ------------------------------------------------------------------ */
/* Layer 03 / 02 / 01 - the compute we own                             */
/* ------------------------------------------------------------------ */

const COMPUTE_TILES = [
  { k: "38 MW", v: "Site capacity" },
  { k: "70 MW", v: "From 2027" },
  { k: "2,048", v: "× NVIDIA H200" },
  { k: "1,600", v: "× NVIDIA B300" },
  { k: "2,000", v: "× AMD MI355X" },
  { k: "PUE 1.10", v: "Free-cooled" },
];

const COMPUTE_POINTS = [
  { icon: Zap, label: "Island-mode gas-CHP power, N+1, on UK freehold" },
  { icon: Snowflake, label: "Horizon free cooling and CHP heat reuse - chillers as trim only" },
  { icon: Server, label: "Direct liquid cooling, up to 58 kW per rack" },
  { icon: Lock, label: "Air-gapped secure enclave for defence workloads" },
];

/* ------------------------------------------------------------------ */
/* Layer 05 - the application layer                                    */
/* ------------------------------------------------------------------ */

const APPLICATIONS = [
  {
    name: "AUTM.ai",
    kicker: "Operational intelligence · powered by MOTHER",
    body:
      "The independent operational intelligence layer that connects the systems, people and information across a whole business - shared organisational memory, synthesis and coordinated workflows, reasoning on MOTHER.",
    href: "https://autm.ai",
    icon: AppWindow,
    accent: "text-cyan",
  },
  {
    name: "IntuiStudio",
    kicker: "Creator studio · browser-native",
    body:
      "Premiere / After-Effects-grade editing in the browser with the MOTHER IntuiTV model inside: text-to-video, scene detect, AI captions, highlight cutting and a shot-list director. Renders on our own GB10 nodes.",
    href: "https://studio.intuitv.app",
    icon: Sparkles,
    accent: "text-violet",
  },
  {
    name: "IntuiTV",
    kicker: "AI television · viewers and playout",
    body:
      "The consumer platform where the audience creates the show and the star, plus a 24/7 Playout engine driving real channels with automated continuity, graphics and compliance.",
    href: "https://www.intuitv.app",
    icon: Radio,
    accent: "text-magenta",
  },
];

const SECTORS = [
  "Media & Broadcasting", "Film & TV Production", "Creative Industries",
  "Government & Defence", "Critical National Infrastructure", "Research & Education",
];

/* ================================================================== */

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
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
              European full-stack sovereign AI · built and owned in Britain
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-display mx-auto max-w-5xl leading-[0.9]"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7.5rem)" }}
          >
            <span className="text-mist">From power</span>{" "}
            <span className="text-gradient">to physical AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-muted md:text-xl"
          >
            Most AI companies rent a slice of someone else&rsquo;s stack. Media Stream AI owns all of it -
            the land, power and data centres, the sovereign compute, the seven MOTHER models trained on it,
            the applications built on those models, and the robots they end up inside.
            <span className="text-mist"> One stack. One owner. No foreign dependency.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="#stack" className="btn-glow group px-7 py-3.5 text-base">
              See the full stack
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/model-family" className="btn-ghost px-7 py-3.5 text-base">
              The MOTHER models
            </Link>
          </motion.div>

          {/* stat band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair md:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.v} className="bg-night-800/70 px-4 py-6">
                <div className="font-display text-2xl text-gradient md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative overflow-hidden border-y border-hair py-4">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {MARQUEE.map((m) => (
                <span key={m + dup} className="flex items-center gap-8 whitespace-nowrap text-sm uppercase tracking-[0.18em] text-muted">
                  {m} <span className="text-cyan/50">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= THE FULL STACK ================= */}
      <section id="stack" className="section-padding scroll-mt-24">
        <div className="container-custom">
          <Reveal className="mb-12 max-w-3xl">
            <span className="chip mb-5">Vertically integrated</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Sovereignty is ownership <span className="text-gradient">across every layer.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Seven layers, all ours. Buy power and you still rent the models. Buy models and you still rent
              the compute. MSAI is the only European AI company that owns the ground the racks stand on, the
              models that train on them, and the humanoid the model ends up driving.
            </p>
          </Reveal>
          <Reveal>
            <StackDiagram />
          </Reveal>
        </div>
      </section>

      {/* ================= COMPUTE ================= */}
      <section className="relative py-10 md:py-16">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ember/20 bg-gradient-to-br from-ember/[0.08] via-night-800/60 to-night-800/60 p-8 md:p-14">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip !border-ember/30 !text-ember" style={{ background: "rgba(245,158,11,0.08)" }}>
                      Layers 01–03 · we own the compute
                    </span>
                    <span className="chip !border-emerald-400/30 !text-emerald-300" style={{ background: "rgba(52,211,153,0.08)" }}>
                      ● 25 MW colo available now
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-5xl">
                    34 MW of sovereign<br />
                    <span className="text-gradient-ember">data centre.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-lg text-muted">
                    A 38 MW UK freehold site running <span className="text-mist">34 MW IT of current compute</span>,
                    scaling to 70 MW from 2027 with a further <span className="text-mist">25 MW IT upgrade in Q4 2027</span>.
                    Island-mode gas-CHP power, direct liquid cooling and the Horizon free-cooling and heat-reuse
                    cascade - and MOTHER AI running the facility itself.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {COMPUTE_POINTS.map((p) => (
                      <li key={p.label} className="flex items-center gap-3 text-mist">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hair bg-white/5 text-ember">
                          <p.icon className="h-4 w-4" />
                        </span>
                        <span className="text-[15px]">{p.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/colocation" className="btn-ember inline-flex text-base">
                      Colocation &amp; GPU capacity <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link href="/technology" className="btn-ghost inline-flex px-6 py-3 text-base">
                      Cooling, power &amp; heat reuse
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <VideoFrame src="/video/dc3-twin.mp4" label="Horizon digital twin · DC1-B" />
                  <div className="grid grid-cols-3 gap-3">
                    {COMPUTE_TILES.map((s) => (
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

      {/* ================= MODELS ================= */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">Layer 04 · the models</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              {FAMILY_COUNT} sovereign models. <span className="text-gradient">{FAMILY_PARAMETERS} parameters.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Trained from scratch on owned, licence-clean data and served on our own compute - not distilled
              from anyone else&rsquo;s weights. Open-source and commercially deployed, published under EU AI Act
              Article 53 with a training-content summary you can actually read.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOTHER_MODELS.map((m) => (
              <Reveal key={m.id}>
                <Link
                  href={`/model-family#${m.id}`}
                  className="group card-night card-hover flex h-full flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg leading-tight text-mist">{m.name}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-cyan opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">{m.kicker}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.short}</p>
                  <p className="mt-4 font-mono text-[11px] text-cyan">{m.headline}</p>
                </Link>
              </Reveal>
            ))}
            <Reveal>
              <div className="card-night flex h-full flex-col justify-between border-cyan/25 p-5">
                <div>
                  <h3 className="font-display text-lg leading-tight text-mist">One sovereign brain</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Every model shares one frozen reasoning core and one frozen eye. Train a head, gain a
                    sense - that is how seven models stay one family.
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  <Link href="/model-family" className="inline-flex items-center gap-1.5 text-sm text-cyan link-grow">
                    All model cards <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={MOTHER_AI_SITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-mist link-grow"
                  >
                    motherai.uk <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= APPLICATIONS ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">Layer 05 · the application layer</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              We don&rsquo;t just build AI. <span className="text-gradient">We ship it.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Models are only worth what runs on them. MOTHER powers real products in production - operational
              intelligence for businesses, a studio for creators, and a television platform for audiences.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {APPLICATIONS.map((a) => (
              <Reveal key={a.name}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-night card-hover flex h-full flex-col p-6"
                >
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 ${a.accent}`}>
                    <a.icon className="h-5 w-5" />
                  </span>
                  <h3 className={`mt-4 font-display text-2xl ${a.accent}`}>{a.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">{a.kicker}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{a.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-mist">
                    Open <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PHYSICAL AI ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-magenta/20 bg-gradient-to-br from-magenta/[0.07] via-night-800/60 to-night-800/60 p-8 md:p-14">
              <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip !border-magenta/30 !text-magenta" style={{ background: "rgba(236,72,153,0.08)" }}>
                      Layer 06 · Physical AI
                    </span>
                    <span className="chip">MOTHER EXO</span>
                  </div>
                  <h2 className="mt-5 font-display text-4xl leading-[0.95] md:text-5xl">
                    Where the stack<br /><span className="text-gradient">stands up and walks.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-lg text-muted">
                    MOTHER EXO is the world model that puts the brain in a body - one inference driving a
                    humanoid, two drones, a vehicle and a manipulator. Our UK humanoid factory in
                    <span className="text-mist"> Manchester comes online Q1 2027</span>, targeting
                    <span className="text-mist"> 1,000 robots a year</span> off a sovereign assembly line.
                  </p>
                  <ul className="mt-7 space-y-3">
                    {[
                      { icon: Bot, label: "60-DOF humanoid build · 1 kHz L0 motor control" },
                      { icon: Boxes, label: "One world model, five bodies, one inference" },
                      { icon: Factory, label: "Manchester assembly line · 1,000 units/yr from 2027" },
                      { icon: Shield, label: "L4 Guardian signed action filter · Strike = 0" },
                    ].map((p) => (
                      <li key={p.label} className="flex items-center gap-3 text-mist">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hair bg-white/5 text-magenta">
                          <p.icon className="h-4 w-4" />
                        </span>
                        <span className="text-[15px]">{p.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/exo" className="btn-glow inline-flex px-7 py-3.5 text-base">
                      Inside MOTHER EXO <ArrowRight className="h-5 w-5" />
                    </Link>
                    <a
                      href="https://robotics.mediastreamai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost inline-flex px-6 py-3 text-base"
                    >
                      MSAI Robotics <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <VideoFrame src="/video/mother-exo-v2.mp4" label="MOTHER EXO · world model in a body" className="glow-ring" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DEFENCE ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="grid items-center gap-10 rounded-3xl border border-hair bg-night-800/50 p-8 md:p-12 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <span className="chip !border-ember/30 !text-ember" style={{ background: "rgba(245,158,11,0.08)" }}>
                  Layer 07 · dual-use
                </span>
                <h2 className="mt-5 font-display text-3xl leading-[0.95] md:text-5xl">
                  Dual-use defence, on<br /><span className="text-gradient-ember">our own air-gapped compute.</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg text-muted">
                  MOTHER Defence is a UK-built, air-gapped cognitive defence platform: multi-source intelligence
                  fusion, sovereign cyber defence and one embodied world model commanding humanoid, aerial and
                  ground platforms under human authority. Zero foreign dependency. Zero CLOUD Act exposure.
                </p>
                <Link href="/defence" className="mt-8 btn-ember inline-flex px-7 py-3.5 text-base">
                  MOTHER Defence <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Lock, k: "Air-gapped", v: "Dundee facility" },
                  { icon: Brain, k: "T=0", v: "Deterministic core" },
                  { icon: Eye, k: "Observe", v: "and advise only" },
                  { icon: Shield, k: "Strike 0", v: "No target management" },
                ].map((t) => (
                  <div key={t.k} className="card-night p-5 text-center">
                    <t.icon className="mx-auto h-5 w-5 text-ember" />
                    <div className="mt-3 font-display text-xl text-mist">{t.k}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">{t.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SECTORS ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-2xl">
            <span className="chip mb-5">Sectors</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Built for <span className="text-gradient">regulated industries.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Sovereign AI for the sectors where data residency, auditability and trust are non-negotiable.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {SECTORS.map((s) => (
              <Reveal key={s}>
                <div className="card-night card-hover flex h-full items-center justify-center px-5 py-6 text-center">
                  <span className="font-medium text-mist">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-800/60 px-6 py-16 text-center md:py-24">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.18), transparent 60%)" }} />
              <div className="relative">
                <span className="chip mx-auto mb-6"><Globe className="h-3.5 w-3.5 text-cyan" /> Sovereign by design</span>
                <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[0.95] md:text-6xl">
                  Build on a stack that <span className="text-gradient">stays in Britain.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                  Take capacity on our compute, deploy the MOTHER models on your estate, or partner with us on
                  physical AI. Every layer is ours - so every layer is negotiable.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/contact" className="btn-glow px-7 py-3.5 text-base">Get in touch <ArrowRight className="h-5 w-5" /></Link>
                  <Link href="/colocation" className="btn-ghost px-7 py-3.5 text-base">Reserve compute</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
