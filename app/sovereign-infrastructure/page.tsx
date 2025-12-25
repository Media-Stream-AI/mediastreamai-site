// app/sovereign-infrastructure/page.tsx
import { Section, Card } from "@/components/ui";

const SITES = [
  { city: "Manchester / Salford – MediaCityUK (UK)", role: "Flagship Sovereign DC", spec: "NVIDIA H200 training + SambaNova SN40L inference; Lenovo Neptune warm-water liquid cooling; Canal heat-exchange; 400G wave connectivity." },
  { city: "Sunderland (UK)", role: "UK Sovereign Edge / Redundancy", spec: "Sovereign mirror; low-latency ingress; shared MOTHER orchestration." },
  { city: "Düsseldorf (Germany)", role: "EU Sovereign Node (GDPR / EU AI Act)", spec: "Data residency in DE; unified orchestration; EU enterprise access." },
  { city: "Kingston (Jamaica)", role: "LATAM/Caribbean Regional Node", spec: "Regional inference & distribution; British Commonwealth jurisdiction." },
];

export default function Page() {
  return (
    <Section className="py-16">
      <h1 className="text-3xl font-bold">Sovereign Infrastructure</h1>
      <p className="text-white/70 mt-2 max-w-3xl">
        A UK/EU sovereign network architected for privacy, compliance, and efficiency. Training runs on NVIDIA H200;
        inference on SambaNova RDUs for best $/token. Liquid cooling (Lenovo Neptune) keeps PUE/WUE low and enables
        heat-reuse loops.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {SITES.map((s, i) => (
          <Card key={i} className="p-6">
            <h3 className="text-xl font-semibold">{s.city}</h3>
            <p className="text-white/80 mt-1">{s.role}</p>
            <p className="text-white/60 text-sm mt-2">{s.spec}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl overflow-hidden border border-white/10">
        <img src="/images/map-uk-eu-jm.png" alt="MSAI data centre locations map" className="w-full" />
      </div>

      <p className="text-[11px] text-white/40 mt-4">
        Overview aligns with MOTHER AI sovereign architecture and compliance positioning. 1
      </p>
    </Section>
  );
}
