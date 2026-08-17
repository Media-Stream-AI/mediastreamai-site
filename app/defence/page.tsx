import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'MOTHER Defence - Sovereign, Auditable, Dual-Use AI',
  description:
    'MOTHER Defence: safety-critical embodied AI with a signed, auditable Guardian action filter, red-line enforcement and on-prem deployment. Built for dual-use, human-in-the-loop operation on sovereign UK infrastructure.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
