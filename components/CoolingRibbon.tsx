"use client";

export function CoolingRibbon() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-800/40 to-cyan-600/30 border-t border-b border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Water Cooling & Heat Exchange</h2>
          <p className="text-white/70 mt-3 text-sm">
            Our AI data centres reuse thermal energy via canal water exchange. This unique cooling
            architecture powers Lenovo Neptune racks, reduces energy costs, and recycles heat for
            district applications across Manchester, Sunderland, Düsseldorf, and Kingston.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/media/images/canal-cooling-3d.png"
            alt="Water Cooling System Diagram"
            className="max-w-md w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
