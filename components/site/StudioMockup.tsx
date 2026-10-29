'use client';

// IntuiStudio, shown on a laptop.
//
// The editor is drawn as live markup rather than shipped as a screenshot: it
// stays sharp on any display, re-themes with the site, costs a few kB instead
// of a few hundred, and never goes stale against the product in the way a PNG
// does. The whole interface is laid out at a fixed 1280x800 and scaled down to
// whatever width it is given, so every proportion holds from a phone to a 4K
// panel. The scale is measured rather than expressed in container-query units:
// `scale()` needs a unitless number and CSS will not divide a length down to
// one, so a ResizeObserver does the arithmetic.
//
// Decorative: the surrounding section carries the meaning, so the chrome is
// aria-hidden and the frame exposes a single label to assistive technology.

import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Clock, Film, FolderOpen, Image as ImageIcon,
  Layers, Mic, Play, Redo2, Save, Scissors, Search, Send, SkipBack, SkipForward,
  Sparkles, Type, Undo2, Upload, Wand2, Boxes, FileText, Radio, BarChart3,
  Clapperboard, Settings2, LayoutGrid,
} from 'lucide-react';

const RAIL = [Film, ImageIcon, Boxes, FileText, Sparkles, Wand2, Layers, Radio, FolderOpen, BarChart3, Clapperboard];

const COPILOT = [
  {
    icon: Film,
    title: 'Text → Video',
    body: 'MOTHER T2V · sovereign in-house text-to-video — generate a clip from a prompt',
    active: true,
  },
  { icon: Sparkles, title: 'Scene Detect', body: 'MOTHER DeepVision · auto-mark scene cuts' },
  { icon: Type, title: 'AI Captions', body: 'MOTHER audio head · generate burned-in subtitles' },
  { icon: Wand2, title: 'Opus Highlight', body: 'MOTHER DeepVision · auto-cut viral clips' },
  { icon: Mic, title: 'Holocine Director', body: 'IntuiTV story head · build a shot list from a premise' },
];

const TRACKS = [
  { name: 'V1', kind: 'VIDEO', clips: [{ start: 2, span: 26, tone: 'from-cyan/70 to-iris/70', label: 'EXO_hangar_01' }] },
  { name: 'V2', kind: 'VIDEO', clips: [{ start: 34, span: 18, tone: 'from-violet/70 to-magenta/70', label: 'T2V_generate' }] },
  { name: 'FX', kind: 'FX', clips: [{ start: 12, span: 10, tone: 'from-iris/60 to-violet/60', label: 'glow' }] },
  { name: 'Titles', kind: 'TITLE', clips: [{ start: 4, span: 12, tone: 'from-ember/70 to-ember-bright/70', label: 'lower third' }] },
  { name: 'A1', kind: 'AUDIO', clips: [{ start: 2, span: 50, tone: 'from-emerald-500/60 to-emerald-400/60', label: 'score' }] },
  { name: 'A2', kind: 'AUDIO', clips: [{ start: 18, span: 22, tone: 'from-emerald-600/60 to-emerald-500/60', label: 'foley' }] },
];

const RULER = ['0:00', '0:04', '0:08', '0:12', '0:16', '0:20', '0:24'];

function Chrome() {
  return (
    <div className="flex h-full w-full flex-col bg-[#07080d] font-sans text-[11px] text-mist">
      {/* ---- top bar ---- */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-white/10 px-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand">
          <Play className="h-3 w-3 fill-ink text-ink" />
        </span>
        <span className="font-display text-sm tracking-wide text-brand">INTUITV STUDIO</span>
        <span className="text-white/25">·</span>
        <span className="text-white/70">Untitled Sequence</span>
        <span className="ml-4 flex items-center gap-1.5 text-white/40">
          <Clock className="h-3 w-3" /> 1920&times;1080 &middot; 30P
        </span>
        <span className="ml-auto flex items-center gap-2 text-white/50">
          <Undo2 className="h-3.5 w-3.5" />
          <Redo2 className="h-3.5 w-3.5" />
          <span className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1">
            <FolderOpen className="h-3 w-3" /> Attach Local Folder
          </span>
          <span className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1">
            <Save className="h-3 w-3" /> Save
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1 font-semibold text-ink">
            <Send className="h-3 w-3" /> Open Playout <ChevronRight className="h-3 w-3" />
          </span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* ---- icon rail ---- */}
        <div className="flex w-11 shrink-0 flex-col items-center gap-3 border-r border-white/10 py-3">
          {RAIL.map((Icon, i) => (
            <span
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-md ${
                i === 0 ? 'bg-brand/15 text-brand' : 'text-white/35'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
          ))}
        </div>

        {/* ---- library ---- */}
        <div className="flex w-52 shrink-0 flex-col border-r border-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/45">
            <FolderOpen className="h-3 w-3" /> Library
            <ChevronLeft className="ml-auto h-3 w-3" />
          </div>
          <div className="flex gap-3 px-3 py-2 text-[10px]">
            <span className="text-brand">Project</span>
            <span className="text-white/30">Folder</span>
            <span className="text-white/30">Bridge</span>
          </div>
          <div className="mx-3 flex items-center gap-2 rounded-md border border-white/10 px-2 py-1.5 text-white/35">
            <Search className="h-3 w-3" /> Search...
            <Upload className="ml-auto h-3 w-3 text-brand" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 px-3">
            {['EXO_hangar', 'T2V_gen_04', 'score_a', 'lower_third'].map((n, i) => (
              <div key={n} className="overflow-hidden rounded border border-white/10">
                <div className={`h-9 bg-gradient-to-br ${i % 2 ? 'from-violet/30 to-magenta/20' : 'from-cyan/30 to-iris/20'}`} />
                <div className="truncate px-1.5 py-1 text-[8px] text-white/45">{n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- monitors ---- */}
        <div className="flex min-w-0 flex-1 flex-col border-r border-white/10">
          <div className="grid flex-1 grid-cols-2 divide-x divide-white/10">
            <div className="flex flex-col">
              <div className="px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/45">Source · &mdash;</div>
              <div className="flex flex-1 items-center justify-center px-4 text-center text-[10px] text-white/30">
                Select a clip on the timeline
              </div>
            </div>
            <div className="flex flex-col p-3">
              <div className="mb-2 self-start rounded border border-white/10 bg-black/50 px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-white/50">
                PROGRAM · 1920&times;1080 · 30P
              </div>
              <div className="relative flex-1 overflow-hidden rounded border border-white/10 bg-gradient-to-br from-iris/25 via-night to-magenta/20">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(60% 80% at 50% 40%, rgba(94,234,255,0.35), transparent 70%)' }} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-2 py-1 font-mono text-[8px] text-white/55">
                  <span>MOTHER T2V</span><span>bf16 · GB10</span>
                </div>
              </div>
            </div>
          </div>

          {/* transport */}
          <div className="flex h-10 shrink-0 items-center justify-center gap-4 border-t border-white/10 px-3 text-white/55">
            <SkipBack className="h-3.5 w-3.5" />
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-ink">
              <Play className="h-3 w-3 fill-ink" />
            </span>
            <SkipForward className="h-3.5 w-3.5" />
            <span className="flex items-center gap-1 text-[10px]"><Scissors className="h-3 w-3" /> Split</span>
            <span className="flex items-center gap-1 rounded-md border border-iris/50 bg-iris/15 px-2 py-0.5 text-[10px] text-mist">
              <LayoutGrid className="h-3 w-3" /> Dual
            </span>
            <span className="ml-auto font-mono text-[10px] text-white/50">00:00:00:00 / 00:01:00:00</span>
          </div>
        </div>

        {/* ---- AI copilot ---- */}
        <div className="flex w-64 shrink-0 flex-col">
          <div className="flex border-b border-white/10 text-[10px]">
            <span className="flex flex-1 items-center justify-center gap-1.5 border-b-2 border-brand py-2 text-brand">
              <Sparkles className="h-3 w-3" /> AI Copilot
            </span>
            <span className="flex flex-1 items-center justify-center gap-1.5 py-2 text-white/35">
              <Settings2 className="h-3 w-3" /> Inspector
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 text-[11px] text-mist">
            <Sparkles className="h-3 w-3 text-brand" /> IntuiTV AI Copilot
          </div>
          <div className="flex-1 space-y-1.5 px-2">
            {COPILOT.map((c) => (
              <div
                key={c.title}
                className={`flex gap-2 rounded-lg border px-2.5 py-2 ${
                  c.active ? 'border-violet/50 bg-violet/15' : 'border-transparent'
                }`}
              >
                <c.icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${c.active ? 'text-violet' : 'text-white/40'}`} />
                <span className="min-w-0">
                  <span className="block text-[11px] text-mist">{c.title}</span>
                  <span className="block text-[9px] leading-snug text-white/40">{c.body}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mx-2 mb-2 rounded-lg border border-white/10 px-2.5 py-2 text-[10px] text-white/30">
            Describe the shot...
          </div>
          <div className="mx-2 mb-3 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-deep via-brand to-brand-bright py-2 text-[11px] font-semibold text-ink">
            <Send className="h-3 w-3" /> Run on GB10
          </div>
        </div>
      </div>

      {/* ---- timeline ---- */}
      <div className="h-[212px] shrink-0 border-t border-white/10">
        <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-white/45">
          Timeline · Untitled Sequence
          <span className="ml-auto flex items-center gap-2">
            Zoom
            <span className="relative h-1 w-20 rounded-full bg-white/15">
              <span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-brand/70" />
              <span className="absolute -top-1 left-2/3 h-3 w-3 -translate-x-1/2 rounded-full bg-brand" />
            </span>
          </span>
        </div>
        <div className="flex">
          <div className="w-20 shrink-0" />
          <div className="relative flex flex-1 border-b border-white/10 pr-3">
            {RULER.map((t) => (
              <span key={t} className="flex-1 border-l border-white/10 pl-1 font-mono text-[8px] text-white/35">{t}</span>
            ))}
          </div>
        </div>
        <div className="relative">
          {/* playhead */}
          <span className="pointer-events-none absolute bottom-0 left-20 top-0 z-10 w-px bg-brand" />
          {TRACKS.map((tr) => (
            <div key={tr.name} className="flex h-[26px] items-center border-b border-white/5">
              <div className="flex w-20 shrink-0 items-center justify-between px-3">
                <span className="text-[10px] text-mist">{tr.name}</span>
                <span className="font-mono text-[7px] tracking-wider text-white/30">{tr.kind}</span>
              </div>
              <div className="relative h-full flex-1 pr-3">
                {tr.clips.map((c) => (
                  <span
                    key={c.label}
                    className={`absolute top-1 bottom-1 overflow-hidden rounded-[3px] bg-gradient-to-r ${c.tone} px-1.5 text-[8px] leading-[18px] text-ink/90`}
                    style={{ left: `${c.start}%`, width: `${c.span}%` }}
                  >
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DESIGN_WIDTH = 1280;

export default function StudioMockup({ className = '' }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  // 1 until measured; the chrome stays hidden at that value so an unscaled
  // 1280px layout never flashes inside a narrower frame.
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / DESIGN_WIDTH);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label="IntuiStudio running on a laptop: library, source and program monitors, the IntuiTV AI Copilot panel with Text-to-Video, Scene Detect, AI Captions, Opus Highlight and Holocine Director, a Run on GB10 button, and a six-track timeline."
      >
        {/* screen */}
        <div className="relative rounded-[18px] border border-white/15 bg-night-900 p-2 shadow-panel md:rounded-[22px] md:p-2.5">
          <div className="absolute left-1/2 top-[7px] h-1 w-16 -translate-x-1/2 rounded-full bg-white/10 md:top-[9px]" />
          <div
            ref={frameRef}
            aria-hidden
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-[#07080d] md:rounded-[14px]"
          >
            {/* Laid out at a fixed 1280x800 and scaled to the container, so the
                editor keeps its real proportions at every breakpoint. */}
            <div
              className="absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left"
              style={{ transform: `scale(${scale})`, visibility: scale === 1 ? 'hidden' : 'visible' }}
            >
              <Chrome />
            </div>
            {/* screen sheen */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 38%, transparent 62%, rgba(255,255,255,0.05) 100%)' }}
            />
          </div>
        </div>

        {/* hinge + base */}
        <div aria-hidden className="relative mx-auto -mt-px h-3 w-[112%] max-w-none -translate-x-[5.35%] md:h-3.5">
          <div className="h-full w-full rounded-b-[10px] bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-full bg-white/15" />
        </div>
        <div
          aria-hidden
          className="mx-auto h-8 w-[90%] rounded-full bg-cyan/10 blur-2xl"
        />
      </div>
      <figcaption className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
        IntuiStudio · studio.intuitv.app · rendering on sovereign GB10 nodes
      </figcaption>
    </figure>
  );
}
