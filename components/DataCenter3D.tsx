"use client";

/* -----------------------------------------------------------------------
   DATA CENTER 3D  ·  Hero background
   A wireframe AI data-centre corridor built entirely from CSS 3D lines.
   Rows of server racks recede down a corridor and the whole world slowly
   flies toward the viewer on a seamless loop — as if walking through the
   data hall. Pure CSS 3D, no WebGL. Decorative only (aria-hidden).
----------------------------------------------------------------------- */

const GAP = 420; // depth between successive racks (px)
const ROWS = 9; // racks per side
const SIDE = 360; // horizontal offset of each rack wall from centre
const RACK_W = 150;
const RACK_H = 300;

// Rack units (horizontal divider lines) inside each rack.
const UNITS = Array.from({ length: 6 });

function Rack({ z, side }: { z: number; side: 1 | -1 }) {
  return (
    <div
      className="dc-rack"
      style={{
        transform: `translate3d(${side * SIDE}px, -${RACK_H / 2}px, ${-z}px) rotateY(${
          side === 1 ? -90 : 90
        }deg)`,
        width: RACK_W,
        height: RACK_H,
      }}
    >
      {UNITS.map((_, i) => (
        <span key={i} className="dc-u" style={{ top: `${((i + 1) / (UNITS.length + 1)) * 100}%` }} />
      ))}
      {/* a couple of accent status LEDs */}
      <i className="dc-led" style={{ top: "22%", animationDelay: `${(z % 5) * 0.3}s` }} />
      <i className="dc-led dc-led-b" style={{ top: "64%", animationDelay: `${(z % 7) * 0.25}s` }} />
    </div>
  );
}

export default function DataCenter3D() {
  const racks: { z: number; side: 1 | -1 }[] = [];
  for (let i = 0; i < ROWS; i++) {
    racks.push({ z: i * GAP, side: -1 });
    racks.push({ z: i * GAP, side: 1 });
  }

  return (
    <div className="dc-stage" aria-hidden>
      <style>{DC_CSS}</style>
      <div className="dc-world">
        {/* floor + ceiling grid lines running down the corridor */}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div key={`f${i}`} className="dc-floor" style={{ transform: `translate3d(0, 170px, ${-i * GAP}px) rotateX(90deg)` }} />
        ))}
        {Array.from({ length: ROWS }).map((_, i) => (
          <div key={`c${i}`} className="dc-floor dc-ceiling" style={{ transform: `translate3d(0, -170px, ${-i * GAP}px) rotateX(90deg)` }} />
        ))}
        {racks.map((r, i) => (
          <Rack key={i} z={r.z} side={r.side} />
        ))}
      </div>
      {/* depth fog so far racks fade into black */}
      <div className="dc-fog" />
    </div>
  );
}

const DC_CSS = `
.dc-stage{position:absolute;inset:0;overflow:hidden;perspective:680px;perspective-origin:50% 50%;
  background:radial-gradient(80% 90% at 50% 50%,#020a18 0%,#01040c 70%);}
.dc-world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;
  animation:dcFly 9s linear infinite;will-change:transform;}
@keyframes dcFly{from{transform:translateZ(0)}to{transform:translateZ(${GAP}px)}}
.dc-rack{position:absolute;transform-style:preserve-3d;
  border:1px solid rgba(0,200,255,.55);
  background:linear-gradient(180deg,rgba(0,40,70,.10),rgba(0,10,25,.10));}
.dc-u{position:absolute;left:0;right:0;height:1px;background:rgba(0,200,255,.22);}
.dc-led{position:absolute;left:14%;width:5px;height:5px;border-radius:50%;background:#34d399;
  box-shadow:0 0 7px #34d399;animation:dcBlink 2.4s ease-in-out infinite;}
.dc-led-b{left:auto;right:14%;background:#22d3ee;box-shadow:0 0 7px #22d3ee;}
.dc-floor{position:absolute;left:-360px;width:720px;height:${GAP}px;margin:-${GAP / 2}px 0 0 0;
  border:1px solid rgba(0,180,255,.10);background:
    repeating-linear-gradient(90deg,rgba(0,180,255,.08) 0 1px,transparent 1px 90px);}
.dc-ceiling{border-color:rgba(120,90,255,.10);}
@keyframes dcBlink{0%,100%{opacity:.3}50%{opacity:1}}
.dc-fog{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(60% 70% at 50% 50%,transparent 0%,transparent 30%,#01040c 88%);}
@media (prefers-reduced-motion: reduce){
  .dc-world{animation:none;transform:translateZ(${GAP / 2}px);}
  .dc-led{animation:none;}
}
`;
