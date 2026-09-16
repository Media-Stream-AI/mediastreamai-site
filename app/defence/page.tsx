import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER Defence - Sovereign Cognitive Defence Platform',
  description:
    'MOTHER Defence is a UK-built, air-gapped defence AI: multi-source intelligence fusion across 25,000+ live sources, sovereign cyber defence, and the MOTHER EXO world model commanding humanoid, aerial and ground platforms under human authority. Observe-and-advise, Strike 0.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
