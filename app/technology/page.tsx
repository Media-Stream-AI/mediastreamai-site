"use client";

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
    <div className="px-6 py-12 text-white bg-black min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Media Stream AI Technology
        </h1>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
          Explore how AI and biometric signals power personalization and
          immersive storytelling across our platforms.
        </p>
      </section>

      {/* Animated Maps */}
      <section className="grid gap-12 max-w-6xl mx-auto">
        {/* Biometric Signals */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl mb-4">Biometric Signals Map</h2>
          <BiometricSignalsMap />
        </div>

        {/* Personas */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap persona={personaProductManager} title="Product Manager Persona" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap persona={personaStudent} title="Student Persona" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap persona={personaNurse} title="Nurse Persona" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <PersonaMindMap persona={personaRetail} title="Retail Persona" />
          </div>
        </div>
      </section>
    </div>
  );
}
