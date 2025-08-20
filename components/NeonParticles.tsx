"use client";
import { useEffect, useRef } from "react";
export default function NeonParticles({ density = 50 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf = 0;
    function draw() {
      const { width, height } = c;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < density; i++) {
        ctx.fillStyle = "rgba(34,211,238,0.6)";
        ctx.fillRect(Math.random()*width, Math.random()*height, 2, 2);
      }
      raf = requestAnimationFrame(draw);
    }
    function resize(){ c.width = c.offsetWidth; c.height = c.offsetHeight; }
    resize(); draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [density]);
  return <canvas className="particles" ref={ref} />;
}