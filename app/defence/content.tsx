'use client';

// MOTHER Defence. The copy and every figure on this page come from the MOTHER
// DEFENCE Capability Deck (OFFICIAL · commercial-in-confidence), so the site
// and the deck say the same thing to the same reader.
//
// The whole page sits behind a sign-up lightbox: visible but not legible until
// a visitor identifies themselves. See components/site/AccessGate - it is a
// lead gate, not access control, so only OFFICIAL / commercial-in-confidence
// material belongs here.
import {
  Shield, Lock, Server, FileCheck, Eye, Ban, Fingerprint, Medal, Radar,
  Network, Satellite, Bug, Brain, Cpu, Waypoints, Users,
} from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';
import AccessGate from '@/components/site/AccessGate';

const data: PillarData = {
  accent: 'ember',
  variant: 'defence',
  eyebrow: 'MOTHER Defence · UK sovereign · MOD engaged',
  title: 'One sovereign mind.',
  gradientWord: 'Every domain.',
  intro:
    'A UK-built, air-gapped defence AI: multi-source intelligence fusion, sovereign cyber defence, and a ' +
    'single embodied world model - MOTHER EXO - commanding humanoid, aerial and ground platforms under human ' +
    'authority. Defence-first cognition engineered for institutional control, operational assurance and ' +
    'jurisdictional sovereignty. Zero foreign dependency. Zero CLOUD Act exposure. Full audit traceability.',
  primary: { label: 'Request a classified briefing', href: '/contact' },
  secondary: { label: 'The MOTHER models', href: '/model-family' },
  stats: [
    { k: '100%', v: 'UK sovereign & owned' },
    { k: 'Air-gap', v: 'Dundee facility' },
    { k: 'T=0', v: 'Deterministic core' },
    { k: 'Strike 0', v: 'No target management' },
  ],
  features: [
    { icon: Brain, title: 'Strategic brain · MOTHER CORE', body: 'Deterministic, temperature-0 reasoning with auditable traces and structured, policy-constrained output. Not a re-badged consumer model.' },
    { icon: Cpu, title: 'Tactical specialists', body: 'Independent 7B domain models - defence, legal / ROE, cyber, medical, logistics, science - under deterministic routing from a single orchestrator.' },
    { icon: Waypoints, title: 'Orchestrator', body: 'Every command passes a classifier plus RBAC and UID-scoped access control before it ever reaches cognition.' },
    { icon: Radar, title: 'Common operating picture', body: 'ADS-B air, AIS maritime, USGS seismic and NATO symbology with geofence alerting - 13 integrated capability panels on one picture.' },
    { icon: Network, title: 'Data fusion engine', body: 'Kafka multi-source ingest with normalisation, dedup, correlation and confidence scoring across 25,000+ live sources.' },
    { icon: Satellite, title: 'Space & global intel', body: 'CelesTrak TLE tracking with pass prediction, conjunction analysis and orbital decay, alongside GDELT, NOAA, FIRMS and USGS feeds.' },
    { icon: Bug, title: 'MOTHER CC · cyber defence', body: 'CISA KEV, SANS InfoCon, URLhaus IOCs, Shodan exposure and live CVE/CVSS fused with the reasoning core for SOC automation - defensive posture only, inside the air gap.' },
    { icon: Eye, title: 'MOTHER OverWatch', body: 'Multi-INT fused into a sovereign ontology graph and the EXO world model - an observe-and-advise agent. Target management stays with the human; STRIKE remains zero by design.' },
    { icon: Shield, title: 'Guardian action filter', body: 'A signed L4 layer sits between reasoning and actuation, vetoing any action that violates policy - before a motor ever moves.' },
    { icon: Ban, title: 'Red-line enforcement', body: 'Hard operational limits - battery, proximity, geofence, contact - enforced independently of the model’s intent.' },
    { icon: FileCheck, title: 'Auditable by design', body: 'Every decision is signed and logged to an immutable ledger, so operators can reconstruct exactly what happened and why.' },
    { icon: Medal, title: 'Military-veteran leadership', body: 'Built and run by UK military veterans for defence-grade accountability, with SC-cleared, on-premises personnel only.' },
  ],
  sections: [
    {
      title: 'Three cognitive layers, one spine',
      body:
        'A defence user issues a command or scenario. The orchestrator classifies it, applies RBAC and UID-scoped access, and routes deterministically to MOTHER CORE for strategic reasoning or to a 7B specialist for the domain. Below them sits the embodied layer - MOTHER EXO - fusing sensors and driving motor control on humanoid, aerial and ground platforms. Authority flows down; nothing flows back up unsigned.',
      points: [
        'Orchestrator · classifier + RBAC + UID',
        'MOTHER CORE · strategic AI at T=0',
        '7B specialists · defence, legal, cyber, med, log, sci',
        'MOTHER EXO · sensor fusion + motor control',
        'Guardian L4 · signed action filter',
        'Human authority at every consequential step',
      ],
    },
    {
      title: '13 live panels, one operating picture',
      body:
        'A real-time multi-source intelligence platform: thirteen integrated capability panels fused through a Kafka pipeline and commanded via a sandboxed on-premises 7B LLM. Real feeds only - no synthetic data. Extensible to classified feeds inside the air gap.',
      points: [
        '25,000+ live data sources',
        '490 global news streams',
        '921 urban ISR feeds · JamCam',
        'Sovereign Watch · MLAT, spoofing, EMCON anomalies',
        'Intel Terminal · natural-language query on live feeds',
        'Decision support · four-eyes verification, full audit trail',
      ],
    },
    {
      title: 'One world model, three embodiments',
      body:
        'MOTHER EXO is a British sovereign world model - perception, spatial reasoning and action in one. The same brain drives a humanoid, an aerial drone and a ground vehicle, each under human-in-the-loop authority. A frozen CORE mind and a frozen DeepVision eye are trained once and reused; lightweight task heads add new senses cheaply.',
      points: [
        'Humanoid · mission-aware manipulation and inspection',
        'Aerial · autonomous navigation and ISR, HITL-gated tasking',
        'Ground · perimeter, logistics and reconnaissance autonomy',
        'Frozen CORE reasoning mind · frozen DeepVision visual cortex',
        'Head-only training on real on-node data',
        'Sovereign GB10 Blackwell node',
      ],
    },
    {
      title: 'Global ISR from open sources',
      body:
        'Thousands of live open-source camera, RF and tracking feeds correlated on a single globe - real OpenSky and public installations, no synthetic data. OverWatch produces releasable, NATO-shareable, audited products through machine-assisted disclosure. Target management is not a function of this system.',
      points: [
        '5,900+ EXO tracks',
        '1,900+ live camera feeds',
        'Air · sea · space · RF',
        'Ontology graph across every INT',
        'Machine-assisted disclosure, audited',
        'STRIKE 0 · no target management',
      ],
    },
    {
      title: 'Air-gapped. Dundee, Scotland.',
      body:
        'All inference runs on UK sovereign hardware inside a physically isolated facility. No internet connectivity; no prompt data leaves the perimeter. Weights remain under UK/EU sovereign control, on compute MSAI owns and operates - not rented capacity in someone else’s cloud.',
      points: [
        'Zero internet · one-way ingest · Faraday shielding',
        'NVIDIA B300 & H200 clusters, live across 2026',
        'UK SC-cleared personnel, on-premises only',
        'Immutable audit logs · promotion-gated updates',
        'GPU allocation tracking and checkpoint creation logs',
        'Air-gap integrity checks and authentication monitoring',
      ],
    },
    {
      title: 'Controlled cognition under sovereign authority',
      body:
        'Operational transparency under OFFICIAL-SENSITIVE, with STRAP-capable workloads. Cyber Essentials Plus, aligned to ISO and UK security requirements. Four-eyes verification and human-in-the-loop escalation on all critical actions, deterministic-first inference with auditable reasoning traces, and promotion-gated model updates with full lineage.',
      points: [
        'OFFICIAL-SENSITIVE · STRAP-capable',
        'Cyber Essentials Plus · ISO-aligned',
        'Four-eyes verification on critical actions',
        'RBAC violation and network policy breach detection',
        'Promotion-gated updates with full lineage',
        'L4 Guardian signed action on every embodied act',
      ],
    },
  ],
  specs: [
    { k: 'deployment', v: 'air-gapped · Dundee' },
    { k: 'reasoning', v: 'MOTHER CORE · T=0' },
    { k: 'specialists', v: '7B · 6 domains' },
    { k: 'embodied', v: 'MOTHER EXO world model' },
    { k: 'cyber', v: 'MOTHER CC · defensive only' },
    { k: 'data sources', v: '25,000+ live' },
    { k: 'ISR feeds', v: '921 urban · 1,900+ camera' },
    { k: 'compute', v: 'B300 & H200 · GB10' },
    { k: 'personnel', v: 'UK SC-cleared, on-prem' },
    { k: 'posture', v: 'observe-and-advise · Strike 0' },
  ],
  ctaTitle: 'Replace foreign AI dependency with sovereign control.',
  ctaBody:
    'Deterministic reasoning, modular defence cognition, air-gapped deployment, multi-platform robotics ' +
    'convergence and full audit traceability - built and run by UK military veterans.',
  cta: { label: 'Request a classified briefing', href: '/contact' },
  disclaimer:
    'OFFICIAL · commercial-in-confidence · MSAI Limited. MOTHER Defence is observation and decision-support ' +
    'only, under meaningful human control. It never authors targeting, fire-control or kill-chains, and ' +
    'refuses prompts that request them. Figures are as published in the MOTHER Defence capability deck; ' +
    'forward-looking deployment dates are plans, not commitments.',
};

export default function PillarContent() {
  return (
    <AccessGate
      storageKey="msai.defence.access"
      eyebrow="OFFICIAL · commercial-in-confidence"
      title="MOTHER Defence"
      body="This capability overview is released to identified defence, government and industry contacts. Tell us who you are and the page opens - no approval wait, no download required."
      interest="MOTHER Defence capability overview"
      source="gate:/defence"
      points={[
        'Sovereign cognitive defence platform',
        'Air-gapped, Dundee, UK',
        'MOTHER OverWatch & MOTHER CC',
        'Observe-and-advise · Strike 0',
      ]}
    >
      <PillarPage data={data} />
    </AccessGate>
  );
}
