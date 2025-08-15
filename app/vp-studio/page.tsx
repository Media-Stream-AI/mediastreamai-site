"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// If you added the interactive block:
import AIDirectorWidget from "@/components/AIDirectorWidget"; // or remove this line if not using yet

export default function VPStudioPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          AI-Powered Virtual Production Studios
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Cost-efficient virtual stages with AI Director: automated shot lists, lighting presets, and on-set continuity.
        </p>
      </section>

      {/* Studio visual + pipeline */}
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
            <p className="mt-3 text-white/70 text-sm">Stage concept</p>
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

      {/* Feature grid */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">What’s inside</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "AI Director", d: "Shot planning, continuity checks, take scoring." },
              { t: "Lighting Presets", d: "Scene-aware LUTs & DMX cue sheets." },
              { t: "Virtual Scenery", d: "Procedural sets and live parallax." },
              { t: "On-set Inference", d: "Object/person tracking and safety flags." },
              { t: "Cloud Rendering", d: "Burst rendering on our GPU clusters." },
              { t: "Editorial Exports", d: "EDL/AAF/OTIO to your NLE." }
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
              >
                <div className="text-lg">{f.t}</div>
                <p className="mt-2 text-white/70 text-sm">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speak To Our Director (optional new section) */}
      {/* Remove this whole section if you don't want the interactive block here yet */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl mb-6">Speak To Our Director</h2>
          {/* Ensure this component exists, or comment it out */}
          <AIDirectorWidget />
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">See the Studio</h2>
          <p className="mt-4 text-white/70">
            Book a walkthrough and discover how AI cuts cost and time from pre-vis to final pixel.
          </p>
          <a href="/contact" className="btn btn-primary mt-6">Talk to our team</a>
        </div>
      </section>
    </div>
  );
}