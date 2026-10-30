// Product overview: the six platform entry points as cards, each with who it
// serves, the problem it solves, an honest status label and one CTA.

import { ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import { PLATFORMS, PLATFORM_STATUS_LABEL } from '@/lib/platforms';

export default function PlatformGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PLATFORMS.map((p, i) => (
        <li key={p.id}>
          <Reveal delay={(i % 3) * 80} className="h-full">
            <a
              href={p.href}
              {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group card-night card-hover flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hair bg-night-900">
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${p.image}-1024.avif 1024w`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <img
                    src={`${p.image}-1024.webp`}
                    srcSet={`${p.image}-1024.webp 1024w, ${p.image}-1600.webp 1600w`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={p.alt}
                    width={1024}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-slow ease-out-expo group-hover:scale-[1.03]"
                  />
                </picture>
                <span className="absolute left-0 top-0 h-1 w-full" style={{ background: p.accent }} aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="status-pill" data-status={p.status}>{PLATFORM_STATUS_LABEL[p.status]}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {p.layers.length === 7 ? 'All 7 layers' : `Layer ${p.layers.map((n) => String(n).padStart(2, '0')).join(' · ')}`}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-wide text-mist">{p.name}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-muted">{p.kicker}</p>
                <dl className="mt-4 flex-1 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted/80">Who it serves</dt>
                    <dd className="text-mist/90">{p.audience}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted/80">What it solves</dt>
                    <dd className="text-muted">{p.problem}</dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-bright">
                  {p.action}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  {p.external && <span className="sr-only">(opens in a new tab)</span>}
                </span>
              </div>
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
