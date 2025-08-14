"use client";
import { useEffect, useRef } from "react";

type Dot = { x:number; y:number; vx:number; vy:number; };

export default function Particles({ density = 0.00009 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let w = c.width = c.offsetWidth;
    let h = c.height = c.offsetHeight;

    const count = Math.max(48, Math.floor(w * h * density));
    const dots: Dot[] = Array.from({ length: count }).map(() => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2
    }));

    const onResize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      // softly tinted background glow
      const g = ctx.createRadialGradient(w*0.5,h*0.8,20,w*0.5,h*0.8,Math.max(w,h));
      g.addColorStop(0,"rgba(34,211,238,0.05)"); g.addColorStop(1,"transparent");
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

      // move & render particles
      for (const d of dots) {
        d.x+=d.vx; d.y+=d.vy;
        if (d.x<0||d.x>w) d.vx*=-1;
        if (d.y<0||d.y>h) d.vy*=-1;
      }
      // connective lines
      for (let i=0;i<dots.length;i++){
        for (let j=i+1;j<dots.length;j++){
          const a=dots[i], b=dots[j];
          const dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
          if (dist<110){
            ctx.strokeStyle = `rgba(168,85,247,${0.08*(1-dist/110)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      // points
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      for (const d of dots){
        ctx.beginPath(); ctx.arc(d.x,d.y,1.1,0,Math.PI*2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    const ro = new ResizeObserver(onResize); ro.observe(c);
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
}
