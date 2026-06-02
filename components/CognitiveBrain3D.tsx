"use client";

import { useEffect, useRef, useState } from "react";

/* -----------------------------------------------------------------------
   COGNITIVE BRAIN 3D  ·  Modular Cognitive Architecture
   A volumetric brain dot-cloud rendered in pure CSS 3D (no WebGL, crash-safe).
   Adapted from the MSAI Robotics "fly-through" brain — here it slowly
   auto-rotates and cycles through MOTHER's specialised cognitive modules,
   each anchored to a real brain region with a leader-line label.
----------------------------------------------------------------------- */

// Cognitive modules placed in 3D world space (x,y px from centre; z = depth).
const MODULES = [
  {
    t: "MOTHER CORE",
    area: "Prefrontal cortex",
    color: "#00c8ff",
    x: 0,
    y: -10,
    z: 60,
    d: "The sovereign reasoning engine. Deterministic, zero-temperature thought — fully auditable at every step.",
  },
  {
    t: "CORE 7B",
    area: "Frontal lobe · Reasoning",
    color: "#22d3ee",
    x: -200,
    y: 90,
    z: -120,
    d: "Theorem proving, physics, defence and legal compliance — T=0 deterministic and auditable.",
  },
  {
    t: "LLM 7B",
    area: "Temporal lobe · Language",
    color: "#a855f7",
    x: 210,
    y: 70,
    z: -60,
    d: "The public British language engine — creative narrative, code, policy and education in a sovereign voice.",
  },
  {
    t: "T2V",
    area: "Occipital lobe · Vision",
    color: "#fb923c",
    x: -150,
    y: -150,
    z: -200,
    d: "The sovereign multi-modal pipeline — latent → motion → temporal → decoder, text becomes video.",
  },
  {
    t: "QUANTUM RAG",
    area: "Hippocampus · Memory",
    color: "#34d399",
    x: 180,
    y: -140,
    z: -260,
    d: "Quantum-enhanced retrieval across ~1.67M sovereign knowledge chunks — search, verify, reason.",
  },
];

interface Pt {
  x: number;
  y: number;
  z: number;
  r: number;
  region: number;
  color: string;
}

// Deterministic dot-cloud so server / client render identically.
function buildCloud(): Pt[] {
  const out: Pt[] = [];
  let s = 1337;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  // Structural shell — points inside a brain-ish ellipsoid.
  for (let i = 0; i < 80; i++) {
    let x = 0,
      y = 0,
      z = 0,
      rr = 2;
    while (rr > 1) {
      x = rnd() * 2 - 1;
      y = rnd() * 2 - 1;
      z = rnd() * 2 - 1;
      rr = x * x + y * y + z * z;
    }
    out.push({
      x: x * 300,
      y: y * 200,
      z: z * 260,
      r: 1.6 + rnd() * 1.4,
      region: -1,
      color: "#3b82f6",
    });
  }
  // Module clusters — denser, coloured, at each module location.
  MODULES.forEach((rg, ri) => {
    for (let i = 0; i < 16; i++) {
      out.push({
        x: rg.x + (rnd() * 2 - 1) * 70,
        y: rg.y + (rnd() * 2 - 1) * 60,
        z: rg.z + (rnd() * 2 - 1) * 70,
        r: 2.2 + rnd() * 2,
        region: ri,
        color: rg.color,
      });
    }
  });
  return out;
}

export default function CognitiveBrain3D() {
  const worldRef = useRef<HTMLDivElement>(null);
  const cloud = useRef(buildCloud());
  const [active, setActive] = useState(0);

  // Slow continuous auto-rotation (rAF, paused when off-screen / reduced-motion).
  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      world.style.transform = "rotateY(-18deg) rotateX(6deg)";
      return;
    }
    let raf = 0;
    let running = true;
    const start = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      const t = (now - start) / 1000;
      const ry = -18 + Math.sin(t * 0.18) * 26; // gentle yaw sweep
      const rx = 6 + Math.sin(t * 0.12) * 4; // gentle pitch
      world.style.transform = `rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running && !raf) raf = requestAnimationFrame(loop);
      },
      { threshold: 0.05 }
    );
    io.observe(world);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Cycle the highlighted module every few seconds.
  useEffect(() => {
    const iv = setInterval(() => setActive((a) => (a + 1) % MODULES.length), 3200);
    return () => clearInterval(iv);
  }, []);

  const cur = MODULES[active];
  const structural = cloud.current.filter((d) => d.region < 0);

  return (
    <div className="cb-stage">
      <style>{CB_CSS}</style>
      <div className="cb-world" ref={worldRef}>
        {/* structural shell dots */}
        {structural.map((d, k) => (
          <i
            key={`s${k}`}
            className="cb-pt cb-pt-struct"
            style={{
              transform: `translate3d(${d.x}px,${d.y}px,${d.z}px)`,
              width: d.r * 2,
              height: d.r * 2,
            }}
          />
        ))}
        {/* pulsating veins through the volume */}
        {MODULES.map((rg, i) => (
          <div
            key={`v${i}`}
            className="cb-vein"
            style={{
              transform: `translate3d(${rg.x * 0.5}px, ${rg.y * 0.5}px, ${rg.z}px) rotateZ(${
                i * 44 - 88
              }deg)`,
              background: `linear-gradient(90deg, transparent, ${rg.color}, transparent)`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        {/* module clusters */}
        {MODULES.map((rg, i) => (
          <div
            key={rg.t}
            className="cb-rgroup"
            style={{
              opacity: i === active ? 1 : 0.34,
              filter: i === active ? `drop-shadow(0 0 9px ${rg.color})` : "none",
            }}
          >
            {cloud.current
              .filter((d) => d.region === i)
              .map((d, k) => (
                <i
                  key={k}
                  className="cb-pt"
                  style={{
                    transform: `translate3d(${d.x}px,${d.y}px,${d.z}px)`,
                    width: d.r * 2,
                    height: d.r * 2,
                    background: rg.color,
                    boxShadow: `0 0 8px ${rg.color}`,
                    ["--k" as string]: k,
                  }}
                />
              ))}
          </div>
        ))}
        {/* leader-line label per module */}
        {MODULES.map((rg, i) => (
          <div
            key={`c${rg.t}`}
            className="cb-callout"
            style={{
              transform: `translate3d(${rg.x}px,${rg.y}px,${rg.z}px)`,
              opacity: i === active ? 1 : 0,
            }}
          >
            <span className="cb-callout-line" style={{ background: rg.color }} />
            <span className="cb-callout-card" style={{ borderColor: rg.color }}>
              <b style={{ color: rg.color }}>{rg.t}</b>
              <em>{rg.area}</em>
            </span>
          </div>
        ))}
      </div>

      {/* fixed HUD overlay (not in 3D space) */}
      <div className="cb-hud">
        <div className="cb-hud-kicker">Inside MOTHER&apos;s cognition</div>
        <div className="cb-hud-step">
          {String(active + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
        </div>
        <h3 className="cb-hud-title" style={{ color: cur.color }}>
          {cur.t}
        </h3>
        <div className="cb-hud-area">{cur.area}</div>
        <p className="cb-hud-desc">{cur.d}</p>
        <div className="cb-hud-dots">
          {MODULES.map((l, i) => (
            <button
              key={l.t}
              aria-label={l.t}
              onClick={() => setActive(i)}
              className={i === active ? "on" : ""}
              style={{ background: i === active ? l.color : undefined }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const CB_CSS = `
.cb-stage{position:relative;width:100%;height:clamp(380px,46vw,520px);perspective:820px;perspective-origin:50% 48%;
  border-radius:1rem;overflow:hidden;background:radial-gradient(60% 60% at 50% 42%,#06122a,#01040c 78%);}
.cb-world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform;}
.cb-pt{position:absolute;border-radius:50%;background:#3b82f6;margin:-3px;backface-visibility:hidden;}
.cb-pt-struct{opacity:.28;}
.cb-rgroup{position:absolute;top:0;left:0;transform-style:preserve-3d;transition:opacity .6s ease,filter .6s ease;will-change:opacity,filter;}
.cb-rgroup .cb-pt{animation:cbPulse 2.6s ease-in-out infinite;animation-delay:calc(var(--k) * 45ms);}
.cb-vein{position:absolute;top:0;left:0;width:440px;height:2px;margin:-1px 0 0 -220px;border-radius:3px;opacity:.5;
  animation:cbVein 4s ease-in-out infinite;}
.cb-callout{position:absolute;top:0;left:0;transform-style:preserve-3d;transition:opacity .5s ease;pointer-events:none;}
.cb-callout-line{position:absolute;left:0;top:0;width:54px;height:2px;transform-origin:left;transform:rotate(-28deg);opacity:.85;}
.cb-callout-card{position:absolute;left:52px;top:-30px;white-space:nowrap;display:flex;flex-direction:column;gap:2px;
  padding:6px 11px;border:1px solid;border-radius:9px;background:rgba(2,6,16,.82);backdrop-filter:blur(6px);}
.cb-callout-card b{font-size:12px;font-weight:800;letter-spacing:.04em;}
.cb-callout-card em{font-size:9px;font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:#9fb6d2;}
.cb-hud{position:absolute;left:0;bottom:18px;z-index:6;max-width:min(330px,82%);padding:0 clamp(16px,4vw,28px);pointer-events:none;}
.cb-hud-kicker{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#7dd3fc;margin-bottom:6px;}
.cb-hud-step{font-size:11px;color:#7fa6cc;font-variant-numeric:tabular-nums;letter-spacing:.2em;}
.cb-hud-title{font-size:clamp(22px,3.4vw,34px);font-weight:900;letter-spacing:-.02em;margin:4px 0 2px;transition:color .5s ease;}
.cb-hud-area{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#9fb6d2;margin-bottom:9px;}
.cb-hud-desc{font-size:clamp(12px,1.4vw,14px);color:#bcd4ee;line-height:1.55;font-weight:300;}
.cb-hud-dots{display:flex;gap:7px;margin-top:14px;pointer-events:auto;}
.cb-hud-dots button{width:22px;height:4px;border-radius:4px;border:0;padding:0;cursor:pointer;background:#2bd9ff2a;transition:background .3s;}
@keyframes cbPulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes cbVein{0%,100%{opacity:.14}50%{opacity:.7}}
@media (prefers-reduced-motion: reduce){
  .cb-rgroup .cb-pt,.cb-vein{animation:none!important;}
}
`;
