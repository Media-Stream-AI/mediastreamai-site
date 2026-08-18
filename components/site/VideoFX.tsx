'use client';

// Muted, looped, autoplaying MSAI footage - used as a subtle hero backdrop or
// as a framed inline clip. Autoplay is disabled under prefers-reduced-motion
// (the browser shows the first frame / poster instead).

import { useEffect, useRef } from 'react';

/** Poster for a clip, by convention: `/video/x.mp4` → `/video/x.poster.webp`.
 *  scripts/optimize-media.sh writes one alongside every clip in public/video,
 *  so the frame paints immediately instead of waiting on the video to decode. */
function posterFor(src: string) {
  return src.replace(/\.mp4$/, '.poster.webp');
}

function useAutoPlay() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { v.pause(); return; }
    v.play().catch(() => {});
  }, []);
  return ref;
}

/** Full-bleed backdrop video with a dark cinematic wash on top. */
export function VideoBackdrop({ src, className = '' }: { src: string; className?: string }) {
  const ref = useAutoPlay();
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover opacity-40"
        src={src}
        poster={posterFor(src)}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/40 to-night" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(70% 60% at 50% 30%, transparent, rgba(5,6,10,0.85))' }} />
    </div>
  );
}

/** Framed inline clip with a hairline border + soft glow. */
export function VideoFrame({ src, label, className = '' }: { src: string; label?: string; className?: string }) {
  const ref = useAutoPlay();
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-hair bg-night-800 ${className}`}>
      <video ref={ref} className="w-full aspect-video object-cover" src={src} poster={posterFor(src)}
             muted loop playsInline preload="metadata" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
      {label && (
        <span className="absolute left-3 top-3 chip !text-[9px] !py-0.5 bg-night/70 backdrop-blur">{label}</span>
      )}
    </div>
  );
}
