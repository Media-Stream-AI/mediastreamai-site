import type { Metadata } from 'next';
import { Shield, Lock, Server, FileCheck, Eye, Ban, Fingerprint, Network, Medal } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';

export const metadata: Metadata = {
  title: 'MOTHER Defence - Sovereign, Auditable, Dual-Use AI',
  description:
    'MOTHER Defence: safety-critical embodied AI with a signed, auditable Guardian action filter, red-line enforcement and on-prem deployment. Built for dual-use, human-in-the-loop operation on sovereign UK infrastructure.',
};

export const dynamic = 'force-dynamic';

const data: PillarData = {
  accent: 'ember',
  variant: 'defence',
  eyebrow: 'MOTHER Defence',
  title: 'Sovereign, auditable,',
  gradientWord: 'dual-use.',
  intro:
    'Safety-critical embodied AI for humanity and defence. Every action passes a signed, auditable Guardian filter that vetoes unsafe behaviour; red-lines are enforced in hardware and policy; and deployment is on-prem by default - weights and data never leave your control.',
  primary: { label: 'Request a briefing', href: '/contact' },
  secondary: { label: 'The AI brain', href: '/model-family' },
  stats: [
    { k: 'L4', v: 'Guardian filter' },
    { k: 'On-prem', v: 'Air-gap capable' },
    { k: 'Human', v: 'in the loop' },
    { k: 'Signed', v: 'Auditable ledger' },
  ],
  features: [
    { icon: Shield, title: 'Guardian action filter', body: 'A signed L4 layer sits between reasoning and actuation, vetoing any action that violates policy - before a motor ever moves.' },
    { icon: Ban, title: 'Red-line enforcement', body: 'Hard operational limits - battery, proximity, geofence, contact - enforced independently of the model’s intent.' },
    { icon: FileCheck, title: 'Auditable by design', body: 'Every decision is signed and logged to a ledger, so operators can reconstruct exactly what happened and why.' },
    { icon: Lock, title: 'On-prem & air-gap', body: 'Runs entirely on sovereign GB10 / DGX nodes on your own estate, air-gapped where the mission needs it.' },
    { icon: Eye, title: 'Human-in-the-loop', body: 'Propose-only agents; nothing auto-applies to live systems. Humans promote, Guardian signs, the ledger records.' },
    { icon: Fingerprint, title: 'Sovereign identity', body: 'Signed weights and checkpoint lineage mean you always know which model made which decision on which body.' },
    { icon: Eye, title: 'MOTHER DeepVision', body: 'The sovereign vision model powering MOTHER DEFENCE and the OverWatch security & surveillance system - detection, tracking and scene understanding on-prem.' },
    { icon: Medal, title: 'Military-veteran leadership', body: 'Led by military veterans and built for defence-grade accountability, with a full audit trail and air-gapped operation by default.' },
  ],
  sections: [
    {
      title: 'Safety as an architecture, not a setting',
      body: 'Defence-grade autonomy cannot rely on a well-behaved model. MOTHER Defence separates reasoning from authority: the CORE brain proposes, but a Guardian layer with its own signed policy holds veto power over every actuation. The same layered stack (L0 motor → L4 Guardian) that drives MOTHER EXO robotics enforces safety here.',
      points: ['Signed action filter (L4)', 'Independent red-line hardware', 'Immutable decision ledger', 'On-prem / air-gapped serving', 'Human-promoted changes only', 'Full checkpoint provenance'],
    },
    {
      title: 'Dual-use, sovereign, accountable',
      body: 'Built for safety-critical, dual-use deployment where auditability is non-negotiable - from critical infrastructure to defence. British sovereign throughout: designed, owned and trained in the UK, served on UK infrastructure.',
    },
    {
      title: 'OverWatch - sovereign ISR & security',
      body: 'OverWatch pairs MOTHER DeepVision with the CORE reasoning backbone for security and defence - persistent surveillance, threat assessment and decision support, deployed on sovereign UK infrastructure with a signed action filter and immutable audit trail.',
      points: ['MOTHER DeepVision perception', 'CORE-Defence threat assessment', 'Guardian signed action filter', 'Air-gapped · full audit trail', 'Immutable decision ledger', 'UK data sovereignty'],
    },
  ],
  ctaTitle: 'Autonomy you can account for.',
  ctaBody: 'Request a technical briefing on MOTHER Defence, the Guardian architecture and sovereign deployment.',
  cta: { label: 'Request a briefing', href: '/contact' },
};

export default function Page() {
  return <PillarPage data={data} />;
}
