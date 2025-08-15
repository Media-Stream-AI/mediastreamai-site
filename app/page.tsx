"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Gauge, Film, Cpu } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Ecosystem is now above “What is Media Stream AI?” */}
      <EcosystemSection />
      <WhatIsSection />
      <HowItWorksSection />
    </>
  );
}

/* -------------------------------
   Sections
-------------------------------- */

function HeroSection() {
  return (
    <section className="h-[90vh] grid place-items-center relative overflow-hidden">
      {/* Background hero image */}
      <Image
        src="/media/biometric-hero.png"
        alt="Biometric personalization"
        fill
        className="absolute inset-0 object-cover opacity-60"
        priority
      />
      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-horizon"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Smart TV, Made Personal.
        </motion.h1>
        <motion.p
          className="mt-4 text-white/70 font-glacial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Hyper-personalized, emotionally aware television across all platforms.
        </motion.p>
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-3 font-glacial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <a
            href="/technology"
            className="bg-white text-black px-5 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 transition"
          >
            Explore the Platform <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/solutions" className="bg-white/10 px-5 py-3 rounded-2xl hover:bg-white/20 transition">
            See how it works
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <motion.div
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
      >
        <EcosystemCard
          title="IntuiTV — Personalized Channels"
          desc="Our consumer brand for mood-aware live TV."
          href="https://www.intuitv.app"
          cta="Visit intuitv.app"
          image="/media/intuitv-colourful.jpg"
        />
        <EcosystemCard
          title="Canal-Side AI Data Centre"
          desc="Sustainable, canal-cooled compute powering our AI."
          href="/datacentre"
          cta="Explore Data Centre"
          image="/media/ai-data-centre-white.png"
        />
        <EcosystemCard
          title="AI-Powered VP Studios"
          desc="Cost-efficient virtual stages with AI Director."
          href="/vp-studio"
          cta="See the Studio"
          image="/media/virtual-production-studio-mockup.png"
        />
      </motion.div>
    </section>
  );
}

function WhatIsSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h2 className="text-3xl font-horizon">What is Media Stream AI?</h2>
      <p className="mt-4 text-white/70 max-w-3xl font-glacial">
        Media Stream AI blends broadcast-grade playout with proprietary in-house LLMs to deliver fully personalized
        live TV streams. We license our technology to broadcasters and content owners globally across live, VOD, and FAST.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Feature icon={<Cpu className="h-5 w-5" />} title="Proprietary LLMs" desc="Trained for media tasks" />
        <Feature icon={<Gauge className="h-5 w-5" />} title="Adaptive Playout" desc="Per-viewer schedules" />
        <Feature icon={<Sparkles className="h-5 w-5" />} title="Content Tagging AI" desc="Topics • Tone • Safety" />
        <Feature icon={<Film className="h-5 w-5" />} title="Broadcast-Grade" desc="Live • VOD • FAST" />
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-horizon">How it works</h2>
          <p className="mt-4 text-white/70 font-glacial">
            AI tagging + knowledge graph + behavioral & opt-in biometric signals feed a real-time preference model that
            drives adaptive playout.
          </p>
          <ul className="mt-6 space-y-2 text-white/80 font-glacial">
            <li>• Content Tagging AI maps topics, tone, and compliance</li>
            <li>• Personalization blends behavior with user-consented biometrics</li>
            <li>• Adaptive playout generates schedules in milliseconds</li>
          </ul>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-white/10 p-6 bg-white/[0.03]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/media/mrf-litterstream-pid.png"
            alt="Content flow diagram"
            width={900}
            height={360}
            className="rounded-xl w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------
   Small UI helpers
-------------------------------- */

function EcosystemCard({
  title,
  desc,
  href,
  cta,
  image,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  image: string;
}) {
  return (
    <motion.a
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 block hover:bg-white/[0.06] transition relative overflow-hidden"
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
      whileHover={{ scale: 1.02 }}
    >
      {/* subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl" />
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="rounded-xl mb-4 relative z-10 w-full h-auto object-cover"
      />
      <div className="text-sm uppercase tracking-wider text-white/60 font-glacial relative z-10">Initiative</div>
      <div className="mt-2 text-xl font-horizon relative z-10">{title}</div>
      <p className="mt-2 text-white/70 font-glacial relative z-10">{desc}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-white/80 group-hover:text-white font-glacial relative z-10">
        {cta} <ArrowRight className="h-4 w-4" />
      </div>
    </motion.a>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 p-4 bg-white/[0.03]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 text-white/90">
        <span className="rounded-lg bg-white/10 p-2">{icon}</span>
        <span className="font-horizon">{title}</span>
      </div>
      <div className="mt-2 text-sm text-white/70 font-glacial">{desc}</div>
    </motion.div>
  );
}