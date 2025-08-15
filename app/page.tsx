"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Big background image */}
        <div className="absolute inset-0">
          <Image
            src="/media/home-hero.jpg"  // ← replace with your actual hero image path if different
            alt="Media Stream AI – Smart TV, Made Personal"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          {/* Gradient overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(120,180,255,0.12),transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-horizon text-center text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight"
          >
            SMART TV, MADE PERSONAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-center mx-auto max-w-2xl text-base sm:text-lg text-white/80"
          >
            AI-powered TV experiences tailored to every viewer — informed by biometric and behavioral understanding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Link href="/vp-studio" className="btn btn-primary">
              Explore AI VP Studio
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            >
              Talk to us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">What we do</h2>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 — Media Stream AI */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
            >
              <div className="flex items-center gap-3">
                <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/media/logos/msai.png"  // ← drop your PNG into /public/media/logos/
                    alt="Media Stream AI"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="text-lg">Media Stream AI</div>
              </div>
              <p className="mt-3 text-white/70 text-sm">
                AI Powered technology for broadcasters, allowing personalised TV based on viewer Biometric &amp; Behavioral data.
              </p>
            </motion.div>

            {/* Card 2 — IntuiTV */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
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
                <div className="text-lg">IntuiTV</div>
              </div>
              <p className="mt-3 text-white/70 text-sm">
                Our global direct to viewer, personalised TV Platform.
              </p>
            </motion.div>

            {/* Card 3 — Canal Side AI Data Centre */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
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
                <div className="text-lg">Canal Side AI Data Centre</div>
              </div>
              <p className="mt-3 text-white/70 text-sm">
                Our Canal Cleaning &amp; GPU Cooling technology, powering canal restoration alongside our AI GPU Cluster data centre.
              </p>
            </motion.div>

            {/* Card 4 — AI VP Studio (Prototype) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
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
                <div className="text-lg">AI VP Studio</div>
              </div>
              <p className="mt-3 text-white/70 text-sm">
                Our fully AI-controlled Virtual Production Studio (Prototype).
              </p>

              <div className="mt-4">
                <Link
                  href="/vp-studio"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                >
                  Explore the prototype
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">Ready to personalise TV?</h2>
          <p className="mt-4 text-white/70">
            We partner with broadcasters and platforms to deliver AI-powered experiences that feel made for every viewer.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">Contact our team</Link>
        </div>
      </section>
    </div>
  );
}