"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/media/home-hero.jpg"
            alt="TECHNOLOGY SHAPED BY HUMAN CREATIVITY"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(120,180,255,0.12),transparent_60%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-36">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              font-horizon text-center leading-[1.05] tracking-tight
              text-balance break-words hyphens-auto
              text-3xl xs:text-4xl sm:text-5xl md:text-7xl
              max-w-[20ch] sm:max-w-5xl mx-auto
            "
          >
          TECHNOLOGY SHAPED BY, <br className="sm:hidden" />
            <span className="sm:whitespace-nowrap">HUMAN CREATIVITY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-center mx-auto max-w-[35ch] sm:max-w-2xl text-base sm:text-lg text-white/80 font-glacial"
          >
          Our technology amplifies human creativity,automating production, personalization, and data intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/vp-studio" className="btn btn-primary">Explore AI VP Studio</Link>
            <Link href="/intuitv" className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">Explore IntuiTV</Link>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-balance break-words font-horizon">
            What we do
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            {[
              {
                key: "msai",
                title: "Media Stream AI",
                desc:
                  "AI Powered technology for broadcasters, allowing personalised TV based on viewer Biometric & Behavioral data.",
                href: "/technology",
                logo: "/media/logos/msai.png"
              },
              {
                key: "intuitv",
                title: "IntuiTV",
                desc: "Our global direct to viewer, personalised TV Platform.",
                href: "/intuitv",
                external: true,
                logo: "/media/logos/intuitv.png"
              },
              {
                key: "canal",
                title: "Canal Side AI Data Centre",
                desc:
                  "Our Canal Cleaning & GPU Cooling technology powering canal restoration alongside our AI GPU Cluster data centre.",
                href: "/data-centre",
                logo: "/media/logos/canal-side.png"
              },
              {
                key: "vp",
                title: "AI VP Studio",
                desc: "Our fully AI-controlled Virtual Production Studio (Prototype).",
                href: "/vp-studio",
                logo: "/media/logos/ai-director.png"
              }
            ].map((card) => (
              <div key={card.key} className="relative min-h-[180px] rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src={card.logo} alt={card.title} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="text-lg font-horizon">{card.title}</div>
                </div>
                <p className="mt-3 text-white/70 text-sm font-glacial">{card.desc}</p>
                <div className="mt-4">
                  {card["external"] ? (
                    <a href={card.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                      Explore <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link href={card.href} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                      Explore <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-balance font-horizon">
            Ready to personalise TV?
          </h2>
          <p className="mt-4 text-white/70 text-balance break-words font-glacial">
            We partner with broadcasters and platforms to deliver AI-powered experiences that feel made for every viewer.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">Contact our team</Link>
        </div>
      </section>
    </div>
  );
}
