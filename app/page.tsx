"use client";

import Particles from "../components/Particles";
import { motion } from "framer-motion";
import { Section, Container, Card, H2, Lead, Grid, GradientHeadline } from "../components/Blocks";
import { GridBackground } from "../components/Effects";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "80vh" }}>
     <motion.img
  src="/media/biometric-hero.png"
  alt=""
  className="absolute inset-0 w-full h-full object-cover opacity-60"
  initial={{ scale: 1.05 }}
  animate={{ scale: 1 }}
  transition={{ duration: 2.5, ease: "easeOut" }}
/>
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 40% at 50% 80%, rgba(34,211,238,.15), transparent 60%), rgba(0,0,0,0.55)" }} />
        <Particles density={0.0001} />
        <GridBackground />

        <div className="relative mx-auto max-w-7xl px-6 text-center py-28">
          <motion.h1
            className="text-4xl md:text-6xl font-semibold gradient-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            Smart TV, Made Personal.
          </motion.h1>

          <motion.p
            className="mt-5 text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            Hyper-personalized, emotionally aware television across all platforms.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <a href="/technology" className="bg-white text-black px-5 py-3 rounded-2xl inline-flex items-center gap-2">Explore the Platform</a>
            <a href="/solutions" className="bg-white/10 px-5 py-3 rounded-2xl">See how it works</a>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS */}
      <Section className="border-t-0">
        <Container>
          <H2><GradientHeadline>What is Media Stream AI?</GradientHeadline></H2>
          <Lead>
            Media Stream AI blends broadcast-grade playout with proprietary in-house LLMs to deliver fully personalized live TV streams.
            We license our technology to broadcasters and content owners globally across live, VOD, and FAST.
          </Lead>

          <Grid cols="lg:grid-cols-4">
            <Card className="p-6"><div className="text-white/90">Proprietary LLMs</div><div className="mt-2 text-white/70 text-sm">Trained for media tasks</div></Card>
            <Card className="p-6"><div className="text-white/90">Adaptive Playout</div><div className="mt-2 text-white/70 text-sm">Per-viewer schedules</div></Card>
            <Card className="p-6"><div className="text-white/90">Content Tagging AI</div><div className="mt-2 text-white/70 text-sm">Topics • Tone • Safety</div></Card>
            <Card className="p-6"><div className="text-white/90">Broadcast-Grade</div><div className="mt-2 text-white/70 text-sm">Live • VOD • FAST</div></Card>
          </Grid>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Container>
          <H2><GradientHeadline>How it works</GradientHeadline></H2>
          <Lead>AI tagging + knowledge graph + behavioral & opt-in biometric signals feed a real-time preference model that drives adaptive playout.</Lead>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-10">
            <div>
              <ul className="space-y-2 text-white/80">
                <li>• Content Tagging AI maps topics, tone, and compliance</li>
                <li>• Personalization blends behavior with user-consented biometrics</li>
                <li>• Adaptive playout generates schedules in milliseconds</li>
              </ul>
            </div>
            <Card className="p-6">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
                <img src="/media/mrf-litterstream-pid.png" alt="System diagram" className="w-full h-full object-cover" />
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ECOSYSTEM */}
      <Section>
        <Container>
          <H2><GradientHeadline>Ecosystem</GradientHeadline></H2>
          <Grid>
            <a href="https://www.intuitv.app" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="/media/intuitv-colourful.jpg" alt="IntuiTV" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-sm uppercase tracking-wider text-white/60">Initiative</div>
                  <div className="mt-2 text-xl">IntuiTV — Personalized Channels</div>
                  <p className="mt-2 text-white/70">Our consumer brand for mood-aware live TV.</p>
                </div>
              </Card>
            </a>

            <a href="/datacentre" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="/media/datacentre-office.png" alt="Data Centre" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-sm uppercase tracking-wider text-white/60">Initiative</div>
                  <div className="mt-2 text-xl">Canal-Side AI Data Centre</div>
                  <p className="mt-2 text-white/70">Sustainable, canal-cooled compute powering our AI.</p>
                </div>
              </Card>
            </a>

            <a href="/vp-studio" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img src="/media/vp-studio-mockup.jpg" alt="VP Studio" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-sm uppercase tracking-wider text-white/60">Initiative</div>
                  <div className="mt-2 text-xl">AI-Powered VP Studios</div>
                  <p className="mt-2 text-white/70">Cost-efficient virtual stages with AI Director.</p>
                </div>
              </Card>
            </a>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
