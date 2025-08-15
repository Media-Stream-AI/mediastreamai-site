"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          Media Stream AI
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Next-generation AI for television and virtual production — personalized channels, AI-powered playout, and immersive VP studios.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/vp-studio" className="btn btn-primary">
            Explore VP Studio
          </Link>
          <Link href="/technology" className="btn border border-white/20 rounded-xl px-4 py-2">
            Technology
          </Link>
        </div>

        {/* Subtle background art */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="0.4" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Highlights / Features (icon placeholders are inline SVGs, no lucide-react) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">What we do</h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Director",
                desc: "On-set creative assistant for VP — questioning, planning, take scoring.",
              },
              {
                title: "Personalized TV",
                desc: "Live, adaptive channels powered by in-house models and data signals.",
              },
              {
                title: "Virtual Production",
                desc: "LED volume workflows, Unreal sets, robotic camera choreography.",
              },
              {
                title: "Playout Technology",
                desc: "Low-latency, data-driven scheduling across CTV platforms.",
              },
              {
                title: "Editorial Tools",
                desc: "EDL/AAF/OTIO exports, scripted shot lists, continuity checks.",
              },
              {
                title: "Cloud + GPU",
                desc: "Burst rendering and scalable inference on GPU infrastructure.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
              >
                {/* Icon placeholder (inline SVG). Replace or restyle anytime. */}
                <div className="mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-70" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-lg">{card.title}</div>
                <p className="mt-2 text-white/70 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual row (update images if paths differ) */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/media/vp-studio-mockup.jpg"
                alt="VP Studio stage"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <p className="mt-3 text-white/70 text-sm">AI-Powered VP Studio</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/media/ai-powered-vp-diagram.png"
                alt="AI Director pipeline"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm">AI Director pipeline</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">See the Studio</h2>
          <p className="mt-4 text-white/70">
            Book a walkthrough and discover how AI cuts cost and time from pre-vis to final pixel.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Talk to our team
          </Link>
        </div>
      </section>
    </main>
  );
}
