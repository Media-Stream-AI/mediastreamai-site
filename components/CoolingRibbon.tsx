
// components/CoolingRibbon.tsx
"use client";

export function CoolingRibbon() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-800/40 to-cyan-600/30 border-t border-b border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Water Cooling & Heat Exchange</h2>
          <p className="text-white/70 mt-3 text-sm">
            Our AI data centres reuse thermal energy via canal water exchange. This unique cooling
            architecture powers Lenovo Neptune racks, reduces energy costs, and recycles heat for
            district applications.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/cooling-system.svg"
            alt="Water Cooling System Diagram"
            className="max-w-md w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}



export function CoolingRibbon() {
  return (
    <section className="border-t border-white/10 bg-gradient-to-r from-blue-950/30 to-black">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 items-center">
        <img src="/images/cooling-schematic.svg" alt="Cooling SVG" className="md:col-span-1 rounded-xl border border-white/10"/>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold">Liquid-Cooled. Heat-Reused.</h3>
          <p className="text-white/70 mt-2">
            Lenovo Neptune warm-water loops extract heat at source; our canal/loop exchangers reuse it for local demand,
            delivering leading PUE/WUE and silent high-density racks.
          </p>
          <a href="/water-cooling" className="inline-block mt-4 text-blue-400 underline underline-offset-4">Learn more</a>
        </div>
      </div>
    </section>
  );
}
