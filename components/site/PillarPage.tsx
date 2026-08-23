'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import PillarVisual from '@/components/site/PillarVisual';
import GatedDownload from '@/components/site/GatedDownload';
import { VideoFrame } from '@/components/site/VideoFX';

type Variant = 'models' | 'intuitv' | 'exo' | 'defence';

export interface PillarFeature { icon: LucideIcon; title: string; body: string }
export interface PillarSection { title: string; body: string; points?: string[] }
export interface PillarData {
  accent: 'cyan' | 'ember';
  variant: Variant;
  eyebrow: string;
  title: string;
  gradientWord: string;
  badge?: string;
  intro: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  stats: { k: string; v: string }[];
  features: PillarFeature[];
  specs?: { k: string; v: string }[];
  sections?: PillarSection[];
  /** Real footage for the hero frame, in place of the synthetic PillarVisual motif. */
  heroMedia?: { src: string; label?: string };
  media?: { src: string; label?: string };
  ctaTitle: string;
  ctaBody: string;
  cta: { label: string; href: string };
  /** Optional lead-gated paper offered alongside the CTA. */
  paper?: { file: string; title: string; subtitle?: string };
}

export default function PillarPage({ data }: { data: PillarData }) {
  const ember = data.accent === 'ember';
  const grad = ember ? 'text-gradient-ember' : 'text-gradient';
  const accentText = ember ? 'text-ember' : 'text-cyan';
  const btn = ember ? 'btn-ember' : 'btn-glow';

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="chip">{data.eyebrow}</span>
              {data.badge && (
                <span className="chip !text-ember !border-ember/30" style={{ background: 'rgba(245,158,11,0.08)' }}>{data.badge}</span>
              )}
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9]">
              {data.title}<br /><span className={grad}>{data.gradientWord}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl">{data.intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href={data.primary.href} className={`${btn} text-base px-7 py-3.5`}>
                {data.primary.label} <ArrowRight className="w-5 h-5" />
              </Link>
              {data.secondary && (
                <Link href={data.secondary.href} className="btn-ghost text-base px-7 py-3.5">{data.secondary.label}</Link>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className={`absolute -inset-6 rounded-3xl blur-3xl opacity-40 ${ember ? 'bg-ember/20' : 'bg-iris/25'}`} />
            <PillarVisual variant={data.variant} media={data.heroMedia} className="relative" />
          </motion.div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y border-hair bg-night-800/40">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 divide-x divide-hair">
          {data.stats.map((s) => (
            <div key={s.v} className="px-4 py-8 text-center">
              <div className={`font-display text-3xl ${grad}`}>{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5">
            {data.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card-night card-hover h-full p-6">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 ${accentText}`}>
                    <f.icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-mist">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA BAND */}
      {data.media && (
        <section className="pb-4">
          <div className="container-custom">
            <Reveal>
              <VideoFrame src={data.media.src} label={data.media.label} className="glow-ring" />
            </Reveal>
          </div>
        </section>
      )}

      {/* SECTIONS + SPECS */}
      {(data.sections?.length || data.specs?.length) && (
        <section className="pb-8">
          <div className="container-custom grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {data.sections?.map((s) => (
                <Reveal key={s.title}>
                  <div className="glass-night p-7">
                    <h3 className="text-xl font-semibold text-mist">{s.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{s.body}</p>
                    {s.points && (
                      <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-sm text-mist">
                            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accentText}`} /> {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {data.specs && (
              <Reveal>
                <div className="card-night p-6 font-mono text-sm sticky top-24">
                  <div className="text-xs uppercase tracking-widest text-muted mb-4">Spec sheet</div>
                  <dl className="space-y-2.5">
                    {data.specs.map((s) => (
                      <div key={s.k} className="flex items-center justify-between gap-4 border-b border-hair pb-2.5">
                        <dt className="text-muted">{s.k}</dt>
                        <dd className={`text-right ${accentText}`}>{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-hair bg-night-800/60 px-6 py-16 md:py-20 text-center">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: ember ? 'radial-gradient(60% 120% at 50% 0%, rgba(245,158,11,0.16), transparent 60%)' : 'radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.18), transparent 60%)' }} />
              <div className="relative">
                <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-3xl mx-auto">{data.ctaTitle}</h2>
                <p className="mt-4 text-muted text-lg max-w-xl mx-auto">{data.ctaBody}</p>
                <Link href={data.cta.href} className={`mt-8 inline-flex ${btn} text-base px-7 py-3.5`}>
                  {data.cta.label} <ArrowUpRight className="w-5 h-5" />
                </Link>
                {data.paper && (
                  <div id="paper" className="mt-10 pt-8 border-t border-hair max-w-md mx-auto text-left scroll-mt-32">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3 text-center">
                      Read the detail
                    </p>
                    <GatedDownload
                      file={data.paper.file}
                      title={data.paper.title}
                      subtitle={data.paper.subtitle}
                    />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
