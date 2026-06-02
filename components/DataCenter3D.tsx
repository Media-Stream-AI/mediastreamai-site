"use client";

/* -----------------------------------------------------------------------
   DATA CENTER 3D  ·  Hero background
   A neon AI data-hall corridor built from CSS 3D. Rows of glowing server
   racks line both walls and recede to a bright vanishing point; the whole
   world slowly flies toward the viewer on a seamless loop — as if walking
   through the hall. Glossy floor with light streaks, overhead light panels
   and falling "data-rain" particles complete the look. Pure CSS 3D, no
   WebGL. Decorative only (aria-hidden).
----------------------------------------------------------------------- */

const GAP = 440; // depth between successive racks (px)
const ROWS = 10; // racks per side
const SIDE = 360; // half-width of the aisle (rack wall x offset)
const RACK_W = 400; // rack depth along the corridor
const RACK_H = 360; // rack height
const FLOOR_Y = RACK_H / 2; // floor / ceiling distance from centre
const DEPTH = (ROWS + 2) * GAP; // total corridor length (seamless under GAP loop)

// Accent palette for occasional coloured racks / rails (mostly cyan).
const ACCENTS = ["#00d8ff", "#00d8ff", "#00d8ff", "#34d399", "#00d8ff", "#a855f7", "#00d8ff"];

function Rack({ z, side, accent, bright }: { z: number; side: 1 | -1; accent: string; bright: boolean }) {
  return (
    <div
      className={`dc-rack${bright ? " dc-rack-bright" : ""}`}
      style={{
        width: RACK_W,
        height: RACK_H,
        transform: `translate3d(${side * SIDE - RACK_W / 2}px, ${-RACK_H / 2}px, ${-z}px) rotateY(${
          side === 1 ? -90 : 90
        }deg)`,
        ["--accent" as string]: accent,
      }}
    />
  );
}

export default function DataCenter3D() {
  const racks: { z: number; side: 1 | -1; accent: string; bright: boolean }[] = [];
  for (let i = 0; i < ROWS; i++) {
    const a = ACCENTS[i % ACCENTS.length];
    racks.push({ z: i * GAP, side: -1, accent: a, bright: i % 3 === 0 });
    racks.push({ z: i * GAP, side: 1, accent: ACCENTS[(i + 3) % ACCENTS.length], bright: i % 3 === 1 });
  }

  // Bright glowing rails along the floor + ceiling edges of each wall.
  const rails: { x: number; y: number; color: string; reflect?: boolean }[] = [
    { x: -SIDE, y: FLOOR_Y, color: "#19e0ff" },
    { x: SIDE, y: FLOOR_Y, color: "#19e0ff" },
    { x: -SIDE, y: -FLOOR_Y, color: "#7cc4ff" },
    { x: SIDE, y: -FLOOR_Y, color: "#7cc4ff" },
    { x: -SIDE, y: FLOOR_Y + 10, color: "#19e0ff", reflect: true },
    { x: SIDE, y: FLOOR_Y + 10, color: "#19e0ff", reflect: true },
  ];

  // Falling "data-rain" particle columns near the centre ceiling.
  const rain = Array.from({ length: 14 }).map((_, i) => {
    const seed = (i * 73 + 11) % 100;
    const colors = ["#19e0ff", "#34d399", "#a855f7", "#19e0ff", "#5ad1ff"];
    return {
      x: ((seed % 7) - 3) * 60 + (i % 2 ? 18 : -18),
      z: (seed % ROWS) * GAP,
      color: colors[i % colors.length],
      delay: (seed % 10) * 0.4,
      dur: 2.6 + (seed % 5) * 0.5,
    };
  });

  return (
    <div className="dc-stage" aria-hidden>
      <style>{DC_CSS}</style>
      {/* bright far vanishing-point glow (2D, behind the 3D world) */}
      <div className="dc-vanish" />
      <div className="dc-world">
        {/* glossy floor + ceiling with depth streaks */}
        <div className="dc-floor" style={{ transform: `translate3d(${-SIDE - 60}px, ${FLOOR_Y - DEPTH / 2}px, ${-DEPTH / 2 + GAP}px) rotateX(90deg)` }} />
        <div className="dc-ceiling" style={{ transform: `translate3d(${-SIDE - 60}px, ${-FLOOR_Y - DEPTH / 2}px, ${-DEPTH / 2 + GAP}px) rotateX(90deg)` }} />

        {/* overhead light panels down the centre of the ceiling */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div
            key={`lp${i}`}
            className="dc-lightpanel"
            style={{ transform: `translate3d(-70px, ${-FLOOR_Y + 2 - GAP * 0.25}px, ${-i * GAP - GAP / 2}px) rotateX(90deg)` }}
          />
        ))}

        {/* bright converging rails */}
        {rails.map((r, i) => (
          <div
            key={`r${i}`}
            className={`dc-rail${r.reflect ? " dc-rail-reflect" : ""}`}
            style={{
              width: DEPTH,
              transform: `translate3d(${r.x - DEPTH / 2}px, ${r.y}px, ${-DEPTH / 2 + GAP}px) rotateY(90deg)`,
              background: r.color,
              boxShadow: `0 0 14px ${r.color}, 0 0 28px ${r.color}`,
            }}
          />
        ))}

        {/* server racks lining both walls */}
        {racks.map((r, i) => (
          <Rack key={i} z={r.z} side={r.side} accent={r.accent} bright={r.bright} />
        ))}

        {/* falling data-rain particles */}
        {rain.map((p, i) => (
          <span
            key={`rain${i}`}
            className="dc-rain"
            style={{
              transform: `translate3d(${p.x}px, ${-FLOOR_Y + 6}px, ${-p.z}px)`,
              background: `repeating-linear-gradient(180deg, ${p.color} 0 2px, transparent 2px 16px)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        ))}
      </div>
      {/* depth fog so far racks fade into black */}
      <div className="dc-fog" />
    </div>
  );
}

const DC_CSS = `
.dc-stage{position:absolute;inset:0;overflow:hidden;perspective:720px;perspective-origin:50% 50%;
  background:radial-gradient(70% 80% at 50% 48%,#03101f 0%,#01040c 72%);}
.dc-vanish{position:absolute;left:50%;top:50%;width:160px;height:160px;transform:translate(-50%,-50%);
  border-radius:50%;background:radial-gradient(circle,rgba(120,220,255,.55),rgba(40,120,220,.18) 45%,transparent 70%);
  filter:blur(6px);}
.dc-world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;
  animation:dcFly 11s linear infinite;will-change:transform;}
@keyframes dcFly{from{transform:translateZ(0)}to{transform:translateZ(${GAP}px)}}

/* ── racks ── */
.dc-rack{position:absolute;left:0;top:0;border:1.5px solid color-mix(in srgb, var(--accent) 80%, #bfefff);
  border-radius:3px;
  box-shadow:0 0 14px color-mix(in srgb, var(--accent) 60%, transparent),
             0 0 30px color-mix(in srgb, var(--accent) 30%, transparent),
             inset 0 0 22px rgba(0,90,160,.28);
  background:
    radial-gradient(circle at 50% 50%, rgba(40,235,255,.9) 0 .7px, transparent 1.4px) 0 0/11px 8px,
    radial-gradient(circle at 50% 50%, rgba(60,255,210,.5) 0 .6px, transparent 1.4px) 5px 4px/19px 15px,
    radial-gradient(circle at 50% 50%, rgba(150,120,255,.4) 0 .6px, transparent 1.4px) 9px 2px/34px 27px,
    linear-gradient(180deg, #07151f 0%, #030a14 60%, #061722 100%);
  background-blend-mode:screen,screen,screen,normal;}
.dc-rack-bright{border-width:2px;
  box-shadow:0 0 20px color-mix(in srgb, var(--accent) 80%, transparent),
             0 0 44px color-mix(in srgb, var(--accent) 45%, transparent),
             inset 0 0 26px color-mix(in srgb, var(--accent) 22%, rgba(0,90,160,.3));}

/* ── glossy floor + ceiling ── */
.dc-floor{position:absolute;left:0;top:0;width:${2 * SIDE + 120}px;height:${DEPTH}px;transform-origin:50% 50%;
  background:
    linear-gradient(90deg, rgba(25,224,255,.16) 0 1px, transparent 1px 64px),
    radial-gradient(60% 120% at 50% 0%, rgba(40,140,220,.22), transparent 60%),
    linear-gradient(180deg,#040d18,#020812);
  box-shadow:inset 0 0 120px rgba(0,40,80,.6);}
.dc-ceiling{position:absolute;left:0;top:0;width:${2 * SIDE + 120}px;height:${DEPTH}px;transform-origin:50% 50%;
  background:
    linear-gradient(90deg, rgba(60,120,200,.10) 0 1px, transparent 1px 80px),
    linear-gradient(180deg,#04101c,#01060e);}
.dc-lightpanel{position:absolute;left:0;top:0;width:140px;height:${GAP * 0.5}px;transform-origin:50% 50%;
  border-radius:6px;background:linear-gradient(180deg,#dff6ff,#7fc8ff);
  box-shadow:0 0 26px rgba(150,220,255,.7),0 0 60px rgba(60,150,255,.4);opacity:.85;}

/* ── bright converging rails ── */
.dc-rail{position:absolute;left:0;top:0;height:4px;margin-top:-2px;transform-origin:50% 50%;border-radius:4px;}
.dc-rail-reflect{height:26px;filter:blur(7px);opacity:.32;}

/* ── data-rain particles ── */
.dc-rain{position:absolute;left:0;top:0;width:2px;height:240px;transform-origin:50% 50%;border-radius:2px;
  opacity:.85;animation-name:dcRain;animation-timing-function:linear;animation-iteration-count:infinite;}
@keyframes dcRain{from{background-position-y:-240px}to{background-position-y:240px}}

.dc-fog{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(62% 72% at 50% 50%,transparent 0%,transparent 26%,rgba(1,4,12,.55) 70%,#01040c 92%);}

@media (prefers-reduced-motion: reduce){
  .dc-world{animation:none;transform:translateZ(${GAP / 2}px);}
  .dc-rain{animation:none;}
}
`;
