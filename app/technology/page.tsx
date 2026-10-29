"use client";

// The Technology page is about the *facility*: how the site is cooled, how it
// is powered, where the heat goes, and how MOTHER AI runs the whole thing as
// the building's mainframe. The models have their own page (/model-family) and
// the commercial offer has its own page (/colocation) - this one explains the
// engineering underneath both, and closes on the humanoid the stack is built
// to produce.

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Snowflake, Flame, Zap, Gauge, Droplets, Recycle,
  Cpu, Brain, Eye, Activity, ShieldCheck, Server, Bot, Factory, Layers,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import CoolingDiagram from "@/components/site/CoolingDiagram";
import { VideoFrame } from "@/components/site/VideoFX";

/** The three orthographic views under the humanoid header.
 *
 *  Two files, three figures: the side view is drawn again mirrored,
 *  which is what a drawing sheet does anyway and saves a request. The
 *  periods are deliberately co-prime-ish — 11, 13 and 9 seconds — so
 *  the group never settles into a single visible beat.
 */
const WIREFRAMES = [
  { key: "side-left", src: "/wireframe/exo_side.png", opacity: 0.5, delay: 0.35, period: 11, className: "hidden h-64 w-auto sm:block lg:h-80" },
  { key: "front", src: "/wireframe/exo_front.png", opacity: 0.62, delay: 0.2, period: 13, className: "h-72 w-auto lg:h-96" },
  { key: "side-right", src: "/wireframe/exo_side.png", opacity: 0.5, delay: 0.5, period: 9, className: "hidden h-64 w-auto -scale-x-100 sm:block lg:h-80" },
];

const HERO_STATS = [
  { k: "PUE 1.10", v: "Free-cooled" },
  { k: "100%", v: "Free cooling at design point" },
  { k: "12 °C", v: "Loop ΔT" },
  { k: "58 kW", v: "Per rack" },
];

/* ---------------- cooling ---------------- */

const COOLING = [
  {
    icon: Snowflake,
    title: "Sewer-source free cooling",
    body:
      "An 11 °C sewer-source secondary loop is the first and, at the design point, the only stage of cooling. Heat crosses a titanium WRAS Cat-5 plate heat exchanger into the well; the flow passes through and leaves at 20.8 °C. No water is abstracted and none is consumed.",
  },
  {
    icon: Droplets,
    title: "Direct liquid cooling in the hall",
    body:
      "A closed 25% glycol primary loop runs cold plates at 30 °C supply and 42 °C return - a 12 °C ΔT at 175 L/s primary against 200 L/s secondary. 8.2 MW of the hall's load is taken by liquid, leaving under a megawatt to air.",
  },
  {
    icon: Gauge,
    title: "High return temperature, on purpose",
    body:
      "Running a 42 °C return is what makes free cooling work all year and makes the waste heat worth something. Cold-plate setpoint, flow and PHE effectiveness are tuned together in the digital twin before anything is changed on the plant.",
  },
];

/* ---------------- power ---------------- */

const POWER = [
  {
    icon: Flame,
    title: "Island-mode gas-CHP",
    body:
      "Generation on site in island mode, 3+1 N+1, with grid as an alternate rather than a dependency - and a fuel cascade behind it: gas, grid, diesel, then tidal and solar as they come on.",
  },
  {
    icon: Zap,
    title: "Protected power",
    body:
      "Five 1,200 kW UPS systems in N+1 parallel give 6 MW installed, backed by 35 lithium battery cabinets at five minutes' autonomy, a maintenance bypass system and a client handoff panel.",
  },
  {
    icon: Server,
    title: "Buffered and resilient",
    body:
      "A 4 MWh battery energy storage buffer rides through transfers and smooths the step loads that large training jobs put on the plant, so a checkpoint never depends on the grid behaving.",
  },
];

/* ---------------- heat reuse ---------------- */

const CASCADE = [
  {
    step: "01",
    title: "Free cooling · sewer source",
    body: "Holds the 30 °C supply on its own at the design point. Zero mechanical cooling called.",
    load: "8.19 MW",
    tone: "text-cyan",
  },
  {
    step: "02",
    title: "Heat reuse · gas-plant absorption",
    body: "Return heat drives an absorption circuit into the gas plant and building HVAC. 6.1 MW available.",
    load: "0.00 MW",
    tone: "text-ember",
  },
  {
    step: "03",
    title: "Chiller trim",
    body: "Mechanical cooling exists only as a trim stage behind the other two - standby, not baseline.",
    load: "0.00 MW",
    tone: "text-muted",
  },
];

/* ---------------- MOTHER as the mainframe ---------------- */

const MAINFRAME = [
  { icon: Eye, title: "MOTHER Vision", body: "The facility's eyes: DeepVision watches every hall, plant room and perimeter camera on-premises, flagging anomalies in the process, not just in the picture." },
  { icon: Activity, title: "Live digital twin", body: "DC1-B and DC3 are twinned end to end. Every setpoint - flow, cold plate, PHE effectiveness, fouling, heat reuse - is modelled before it is moved on the real plant." },
  { icon: Brain, title: "MOTHER CORE reasoning", body: "The same deterministic core that answers a defence query reasons about the building: load, weather, gas price, maintenance windows and what to do about them." },
  { icon: Cpu, title: "Control plane", body: "Identity, GPU inventory, deployments, node access and token budgets run through one audited control plane. No hyperscaler sits anywhere in the path." },
  { icon: ShieldCheck, title: "Human-in-the-loop", body: "MOTHER proposes; engineers promote. Nothing auto-applies to live plant or to live models - every change is gated, logged and reversible." },
  { icon: Recycle, title: "Continuous optimisation", body: "The twin runs ahead of the plant, searching the operating envelope for the lowest-energy point that still holds supply temperature, and files the difference as a proposal." },
];

/* ---------------- humanoid ---------------- */

const HUMANOID = [
  { icon: Bot, title: "60 degrees of freedom", body: "A 60-DOF humanoid build running a 1 kHz L0 motor loop, with the layered cognitive stack above it from motor control to the L4 Guardian action filter." },
  { icon: Layers, title: "Graphene-infused build", body: "An upgraded platform on the ASIMOV V.1 open-source robotics backbone, redesigned with over 5,000 modifications and graphene-infused materials throughout." },
  { icon: Activity, title: "Behaviour-cloned from real teleop", body: "The motor policy is cloned from 150,000 real teleoperation steps - recorded, not simulated - then hardened in closed-loop physics simulation before it touches hardware." },
  { icon: Factory, title: "Manchester assembly", body: "The UK humanoid lab and assembly line in Manchester comes online Q1 2027, targeting 1,000 units a year on a sovereign supply chain at a PUE of 1.18." },
];

export default function TechnologyPage() {
  return (
    <main className="min-h-screen pt-20 text-mist">
      {/* ================= HERO ================= */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora-bg bg-exo-aurora" />
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="chip !border-ember/30 !text-ember"
              style={{ background: "rgba(245,158,11,0.08)" }}
            >
              MSAI Engineering · the facility
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-4xl leading-[0.92] sm:text-5xl md:text-6xl"
            >
              The building is <span className="text-gradient-ember">the computer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg leading-relaxed text-muted"
            >
              An AI data centre is a thermal machine with racks in it. Ours is cooled from a sewer-source
              free-cooling loop, powered in island mode from its own gas plant, gives its waste heat back to the
              site - and is run, watched and continuously optimised by MOTHER AI itself. This page is the
              engineering underneath everything else on this site.
            </motion.p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/colocation" className="btn-ember px-7 py-3.5 text-base">
                Capacity &amp; pricing <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/model-family" className="btn-ghost px-7 py-3.5 text-base">
                The MOTHER models
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair md:grid-cols-4"
          >
            {HERO_STATS.map((s) => (
              <div key={s.v} className="bg-night-800/70 px-4 py-6">
                <div className="font-display text-2xl text-gradient-ember md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= COOLING DIAGRAM ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">Cooling</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Horizon: cooling that <span className="text-gradient">costs almost nothing.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              The Horizon design takes heat out of the hall with a closed glycol loop, hands it across a titanium
              plate heat exchanger to an 11 °C sewer-source loop, and lets it go. At the design operating point
              free cooling alone holds the 30 °C supply - the chillers never start.
            </p>
          </Reveal>

          <Reveal>
            <CoolingDiagram />
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {COOLING.map((c) => (
              <Reveal key={c.title}>
                <div className="card-night card-hover h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-mist">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HEAT REUSE CASCADE ================= */}
      <section className="section-padding bg-night-800/50 pt-16">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">Heat reuse</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A three-tier cascade, <span className="text-gradient-ember">in that order.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Heat leaving the hall at 42 °C is a resource, not a problem. It is offered to free cooling first,
              to the gas-plant absorption circuit second, and only then - if it must be - to mechanical cooling.
              The order is the design.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {CASCADE.map((c) => (
              <Reveal key={c.step}>
                <div className="card-night h-full p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-muted/70">{c.step}</span>
                    <span className={`font-mono text-sm ${c.tone}`}>{c.load}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-mist">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Because tiers two and three sit at 0.00 MW at the design point, the site&rsquo;s PUE lands at
              <span className="text-mist"> 1.110</span> - and the 6.1 MW of absorption capacity stays in reserve
              for the coldest and the hottest days of the year, when the sewer loop alone is not enough.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= POWER ================= */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">Power</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Generated here. <span className="text-gradient-ember">Not borrowed.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              The site runs island-mode gas-CHP with the grid as an alternate, not a dependency - which is what
              makes a 38 MW site possible on a connection queue that would not otherwise allow it, and what makes
              70 MW from 2027 a build programme rather than a wait.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-5 sm:grid-cols-3">
              {POWER.map((p) => (
                <Reveal key={p.title}>
                  <div className="card-night card-hover h-full p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-ember">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-mist">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="card-night p-6 font-mono text-sm">
                <div className="mb-4 text-xs uppercase tracking-widest text-muted">Plant sheet</div>
                <dl className="space-y-2.5">
                  {([
                    ["site", "38 MW · 70 MW from 2027"],
                    ["generation", "island gas-CHP · 3+1 N+1"],
                    ["cascade", "gas → grid → diesel → tidal/solar"],
                    ["UPS", "5 × 1,200 kW · N+1 · 6 MW"],
                    ["autonomy", "35 Li cabinets · 5 min"],
                    ["BESS", "4 MWh buffer"],
                    ["thermal", "scaling to 100 MWth"],
                    ["cooling", "DLC + Horizon free cooling"],
                    ["PUE", "1.110 at design point"],
                    ["rack density", "up to 58 kW"],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-4 border-b border-hair pb-2.5">
                      <dt className="shrink-0 text-muted">{k}</dt>
                      <dd className="text-right text-ember">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= MOTHER AS MAINFRAME ================= */}
      <section className="section-padding bg-night-800/50 pt-16">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-3xl">
            <span className="chip mb-5">MOTHER AI · the facility mainframe</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              The same brain that runs the models <span className="text-gradient">runs the building.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              MOTHER is not a tenant in this data centre - it is the mainframe of it. DeepVision watches the
              halls, the digital twin models the plant, and MOTHER CORE reasons over load, weather, tariff and
              maintenance to propose the next setpoint. Engineers promote; nothing auto-applies.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <VideoFrame src="/video/dc3-twin.mp4" label="Horizon digital twin · MOTHER Vision on" className="glow-ring" />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {MAINFRAME.map((m) => (
                <Reveal key={m.title}>
                  <div className="card-night card-hover h-full p-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-hair bg-white/5 text-cyan">
                      <m.icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 font-semibold text-mist">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HUMANOID BUILD ================= */}
      <section className="section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 aurora-bg bg-exo-aurora opacity-60" />
        <div className="container-custom relative">
          <Reveal className="mx-auto mb-4 max-w-3xl text-center">
            <span className="chip mx-auto mb-5">MOTHER EXO · the build</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Our 60-DOF <span className="text-gradient">humanoid build.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Everything above this line exists so that this can exist: sovereign power, sovereign cooling and
              sovereign compute, training a world model that ends up inside a body built in Britain.
            </p>
          </Reveal>

          {/* MOTHER EXO, drawn from the assembly CAD. These are B-rep edges out
              of the humanoid's own STEP file — the same drawing the robotics
              platform serves — rather than an illustration of one. Decorative
              here, hence aria-hidden and empty alt. Each figure floats on its
              own slow cycle, offset from the others, so the group breathes
              rather than pulsing in lockstep. Framer Motion honours
              prefers-reduced-motion for us. */}
          <div
            aria-hidden="true"
            className="pointer-events-none mt-10 flex items-end justify-center
                       gap-10 sm:gap-20 lg:gap-32 xl:gap-44
                       [mask-image:linear-gradient(to_bottom,#000_62%,transparent_98%)]
                       [-webkit-mask-image:linear-gradient(to_bottom,#000_62%,transparent_98%)]"
          >
            {WIREFRAMES.map((figure) => (
              <motion.img
                key={figure.key}
                src={figure.src}
                alt=""
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: figure.opacity, y: [0, -14, 0] }}
                transition={{
                  opacity: { duration: 1, delay: figure.delay },
                  y: { duration: figure.period, delay: figure.delay, repeat: Infinity, ease: "easeInOut" },
                }}
                className={figure.className}
              />
            ))}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HUMANOID.map((h) => (
              <Reveal key={h.title}>
                <div className="card-night card-hover h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-magenta">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-mist">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/exo" className="btn-glow px-7 py-3.5 text-base">
                Inside MOTHER EXO <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://robotics.mediastreamai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-7 py-3.5 text-base"
              >
                MSAI Robotics platform <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-800/60 px-6 py-16 text-center md:py-20">
              <div
                className="absolute inset-0 opacity-60"
                style={{ backgroundImage: "radial-gradient(60% 120% at 50% 0%, rgba(245,158,11,0.16), transparent 60%)" }}
              />
              <div className="relative">
                <h2 className="font-display mx-auto max-w-3xl text-4xl leading-[0.95] md:text-5xl">
                  Come and see the plant.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
                  Site visits, thermal design detail and the full due-diligence pack are available to
                  prospective clients and partners.
                </p>
                <Link href="/contact" className="btn-ember mt-8 inline-flex px-7 py-3.5 text-base">
                  Arrange a site visit <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </Reveal>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted/70">
            Figures are the Horizon digital-twin design operating point for DC1-B and the DC3 protected-power
            scope of supply. Forward-looking: site capacity, plant scaling and the Manchester factory date are
            indicative plans, not commitments, and may change. NVIDIA, HGX, Blackwell, GB10, AMD and Instinct
            are trademarks of their respective owners.
          </p>
        </div>
      </section>
    </main>
  );
}
