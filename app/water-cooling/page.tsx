
// app/water-cooling/page.tsx
import { Section, Card } from "@/components/ui";

export default function Page() {
  return (
    <Section className="py-16">
      <h1 className="text-3xl font-bold">Liquid Cooling & Heat-Exchange</h1>
      <p className="text-white/70 mt-2 max-w-3xl">
        All MSAI data centres use Lenovo Neptune warm-water liquid cooling integrated with our
        canal/loop heat-exchange to minimise WUE and PUE. The result: quieter racks, higher density,
        and exportable heat for local reuse or heat-to-power pilots.
      </p>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <Card className="p-6"><h3 className="font-semibold">Neptune Manifold</h3><p className="text-sm text-white/70 mt-2">Rack-level warm-water distribution removes heat at source, improving GPU stability and lifespan.</p></Card>
        <Card className="p-6"><h3 className="font-semibold">Closed-Loop HX</h3><p className="text-sm text-white/70 mt-2">Plate heat-exchangers isolate IT water from canal/secondary loops; smart pumps optimize delta-T.</p></Card>
        <Card className="p-6"><h3 className="font-semibold">Heat Reuse</h3><p className="text-sm text-white/70 mt-2">Return water drives district loops or low-temp turbines; Option for heat-to-homes pilots with councils.</p></Card>
      </div>

      <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <img src="/images/cooling-schematic.svg" alt="Cooling schematic" className="w-full" />
      </div>

      <p className="text-[11px] text-white/40 mt-4">
        Liquid cooling & energy-reuse approach referenced in the Sovereign LLM overview. 2
      </p>
    </Section>
  );
}