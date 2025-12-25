// app/robotics/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Robotics: Robotic Camera Arm + Smart Light System
 * - HERO uses a full-bleed image with an overlay CTA button
 * - “Precision Robotic Camera Arm” text moved to the top of the next section
 * - Uses existing animated SVG: /public/media/svg/robotics-overview.svg
 * - Adds two inline animated SVGs (no external libs)
 */

export default function RoboticsPage() {
  return (
    <main className="bg-black text-white">
      {/* HERO (image-only with overlay button) */}
      <section className="relative isolate overflow-hidden">
        {/* Background hero image */}
        <div className="absolute inset-0">
          <Image
            src="/media/robotics-hero.jpg" /* <-- put your provided hero here */
            alt="MSAI Robotics — AI Studio Robotic Camera Arm"
            fill
            priority
            className="object-cover object-center opacity-95"
          />
          {/* Subtle gradient for text readability if needed later */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>

        {/* Overlay CTA */}
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-44 flex items-end justify-center">
          <div className="text-center">
            <Link href="/vp-studio" className="btn btn-primary">
              Explore VP Studio →
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW / INTRO (moved text here) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="aspect-video bg-black/20 rounded-xl overflow-hidden border border-white/10">
              {/* If your SVG is animated, using <img> preserves its internal <animate> */}
              <img
                src="/media/svg/robotics-overview.svg"
                alt="Robotics Overview — Camera Arm + Smart Lighting"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-3 text-white/60 text-sm font-glacial">
              System overview: Robotic Arm + Smart Light Rig orchestrated by AI Director (path, focus, intensity, colour).
            </p>
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-horizon">Precision Robotic Camera Arm</h1>
            <p className="mt-4 text-white/80 max-w-3xl font-glacial">
              Precision robotic camera arm and Smart Light System — synchronised by the AI Director
              for repeatable moves, instant relights, and real-time creative control.
            </p>
            <p className="mt-4 text-white/70 font-glacial">
              Our robotic camera system delivers programmable moves (pan/tilt/roll/track/lift) with
              sub-millimetre repeatability. The Smart Light System responds to the same timeline—DMX/Art-Net cues,
              scene presets, and mood-aware relights driven by the AI Director.
            </p>
            <ul className="mt-6 space-y-2 text-white/80 font-glacial">
              <li>• Repeatable keyframe moves and curved motion paths</li>
              <li>• Live “go-to-mark” for blocking and rapid shot iteration</li>
              <li>• DMX/Art-Net lighting cues synced to camera moves</li>
              <li>• Safety zones and soft-limits with live object sensing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SYSTEMS — Two animated inline SVGs */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <Card title="Smart Light System (Animated)">
            <SmartLightRigSVG />
            <p className="mt-4 text-white/70 text-sm font-glacial">
              DMX/Art-Net controlled key, fill, and rim fixtures. The AI Director can fade, colour-shift, and chase
              patterns on time-coded cues—perfect for music, promos, or mood-aware relights.
            </p>
          </Card>

          <Card title="Robotic Camera Track Module (Animated)">
            <CameraTrackSVG />
            <p className="mt-4 text-white/70 text-sm font-glacial">
              Visualises a dolly on a curved track with programmable waypoints. The arm can combine track motion with
              pan/tilt/roll and lens focus/zoom for complex, repeatable moves.
            </p>
          </Card>
        </div>
      </section>

      {/* HOW IT WORKS WITH AI DIRECTOR */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
          {[
            {
              t: "Plan",
              d: "Describe the shot in natural language. AI Director converts intent into motion + lighting keyframes."
            },
            {
              t: "Rehearse",
              d: "Preview path speed ramps and relight transitions. Apply soft-limits and safety zones."
            },
            {
              t: "Record",
              d: "Run the take with perfect repeatability. Export EDL/AAF/OTIO with cue markers."
            }
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-horizon">{x.t}</div>
              <p className="mt-2 text-white/70 text-sm font-glacial">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BASIC SPECS */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-horizon">Robotics Specifications</h3>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="min-w-full text-sm font-glacial">
              <tbody className="[&_tr]:border-b [&_tr]:border-white/10 last:[&_tr]:border-0">
                <tr>
                  <td className="px-4 py-3 text-white/60">Axes / DOF</td>
                  <td className="px-4 py-3">6-axis arm + track (optional) + focus/zoom</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Repeatability</td>
                  <td className="px-4 py-3">≤ 0.2 mm (arm); ≤ 0.5 mm (track module)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Payload</td>
                  <td className="px-4 py-3">Up to cinema camera + accessories (varies by head)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Lighting Control</td>
                  <td className="px-4 py-3">DMX/Art-Net (key/fill/rim), RGBW fixtures supported</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Safety</td>
                  <td className="px-4 py-3">Virtual fences, soft-limits, emergency stop, vision sensing</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white/60">Integration</td>
                  <td className="px-4 py-3">AI Director timeline, VP set states, LUT/grade cues</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-sm text-white/60 font-glacial">
            Specs are indicative for the prototype configuration; production specs may vary by site.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h4 className="text-3xl sm:text-4xl font-horizon">See the Robotics in action</h4>
          <p className="mt-3 text-white/70 font-glacial">
            Book a VP Studio walkthrough—test the robotic arm, lighting presets, and AI Director timeline.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/vp-studio" className="btn btn-primary">Explore VP Studio</Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------------------------
   Helpers
--------------------------- */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="text-lg font-horizon">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/* --------------------------
   Animated SVGs (inline)
--------------------------- */

/** Smart Light Rig — animated DMX fades + colour sweeps */
function SmartLightRigSVG() {
  return (
    <svg viewBox="0 0 640 360" className="w-full h-auto block" role="img" aria-label="Smart Light Rig animation">
      <style>{`
        .fixture { stroke: rgba(255,255,255,.25); fill: rgba(255,255,255,.06); }
        .beam { opacity: .0; }
        .beam.fade { animation: beamFade 4s ease-in-out infinite; }
        @keyframes beamFade { 0%{opacity:0} 20%{opacity:.55} 50%{opacity:.15} 80%{opacity:.7} 100%{opacity:0} }
        .beam.rainbow {
          animation: rainbow 6s linear infinite, beamFade 4.5s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @keyframes rainbow {
          0% { fill: rgba(59,130,246,.45); }
          25%{ fill: rgba(16,185,129,.45); }
          50%{ fill: rgba(234,179,8,.45); }
          75%{ fill: rgba(244,63,94,.45); }
          100%{ fill: rgba(139,92,246,.45); }
        }
        .stage { fill: rgba(255,255,255,.04); stroke: rgba(255,255,255,.1); }
      `}</style>

      {/* Stage */}
      <rect x="30" y="220" width="580" height="110" rx="12" className="stage" />

      {/* Fixtures */}
      <g>
        {/* Left fixture */}
        <rect x="120" y="60" width="40" height="28" rx="6" className="fixture" />
        <polygon points="140,88 145,100 135,100" fill="rgba(255,255,255,.2)" />
        <polygon points="100,220 140,88 180,220" className="beam fade" fill="rgba(59,130,246,.35)" />

        {/* Middle fixture */}
        <rect x="300" y="40" width="40" height="28" rx="6" className="fixture" />
        <polygon points="320,68 325,80 315,80" fill="rgba(255,255,255,.2)" />
        <polygon points="282,220 320,68 358,220" className="beam rainbow" />

        {/* Right fixture */}
        <rect x="480" y="60" width="40" height="28" rx="6" className="fixture" />
        <polygon points="500,88 505,100 495,100" fill="rgba(255,255,255,.2)" />
        <polygon points="460,220 500,88 540,220" className="beam fade" fill="rgba(139,92,246,.35)" />
      </g>
    </svg>
  );
}

/** Camera Track Module — moving dolly + waypoint pulses */
function CameraTrackSVG() {
  return (
    <svg viewBox="0 0 640 360" className="w-full h-auto block" role="img" aria-label="Robotic camera track animation">
      <style>{`
        .track { fill: none; stroke: rgba(255,255,255,.2); stroke-width: 4; }
        .waypoint { fill: rgba(56,189,248,.9); }
        .pulse { animation: pulse 1.8s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { r: 4 } 50% { r: 8 } }
        .dolly { fill: rgba(255,255,255,.9); }
        .arm { stroke: rgba(255,255,255,.9); stroke-width: 3; }
      `}</style>

      {/* Curved track path */}
      <path id="curve" d="M60,260 C180,200 460,200 580,260" className="track" />

      {/* Waypoints along the curve */}
      <circle cx="160" cy="230" r="5" className="waypoint pulse" />
      <circle cx="320" cy="210" r="5" className="waypoint pulse" />
      <circle cx="480" cy="230" r="5" className="waypoint pulse" />

      {/* Dolly that follows the path */}
      <g>
        <circle className="dolly">
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#curve" />
          </animateMotion>
          <animate attributeName="r" values="10;12;10" dur="1.2s" repeatCount="indefinite" />
        </circle>
        {/* Simple arm atop the dolly that tilts slightly as it moves */}
        <line className="arm" x1="0" y1="0" x2="0" y2="-30">
          <animate attributeName="x2" values="-6;6;-6" dur="2.4s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}