"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntuiTVPage() {
  return (
    <main className="bg-black text-white">
      {/* ============= HERO ============= */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">IntuiTV</h1>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto font-glacial">
            Real-time AI personalisation turns hundreds of channels — plus your biometric and behavioural signals —
            into one perfect, personalised TV stream.
          </p>

        {/* Animated SVG Hero */}
        <div className="mt-10 flex justify-center">
          <AnimatedHeroSVG />
        </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#platforms" className="btn btn-primary">See Platforms</a>
            <a href="#how" className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* ============= PLATFORMS ============= */}
      <section id="platforms" className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">Platforms</h2>
          <p className="mt-3 text-white/70 font-glacial">
            IntuiTV runs on the devices you already own — with a consistent, personalised channel everywhere.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Apple TV", src: "/media/platforms/apple-tv.svg" },
              { name: "Amazon Fire TV", src: "/media/platforms/amazon-fire-tv.svg" },
              { name: "Roku", src: "/media/platforms/roku.svg" },
              { name: "Android TV", src: "/media/platforms/android-tv.svg" },
              { name: "Samsung TV", src: "/media/platforms/samsung-tv.svg" },
              { name: "LG webOS", src: "/media/platforms/lg-webos.svg" },
              { name: "iOS", src: "/media/platforms/ios.svg" },
              { name: "Android", src: "/media/platforms/android.svg" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center hover:bg-white/[0.06] transition">
                <img src={p.src} alt={p.name} className="h-8 w-auto opacity-90" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= HOW IT WORKS ============= */}
      <section id="how" className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-horizon">How it works</h2>
            <p className="mt-4 text-white/70 font-glacial">
              IntuiTV is the first truly personal TV channel — a stream broadcast just to <i>you</i>.
              Our AI blends your viewing behaviour with consented biometric and contextual signals to
              continuously learn and adapt. The lineup updates in real time as your context changes.
            </p>
            <ul className="mt-6 space-y-2 text-white/80 font-glacial">
              <li>• A unique 24/7 channel per viewer</li>
              <li>• Learns from patterns, preferences, and household presence</li>
              <li>• Context-aware: time, mood, and who’s watching</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm uppercase text-white/60 mb-3">Examples</div>
            <div className="space-y-3 text-white/80">
              <div className="rounded-xl bg-white/[0.04] p-4">
                <b>Romantic evening</b> — softer, slower content automatically surfaces.
              </div>
              <div className="rounded-xl bg-white/[0.04] p-4">
                <b>Family night</b> — the lineup flips to family-friendly programming.
              </div>
              <div className="rounded-xl bg-white/[0.04] p-4">
                <b>Workout session</b> — upbeat music and energetic shows take over.
              </div>
            </div>
            <p className="mt-4 text-white/70 text-sm font-glacial">
              You can also <b>tell the TV</b> in the IntuiTV app: “partner is coming over”, “whole family’s here”,
              or “I’m solo” — and the schedule adapts instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ============= FAQ ============= */}
      <section id="faq" className="section border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">FAQ</h2>
          <div className="mt-8 space-y-4">
            {[
              {
                q: "How do I get IntuiTV?",
                a: "Download the IntuiTV app on your TV (Apple TV, Fire TV, Roku, Android TV, Samsung, LG) or on mobile (iOS & Android). Sign in once to start your personal channel.",
              },
              {
                q: "How do I connect my devices?",
                a: "Open IntuiTV on your TV, then scan the QR code with the mobile app or enter the short pairing code. Your channel syncs across devices.",
              },
              {
                q: "Which platforms are supported?",
                a: "Apple TV, Fire TV, Roku, Android TV, Samsung TV, LG webOS, iOS, and Android. More platforms are coming soon.",
              },
              {
                q: "Do biometrics have to be enabled?",
                a: "No. Biometrics are optional and consent-first. IntuiTV still personalises using your behaviour and household context.",
              },
            ].map((f) => (
              <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <summary className="cursor-pointer font-horizon">{f.q}</summary>
                <p className="mt-2 text-white/70 font-glacial">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">Experience IntuiTV</h2>
          <p className="mt-3 text-white/70 font-glacial">
            Personalised, real-time TV streaming—across every platform.
          </p>
          <Link href="https://www.intuitv.app" className="btn btn-primary mt-6">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ===========================
   Animated Hero SVG Component
   - Left: channel logos → IntuiTV box
   - Right: biometric/behaviour signals → box
   - Out: personalised channels → multiple viewers
=========================== */
function AnimatedHeroSVG() {
  return (
    <svg
      className="w-full max-w-5xl"
      viewBox="0 0 1200 520"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Channels and signals flow into IntuiTV, personalised channels flow out to viewers"
    >
      <defs>
        {/* Curved paths */}
        <path id="inL1" d="M120,120 C260,160 360,180 500,210" />
        <path id="inL2" d="M120,200 C260,200 360,210 500,230" />
        <path id="inL3" d="M120,280 C260,240 360,240 500,250" />
        <path id="inL4" d="M120,360 C260,300 360,270 500,270" />

        <path id="inR1" d="M1080,120 C940,160 840,180 700,210" />
        <path id="inR2" d="M1080,200 C940,200 840,210 700,230" />
        <path id="inR3" d="M1080,280 C940,240 840,240 700,250" />
        <path id="inR4" d="M1080,360 C940,300 840,270 700,270" />

        <path id="out1" d="M700,220 C840,180 960,160 1080,140" />
        <path id="out2" d="M700,240 C840,220 960,220 1080,220" />
        <path id="out3" d="M700,260 C840,300 960,320 1080,340" />

        {/* Logo gradients */}
        <radialGradient id="logoCyan" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(0,240,255,1)" />
          <stop offset="100%" stopColor="rgba(0,240,255,0.2)" />
        </radialGradient>
        <radialGradient id="logoMagenta" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(255,0,255,1)" />
          <stop offset="100%" stopColor="rgba(255,0,255,0.2)" />
        </radialGradient>
        <radialGradient id="logoGreen" cx="50%" cy="50%">
          <stop offset="0%" stopColor="rgba(16,185,129,1)" />
          <stop offset="100%" stopColor="rgba(16,185,129,0.2)" />
        </radialGradient>

        {/* Dotted flow lines */}
        <style>{`
          .flow { stroke-dasharray: 6 10; animation: dash 5s linear infinite; }
          @keyframes dash { to { stroke-dashoffset: -500; } }
          .soft { filter: drop-shadow(0 0 6px rgba(255,255,255,.25)); }
          text { font-family: Horizon, ui-sans-serif, system-ui; letter-spacing:.03em }
        `}</style>
      </defs>

      {/* Titles (optional small labels) */}
      <text x="120" y="70" fill="#9ca3af" fontSize="12">Channel sources</text>
      <text x="1040" y="70" fill="#9ca3af" fontSize="12" textAnchor="end">Signals from viewer</text>
      <text x="1080" y="400" fill="#9ca3af" fontSize="12" textAnchor="end">Personalised channels</text>

      {/* Left incoming flows (channels) */}
      {[ "inL1","inL2","inL3","inL4" ].map((id, i) => (
        <g key={id}>
          <use href={`#${id}`} stroke="rgba(0,240,255,.45)" strokeWidth="2" fill="none" className="flow soft" />
          {/* Logo blobs (replace with <image href="/media/channels/xyz.png" /> if you want real logos) */}
          <circle r="16" fill="url(#logoCyan)">
            <animateMotion dur={`${4 + i * 0.4}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Right incoming flows (biometric & behaviour) */}
      {[ "inR1","inR2","inR3","inR4" ].map((id, i) => (
        <g key={id}>
          <use href={`#${id}`} stroke="rgba(255,0,255,.45)" strokeWidth="2" fill="none" className="flow soft" />
          <circle r="10" fill="url(#logoMagenta)">
            <animateMotion dur={`${4.4 + i * 0.5}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* IntuiTV processing box */}
      <rect x="500" y="180" width="200" height="160" rx="18" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.24)" strokeWidth="2"/>
      <text x="600" y="245" textAnchor="middle" fill="#fff" fontSize="24">IntuiTV</text>
      <text x="600" y="270" textAnchor="middle" fill="#9ca3af" fontSize="12">Personalisation Engine</text>

      {/* Outgoing personalised channels */}
      {[ "out1","out2","out3" ].map((id, i) => (
        <g key={id}>
          <use href={`#${id}`} stroke="rgba(16,185,129,.55)" strokeWidth="2.4" fill="none" className="flow soft" />
          {/* Each becomes a viewer’s personalised channel */}
          <g>
            <circle r="14" fill="url(#logoGreen)">
              <animateMotion dur={`${4 + i * 0.5}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
            {/* simple viewer icon */}
            <g opacity="0.9">
              <circle cx="0" cy="-28" r="6" fill="rgba(255,255,255,.85)">
                <animateMotion dur={`${4 + i * 0.5}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#${id}`} />
                </animateMotion>
              </circle>
              <rect x="-8" y="-20" width="16" height="10" rx="4" fill="rgba(255,255,255,.85)">
                <animateMotion dur={`${4 + i * 0.5}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#${id}`} />
                </animateMotion>
              </rect>
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}