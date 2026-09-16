import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER AI Model Family - 7 Sovereign Models, 240B Parameters',
  description:
    'The MOTHER AI model family: seven sovereign models totalling 240B parameters - CORE, CORE CC, LLM, DeepVision, T2V, IntuiTV and EXO. Open-weight and commercially deployed, EU AI Act Article 53 compliant, trained from scratch and owned in Britain.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
