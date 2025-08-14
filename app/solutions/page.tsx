"use client";
import { Section, Container, Card, H2, Lead, Grid } from "../../components/Blocks";


const rows = [
  { title: "Broadcasters", desc: "Personalized linear streams (plussed channels) without changing your ad tech." },
  { title: "Studios & Catalog Owners", desc: "Mood-aware VOD packaging and dynamic trailers." },
  { title: "FAST Operators", desc: "Per-viewer lineup generation and content safety controls." },
  { title: "Sports & Live", desc: "Contextual highlights, localizations, and compliant ad breaks." }
];

export default function SolutionsPage() {
  return (
    <>
      <Section className="border-t-0">
        <Container>
          <H2>Where we fit</H2>
          <Lead>Plug-and-play components you can adopt independently or as a full stack.</Lead>

          <Grid>
            {rows.map((r) => (
              <Card key={r.title} className="p-6">
                <div className="text-white/90">{r.title}</div>
                <div className="text-white/70 text-sm mt-2">{r.desc}</div>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <H2>Results we target</H2>
          <Grid cols="lg:grid-cols-4">
            <Card className="p-6"><div className="text-4xl">+12–25%</div><div className="text-white/70 text-sm mt-2">Session length</div></Card>
            <Card className="p-6"><div className="text-4xl">+8–15%</div><div className="text-white/70 text-sm mt-2">Ad yield</div></Card>
            <Card className="p-6"><div className="text-4xl">−20–40%</div><div className="text-white/70 text-sm mt-2">Churn</div></Card>
            <Card className="p-6"><div className="text-4xl">Minutes, not weeks</div><div className="text-white/70 text-sm mt-2">Channel setup</div></Card>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
