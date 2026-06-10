"use client";

export function CoolingRibbon() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-800/40 to-cyan-600/30 border-t border-b border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">Horizon Scotland Liquid Cooling</h2>
          <p className="text-white/70 mt-3 text-sm">
            MSAI Scotland, Dundee runs the Horizon Scotland based cooling system with PHE 1.1 — warm-water
            liquid cooling that keeps our B300 &amp; H200 GPU clusters efficient and carbon-neutral, powering
            sovereign UK compute live across 2026.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="/images/cooling-schematic.svg"
            alt="Horizon Scotland PHE 1.1 cooling system"
            className="max-w-md w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
