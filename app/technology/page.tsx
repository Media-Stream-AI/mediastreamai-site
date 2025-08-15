import BiometricSignalsMap from "@/components/AnimatedMindMaps/BiometricSignalsMap";
import PersonaMindMap from "@/components/AnimatedMindMaps/PersonaMindMap";
import {
  personaProductManager,
  personaStudent,
  personaNurse,
  personaRetail,
} from "@/components/AnimatedMindMaps/personas";


export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-20 md:pt-40 md:pb-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-horizon bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          The Technology Behind Media Stream AI
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-white/70 font-glacial">
          Our proprietary platform combines real-time biometric, behavioral, and contextual data with
          in-house AI models to deliver the **world’s first emotionally aware, fully personalized TV channels**.
        </p>
      </section>

      {/* Biometric Signals */}
      <section className="relative z-10 px-6 py-20 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-horizon text-cyan-400 mb-10 text-center">
            Biometric & Mood Signals
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10 text-center font-glacial">
            Our system ingests signals from wearables and apps — including heart rate, HRV,
            sleep quality, and mood — to continuously adapt the channel schedule in real time.
          </p>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <BiometricSignalsMap />
          </div>
        </div>
      </section>

      {/* Behavioral Personas */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-horizon text-purple-400 mb-10 text-center">
            Adaptive Viewer Experiences
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-14 text-center font-glacial">
            Each viewer’s TV channel is **broadcast just for them**.  
            By combining biometric data with **behavioral and contextual signals**, our AI system
            learns and evolves, ensuring programming always matches mood, context, and intent.
          </p>

          {/* Grid of persona maps */}
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <PersonaMindMap {...personaProductManager} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <PersonaMindMap {...personaStudent} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <PersonaMindMap {...personaNurse} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <PersonaMindMap {...personaRetail} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 py-24 bg-gradient-to-b from-black via-purple-900/20 to-black border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-horizon text-cyan-400 mb-8">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-glacial">
            Media Stream AI is the **first truly personal TV network**.  
            Our AI-powered playout engine continuously blends broadcast content, on-demand assets,
            and generated segments into a unique **24/7 channel for each viewer**.  
            Whether you’re preparing for a **romantic evening**, gathering with **family**, or
            relaxing solo, IntuiTV adapts in real time — programming a channel that feels
            like it was **made just for you**.
          </p>
        </div>
      </section>
    </main>
  );
}
