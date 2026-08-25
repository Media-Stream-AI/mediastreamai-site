'use client';

// Client component: the pillar data carries lucide icon components, which
// cannot cross the server/client boundary as props. Keeping the data and the
// render together on the client side avoids that serialization error.
import { Brain, Eye, Mic, Database, Cpu, Bot, Layers, Lock, GitBranch, Code2 } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';
import ModelCards from '@/components/site/ModelCards';



const data: PillarData = {
  accent: 'cyan',
  variant: 'models',
  eyebrow: 'MOTHER Model Family',
  title: 'One sovereign',
  gradientWord: 'brain.',
  intro:
    'A single 7B world-model family that perceives, reasons and predicts - vision, language, speech and action fused into one sovereign core. Owned, hosted and trained in Britain, on British infrastructure.',
  // No hero motif here: the synthetic telemetry rings said nothing about the
  // models. The cards below carry the page instead.
  heroVisual: 'none',
  primary: { label: 'Enter the platform', href: '/exo' },
  secondary: { label: 'Technology', href: '/technology' },
  stats: [
    { k: '7B', v: 'Parameters' },
    { k: '48L · 3072d', v: 'CORE transformer' },
    { k: '26', v: 'Trained heads' },
    { k: '100%', v: 'Sovereign' },
  ],
  features: [
    { icon: Brain, title: 'CORE 7B backbone', body: 'A 48-layer / 3072-dim reasoning transformer shared across every product - the one brain behind text, vision and action.' },
    { icon: Eye, title: 'MOTHER DeepVision', body: 'A sovereign ViT (27L · 1152d · 896px) driving detection, tracking, faces, expression, spatial relations and scene graphs.' },
    { icon: Mic, title: 'Speech & audio', body: 'Voice, speech and audio-perception heads for real-time understanding and generation across the stack.' },
    { icon: Database, title: 'MOTHER memory', body: 'A three-tier agent memory - episodic, semantic and procedural - so the model carries context across sessions.' },
    { icon: Layers, title: 'World model', body: 'Latent vision + action dynamics predict what happens next - the substrate for MOTHER EXO and robotics.' },
    { icon: Lock, title: 'Open-weight & auditable', body: 'Published under EU AI Act Article 53 with a copyright policy and training-content summary. No black boxes.' },
    { icon: Code2, title: 'Build on MOTHER AI', body: 'Access MOTHER CORE, LLM 7B, Quantum RAG and the T2V engine via a sovereign REST API - free tier and enterprise plans.' },
  ],
  sections: [
    {
      title: 'A built-in agent fleet that deploys with the model',
      body: 'MOTHER ships with a fleet of governed agents - diagnosis, repair, data-curation and a self-evolving world-model loop - that observe, propose and stage improvements. Nothing auto-applies: every change is red-line gated, sim-tested and human-promoted.',
      points: ['diagnosis · observes health', 'repair · drafts fixes, never auto-applies', 'self_improve · LoRA in sim, staged as candidate', 'sophia · self-evolving world-model loop', 'data_curator · long-tail coverage', 'Guardian-signed promotion only'],
    },
    {
      title: 'Sovereign by construction',
      body: 'The whole family runs on sovereign GB10 / DGX nodes on MSAI infrastructure. Weights and data never leave your control - on-prem by default, with a full model card, checkpoint lineage and reproducible training steps.',
    },
    {
      title: 'Modular cognitive architecture',
      body: 'MOTHER CORE is a British class of LLM with cognition separated into specialized, independently upgradeable domains - deterministic reasoning, a public language engine, and sovereign multi-modal generation, all on one sovereign core.',
      points: ['CORE 7B - deterministic reasoning (T=0)', 'LLM 7B - public language engine', 'T2V - sovereign multi-modal (text-to-video)', 'CORE 70B - 4× H200 tensor-parallel (planned)'],
    },
    {
      title: 'CORE 7B specializations',
      body: 'Domain experts fine-tuned on the deterministic CORE backbone - each a sovereign reasoning specialist tuned for its field while sharing the same auditable core.',
      points: ['CORE-Reasoning - theorem proving', 'CORE-Science - physics simulations', 'CORE-Defence - threat assessment', 'CORE-Legal - compliance', 'CORE-Maths - optimization'],
    },
    {
      title: 'LLM 7B specializations',
      body: 'Public language-engine variants tuned for expressive, human-facing work - from narrative and code to policy and teaching, all on the same sovereign core.',
      points: ['LLM-Creative - narrative generation', 'LLM-Coder - code & docs', 'LLM-Policy - government writing', 'LLM-Education - teaching'],
    },
  ],
  specs: [
    { k: 'backbone', v: 'CORE 7B' },
    { k: 'layers', v: '48' },
    { k: 'width', v: '3072d' },
    { k: 'vision', v: 'DeepVision ViT' },
    { k: 'precision', v: 'bf16' },
    { k: 'heads', v: '26 trained' },
    { k: 'license', v: 'MSAI open-weight' },
    { k: 'compliance', v: 'EU AI Act Art. 53' },
  ],
  ctaTitle: 'See inside the brain.',
  ctaBody: 'Explore the layered world-model, its agents and the sovereign core powering every MSAI product.',
  cta: { label: 'Inside MOTHER EXO', href: '/exo' },
};

export default function PillarContent() {
  return (
    <PillarPage
      data={{
        ...data,
        afterHero: {
          title: 'Every model in the family',
          body:
            'Open the card for what a model is, what it was trained on and what it can do. The figures come from the published Art. 53 training-content summary and the model cards on Hugging Face.',
          content: <ModelCards />,
        },
      }}
    />
  );
}
