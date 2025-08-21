"use client";

import Image from "next/image";
import Link from "next/link";

export default function IntuiTVPage() {
  return (
    <main className="bg-black text-white">
      {/* HERO with animated SVG */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">IntuiTV</h1>
          <p className="mt-4 text-white/80 max-w-3xl mx-auto font-glacial">
            Real-time AI personalisation turns 100s of channels + your biometric and behavioural signals into one perfect, personalised TV stream.
          </p>

          {/* Animated SVG Hero */}
          <div className="mt-10 flex justify-center">
            <svg
              className="w-full max-w-5xl"
              viewBox="0 0 1200 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Channel Logos Flowing In */}
              <g className="channels-in">
                {[...Array(6)].map((_, i) => (
                  <circle
                    key={i}
                    cx={100}
                    cy={80 + i * 60}
                    r="24"
                    fill="#00f0ff"
                  >
                    <animate
                      attributeName="cx"
                      from="100"
                      to="550"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.2}s`}
                    />
                  </circle>
                ))}
              </g>

              {/* IntuiTV Box */}
              <rect
                x="500"
                y="150"
                width="200"
                height="200"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                rx="16"
              />
              <text
                x="600"
                y="260"
                textAnchor="middle"
                fill="#fff"
                fontSize="24"
                fontFamily="Horizon"
              >
                IntuiTV
              </text>

              {/* Viewer Signals Flowing In */}
              <g className="signals-in">
                {[...Array(4)].map((_, i) => (
                  <circle
                    key={i}
                    cx={1100}
                    cy={100 + i * 80}
                    r="10"
                    fill="#ff00ff"
                  >
                    <animate
                      attributeName="cx"
                      from="1100"
                      to="700"
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </circle>
                ))}
              </g>

              {/* Personalised Channels Flowing Out */}
              <g className="channels-out">
                {[...Array(5)].map((_, i) => (
                  <circle
                    key={i}
                    cx={700}
                    cy={120 + i * 70}
                    r="20"
                    fill="#00ff88"
                  >
                    <animate
                      attributeName="cx"
                      from="700"
                      to="1050"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${i * 0.25}s`}
                    />
                  </circle>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Existing Platform Info */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-horizon">Platforms</h2>
          <p className="mt-3 text-white/70 font-glacial">
            IntuiTV is available across Connected TVs, Mobile, and Web platforms, delivering personalised streams in real-time.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: "Roku", img: "/media/logos/roku.png" },
              { name: "Fire TV", img: "/media/logos/firetv.png" },
              { name: "Android TV", img: "/media/logos/androidtv.png" },
              { name: "Samsung", img: "/media/logos/samsung.png" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-center"
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  width={80}
                  height={80}
                  className="h-10 w-auto"
                />
                <div className="mt-2 text-sm font-glacial">{p.name}</div>
              </div>
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
          <Link href="/contact" className="btn btn-primary mt-6">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}