// app/sovereign-infrastructure/page.tsx
import { Section, Card } from "@/components/ui";

type Site = {
  city: string;
  role: string;
  spec: string;
  phase: "UK Sovereign" | "Phase Two";
};

const SITES: Site[] = [
  {
    city: "MSAI Scotland — Dundee (UK)",
    role: "Sovereign GPU Hub",
    spec: "GPU Clusters B300s & H200s live across 2026; Horizon Scotland based cooling system with PHE 1.1; UK security-cleared personnel; ISO 27001 + Cyber Essentials Plus.",
    phase: "UK Sovereign",
  },
  {
    city: "MSAI Manchester (UK)",
    role: "MOTHER EXO Robotics Lab & Assembly",
    spec: "MOTHER EXO Humanoid robotics lab and assembly — 1,000 units per year by 2027; MOTHER EXO World Model V.2 integration; ISO 27001 certified.",
    phase: "UK Sovereign",
  },
];

export default function Page() {
  return (
    <Section className="py-16">
      <h1 className="text-3xl font-bold">Sovereign Infrastructure</h1>
      <p className="text-white/70 mt-2 max-w-3xl">
        A UK sovereign network architected for privacy, compliance, and efficiency. GPU clusters (B300s & H200s) run
        from MSAI Scotland, Dundee; MOTHER EXO humanoid robotics are built at MSAI Manchester. The Horizon Scotland
        based cooling system with PHE 1.1 keeps PUE/WUE low.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {SITES.map((s, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold">{s.city}</h3>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${
                  s.phase === "UK Sovereign"
                    ? "border-blue-400/40 text-blue-300"
                    : "border-amber-400/40 text-amber-300"
                }`}
              >
                {s.phase}
              </span>
            </div>
            <p className="text-white/80 mt-1">{s.role}</p>
            <p className="text-white/60 text-sm mt-2">{s.spec}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 rounded-2xl overflow-hidden border border-white/10">
        <img src="/images/map-uk-eu-jm.png" alt="MSAI UK sovereign sites map — Dundee & Manchester" className="w-full" />
      </div>

      <p className="text-[11px] text-white/40 mt-4">
        Overview aligns with MOTHER AI sovereign architecture and compliance positioning. 1
      </p>
    </Section>
  );
}
