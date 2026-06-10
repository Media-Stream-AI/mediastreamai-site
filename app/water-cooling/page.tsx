
// app/water-cooling/page.tsx
import { Section, Card } from "@/components/ui";

export default function Page() {
  return (
    <Section className="py-16">
      <h1 className="text-3xl font-bold">Liquid Cooling — Horizon Scotland</h1>
      <p className="text-white/70 mt-2 max-w-3xl">
        MSAI Scotland, Dundee runs the Horizon Scotland based cooling system with PHE 1.1 — warm-water
        liquid cooling that keeps our B300 &amp; H200 GPU clusters at peak efficiency while minimising WUE and
        PUE. The result: quieter racks, higher density, and sovereign UK compute.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <Card className="p-6"><h3 className="font-semibold">Warm-Water Manifold</h3><p className="text-sm text-white/70 mt-2">Rack-level warm-water distribution removes heat at source, improving GPU stability and lifespan across the B300 &amp; H200 clusters.</p></Card>
        <Card className="p-6"><h3 className="font-semibold">PHE 1.1 Plate Exchange</h3><p className="text-sm text-white/70 mt-2">Horizon Scotland plate heat-exchangers (PHE 1.1) isolate IT water from the facility loop; smart pumps optimise delta-T.</p></Card>
        <Card className="p-6"><h3 className="font-semibold">Renewable-Powered</h3><p className="text-sm text-white/70 mt-2">Carbon-neutral, renewable-powered cooling for sovereign UK GPU capacity live across 2026.</p></Card>
      </div>

      <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <img src="/images/cooling-schematic.svg" alt="Horizon Scotland PHE 1.1 cooling schematic" className="w-full" />
      </div>

      <p className="text-[11px] text-white/40 mt-4">
        Horizon Scotland PHE 1.1 liquid-cooling approach referenced in the Sovereign LLM overview.
      </p>
    </Section>
  );
}
