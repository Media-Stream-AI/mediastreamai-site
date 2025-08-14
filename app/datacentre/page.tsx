import { Section, Container, Card, H2, Lead } from "../../components/Blocks";

export default function DataCentrePage() {
  return (
    <>
      <Section className="border-t-0">
        <Container>
          <H2>Canal-Side AI Data Centre</H2>
          <Lead>
            Sustainable, canal-cooled compute powering our AI — efficient thermal design with low-impact water usage and real-time monitoring.
          </Lead>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img src="/media/datacentre-office.png" alt="Data centre visual" className="w-full h-full object-cover" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-white/90">Why canal-side?</div>
              <ul className="mt-3 text-white/70 space-y-2 text-sm">
                <li>• Natural waterway cooling with closed-loop systems</li>
                <li>• Lower energy overhead vs. traditional air-cooled DCs</li>
                <li>• Modular capacity growth near content operations</li>
              </ul>
              <div className="mt-6">
                <img src="/media/canal-side-ai-data-centre-white.png" alt="Canal-Side AI Data Centre" className="h-12 w-auto opacity-90" />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}

