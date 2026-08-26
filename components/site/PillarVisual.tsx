'use client';

// Lightweight animated "simulation" motifs for each company pillar - pure SVG +
// CSS so they stay crisp, cheap, and reduced-motion friendly. One component,
// four variants, echoing the product dashboards (telemetry rings, playout
// timeline, EXO world-model constellation, defence radar).
//
// A pillar can hand over real footage instead: pass `media` and the synthetic
// motif is swapped for the clip, keeping the same frame, wash and caption. The
// EXO pillar uses this to run the MOTHER Robotics footage in the world model /
// latent dynamics slot rather than the placeholder constellation.
//
// `image` does the same with a still - same frame, wash and caption, no
// playback cost. The IntuiTV pillar uses it to show the product in the room it
// is actually watched in. Set `scan` on a still to sweep a light bar down it,
// which reads as a live instrument rather than a screenshot.
//
// Give a still an `href` and the frame becomes a link out to the thing it is a
// picture of. That swaps the heavy bottom wash for an edge glow, so the page in
// the still stays legible instead of being dimmed into decoration. The models
// pillar uses this to put the real Hugging Face organisation on the homepage.

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Variant = 'models' | 'intuitv' | 'exo' | 'defence';

export default function PillarVisual({
  variant,
  className = '',
  media,
  image,
}: {
  variant: Variant;
  className?: string;
  media?: { src: string; label?: string };
  image?: { src: string; alt: string; label?: string; scan?: boolean; href?: string };
}) {
  const linked = Boolean(image?.href);
  const frame = (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-night-800/60 ${
        linked
          ? 'border-cyan/25 shadow-[0_0_38px_-14px_rgba(34,211,238,0.55)] transition-shadow duration-300 group-hover/frame:border-cyan/50 group-hover/frame:shadow-[0_0_60px_-10px_rgba(34,211,238,0.7)]'
          : 'border-hair'
      } ${className}`}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      {image ? (
        <Still src={image.src} alt={image.alt} label={image.label} scan={image.scan} linked={linked} />
      ) : media ? (
        <Footage src={media.src} label={media.label} />
      ) : (
        <>
          {variant === 'intuitv' && <IntuiTV />}
          {variant === 'exo' && <Exo />}
          {variant === 'defence' && <Defence />}
        </>
      )}
    </div>
  );

  if (!image?.href) return frame;
  return (
    <a
      href={image.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${image.label ?? image.alt} (opens in a new tab)`}
      className="group/frame block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night"
    >
      {frame}
    </a>
  );
}

/** Real footage filling the pillar frame, with the motif's caption kept. Muted,
 *  looped and inert - autoplay is skipped under prefers-reduced-motion, which
 *  leaves the first frame on screen. */
function Footage({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    v.play().catch(() => {});
  }, []);
  return (
    <div className="absolute inset-0">
      <video ref={ref} className="h-full w-full object-cover" src={src}
             poster={src.replace(/\.mp4$/, '.poster.webp')}
             muted loop playsInline preload="metadata" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      {label && (
        <span className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] tracking-wide text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}

/** A still filling the pillar frame, with the motif's wash, inner ring and
 *  caption kept so it sits in the same visual system as the SVG variants. */
function Still({ src, alt, label, scan, linked }: { src: string; alt: string; label?: string; scan?: boolean; linked?: boolean }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className={`object-cover ${
          linked
            ? // At phone width the frame is ~350px across, so the whole page would
              // shrink into unreadable texture. Zoom into the model listing there
              // and only pull back to the full page once there is room for it.
              'object-top origin-[85%_14%] scale-[1.4] sm:origin-center sm:scale-100 transition-transform duration-500 sm:group-hover/frame:scale-[1.02]'
            : ''
        }`}
      />
      {linked ? <EdgeGlow /> : <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />}
      {scan && <ScanBar />}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      {label && (linked ? <LinkPill label={label} /> : (
        <span className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] tracking-wide text-slate-400">
          {label}
        </span>
      ))}
    </div>
  );
}

/** Glow pressed into the edges of the frame rather than a wash over the middle,
 *  so a still of a page stays readable while still sitting in the dark
 *  cinematic system the rest of the site uses. */
function EdgeGlow() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        boxShadow:
          'inset 0 0 60px 14px rgba(5,6,10,0.92), inset 0 0 0 1px rgba(34,211,238,0.28), inset 0 0 45px rgba(34,211,238,0.14)',
      }}
    />
  );
}

/** The caption for a linked still: a Hugging Face-marked pill that reads as the
 *  destination, not decoration. */
function LinkPill({ label }: { label: string }) {
  return (
    <span className="absolute inset-x-0 bottom-3 flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-night/85 px-3 py-1.5 font-mono text-[10px] tracking-wide text-mist backdrop-blur-sm transition-colors group-hover/frame:border-cyan/60 group-hover/frame:text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/huggingface-logo.svg" alt="" aria-hidden="true" className="h-3.5 w-3.5" />
        {label}
        <ArrowUpRight className="h-3 w-3 text-cyan" />
      </span>
    </span>
  );
}

/** A cyan light bar sweeping down the frame, with a faint scanline grille - the
 *  same telemetry language as the SVG motifs. Held still under
 *  prefers-reduced-motion (see `motion-reduce:animate-none`). */
function ScanBar() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-x-0 h-1/3 opacity-70 motion-reduce:animate-none animate-pillar-scan"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.05) 45%, rgba(94,234,255,0.35) 50%, rgba(34,211,238,0.05) 55%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)',
        }}
      />
    </div>
  );
}

// The models pillar no longer draws synthetic telemetry rings - the percentages
// were invented and said nothing about the models. It now links out to the real
// Hugging Face organisation instead (see `image.href` above).

function IntuiTV() {
  const bars = Array.from({ length: 34 });
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* program monitor */}
      <div className="relative flex-1 m-4 mb-2 rounded-xl border border-hair bg-black/40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-hair">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-cyan"><path d="M8 5v14l11-7z" /></svg>
        </span>
        <span className="absolute left-3 top-3 chip !text-[9px] !py-0.5">PROGRAM · 1080p</span>
      </div>
      {/* timeline */}
      <div className="mx-4 mb-4 rounded-lg border border-hair bg-black/30 p-2">
        <div className="flex items-end gap-[3px] h-10">
          {bars.map((_, i) => (
            <span key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-iris/40 to-cyan/80"
              style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 70}%`, animation: `pulse 2.4s ease-in-out ${i * 0.05}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Exo() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
      {/* constellation */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x = 40 + (i % 4) * 100 + ((i * 37) % 30);
        const y = 40 + Math.floor(i / 4) * 60 + ((i * 53) % 24);
        return <circle key={i} cx={x} cy={y} r="2.4" fill="#6366F1" opacity="0.7" />;
      })}
      {/* humanoid silhouette (simplified) */}
      <g stroke="#22D3EE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
         style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }}>
        <circle cx="200" cy="70" r="18" />
        <path d="M200 88 L200 165 M200 105 L160 140 M200 105 L240 140 M200 165 L175 235 M200 165 L225 235" />
      </g>
      {/* scan line */}
      <rect x="40" y="0" width="320" height="2" fill="#EC4899" opacity="0.7">
        <animate attributeName="y" values="20;270;20" dur="4s" repeatCount="indefinite" />
      </rect>
      <text x="200" y="285" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="monospace">
        world model · latent dynamics
      </text>
    </svg>
  );
}

function Defence() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="sweep" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[70, 110, 150].map((r) => (
        <circle key={r} cx="200" cy="150" r={r} fill="none" stroke="rgba(245,158,11,0.18)" strokeWidth="1.5" />
      ))}
      <line x1="200" y1="150" x2="200" y2="10" stroke="rgba(245,158,11,0.5)" strokeWidth="2">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="6s" repeatCount="indefinite" />
      </line>
      <path d="M200 150 L200 10 A140 140 0 0 1 300 60 Z" fill="url(#sweep)">
        <animateTransform attributeName="transform" type="rotate" from="0 200 150" to="360 200 150" dur="6s" repeatCount="indefinite" />
      </path>
      {/* shield */}
      <path d="M200 108 l34 12 v26 c0 26 -16 40 -34 48 c-18 -8 -34 -22 -34 -48 v-26 z"
        fill="rgba(245,158,11,0.12)" stroke="#F59E0B" strokeWidth="2.5"
        style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' }} />
      <path d="M188 150 l9 9 l16 -18" fill="none" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
