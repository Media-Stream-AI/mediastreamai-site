import { Section, Container, Card, H2, Lead } from "@/components/Blocks";

export default function TechnologyPage() {
  return (
    <>
      <Section className="border-t-0">
        <Container>
          <H2>How it works</H2>
          <Lead>
            Content Tagging AI → Knowledge Graph → Real-time preference model using behavioral + (opt-in) biometric signals,
            feeding an adaptive playout engine.
          </Lead>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-white/80">System P&ID</div>
              <Card className="p-4 mt-3">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <img src="/media/mrf-litterstream-pid.png" alt="P&ID" className="w-full h-full object-cover" />
                </div>
              </Card>
            </div>

            <div>
              <div className="text-white/80">Add-On Schematic</div>
              <Card className="p-4 mt-3">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                  <img src="/media/ai-powered-vp-diagram.png" alt="Add-on schematic" className="w-full h-full object-cover" />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <H2>Privacy & consent</H2>
          <Lead>We only process biometrics if a user opts in. Signals are used for on-device or aggregated modeling with strict retention policies.</Lead>
        </Container>
      </Section>
    </>
  );
}
