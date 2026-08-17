import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER Model Family - Sovereign 7B World Model',
  description:
    'The MOTHER model family: a 7B sovereign reasoning backbone (CORE 7B), DeepVision, speech, memory and 26 trained heads. Open-weight, EU AI Act Article 53 compliant, owned and trained in Britain.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
