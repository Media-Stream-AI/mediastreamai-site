"use client";

import { useEffect, useRef } from "react";

export default function NeonParticles({ density = 80 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0;

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);

      // neon gradient bg
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(51, 67, 102, 0.15)");
      g.addColorStop(1, "rgba(7, 10, 15, 0.6)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // particles
      const count = Math.max(80, Math.floor((w * h) / (density * 1000)));
      for (let i = 0; i < count; i++) {
        const x = (i * 97 + Math.sin(t * (i % 7 + 1)) * 200) % (w + 200) - 100;
        const y = (i * 71 + Math.cos(t * (i % 5 + 1)) * 120) % (h + 200) - 100;
        const r = 0.6 + ((i % 5) * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150, 200, 255, 0.35)";
        ctx.fill();

        // glow
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120, 180, 255, 0.07)";
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      <canvas ref={ref} className="w-full h-full block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(126,216,255,0.08),transparent_60%)]" />
    </div>
  );
}