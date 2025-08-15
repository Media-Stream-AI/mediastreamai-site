"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SolutionsPage() {
  const items = [
    {
      key: "tagging",
      title: "Content Tagging AI Model",
      tagline: "Automated metadata enrichment for faster, smarter media workflows.",
      logo: "/media/logos/solutions/tagging.png", // put your PNG here
      href: "/contact",
    },
    {
      key: "personalisation",
      title: "Content Personalisation AI Model",
      tagline: "Real-time recommendations that adapt to mood, context, and behavior.",
      logo: "/media/logos/solutions/personalisation.png",
      href: "/contact",
    },
    {
      key: "hls",
      title: "AI Powered HLS Playout System",
      tagline: "Dynamic broadcast playout that responds to every viewer.",
      logo: "/media/logos/solutions/hls.png",
      href: "/contact",
    },
    {
      key: "vpstudio",
      title: "Autonomous // Robotic AI Powered VP Studio",
      tagline: "A fully AI-directed virtual production studio — from script to screen.",
      logo: "/media/logos/solutions/vpstudio.png",
      href: "/vp-studio",
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          Solutions
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Applied AI for broadcasters: from understanding content to personalising playout and fully autonomous virtual production.
        </p>
      </section>

      {/* Solutions grid */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                    <Image
                      src={s.logo}
                      alt={s.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-lg">{s.title}</div>
                </div>

                <p className="mt-3 text-white/70 text-sm flex-1">{s.tagline}</p>

                <div className="mt-4">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    {s.href === "/vp-studio" ? "Explore the prototype" : "Talk to our team"}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">Ready to deploy intelligent TV?</h2>
          <p className="mt-4 text-white/70">
            Let’s integrate tagging, personalisation, and adaptive playout — or see our autonomous VP Studio in action.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
