"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Dynamic import for the AI Director widget
const AIDirector = dynamic(() => import("./widgets/AIDirector"), {
  ssr: false,
  loading: () => <div className="text-white text-center">Loading AI Director...</div>,
});

export default function VPStudioPage() {
  const [showDirector, setShowDirector] = useState(true);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/vp-studio-hero.jpg" // <-- Replace with your original hero image
            alt="AI Virtual Production Studio"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-horizon">
            AI Virtual Production Studio
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto font-glacial">
            Real-time AI Director with face and voice interaction — produce shows, ads, and interactive media instantly.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#director" className="btn btn-primary">Launch AI Director</a>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* AI DIRECTOR WIDGET */}
      <section id="director" className="section border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-horizon mb-4">AI Director</h2>
          <p className="text-white/70 mb-8 font-glacial">
            Speak or type instructions — the AI Director responds with both
            voice and avatar reactions while controlling your virtual set.
          </p>

          {showDirector ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
              <AIDirector />
            </div>
          ) : (
            <div className="text-white/50 italic">AI Director disabled.</div>
          )}

          <button
            onClick={() => setShowDirector(!showDirector)}
            className="mt-6 text-sm text-white/70 hover:text-white underline"
          >
            {showDirector ? "Hide Director" : "Show Director"}
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Real-Time Interaction",
              text: "Voice and face-driven AI for directing scenes live.",
            },
            {
              title: "Scene Control",
              text: "Change sets, lighting, and actors instantly using natural language.",
            },
            {
              title: "Production Ready",
              text: "Export video, audio, and scripts for professional workflows.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="font-horizon text-lg">{f.title}</h3>
              <p className="mt-2 text-white/70 text-sm font-glacial">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section border-t border-white/10 text-center">
        <h2 className="text-3xl font-horizon">Want a private AI Director setup?</h2>
        <p className="mt-3 text-white/70 font-glacial">
          We can integrate AI Directors into your virtual production pipeline or data-sovereign facilities.
        </p>
        <Link href="/contact" className="btn btn-primary mt-6">Contact our team</Link>
      </section>
    </main>
  );
}