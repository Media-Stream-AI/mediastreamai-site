import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER EXO - Sovereign World Model & Physical AI',
  description:
    'MOTHER EXO is a sovereign world model on the frozen MOTHER CORE backbone - 15 trained weights driving a 60-DOF humanoid, drones, a vehicle and a manipulator from one inference. UK humanoid factory in Manchester from Q1 2027.',
  alternates: { canonical: '/exo' },
  openGraph: { type: 'website', url: '/exo' },
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
