'use client';

// Fixed, full-viewport animated "neural field" backdrop - drifting nodes with
// proximity-linked edges in the MOTHER EXO spectrum, plus a soft aurora wash.
// Sits behind all content (-z), pointer-events-none, and honours reduced-motion
// (renders a single static frame). Density scales down on small screens.

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };

const COLORS = ['#22D3EE', '#6366F1', '#A855F7', '#EC4899'];

export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];

    const seed = () => {
      const area = w * h;
      const count = Math.max(28, Math.min(90, Math.round(area / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const LINK = 150;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.28;
            ctx.strokeStyle = `rgba(120,150,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = n.c;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduce) draw();
    else raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(60% 90% at 15% 0%, rgba(34,211,238,0.16), transparent 60%), radial-gradient(55% 90% at 88% 8%, rgba(168,85,247,0.16), transparent 60%), radial-gradient(80% 90% at 50% 100%, rgba(236,72,153,0.10), transparent 60%)',
        }}
      />
      {/* Faint technical grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(circle at 50% 40%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, #000 0%, transparent 78%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Bottom vignette so content lifts off the field */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
