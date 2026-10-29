'use client';

// Client component: the pillar data carries lucide icon components, which
// cannot cross the server/client boundary as props. Keeping the data and the
// render together on the client side avoids that serialization error.
//
// This page is about the FAMILY, not any single model - the hero, the stat
// strip and the opening block all speak for all seven. The individual model
// cards (with their Hugging Face links) carry the detail underneath.
import { Brain, Eye, Mic, Database, Layers, Lock, Code2, Film, ShieldCheck } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';
import ModelCards from '@/components/site/ModelCards';
import {
  FAMILY_COUNT, FAMILY_PARAMETERS, MOTHER_AI_SITE, HF_ORG,
} from '@/lib/mother-models';

const data: PillarData = {
  accent: 'cyan',
  variant: 'models',
  eyebrow: 'MOTHER AI Model Family',
  title: 'The MOTHER AI',
  gradientWord: 'family.',
  intro:
    `${FAMILY_COUNT} sovereign models, ${FAMILY_PARAMETERS} parameters, one lineage - the reasoning core others are built on, ` +
    'the cyber mind that defends, the vision tower everything sees through, the generative stack that turns a ' +
    'prompt into a programme, and the world model that puts it all in a body. Trained from scratch on owned ' +
    'data, on British infrastructure.',
  // No hero motif: the family is the subject, and the cards below carry it
  // better than any single image could.
  heroVisual: 'none',
  // The family lives at motherai.uk - this page is the shop window, that is
  // the front door.
  primary: { label: 'Go to MOTHER AI', href: MOTHER_AI_SITE },
  secondary: { label: 'Models on Hugging Face', href: HF_ORG },
  stats: [
    { k: FAMILY_PARAMETERS, v: 'Parameters, family total' },
    { k: String(FAMILY_COUNT), v: 'Sovereign models' },
    { k: '15', v: 'Published weights' },
    { k: '100%', v: 'Owned end to end' },
  ],
  features: [
    { icon: Brain, title: 'MOTHER CORE', body: 'A 6.72B decoder-only reasoning transformer (48L · 3072d) trained from scratch - deterministic at T=0, agentic, and the frozen backbone every other model in the family shares.' },
    { icon: ShieldCheck, title: 'MOTHER CORE · CC', body: 'Defensive cyber cognition trained into CORE: live threat-intel fusion, exposed-asset discovery and SOC automation, air-gapped and defensive only.' },
    { icon: Code2, title: 'MOTHER LLM', body: 'The from-scratch public language line, 13M to 1B - the expressive engine for narrative, code, policy and teaching where CORE is the deterministic one.' },
    { icon: Eye, title: 'MOTHER DeepVision', body: 'The sovereign vision tower (27L · 1152d · 896px) driving detection, tracking, faces, expression, spatial relations and scene graphs.' },
    { icon: Film, title: 'MOTHER T2V', body: 'MOTHER’s own 3D video VAE plus a flow-matching Diffusion Transformer (~0.85B) - no Sora, Wan, LTX or SVD weights anywhere in the stack.' },
    { icon: Mic, title: 'MOTHER IntuiTV', body: 'The IntuiTV Studio model: five trained heads and a six-agent fleet that direct, write, score, cast and stitch one prompt into a 720p programme with sound.' },
    { icon: Layers, title: 'MOTHER EXO', body: 'The world model - frozen CORE mind, frozen DeepVision eye, 15 weights - proven driving a humanoid, two drones, a vehicle and a manipulator from one inference.' },
    { icon: Database, title: 'MOTHER memory', body: 'A three-tier agent memory - episodic, semantic and procedural - so the family carries context across sessions and missions.' },
    { icon: Lock, title: 'Open-weight & auditable', body: 'Published under EU AI Act Article 53 with a copyright policy and training-content summary. No black boxes, no distillation, no borrowed weights.' },
  ],
  sections: [
    {
      title: 'One frozen brain, many senses',
      body:
        'The family is not seven unrelated models - it is one architecture used seven ways. A frozen CORE mind and a frozen DeepVision eye are trained once and reused; lightweight task heads add new senses cheaply, and every head inherits the same auditable reasoning contract. Train a head, gain a capability, without ever destabilising the core.',
      points: [
        'Frozen CORE backbone · 48L · 3072d',
        'Frozen DeepVision ViT · 896px',
        'Head-only training · atomic checkpoints',
        'Base weights never overwritten',
        '15 published weights across the family',
        'One inference, five bodies (EXO)',
      ],
    },
    {
      title: 'Open source and commercially deployed',
      body:
        'The CORE checkpoints are published open-weight on Hugging Face; the EXO world model and T2V generator are access-gated for controlled release. All of them run in production today - inside AUTM.ai, IntuiStudio, IntuiTV, MOTHER Defence and the MOTHER Robotics platform - on MSAI’s own sovereign compute.',
      points: [
        'Open weights: MOTHER CORE V2 · V3',
        'Access-gated: MOTHER EXO · MOTHER EXO T2V',
        'Deployed in AUTM.ai, IntuiStudio and IntuiTV',
        'Serving on sovereign GB10 Blackwell nodes',
        'REST access with a free tier and enterprise plans',
        'On-prem and air-gapped deployment available',
      ],
    },
    {
      title: 'Sovereign by construction',
      body:
        'Every model in the family trains and serves on MSAI infrastructure - our own data centres, our own power, our own control plane. Weights and data never leave your control: on-prem by default, with a full model card, checkpoint lineage and reproducible training steps behind every release.',
    },
    {
      title: 'Specialisations on the same core',
      body:
        'Domain experts are fine-tuned on the deterministic CORE backbone, each a sovereign reasoning specialist tuned for its field while sharing one auditable core - and the public LLM line is tuned the same way for human-facing work.',
      points: [
        'CORE-Reasoning · theorem proving',
        'CORE-Science · physics simulation',
        'CORE-Defence · threat assessment',
        'CORE-Legal · compliance',
        'LLM-Creative · narrative',
        'LLM-Policy · government writing',
      ],
    },
  ],
  specs: [
    { k: 'models', v: String(FAMILY_COUNT) },
    { k: 'parameters', v: FAMILY_PARAMETERS },
    { k: 'weights', v: '15 published' },
    { k: 'backbone', v: 'MOTHER CORE 6.72B' },
    { k: 'vision', v: 'DeepVision ViT 896px' },
    { k: 'generative', v: 'T2V VAE + LatentDiT' },
    { k: 'precision', v: 'bf16' },
    { k: 'serving', v: 'GB10 Blackwell · on-prem' },
    { k: 'licence', v: 'MSAI open-weight' },
    { k: 'compliance', v: 'EU AI Act Art. 53' },
  ],
  ctaTitle: 'One family. One owner.',
  ctaBody:
    'Every MOTHER model, its card, its weights and its training-content summary live at motherai.uk - the home of the sovereign model family.',
  cta: { label: 'Visit motherai.uk', href: MOTHER_AI_SITE },
};

export default function PillarContent() {
  return (
    <PillarPage
      data={{
        ...data,
        afterHero: {
          title: 'Every model in the family',
          body:
            'Open a card for what a model is, what it was trained on and what it can do. Models published on ' +
            'Hugging Face link straight to their repository. The figures come from the published Art. 53 ' +
            'training-content summary and the model cards themselves.',
          content: <ModelCards />,
        },
      }}
    />
  );
}
