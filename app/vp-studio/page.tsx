import { Section, Container, Card, H2, Lead, Grid } from "../../components/Blocks";

export default function VPStudioPage() {
  return (
    <>
      <Section className="border-t-0">
        <Container>
          <H2>AI-Powered Virtual Production Studios</H2>
          <Lead>
            Cost-efficient virtual stages with AI Director: automated shot lists, lighting presets, and on-set continuity checks.
          </Lead>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols="lg:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img src="/media/vp-studio-mockup.jpg" alt="VP Studio mockup" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-white/70 text-sm">Stage concept</div>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img src="/media/ai-powered-vp-diagram.png" alt="AI Director diagram" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-white/70 text-sm">AI Director pipeline</div>
            </Card>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
