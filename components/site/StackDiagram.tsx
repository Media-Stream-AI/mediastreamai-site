'use client';

// The full-stack sovereign AI diagram: seven owned layers from the freehold
// land and power at the foundation up to physical AI and defence at the top.
//
// This is the page's central argument, so it is built to be *read* rather than
// admired - every layer states what MSAI owns at that level and carries the
// figures that prove it. The layers stack bottom-up (foundation last in the
// DOM would reverse the reading order, so the array runs top-down and the
// spine is drawn top-down to match).
//
// Each row links to the page that goes deeper on that layer; a layer with no
// page of its own simply renders as a non-interactive card.

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Bot, AppWindow, Brain, Cpu, Server, Zap, ArrowUpRight, type LucideIcon,
} from 'lucide-react';

type Layer = {
  icon: LucideIcon;
  tier: string;
  name: string;
  blurb: string;
  chips: string[];
  accent: string; // tailwind text colour class
  bar: string;    // gradient for the left accent bar
  href?: string;
};

// Top (what we deploy) → bottom (what we own the ground of).
const LAYERS: Layer[] = [
  {
    icon: Shield, tier: 'Layer 07', name: 'Dual-Use Defence',
    blurb: 'MOTHER Defence on our own air-gapped secure compute - multi-INT fusion, cyber defence and decision support. Observe-and-advise, human-in-the-loop, Strike = 0.',
    chips: ['Air-gapped', 'MOTHER OverWatch', 'MOTHER CC', 'Strike 0'],
    accent: 'text-ember', bar: 'linear-gradient(180deg,#F59E0B,#EC4899)', href: '/defence',
  },
  {
    icon: Bot, tier: 'Layer 06', name: 'Physical AI',
    blurb: 'MOTHER EXO puts the world model in a body. A UK humanoid factory in Manchester comes online Q1 2027, targeting 1,000 robots a year.',
    chips: ['MOTHER EXO', '60-DOF humanoid', 'Manchester Q1 2027', '1,000 units/yr'],
    accent: 'text-magenta', bar: 'linear-gradient(180deg,#EC4899,#A855F7)', href: '/exo',
  },
  {
    icon: AppWindow, tier: 'Layer 05', name: 'Applications',
    blurb: 'Products people actually use, all powered by MOTHER: AUTM.ai operational intelligence, IntuiStudio for creators, and IntuiTV for audiences.',
    chips: ['AUTM.ai', 'IntuiStudio', 'IntuiTV', 'Playout'],
    accent: 'text-violet', bar: 'linear-gradient(180deg,#A855F7,#6366F1)', href: '/intuitv',
  },
  {
    icon: Brain, tier: 'Layer 04', name: 'MOTHER Foundation Models',
    blurb: 'Seven sovereign models totalling 240B parameters - reasoning, cyber, language, vision, video, world model and media - trained from scratch on owned data.',
    chips: ['7 models', '240B parameters', 'Open-weight', 'EU AI Act Art. 53'],
    accent: 'text-iris', bar: 'linear-gradient(180deg,#6366F1,#22D3EE)', href: '/model-family',
  },
  {
    icon: Cpu, tier: 'Layer 03', name: 'Sovereign Compute',
    blurb: 'A GPU fleet we own and operate - NVIDIA H200 and B300 Blackwell, AMD Instinct MI355X, GB10 nodes - behind our own control plane. No hyperscaler in the path.',
    chips: ['2,048× H200', '1,600× B300', '2,000× MI355X', 'GB10 Blackwell'],
    accent: 'text-cyan', bar: 'linear-gradient(180deg,#22D3EE,#0EA5C4)', href: '/colocation',
  },
  {
    icon: Server, tier: 'Layer 02', name: 'Data Centres',
    blurb: 'Direct-liquid-cooled halls on a 38 MW site, digital-twinned end to end and run by MOTHER as the facility mainframe. 25 MW of colocation is available now.',
    chips: ['38 MW site', '25 MW colo now', 'DLC · PUE 1.10', 'Digital twin'],
    accent: 'text-cyan', bar: 'linear-gradient(180deg,#0EA5C4,#F59E0B)', href: '/colocation',
  },
  {
    icon: Zap, tier: 'Layer 01', name: 'Land, Power & Heat',
    blurb: 'UK freehold with island-mode gas-CHP power and the Horizon free-cooling and heat-reuse cascade - sewer-source cooling first, CHP heat reuse second, chillers only as trim.',
    chips: ['Freehold UK', 'Island gas-CHP', 'Horizon free cooling', 'Heat reuse'],
    accent: 'text-ember', bar: 'linear-gradient(180deg,#F59E0B,#EA580C)', href: '/technology',
  },
];

function Row({ layer, index }: { layer: Layer; index: number }) {
  const inner = (
    <>
      <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: layer.bar }} />
      <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hair bg-white/5 ${layer.accent}`}>
        <layer.icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted/70">{layer.tier}</span>
          <h3 className="text-base font-semibold text-mist md:text-lg">{layer.name}</h3>
          {layer.href && (
            <ArrowUpRight className={`h-4 w-4 ${layer.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
          )}
          <span className="hidden h-px flex-1 bg-hair md:block" />
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{layer.blurb}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:max-w-[40%] sm:justify-end">
        {layer.chips.map((c) => (
          <span key={c} className="chip !py-1 !text-[10px]">{c}</span>
        ))}
      </div>
    </>
  );

  const shell =
    'group relative card-night card-hover flex flex-col gap-4 overflow-hidden p-4 pl-6 sm:flex-row sm:items-center md:p-5 md:pl-7';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {layer.href ? (
        <Link href={layer.href} className={shell}>{inner}</Link>
      ) : (
        <div className={shell}>{inner}</div>
      )}
    </motion.div>
  );
}

export default function StackDiagram() {
  return (
    <div className="relative">
      {/* gradient spine tying the seven layers together */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[26px] top-6 bottom-6 w-px bg-gradient-to-b from-ember via-iris to-ember opacity-60 md:left-[34px]"
      />
      <div className="space-y-3">
        {LAYERS.map((l, i) => <Row key={l.name} layer={l} index={i} />)}
      </div>
      <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
        Seven layers · one owner · no foreign dependency
      </p>
    </div>
  );
}
