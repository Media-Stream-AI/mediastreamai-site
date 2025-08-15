"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
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
          About Media Stream AI
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Building personalized, emotionally-aware television for broadcasters and content owners worldwide.
        </p>
      </section>

      {/* Mission */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl">Who we are</h2>
            <p className="mt-4 text-white/70">
              Media Stream AI blends broadcast-grade playout with in-house LLMs to deliver fully personalized live TV
              across live, VOD, and FAST. We license modular capabilities so partners can use exactly what they need.
            </p>
            <ul className="mt-6 text-white/80 space-y-2">
              <li>• Proprietary media LLMs</li>
              <li>• Consent-first behavioral & biometric signals</li>
              <li>• Real-time adaptive playout</li>
              <li>• Broadcast-grade safety & compliance</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <Image
              src="/media/intuitv-colourful.jpg"
              alt="IntuiTV visual"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">Our ecosystem</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="IntuiTV"
              desc="Consumer product for mood-aware live TV."
              image="/media/intuitv-colourful.jpg"
              href="https://www.intuitv.app"
            />
            <Card
              title="Canal-Side AI Data Centre"
              desc="Sustainable, canal-cooled compute powering our AI."
              image="/media/datacentre-office.png"
              href="/datacentre"
            />
            <Card
              title="AI-Powered VP Studios"
              desc="Virtual production stages with AI Director pipeline."
              image="/media/vp-studio-mockup.jpg"
              href="/vp-studio"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ title, desc, image, href }: { title: string; desc: string; image: string; href: string }) {
  return (
    <a href={href} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden block card-glow">
      <div className="aspect-video w-full overflow-hidden">
        <Image src={image} alt={title} width={800} height={450} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="text-sm uppercase tracking-wider text-white/60">Initiative</div>
        <div className="mt-2 text-xl">{title}</div>
        <p className="mt-2 text-white/70">{desc}</p>
      </div>
    </a>
  );
}