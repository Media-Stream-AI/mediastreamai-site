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

import { useEffect, useRef } from 'react';

type Variant = 'models' | 'intuitv' | 'exo' | 'defence';

export default function PillarVisual({
  variant,
  className = '',
  media,
}: {
  variant: Variant;
  className?: string;
  media?: { src: string; label?: string };
}) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hair bg-night-800/60 ${className}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      {media ? (
        <Footage src={media.src} label={media.label} />
      ) : (
        <>
          {variant === 'models' && <Models />}
          {variant === 'intuitv' && <IntuiTV />}
          {variant === 'exo' && <Exo />}
          {variant === 'defence' && <Defence />}
        </>
      )}
    </div>
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

function Ring({ cx, cy, r, val, color, dur }: { cx: number; cy: number; r: number; val: number; color: string; dur: number }) {
  const c = 2 * Math.PI * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
      <circle
        cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - val)}
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      >
        <animate attributeName="stroke-dashoffset" dur={`${dur}s`} repeatCount="indefinite"
          values={`${c};${c * (1 - val)};${c * (1 - val)}`} keyTimes="0;0.6;1" />
      </circle>
    </g>
  );
}

function Models() {
  const rings = [
    { cx: 90, cy: 90, r: 30, val: 1, color: '#22D3EE', dur: 3 },
    { cx: 200, cy: 78, r: 26, val: 1, color: '#6366F1', dur: 3.5 },
    { cx: 300, cy: 96, r: 24, val: 0.85, color: '#A855F7', dur: 4 },
    { cx: 120, cy: 190, r: 24, val: 1, color: '#22D3EE', dur: 3.2 },
    { cx: 232, cy: 196, r: 30, val: 0.94, color: '#EC4899', dur: 4.2 },
    { cx: 322, cy: 196, r: 20, val: 1, color: '#34D399', dur: 3.8 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
      {/* central gradient core */}
      <defs>
        <radialGradient id="core" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {rings.map((r, i) => <Ring key={i} {...r} />)}
      {rings.map((r, i) => (
        <text key={`t${i}`} x={r.cx} y={r.cy + 4} textAnchor="middle" fontSize="11" fill="#E7ECF3" fontFamily="monospace">
          {Math.round(r.val * 100)}%
        </text>
      ))}
      <circle cx="205" cy="150" r="0" fill="url(#core)" />
    </svg>
  );
}

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
