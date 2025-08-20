"use client";
import Image from "next/image";
import Link from "next/link";
import NextDynamic from "next/dynamic";
import { motion } from "framer-motion";

// Keep this to force dynamic rendering, but avoid clashing with the import above
export const dynamic = "force-dynamic";

// Lazy components (client-side only)
const NeonParticles = NextDynamic(() => import("../../components/NeonParticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 grid-bg" aria-hidden />
});
const AIDirectorWidget = NextDynamic(() => import("../../components/AIDirectorWidget"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/70">
      Loading AI Director…
    </div>
  )
});

export default function VPStudioPage() {
  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-20 md:py-28">
        <NeonParticles />
        <div className="relative max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-horizon"
          >
            AI-Powered Virtual Production Studios
          </motion.h1>
          <p className="mt-4 text-white/70 max-w-3xl mx-auto font-glacial">
            Cost-efficient virtual stages with AI Director: automated shot lists, lighting presets,
            and on-set continuity.
          </p>
          <div className="mt-8">
            <Link href="/robotics" className="btn btn-primary">Explore Robotics →</Link>
          </div>
        </div>
      </section>

      {/* Stage + Director */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden">
            <NeonParticles />
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/media/vp-studio-mockup.jpg"
                alt="VP Studio stage"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm font-glacial">Stage concept</p>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden">
            <NeonParticles />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-horizon">Speak to our Director</h3>
                <p className="mt-2 text-white/70 text-sm font-glacial">
                  Turn on your microphone to chat with the Virtual Director. Try: <em>“Let’s create a music video”</em> or{" "}
                  <em>“I want a corporate video.”</em>
                </p>
              </div>
              <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs leading-5">
                <div className="opacity-80">Mic access</div>
                <div className="opacity-60">Click <strong>Talk via Microphone</strong> → Allow</div>
              </div>
            </div>
            <div className="mt-6">
              <AIDirectorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">What’s inside</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "AI Director", d: "Shot planning, continuity checks, take scoring." },
              { t: "Robotic Camera System", d: "Fully automated robotic cameras deliver precision shots, tracking, and smooth movements without manual operators." },
              { t: "Virtual Sets", d: "Immersive, real-time rendered sets designed for broadcast and streaming environments." },
              { t: "On-set Inference", d: "Object/person tracking and safety flags." },
              { t: "Cloud Rendering", d: "Burst rendering on our GPU clusters." },
              { t: "Editorial Exports", d: "EDL/AAF/OTIO to your NLE." }
            ].map((f) => (
              <div key={f.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-lg font-horizon">{f.t}</div>
                <p className="mt-2 text-white/70 text-sm font-glacial">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-horizon">See the Studio</h2>
          <p className="mt-4 text-white/70 font-glacial">
            Book a walkthrough and discover how AI cuts cost and time from pre-vis to final pixel.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="/contact" className="btn btn-primary">Talk to our team</a>
            <Link href="/robotics" className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">
              Explore Robotics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}