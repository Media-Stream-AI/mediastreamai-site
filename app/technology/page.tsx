"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TechnologyPage() {
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
          Technology
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Content Tagging AI → Knowledge Graph → Real-time preference model → Adaptive playout.
        </p>
      </section>

      {/* Diagram + copy */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl">How it works</h2>
            <ul className="mt-6 space-y-3 text-white/80">
              <li>• <b>Content Tagging AI</b> maps topics, tone, safety and compliance.</li>
              <li>• <b>Signals</b> blend behavior with user-consented biometrics.</li>
              <li>• <b>Real-time preference model</b> is updated during viewing.</li>
              <li>• <b>Adaptive playout</b> generates per-viewer schedules in milliseconds.</li>
            </ul>
            <p className="mt-6 text-white/70">
              We license these components individually or as a full stack, integrating with your existing ad-tech,
              rights, and scheduling systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src="/media/mrf-litterstream-pid.png"
                alt="System diagram"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-on schematic */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image
                src="/media/mrf-addon-schematic.png"
                alt="Add-on schematic"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl">Privacy & Consent</h2>
            <p className="mt-4 text-white/70">
              We only process biometrics when users opt in. Signals are used on-device or aggregated with strict
              retention policies. Our platform includes granular controls for safety classification and regional
              compliance.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}