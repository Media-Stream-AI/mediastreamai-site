'use client';

// Home-page hero: a sticky, viewport-filling scroll sequence in which six
// branded platform cubes float, assemble into one block and then lay out as a
// readable grid. Every cube links to its platform.
//
// Rendering strategy
//  - The copy, the platform links and the fallback grid are plain HTML, so the
//    hero is crawlable, keyboard-operable and paints before any WebGL.
//  - three.js is loaded with import() only once the hero is visible and the
//    browser is idle, and the scene pauses whenever the hero is off-screen.
//  - prefers-reduced-motion: no scroll choreography; a static, still
//    clickable composition in a single viewport.
//  - No WebGL (or a lost context): a CSS fallback grid with the same links.

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PLATFORMS, PLATFORM_STATUS_LABEL, type Platform } from '@/lib/platforms';
import type { CubeSceneHandle } from './cube-scene';
import './cube-hero.css';

type Mode = 'loading' | 'webgl' | 'fallback';
type ChapterState = 'before' | 'active' | 'after';

const CHAPTERS = [
  { eyebrow: '01 · The sovereign stack', until: 0.3 },
  { eyebrow: '02 · One stack', until: 0.62 },
  { eyebrow: '03 · Six platforms', until: 1.01 },
] as const;

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function navigate(p: Platform) {
  if (p.external) window.open(p.href, '_blank', 'noopener,noreferrer');
  else window.location.assign(p.href);
}

/** Text line revealed through a clip mask; direction follows scroll direction. */
function Line({ children, i, state }: { children: React.ReactNode; i: number; state: ChapterState }) {
  return (
    <span className="cube-line">
      <span data-state={state} style={{ transitionDelay: state === 'active' ? `${120 + i * 70}ms` : `${i * 30}ms` }}>
        {children}
      </span>
    </span>
  );
}

export default function CubeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const sceneRef = useRef<CubeSceneHandle | null>(null);

  const [mode, setMode] = useState<Mode>('loading');
  const [reduced, setReduced] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [hover, setHover] = useState<{ index: number; pinned: boolean } | null>(null);

  /* ---- reduced-motion preference ---- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /* ---- scroll progress (drives copy, progress bar and the scene) ---- */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = reduced ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      progressRef.current = p;
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      const next = CHAPTERS.findIndex((c) => p < c.until);
      setChapter(next === -1 ? CHAPTERS.length - 1 : next);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const onHover = useCallback((index: number | null, pinned: boolean) => {
    setHover(index === null ? null : { index, pinned });
  }, []);
  const onActivate = useCallback((index: number) => navigate(PLATFORMS[index]), []);

  /* ---- lazy WebGL scene ---- */
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const tooltip = tooltipRef.current;
    if (!section || !stage || !tooltip) return;
    if (!hasWebGL()) {
      setMode('fallback');
      return;
    }

    let cancelled = false;
    let visible = false;
    let docVisible = document.visibilityState === 'visible';
    const sync = () => sceneRef.current?.setActive(visible && docVisible);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
      if (visible && !sceneRef.current && !started) start();
    }, { rootMargin: '200px 0px' });

    let started = false;
    const start = () => {
      started = true;
      const idle = (cb: () => void) => {
        if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(cb, { timeout: 1200 });
        else setTimeout(cb, 200);
      };
      idle(async () => {
        try {
          const { createCubeScene } = await import('./cube-scene');
          if (cancelled) return;
          sceneRef.current = createCubeScene({
            container: stage,
            platforms: PLATFORMS,
            getProgress: () => progressRef.current,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            tooltip,
            onHover,
            onActivate,
            onContextLost: () => {
              sceneRef.current?.dispose();
              sceneRef.current = null;
              setHover(null);
              setMode('fallback');
            },
          });
          setMode('webgl');
          sync();
        } catch (err) {
          console.warn('[CubeHero] WebGL scene unavailable, using fallback', err);
          if (!cancelled) setMode('fallback');
        }
      });
    };

    const onVis = () => { docVisible = document.visibilityState === 'visible'; sync(); };
    document.addEventListener('visibilitychange', onVis);
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
    // Re-create when the reduced-motion preference flips.
  }, [reduced, onHover, onActivate]);

  /* ---- dismiss a pinned (touch) selection on outside tap / Esc ---- */
  useEffect(() => {
    if (!hover?.pinned) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') sceneRef.current?.clearSelection(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hover?.pinned]);

  const stateOf = (i: number): ChapterState => (i === chapter ? 'active' : i < chapter ? 'after' : 'before');
  const hovered = hover ? PLATFORMS[hover.index] : null;
  // Reduced motion shows the static composition, so only chapter 1 copy applies.
  const s = (i: number): ChapterState => (reduced ? (i === 0 ? 'active' : 'before') : stateOf(i));

  return (
    <section
      ref={sectionRef}
      className={`cube-hero ${reduced ? 'cube-hero--static' : ''}`}
      aria-labelledby="hero-title"
      data-mode={mode}
      data-chapter={chapter}
    >
      <div className="cube-hero__sticky">
        <div className="cube-hero__glow" aria-hidden />
        <div className="cube-hero__grid" aria-hidden />

        {/* WebGL stage (decorative for AT - the HTML links below carry the same destinations) */}
        <div ref={stageRef} className="cube-hero__stage" aria-hidden />

        {/* Fallback composition when WebGL is unavailable */}
        {mode === 'fallback' && (
          <div className="cube-hero__fallback">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PLATFORMS.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.href}
                    {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="cube-tile group"
                    style={{ '--accent': p.accent } as React.CSSProperties}
                  >
                    <picture>
                      <source srcSet={`${p.image}-1024.avif`} type="image/avif" />
                      <img src={`${p.image}-1024.webp`} alt={p.alt} width={1024} height={656} loading="lazy" decoding="async" />
                    </picture>
                    <span className="cube-tile__name">{p.name}</span>
                    <span className="cube-tile__action">{p.action} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hover / tap tooltip, positioned by the scene */}
        <div
          ref={tooltipRef}
          className="cube-tooltip"
          data-visible={hovered ? 'true' : 'false'}
          data-pinned={hover?.pinned ? 'true' : 'false'}
          role={hover?.pinned ? 'dialog' : undefined}
          aria-hidden={!hovered}
        >
          {hovered && (
            <>
              <span className="cube-tooltip__name">{hovered.name}</span>
              <span className="cube-tooltip__meta">{hovered.kicker}</span>
              {hover?.pinned ? (
                <a
                  href={hovered.href}
                  {...(hovered.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="cube-tooltip__cta"
                >
                  {hovered.action} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              ) : (
                <span className="cube-tooltip__cta">Click to {hovered.action.toLowerCase()} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></span>
              )}
            </>
          )}
        </div>

        {/* Copy - three chapters in the same slot, clip-revealed */}
        <div className="cube-hero__copy container-custom">
          <div className="cube-chapter" data-state={s(0)}>
            <p className="cube-eyebrow"><Line i={0} state={s(0)}>{CHAPTERS[0].eyebrow}</Line></p>
            <h1 id="hero-title" className="cube-title">
              <Line i={1} state={s(0)}>We build every</Line>
              <Line i={2} state={s(0)}>block of <span className="text-electric-ice">British</span></Line>
              <Line i={3} state={s(0)}>sovereign AI.</Line>
            </h1>
            <p className="cube-lede">
              <Line i={4} state={s(0)}>From power and compute to intelligence, robotics, defence and media. One integrated British AI ecosystem.</Line>
            </p>
            <div className="cube-actions" data-state={s(0)}>
              <a href="#stack" className="btn-glow px-6 py-3">See how the stack fits</a>
              <a href="#platforms" className="btn-ghost px-6 py-3">Explore the platforms</a>
            </div>
          </div>

          <div className="cube-chapter" data-state={s(1)} aria-hidden={reduced || undefined}>
            <p className="cube-eyebrow"><Line i={0} state={s(1)}>{CHAPTERS[1].eyebrow}</Line></p>
            <h2 className="cube-title">
              <Line i={1} state={s(1)}>One stack.</Line>
              <Line i={2} state={s(1)}>Built in <span className="text-electric-ice">Britain.</span></Line>
            </h2>
            <p className="cube-lede">
              <Line i={3} state={s(1)}>Land, power and heat. Data centres. Sovereign compute. MOTHER models. Applications. Physical AI. Defence. Seven layers with one British owner.</Line>
            </p>
          </div>

          <div className="cube-chapter" data-state={s(2)} aria-hidden={reduced || undefined}>
            <p className="cube-eyebrow"><Line i={0} state={s(2)}>{CHAPTERS[2].eyebrow}</Line></p>
            <h2 className="cube-title">
              <Line i={1} state={s(2)}>Every cube</Line>
              <Line i={2} state={s(2)}>opens a</Line>
              <Line i={3} state={s(2)}><span className="text-electric-ice">platform.</span></Line>
            </h2>
            <p className="cube-lede">
              <Line i={4} state={s(2)}>Select a cube to open it, or use the platform links. Six entry points, all running on the same seven-layer stack.</Line>
            </p>
          </div>
        </div>

        {/* Accessible, crawlable platform links (same destinations as the cubes) */}
        <nav className="cube-hero__links" aria-label="MSAI platforms">
          <span className="cube-hero__links-label">Platforms</span>
          <ul>
            {PLATFORMS.map((p, i) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  data-active={hover?.index === i ? 'true' : undefined}
                  style={{ '--accent': p.accent } as React.CSSProperties}
                  aria-label={`${p.name} - ${p.action}${p.external ? ' (opens in a new tab)' : ''}`}
                >
                  <span className="cube-dot" aria-hidden />
                  {p.name}
                  <span className="sr-only"> · {PLATFORM_STATUS_LABEL[p.status]}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Progress + chapter indicator */}
        {!reduced && (
          <div className="cube-hero__progress" aria-hidden>
            <span className="cube-hero__count"><b>{String(chapter + 1).padStart(2, '0')}</b> / 03</span>
            <div className="cube-hero__track"><div ref={barRef} /></div>
          </div>
        )}
        {!reduced && (
          <div className="cube-hero__cue" data-hidden={chapter > 0 ? 'true' : 'false'} aria-hidden>
            <ArrowDown className="h-3.5 w-3.5" /> Scroll · each cube opens a platform
          </div>
        )}
      </div>
    </section>
  );
}
