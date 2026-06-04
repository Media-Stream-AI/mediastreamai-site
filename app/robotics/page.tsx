// app/robotics/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play, ArrowRight } from "lucide-react";

const PLATFORM_URL = "https://robotics.mediastreamai.com";

/* ════════════════════════ DATA ════════════════════════ */

const SOVEREIGN = [
  { icon: "🇬🇧", title: "British sovereign", body: "Designed, owned and trained in the UK — no foreign dependency in the loop." },
  { icon: "🔒", title: "On-prem by default", body: "Runs on a sovereign GB10 / DGX node; weights and data never leave your control." },
  { icon: "🧠", title: "A true world model", body: "Perceives, reasons and predicts — vision, language and action in one model." },
  { icon: "🛡️", title: "Humanity & Defence", body: "Built for safety-critical, dual-use deployment with auditable decisions." },
];

const BRAIN_STEPS = [
  { icon: "👁️", title: "Perceive", body: "The vision encoder detects and tracks objects and people, frame by frame, with a 10k-class head." },
  { icon: "🧭", title: "Understand space", body: "A scene-graph reasoning head places everything in relation — who is using what, what is near what." },
  { icon: "💬", title: "Reason", body: "The sovereign MOTHER CORE language model turns the scene + knowledge into decisions and answers." },
  { icon: "🦾", title: "Act & learn", body: "Decisions drive the humanoid; every session is captured and fed back to fine-tune all weights." },
];

/* ════════════════════════ 3D BRAIN FLY-THROUGH ════════════════════════
   True 3D fly-THROUGH a volumetric brain dot-cloud. The camera travels
   forward in 3D (translateZ driven by scroll) past anatomical regions; each
   MOTHER EXO weight has a leader-line label anchored at its real brain region,
   plus pulsating veins. CSS 3D transforms only — no WebGL, crash-safe.
   Ported from the robotics.mediastreamai.com home page. */

const REGIONS = [
  { t: "Vision", area: "Occipital lobe", color: "#2bd9ff", x: 150, y: 70, z: -300,
    d: "Light becomes signal in the visual cortex — the encoder detects and tracks everything in view, frame by frame." },
  { t: "Detection", area: "Temporal lobe", color: "#a06bff", x: -150, y: 120, z: -900,
    d: "The ventral stream recognises and names what she sees — a 10,000-class head boxes each object." },
  { t: "Spatial", area: "Parietal lobe", color: "#37e0a0", x: 165, y: -120, z: -1500,
    d: 'The dorsal "where" pathway builds relationships — who holds what, what sits near what.' },
  { t: "Reasoning", area: "Prefrontal cortex", color: "#ff4fd8", x: -175, y: -70, z: -2100,
    d: "The frontal lobe — MOTHER CORE — turns the scene and knowledge into understanding and intent." },
  { t: "Decision", area: "Motor cortex", color: "#ffb24d", x: 70, y: -175, z: -2700,
    d: "The motor strip turns intent into action — and every moment is captured to train all weights." },
];
const CAM_DEPTH = 3000; // total forward travel (px)

interface Pt { x: number; y: number; z: number; r: number; region: number; color: string }

function buildCloud(): Pt[] {
  const out: Pt[] = [];
  let s = 1337;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  // Structural shell — points inside a brain-ish ellipsoid spanning the depth.
  for (let i = 0; i < 150; i++) {
    let x = 0, y = 0, z = 0, rr = 2;
    while (rr > 1) { x = rnd() * 2 - 1; y = rnd() * 2 - 1; z = rnd() * 2 - 1; rr = x * x + y * y + z * z; }
    out.push({ x: x * 360, y: y * 230, z: -CAM_DEPTH / 2 + z * (CAM_DEPTH / 2 + 200),
               r: 2 + rnd() * 1.5, region: -1, color: "#2bd9ff" });
  }
  // Region clusters — denser, coloured, at each region's location.
  REGIONS.forEach((rg, ri) => {
    for (let i = 0; i < 30; i++) {
      out.push({ x: rg.x + (rnd() * 2 - 1) * 80, y: rg.y + (rnd() * 2 - 1) * 70,
                 z: rg.z + (rnd() * 2 - 1) * 150, r: 2.5 + rnd() * 2, region: ri, color: rg.color });
    }
  });
  return out;
}

function BrainJourney3D() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cloud = useRef(buildCloud());

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const world = track.querySelector<HTMLElement>(".mx-world");
    const regionEls = Array.from(track.querySelectorAll<HTMLElement>(".mx-rgroup"));
    const calloutEls = Array.from(track.querySelectorAll<HTMLElement>(".mx-callout"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const total = track.offsetHeight - vh;
      const top = track.getBoundingClientRect().top;
      const p = total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 0;
      const cam = p * CAM_DEPTH; // how far we've flown in
      // Move the whole world toward the viewer + a gentle rotation so we
      // travel THROUGH the cloud in 3D.
      if (world) world.style.transform =
        `translateZ(${cam}px) rotateY(${(-12 + p * 24).toFixed(2)}deg) rotateX(${(4 - p * 8).toFixed(2)}deg)`;
      // Nearest region = the one whose depth the camera is passing.
      let near = 0, best = 1e9;
      REGIONS.forEach((rg, i) => {
        const d = Math.abs(cam + rg.z); // reached when cam ≈ -z
        if (d < best) { best = d; near = i; }
        const lit = d < 350;
        regionEls[i].style.opacity = lit ? "1" : "0.28";
        regionEls[i].style.filter = lit ? `drop-shadow(0 0 8px ${rg.color})` : "none";
        if (calloutEls[i]) calloutEls[i].style.opacity = d < 500 ? "1" : "0";
      });
      setActive((a) => (a !== near ? near : a));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const cur = REGIONS[active];
  const structural = cloud.current.filter((d) => d.region < 0);
  return (
    <section className="mx-track" ref={trackRef} aria-label="Travel through Mother's brain">
      <div className="mx-sticky mx-stage3d">
        <div className="mx-world">
          {/* structural shell dots */}
          {structural.map((d, k) => (
            <i key={`s${k}`} className="mx-pt mx-pt-struct"
              style={{ transform: `translate3d(${d.x}px,${d.y}px,${d.z}px)`, width: d.r * 2, height: d.r * 2 }} />
          ))}
          {/* pulsating veins threaded through the volume */}
          {REGIONS.map((rg, i) => (
            <div key={`v${i}`} className="mx-vein" style={{
              transform: `translate3d(${rg.x * 0.5}px, ${rg.y * 0.5}px, ${rg.z + 200}px) rotateZ(${i * 40 - 80}deg)`,
              background: `linear-gradient(90deg, transparent, ${rg.color}, transparent)`,
              animationDelay: `${i * 0.5}s`,
            }} />
          ))}
          {/* region clusters */}
          {REGIONS.map((rg, i) => (
            <div key={rg.t} className="mx-rgroup" style={{ opacity: 0.28 }}>
              {cloud.current.filter((d) => d.region === i).map((d, k) => (
                <i key={k} className="mx-pt" style={{
                  transform: `translate3d(${d.x}px,${d.y}px,${d.z}px)`,
                  width: d.r * 2, height: d.r * 2, background: rg.color,
                  boxShadow: `0 0 8px ${rg.color}`, ["--k" as string]: k,
                } as React.CSSProperties} />
              ))}
            </div>
          ))}
          {/* leader-line label per weight, anchored at its region */}
          {REGIONS.map((rg) => (
            <div key={`c${rg.t}`} className="mx-callout" style={{
              transform: `translate3d(${rg.x}px,${rg.y}px,${rg.z}px)`, opacity: 0,
            }}>
              <span className="mx-callout-line" style={{ background: rg.color }} />
              <span className="mx-callout-card" style={{ borderColor: rg.color }}>
                <b style={{ color: rg.color }}>{rg.t}</b>
                <em>{rg.area}</em>
              </span>
            </div>
          ))}
        </div>

        {/* fixed HUD overlay (not in 3D space) */}
        <div className="mx-journey-hud">
          <div className="mx-journey-kicker">Travel through Mother&apos;s brain</div>
          <div className="mx-journey-step">{String(active + 1).padStart(2, "0")} / {String(REGIONS.length).padStart(2, "0")}</div>
          <h3 className="mx-journey-title" style={{ color: cur.color }}>{cur.t}</h3>
          <div className="mx-journey-area">{cur.area}</div>
          <p className="mx-journey-desc">{cur.d}</p>
          <div className="mx-journey-dots">
            {REGIONS.map((l, i) => (
              <span key={l.t} className={i === active ? "on" : ""}
                style={{ background: i === active ? l.color : undefined }} />
            ))}
          </div>
        </div>
        <div className="mx-scrollhint">scroll to fly through ↓</div>
      </div>
    </section>
  );
}

/* ════════════════════════ PAGE ════════════════════════ */

export default function RoboticsPage() {
  // Scroll-reveal for sections.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("mx-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".mx-reveal:not(.mx-in)").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-root">
      <style>{CSS}</style>

      <div className="mx-bg" aria-hidden>
        <div className="mx-grid" /><div className="mx-glow mx-glow-a" />
        <div className="mx-glow mx-glow-b" /><div className="mx-scan" />
      </div>

      {/* Hero */}
      <section className="mx-hero">
        <div className="mx-hero-copy">
          <div className="mx-badge">◍ British Sovereign AI</div>
          <h1 className="mx-title">MOTHER&nbsp;EXO</h1>
          <p className="mx-sub">A British sovereign Humanoid for Humanity &amp; Defence</p>
          <div className="mx-cta-row">
            <a className="mx-cta" href={PLATFORM_URL} target="_blank" rel="noreferrer">
              Enter the Platform <Play className="mx-cta-ico" />
            </a>
            <a className="mx-cta-ghost" href="#brain">See inside her brain ↓</a>
          </div>
        </div>
      </section>

      {/* Main 3D Brain animation (replaces the old platform preview) */}
      <div id="brain" />
      <BrainJourney3D />

      {/* Sovereign by design */}
      <section className="mx-section mx-reveal">
        <div className="mx-head">
          <div className="mx-kicker">Sovereign by design</div>
          <h2 className="mx-h2">Owned, hosted and trained in Britain</h2>
        </div>
        <div className="mx-cards">
          {SOVEREIGN.map((c) => (
            <div className="mx-card" key={c.title}>
              <div className="mx-card-icon">{c.icon}</div>
              <div className="mx-card-title">{c.title}</div>
              <div className="mx-card-body">{c.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How she thinks */}
      <section className="mx-section mx-reveal">
        <div className="mx-head">
          <div className="mx-kicker">How she thinks</div>
          <h2 className="mx-h2">Perception → reasoning → action</h2>
        </div>
        <div className="mx-cards">
          {BRAIN_STEPS.map((s) => (
            <div className="mx-card" key={s.title}>
              <div className="mx-card-icon">{s.icon}</div>
              <div className="mx-card-title">{s.title}</div>
              <div className="mx-card-body">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform CTA */}
      <section className="mx-section mx-reveal">
        <div className="mx-platform-cta">
          <div className="mx-kicker">The sovereign robotics platform</div>
          <h2 className="mx-h2">Step inside the live MOTHER EXO platform</h2>
          <p className="mx-lead">
            The full simulator, vision stack, scene reasoning and capture→train studio run live at
            robotics.mediastreamai.com — a single secured tunnel with role-based login and per-user audit.
          </p>
          <div className="mx-cta-row">
            <a className="mx-cta" href={PLATFORM_URL} target="_blank" rel="noreferrer">
              Launch the platform <ArrowRight className="mx-cta-ico" />
            </a>
            <a className="mx-cta-ghost" href={PLATFORM_URL} target="_blank" rel="noreferrer">
              robotics.mediastreamai.com ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-footer">
        MOTHER EXO is a proprietary <strong>WORLD MODEL</strong> and Humanoid System
        designed by MSAI CEO <strong>Christopher Kenna</strong>.
        <div className="mx-foot-sub">© {new Date().getFullYear()} MediaStream AI — Sovereign British AI.</div>
        <div className="mx-foot-link">
          <a href={PLATFORM_URL} target="_blank" rel="noreferrer">
            <span>Platform</span> <ExternalLink className="mx-cta-ico" />
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ════════════════════════ STYLES ════════════════════════ */
const CSS = `
.mx-root{position:relative;overflow-x:hidden;background:#04060d;color:#eaf2ff;
  font-family:'Inter',ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased;}
.mx-root *{box-sizing:border-box;}
.mx-cta-ico{width:16px;height:16px;display:inline-block;vertical-align:-2px;}

.mx-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;}
.mx-grid{position:absolute;inset:-50%;background-image:linear-gradient(rgba(43,217,255,.06) 1px,transparent 1px),
  linear-gradient(90deg,rgba(43,217,255,.06) 1px,transparent 1px);background-size:46px 46px;
  transform:perspective(600px) rotateX(60deg);animation:mxGrid 18s linear infinite;opacity:.5;}
@keyframes mxGrid{to{background-position:0 920px;}}
.mx-glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5;animation:mxFloat 16s ease-in-out infinite;}
.mx-glow-a{width:520px;height:520px;background:#2bd9ff33;top:-120px;left:-80px;}
.mx-glow-b{width:560px;height:560px;background:#ff4fd833;bottom:-160px;right:-120px;animation-delay:-6s;}
@keyframes mxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(40px)}}
.mx-scan{position:absolute;left:0;right:0;height:160px;top:0;background:linear-gradient(180deg,transparent,rgba(43,217,255,.08),transparent);animation:mxScan 7s linear infinite;}
@keyframes mxScan{0%{top:-160px}100%{top:100%}}

.mx-hero{position:relative;z-index:5;min-height:88vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px;padding:40px clamp(10px,2vw,32px) 40px;width:100%;}
.mx-hero-copy{max-width:100%;width:100%;animation:mxRise 1s cubic-bezier(.2,.7,.2,1) both;display:flex;flex-direction:column;align-items:center;}
.mx-badge{display:inline-block;font-size:11px;letter-spacing:.22em;color:#9fe9ff;border:1px solid #2bd9ff44;padding:6px 12px;border-radius:999px;margin-bottom:22px;background:#2bd9ff0d;}
.mx-title{font-size:clamp(34px,15vw,260px);line-height:.86;margin:0 auto;font-weight:900;letter-spacing:-.03em;
  white-space:nowrap;max-width:100%;
  background:linear-gradient(120deg,#fff 10%,#2bd9ff 45%,#ff4fd8 90%);-webkit-background-clip:text;background-clip:text;color:transparent;background-size:200% 200%;animation:mxSheen 8s ease infinite;}
@keyframes mxSheen{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.mx-sub{font-size:clamp(15px,2.4vw,26px);color:#bcd4ee;margin:18px 0 0;font-weight:300;}
.mx-cta-row{display:flex;gap:16px;align-items:center;margin-top:30px;flex-wrap:wrap;justify-content:center;}
.mx-cta{background:linear-gradient(90deg,#ff4fd8,#7c5cff);color:#fff;border:0;padding:14px 28px;border-radius:999px;font-weight:700;font-size:15px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:transform .2s,box-shadow .2s;box-shadow:0 10px 40px #ff4fd833;}
.mx-cta:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 16px 50px #ff4fd855;}
.mx-cta-ghost{color:#9fe9ff;background:none;border:0;border-bottom:1px solid #2bd9ff44;padding:0 0 2px;font-size:14px;cursor:pointer;text-decoration:none;}
@keyframes mxRise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}

.mx-section{position:relative;z-index:5;width:100%;max-width:1180px;margin:0 auto;padding:72px clamp(20px,6vw,90px);}
.mx-reveal{opacity:0;transform:translateY(46px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);}
.mx-reveal.mx-in{opacity:1;transform:none;}
.mx-head{margin-bottom:14px;}
.mx-kicker{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#ff8fe6;margin-bottom:10px;}
.mx-h2{font-size:clamp(28px,5vw,50px);margin:0;font-weight:800;letter-spacing:-.02em;color:#fff;}
.mx-lead{font-size:clamp(15px,2vw,19px);color:#aac3df;max-width:760px;line-height:1.6;font-weight:300;margin:18px auto 0;}

.mx-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:16px;margin-top:26px;}
.mx-card{border:1px solid #ffffff12;border-radius:18px;padding:22px;background:linear-gradient(180deg,#0b1322,#070b15);transition:transform .35s,border-color .35s,box-shadow .35s;}
.mx-card:hover{transform:translateY(-6px);border-color:#ff4fd855;box-shadow:0 20px 50px #00000066;}
.mx-card-icon{font-size:28px;margin-bottom:12px;}
.mx-card-title{font-weight:700;font-size:16px;color:#fff;margin-bottom:8px;}
.mx-card-body{font-size:13px;color:#9fb6d2;line-height:1.55;}

.mx-platform-cta{text-align:center;border:1px solid #2bd9ff22;border-radius:22px;padding:48px clamp(20px,5vw,64px);
  background:radial-gradient(120% 120% at 50% 0,#0c1830,#060a14);}

/* True 3D fly-through */
.mx-track{position:relative;z-index:5;height:640vh;width:100%;}
.mx-sticky{position:sticky;top:0;height:100vh;width:100%;overflow:hidden;display:flex;align-items:center;}
.mx-stage3d{perspective:760px;perspective-origin:50% 50%;background:radial-gradient(60% 60% at 50% 45%,#0a1426,#04060d 75%);}
.mx-world{position:absolute;top:50%;left:50%;width:0;height:0;transform-style:preserve-3d;will-change:transform;}
.mx-pt{position:absolute;border-radius:50%;background:#2bd9ff;margin:-3px;backface-visibility:hidden;}
.mx-pt-struct{background:#2bd9ff;opacity:.32;box-shadow:0 0 6px #2bd9ff55;}
.mx-rgroup{position:absolute;top:0;left:0;transform-style:preserve-3d;transition:opacity .45s ease,filter .45s ease;will-change:opacity,filter;}
.mx-rgroup .mx-pt{animation:mxPulse 2.6s ease-in-out infinite;animation-delay:calc(var(--k) * 45ms);}
@keyframes mxPulse{0%,100%{opacity:.4}50%{opacity:1}}
.mx-vein{position:absolute;top:0;left:0;width:520px;height:3px;margin:-1.5px 0 0 -260px;border-radius:3px;opacity:.5;
  filter:blur(.4px);animation:mxVein 3.4s ease-in-out infinite;transform-style:preserve-3d;}
@keyframes mxVein{0%,100%{opacity:.16}50%{opacity:.8}}
.mx-callout{position:absolute;top:0;left:0;transform-style:preserve-3d;transition:opacity .4s ease;pointer-events:none;}
.mx-callout-line{position:absolute;left:0;top:0;width:64px;height:2px;transform-origin:left;transform:rotate(-28deg);opacity:.8;}
.mx-callout-card{position:absolute;left:60px;top:-34px;white-space:nowrap;display:flex;flex-direction:column;gap:2px;
  background:#060c16cc;border:1px solid;border-radius:8px;padding:6px 10px;backdrop-filter:blur(4px);}
.mx-callout-card b{font-size:13px;font-weight:800;}
.mx-callout-card em{font-size:10px;font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:#9fb6d2;}
.mx-journey-hud{position:absolute;left:0;bottom:14vh;z-index:6;max-width:min(520px,92vw);padding:0 clamp(20px,6vw,90px);pointer-events:none;}
.mx-journey-kicker{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#ff8fe6;margin-bottom:8px;}
.mx-journey-step{font-size:13px;color:#7fa6cc;font-variant-numeric:tabular-nums;letter-spacing:.2em;}
.mx-journey-title{font-size:clamp(34px,6vw,72px);font-weight:900;letter-spacing:-.02em;margin:6px 0 2px;color:#fff;transition:color .4s ease;}
.mx-journey-area{font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#9fb6d2;margin-bottom:12px;}
.mx-journey-desc{font-size:clamp(15px,2vw,20px);color:#bcd4ee;line-height:1.6;font-weight:300;}
.mx-journey-dots{display:flex;gap:8px;margin-top:22px;}
.mx-journey-dots span{width:26px;height:4px;border-radius:4px;background:#2bd9ff2a;transition:background .3s;}
.mx-scrollhint{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:#6f86a3;animation:mxHint 2s ease-in-out infinite;}
@keyframes mxHint{0%,100%{opacity:.4;transform:translate(-50%,0)}50%{opacity:1;transform:translate(-50%,6px)}}

.mx-footer{position:relative;z-index:5;text-align:center;padding:40px 6vw 70px;border-top:1px solid #ffffff10;color:#aac3df;font-size:14px;line-height:1.7;}
.mx-footer strong{color:#fff;}
.mx-foot-sub{margin-top:10px;font-size:12px;color:#6f86a3;letter-spacing:.06em;}
.mx-foot-link{margin-top:14px;}
.mx-foot-link a{color:#9fe9ff;display:inline-flex;align-items:center;gap:6px;text-decoration:none;}

@media (max-width:760px){
  .mx-track{height:460vh;}
  .mx-hero{min-height:78vh;padding:24px 16px 40px;}
  .mx-journey-hud{bottom:8vh;}
}
@media (prefers-reduced-motion: reduce){.mx-root *{animation:none!important;}.mx-reveal{opacity:1;transform:none;}}
`;
