"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function IntuiTVPage() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Channels />
      <Platforms />
      <BiometricsAndMood />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/media/intuitv-hero.jpg" alt="IntuiTV – Smart TV, Made Personal" fill priority className="object-cover object-center opacity-60"/>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80"/>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 text-center">
        <motion.h1 initial={{opacity:0, y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="font-horizon text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">IntuiTV</motion.h1>
        <motion.p initial={{opacity:0, y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6, delay:.1}} className="mt-5 text-white/80 max-w-2xl mx-auto font-glacial">
          The first truly personal TV channel — a 24/7 stream broadcast just for you, adapting to your <b>mood</b>, <b>context</b>, and <b>household</b> in real time.
        </motion.p>
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:.6, delay:.25}} className="mt-8 flex items-center justify-center gap-3">
          <Link href="#how" className="btn btn-primary">How it works</Link>
          <Link href="#download" className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">Get the app</Link>
        </motion.div>
      </div>
    </section>
  );
}

function Channels() {
  const logos = [
    "/media/channels/genbtv-placeholder.png", // TODO replace with real logo
    "/media/channels/genbmovies-placeholder.png",
    "/media/channels/pridetv-placeholder.png",
    "/media/channels/dstv-placeholder.png",
    "/media/channels/hispanic-placeholder.png",
  ];
  return (
    <section id="channels" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Channel partners</h2>
        <p className="mt-3 text-white/70 font-glacial">Leading channels power your personal stream.</p>
        <div className="mt-8 overflow-hidden border border-white/10 rounded-2xl bg-white/[0.03]">
          <div className="flex w-[200%] ticker p-4">
            {[...logos, ...logos].map((src, i) => (
              <img key={i} src={src} alt="Channel Logo" className="h-10 sm:h-12 w-auto opacity-90" />
            ))}
          </div>
        </div>
        <div className="mt-10 relative h-40">
          {logos.slice(0,4).map((src, i) => (
            <motion.img key={src} src={src} alt="logo"
              className="absolute h-10 w-auto left-1/2 top-1/2"
              initial={{ x: [-160,160,0,0][i], y: [0,0,-90,90][i], opacity:0 }}
              whileInView={{ x:0, y:0, opacity:1 }} viewport={{ once:true }}
              transition={{ duration:.9, delay:.2 * i }}
              style={{ transform:"translate(-50%, -50%)" }}
            />
          ))}
          <motion.img src="/media/intuitv-logo-white.svg" alt="IntuiTV" className="absolute h-12 w-auto left-1/2 top-1/2"
            initial={{ scale:.7, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{once:true}} transition={{duration:.9, delay:.9}}
            style={{ transform:"translate(-50%, -50%)" }}
          />
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  const items = [
    { name:"Apple TV", src:"/media/platforms/apple-tv-placeholder.svg" },
    { name:"Amazon Fire TV", src:"/media/platforms/amazon-fire-tv-placeholder.svg" },
    { name:"Roku", src:"/media/platforms/roku-placeholder.svg" },
    { name:"Android TV", src:"/media/platforms/android-tv-placeholder.svg" },
    { name:"Samsung TV", src:"/media/platforms/samsung-tv-placeholder.svg" },
    { name:"LG webOS", src:"/media/platforms/lg-webos-placeholder.svg" },
    { name:"iOS", src:"/media/platforms/ios-placeholder.svg" },
    { name:"Android", src:"/media/platforms/android-placeholder.svg" },
  ];
  return (
    <section id="platforms" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Platforms</h2>
        <p className="mt-3 text-white/70 font-glacial">Works on the TVs and devices you already own.</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {items.map((p) => (
            <div key={p.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-center hover:bg-white/[0.06] transition">
              <img src={p.src} alt={p.name} className="h-8 w-auto opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BiometricsAndMood() {
  return (
    <section id="biometrics" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-horizon">Biometrics & mood</h2>
          <p className="mt-4 text-white/70 font-glacial">With consent, IntuiTV learns from signals like HRV, sleep, activity, time and presence — balancing calm, energy, and context.</p>
          <ul className="mt-6 space-y-2 text-white/80 font-glacial">
            <li>• Optional biometrics — consent-first</li>
            <li>• Behavior + context work great without biometrics</li>
            <li>• Real-time adaptation of schedule</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <Image src="/media/mindmaps/biometric-signals.svg" alt="Biometric signals" width={1200} height={800} className="w-full h-auto object-contain rounded-xl"/>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="section border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-horizon">How it works</h2>
          <p className="mt-4 text-white/70 font-glacial">
            IntuiTV is the first truly personal TV channel — a stream broadcast just to <i>you</i>. Our AI blends your viewing behavior with consented biometric and contextual signals to continuously learn and adapt.
          </p>
          <ul className="mt-6 space-y-2 text-white/80">
            <li>• A unique 24/7 channel per viewer</li>
            <li>• Learns from patterns, preferences, and household presence</li>
            <li>• Context-aware: time, mood, and who’s watching</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <Image src="/media/ai-stream.jpg" alt="IntuiTV pipeline" width={1200} height={800} className="w-full h-auto object-cover rounded-xl"/>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do I get IntuiTV?", a: "Download the IntuiTV app on your TV (Apple TV, Fire TV, Roku, Android TV, Samsung, LG) or on mobile (iOS & Android). Sign in once to start your personal channel." },
    { q: "How do I connect my devices?", a: "Open IntuiTV on your TV, then scan the QR code with the mobile app or enter the short pairing code. Your channel syncs across devices." },
    { q: "Do biometrics have to be enabled?", a: "No. Biometrics are optional and consent-first. IntuiTV still personalizes using your behavior and household context." },
  ];
  return (
    <section id="faq" className="section border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">FAQ</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <summary className="cursor-pointer font-horizon">{f.q}</summary>
              <p className="mt-2 text-white/70 font-glacial">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="section border-t border-white/10 text-center relative overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-horizon">Ready to watch your channel?</h2>
        <p className="mt-3 text-white/70 font-glacial">Download IntuiTV on TV and mobile to start personalizing instantly.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="/download" className="btn btn-primary">Get the app</a>
          <a href="https://www.intuitv.app" target="_blank" className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition">Visit intuitv.app</a>
        </div>
      </div>
    </section>
  );
}
