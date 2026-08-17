'use client';

// "We own every layer" - the vertically-integrated sovereign AI stack, from the
// land and power at the foundation up to applications, robotics and defence.
// Applications sit on top; the physical estate is the base. A gradient spine ties
// the layers together. Animated in with a staggered reveal.

import { motion } from 'framer-motion';
import { Shield, Play, Brain, Cpu, Server, Zap, type LucideIcon } from 'lucide-react';

type Layer = {
  icon: LucideIcon;
  name: string;
  blurb: string;
  chips: string[];
  accent: string; // tailwind text color class
  bar: string;    // gradient for the left accent bar
};

// Top (applications) → bottom (foundation).
const LAYERS: Layer[] = [
  {
    icon: Shield, name: 'Embodied & Defence', blurb: 'MOTHER EXO robotics and MOTHER Defence - Guardian-signed, auditable, dual-use.',
    chips: ['MOTHER EXO', '23-DOF humanoid', 'Guardian filter', '2027'],
    accent: 'text-magenta', bar: 'linear-gradient(180deg,#EC4899,#A855F7)',
  },
  {
    icon: Play, name: 'Products', blurb: 'IntuiTV and IntuiStudio - AI television, a browser Creator studio and 24/7 Playout.',
    chips: ['IntuiTV', 'Creator', 'Playout', '11 platforms'],
    accent: 'text-violet', bar: 'linear-gradient(180deg,#A855F7,#6366F1)',
  },
  {
    icon: Brain, name: 'MOTHER Models', blurb: 'The sovereign 7B world-model family - CORE, DeepVision, memory and 26 trained heads.',
    chips: ['CORE 7B', 'DeepVision', 'World model', 'EU AI Act'],
    accent: 'text-iris', bar: 'linear-gradient(180deg,#6366F1,#22D3EE)',
  },
  {
    icon: Cpu, name: 'Sovereign Compute', blurb: 'GB10 Blackwell / DGX nodes, on-prem by default - weights and data never leave the country.',
    chips: ['GB10 Blackwell', 'DGX', 'On-prem'],
    accent: 'text-cyan', bar: 'linear-gradient(180deg,#22D3EE,#0EA5C4)',
  },
  {
    icon: Server, name: 'Data Centres', blurb: 'Direct-liquid-cooled halls with MOTHER Vision - DC1-B and DC3, digital-twinned end to end. 2,048× H200 (2026) and 1,600× B300 (2026–27) confirmed.',
    chips: ['DC1-B · 9.1 MW', '2,048× H200', '1,600× B300', 'PUE 1.15'],
    accent: 'text-cyan', bar: 'linear-gradient(180deg,#0EA5C4,#F59E0B)',
  },
  {
    icon: Zap, name: 'Land & Power', blurb: 'UK freehold sites with gas-CHP island power and well-water free cooling - Phase Two power confirmed, scaling to 100 MWth. The foundation we own.',
    chips: ['10 MW colo now', 'Phase Two ✓', 'Gas-CHP island', '100 MWth'],
    accent: 'text-ember', bar: 'linear-gradient(180deg,#F59E0B,#EA580C)',
  },
];

export default function StackDiagram() {
  return (
    <div className="relative">
      {/* gradient spine */}
      <div className="pointer-events-none absolute left-[26px] top-6 bottom-6 w-px bg-gradient-to-b from-magenta via-iris to-ember opacity-60 md:left-[34px]" />
      <div className="space-y-3">
        {LAYERS.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative card-night card-hover flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 pl-6 md:pl-7 overflow-hidden"
          >
            <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: l.bar }} />
            <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hair bg-white/5 ${l.accent}`}>
              <l.icon className="w-5 h-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base md:text-lg font-semibold text-mist">{l.name}</h3>
                <span className="hidden md:block h-px flex-1 bg-hair" />
              </div>
              <p className="mt-1 text-sm text-muted leading-relaxed max-w-2xl">{l.blurb}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:justify-end sm:max-w-[42%]">
              {l.chips.map((c) => (
                <span key={c} className="chip !text-[10px] !py-1">{c}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
