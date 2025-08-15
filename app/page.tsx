"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BiometricSignalsMap,
  PersonaMindMap,
  personaStudent,
  personaNurse,
  personaRetail,
} from "@/components/AnimatedMindMaps";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <WhatWeDo />
      <Channels />
      <Platforms />
      <BiometricsAndMood />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
}

/* -----------------------------------
   HERO (cinematic bg + IntuiTV copy)
------------------------------------ */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Big background image */}
      <div className="absolute inset-0">
        <Image
          src="/media/home-hero.jpg" // or /media/intuitv-hero.jpg — ensure the file exists
          alt="IntuiTV — Smart TV, Made Personal"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(120,180,255,0.12),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-horizon text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight"
        >
          Your Personal TV Channel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-white/80 font-glacial"
        >
          IntuiTV learns your mood, context, and household to adapt what’s on — in real time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link href="/download" className="btn btn-primary">
            Get the App
          </Link>
          <a
            href="#how"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          >
            How it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------
   WHAT WE DO (card quartet)
---------------------------- */
function WhatWeDo() {
  return (
    <section className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">What we do</h2>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 — Media Stream AI */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                <Image
                  src="/media/logos/msai.png"
                  alt="Media Stream AI"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-horizon">Media Stream AI</div>
            </div>
            <p className="mt-3 text-white/70 text-sm font-glacial">
              AI technology for broadcasters enabling personalised TV based on viewer biometric &amp; behavioral data.
            </p>
          </motion.div>

          {/* Card 2 — IntuiTV */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                <Image
                  src="/media/logos/intuitv.png"
                  alt="IntuiTV"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-horizon">IntuiTV</div>
            </div>
            <p className="mt-3 text-white/70 text-sm font-glacial">
              Our consumer-facing, personalised TV platform.
            </p>
          </motion.div>

          {/* Card 3 — Canal Side AI Data Centre */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                <Image
                  src="/media/logos/canal-side.png"
                  alt="Canal Side AI Data Centre"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-horizon">Canal Side AI Data Centre</div>
            </div>
            <p className="mt-3 text-white/70 text-sm font-glacial">
              Canal cleaning &amp; water-cooled GPU clusters powering sustainable AI compute.
            </p>
          </motion.div>

          {/* Card 4 — AI VP Studio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-center gap-3">
              <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                <Image
                  src="/media/logos/ai-director.png"
                  alt="AI VP Studio"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-horizon">AI VP Studio</div>
            </div>
            <p className="mt-3 text-white/70 text-sm font-glacial">
              AI-directed virtual production studio (prototype).
            </p>
            <div className="mt-4">
              <Link href="/vp-studio" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                Explore the prototype <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------
   CHANNEL PARTNERS (ticker + merge anim)
---------------------------------------- */
function Channels() {
  // Replace with your real logos in /public/media/channels/
  const logos = [
    "/media/channels/genbtv.png",
    "/media/channels/genbmovies.png",
    "/media/channels/pridetv.png",
    "/media/channels/dstv.png",
    "/media/channels/hispanic.png",
  ];

  return (
    <section id="channels" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Channel Partners</h2>
        <p className="mt-3 text-white/70 font-glacial">
          IntuiTV brings together leading channels to create a truly personal lineup.
        </p>

        {/* Ticker */}
        <div className="mt-8 overflow-hidden border border-white/10 rounded-2xl bg-white/[0.03]">
          <div className="flex w-[200%] ticker p-4">
            {[...logos, ...logos].map((src, i) => (
              <img key={i} src={src} alt="Channel Logo" className="h-10 sm:h-12 w-auto opacity-90" />
            ))}
          </div>
        </div>

        {/* Merge animation into IntuiTV mark */}
        <div className="mt-10 relative h-40">
          {logos.slice(0, 4).map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt="logo"
              className="absolute h-10 w-auto left-1/2 top-1/2"
              initial={{ x: [-150, 150, 0, 0][i], y: [0, 0, -80, 80][i], opacity: 0 }}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 * i }}
              style={{ transform: "translate(-50%, -50%)" }}
            />
          ))}
          <motion.img
            src="/media/intuitv-logo-white.svg"
            alt="IntuiTV"
            className="absolute h-12 w-auto left-1/2 top-1/2"
            initial={{ scale: 0.7, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.9 }}
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------
   PLATFORMS GRID (replace logos)
------------------------------ */
function Platforms() {
  const items = [
    { name: "Apple TV", src: "/media/platforms/apple-tv.svg" },
    { name: "Amazon Fire TV", src: "/media/platforms/amazon-fire-tv.svg" },
    { name: "Roku", src: "/media/platforms/roku.svg" },
    { name: "Android TV", src: "/media/platforms/android-tv.svg" },
    { name: "Samsung TV", src: "/media/platforms/samsung-tv.svg" },
    { name: "LG webOS", src: "/media/platforms/lg-webos.svg" },
    { name: "iOS", src: "/media/platforms/ios.svg" },
    { name: "Android", src: "/media/platforms/android.svg" },
  ];

  return (
    <section id="platforms" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Platforms</h2>
        <p className="mt-3 text-white/70 font-glacial">Works on the TVs and devices you already own.</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center hover:bg-white/[0.06] transition"
            >
              <img src={p.src} alt={p.name} className="h-8 w-auto opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------
   BIOMETRICS & MOOD (animated SVG mind-maps)
------------------------------------------------- */
function BiometricsAndMood() {
  return (
    <section id="biometrics" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Biometrics & Mood</h2>
        <p className="mt-4 text-white/70 max-w-3xl font-glacial">
          With consent, IntuiTV learns from signals like heart-rate variability, sleep quality, activity,
          time of day, and household presence — balancing calm, energy, and context.
        </p>

        {/* Biometric signals map */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <BiometricSignalsMap />
        </div>

        {/* Persona examples */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap {...personaStudent} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap {...personaNurse} />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-2">
            <PersonaMindMap {...personaRetail} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------
   HOW IT WORKS (focus: a channel just for you)
-------------------------------------------------- */
function HowItWorks() {
  return (
    <section id="how" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-horizon">How it works</h2>
          <p className="mt-4 text-white/70 font-glacial">
            IntuiTV is the first truly personal TV channel — a stream broadcast just to <i>you</i>.{" "}
            Our AI blends your viewing behavior with consented biometric and contextual signals
            to continuously learn and adapt. The lineup updates in real-time as your context changes.
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>• A unique 24/7 channel per viewer</li>
            <li>• Learns from patterns, preferences, and household presence</li>
            <li>• Context-aware: time, mood, and who’s watching</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm uppercase text-white/60 mb-3 font-glacial">Examples</div>
          <div className="space-y-3 text-white/80 font-glacial">
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
  );
}

/* -----------------------------
   FAQ (expanded for apps)
------------------------------ */
function FAQ() {
  const faqs = [
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
      a: "No. Biometrics are optional and consent-first. IntuiTV still personalizes using your behavior and household context.",
    },
  ];

  return (
    <section id="faq" className="section border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">FAQ</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border border-white/10 rounded-2xl bg-white/[0.03]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between"
      >
        <span className="font-horizon">{q}</span>
        <span className="text-white/60">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-white/70 font-glacial">{a}</div>}
    </div>
  );
}

/* -----------
   CTA
------------ */
function CTA() {
  return (
    <section className="section border-t border-white/10 text-center relative overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Ready to watch your channel?</h2>
        <p className="mt-3 text-white/70 font-glacial">
          Download the IntuiTV app on TV and mobile to start personalizing instantly.
        </p>
        <Link href="/download" className="btn btn-primary mt-6">
          Get the App
        </Link>
      </div>
    </section>
  );
}
