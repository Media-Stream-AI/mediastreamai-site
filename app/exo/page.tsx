import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER EXO - Frontier World Model + Robotics (2027)',
  description:
    'MOTHER EXO is a frontier world model on the CORE 7B backbone - latent vision + action dynamics - driving the MOTHER Robotics platform to design, simulate and build embodied systems. British sovereign, 2027 release.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
