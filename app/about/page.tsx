"use client";
import { Section, Container, Card, H2, Lead, Grid } from "../../components/Blocks";

export default function AboutPage() {
  return (
    <>
      <Section className="border-t-0">
        <Container>
          <H2>Who we are</H2>
          <Lead>
            Media Stream AI is building personalized, emotionally aware television. We license our broadcast-grade AI
            to broadcasters and content owners globally across live, VOD, and FAST.
          </Lead>

          <Grid cols="lg:grid-cols-4">
            <Card className="p-6"><div className="text-white/90">Proprietary LLMs</div><div className="mt-2 text-white/70 text-sm">Trained for media tasks: tagging, safety, summarization.</div></Card>
            <Card className="p-6"><div className="text-white/90">Adaptive Playout</div><div className="mt-2 text-white/70 text-sm">Per-viewer schedules in milliseconds.</div></Card>
            <Card className="p-6"><div className="text-white/90">Consent-first Signals</div><div className="mt-2 text-white/70 text-sm">Behavior + optional biometrics for relevance.</div></Card>
            <Card className="p-6"><div className="text-white/90">Broadcast-Grade</div><div className="mt-2 text-white/70 text-sm">Live, VOD, and FAST channel support.</div></Card>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <H2>Our ecosystem</H2>
          <Grid>
            <a href="https://www.intuitv.app" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src="/media/intuitv-colourful.jpg" alt="IntuiTV" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-white/90">IntuiTV</div>
                  <div className="text-white/70 text-sm mt-1">Consumer product for mood-aware live TV.</div>
                </div>
              </Card>
            </a>
            <a href="/datacentre" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src="/media/datacentre-office.png" alt="Data Centre" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-white/90">Canal-Side AI Data Centre</div>
                  <div className="text-white/70 text-sm mt-1">Sustainable, canal-cooled compute.</div>
                </div>
              </Card>
            </a>
            <a href="/vp-studio" className="group">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src="/media/vp-studio-mockup.jpg" alt="VP Studio" className="w-full h-full object-cover group-hover:scale-[1.02] transition" />
                </div>
                <div className="p-6">
                  <div className="text-white/90">AI-Powered VP Studios</div>
                  <div className="text-white/70 text-sm mt-1">Virtual stages + AI Director pipeline.</div>
                </div>
              </Card>
            </a>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
