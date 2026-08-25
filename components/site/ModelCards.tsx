'use client';

// Interactive cards for the MOTHER model family, one per model, each opening
// onto three panels: what it is, what it was trained on, and what it can do.
//
// Every figure here is taken from something MSAI already publishes - the
// Art. 53(1)(d) public training-content summary in /downloads, and the model
// cards on Hugging Face - rather than written for the page, so the site and the
// filings cannot drift apart. Models that are not released say so, and the two
// access-gated repositories are labelled as gated rather than implying a
// download.

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Cpu, Database, Sparkles } from 'lucide-react';

type Availability = 'open' | 'gated' | 'in-family' | 'planned';

interface ModelLink { label: string; href: string }
interface Model {
  id: string;
  name: string;
  kicker: string;
  availability: Availability;
  blurb: string;
  details: { k: string; v: string }[];
  training: { note: string; rows?: { k: string; v: string }[] };
  capabilities: string[];
  links: ModelLink[];
}

const AVAILABILITY: Record<Availability, { label: string; className: string }> = {
  open: { label: 'Open weights', className: 'text-cyan border-cyan/30 bg-cyan/[0.08]' },
  gated: { label: 'Access-gated', className: 'text-violet border-violet/30 bg-violet/[0.08]' },
  'in-family': { label: 'In the family', className: 'text-mist border-hair bg-white/5' },
  planned: { label: 'Planned', className: 'text-ember border-ember/30 bg-ember/[0.08]' },
};

const HF = 'https://huggingface.co/MediaStreamAI';
const MOTHER_AI = 'https://motherai.uk';
const ART53 = '/downloads/MOTHER-Training-Content-Summary.pdf';

const MODELS: Model[] = [
  {
    id: 'core-v3',
    name: 'MOTHER CORE V3',
    kicker: 'Sovereign reasoning & agentic core',
    availability: 'open',
    blurb:
      'The current checkpoint of the CORE run - a 6.9B custom decoder-only transformer built for reasoning, multi-step tool-calling and RAG.',
    details: [
      { k: 'Parameters', v: '~6.9B' },
      { k: 'Architecture', v: 'MotherCoreModel · decoder-only' },
      { k: 'Layers', v: '48 · hidden 3072 · 24/6 GQA · SwiGLU' },
      { k: 'Context', v: '4096 · RoPE θ=10000 · RMSNorm' },
      { k: 'Vocab', v: '50258 SentencePiece · bf16' },
      { k: 'Modalities', v: 'Text → text' },
      { k: 'Languages', v: 'English · Welsh · Irish · Scottish Gaelic' },
    ],
    training: {
      note:
        'Phase One: 2,400,092 training records balanced-sampled from a 1,662,215-record source corpus, across nine capability groups.',
      rows: [
        { k: 'Publicly available datasets', v: '51.30%' },
        { k: 'Synthetic (MSAI-generated)', v: '27.78%' },
        { k: 'Internally created / curated', v: '20.63%' },
        { k: 'Other web-derived sample', v: '0.30%' },
        { k: 'Licensed third-party data', v: 'none' },
        { k: 'First-party web scraping', v: 'none' },
        { k: 'User / platform data', v: 'none' },
      ],
    },
    capabilities: [
      '81 / 105 on the 105-task agentic benchmark, up from 51 / 105 at V2',
      'Multi-step tool-calling, planning and decomposition, with clean call termination',
      'Retrieval-augmented generation - single-call and synthesis',
      'Document and code generation, verification and planning',
      'UK domain knowledge and the three UK Celtic languages',
      'Safety-trained: refusal and observe-and-advise material, human-in-the-loop posture',
    ],
    links: [
      { label: 'MOTHER_CORE_V3 on Hugging Face', href: `${HF}/MOTHER_CORE_V3` },
      { label: 'Training-content summary (Art. 53)', href: ART53 },
      { label: 'MOTHER AI', href: MOTHER_AI },
    ],
  },
  {
    id: 'core-v2',
    name: 'MOTHER CORE V2',
    kicker: 'The preceding CORE checkpoint',
    availability: 'open',
    blurb:
      'The same architecture and the same continued training run as V3, published at an earlier checkpoint. Both are covered by one Art. 53 summary.',
    details: [
      { k: 'Parameters', v: '~6.9B' },
      { k: 'Architecture', v: 'MotherCoreModel · decoder-only' },
      { k: 'Layers', v: '48 · hidden 3072 · 24/6 GQA · SwiGLU' },
      { k: 'Context', v: '4096 · RoPE θ=10000 · RMSNorm' },
      { k: 'Relationship to V3', v: 'Same run, earlier checkpoint' },
    ],
    training: {
      note:
        'Identical corpus to V3 - the Art. 53(1)(d) summary is written for the two checkpoints together, measured over 1,662,215 unique records.',
    },
    capabilities: [
      '51 / 105 on the same agentic benchmark V3 scores 81 on',
      'Reasoning, tool-use and RAG at the earlier checkpoint',
      'Kept published so the two checkpoints can be compared directly',
    ],
    links: [
      { label: 'Training-content summary (Art. 53)', href: ART53 },
      { label: 'MOTHER AI', href: MOTHER_AI },
    ],
  },
  {
    id: 'exo',
    name: 'MOTHER EXO',
    kicker: 'Frontier world model',
    availability: 'gated',
    blurb:
      'Latent vision and action dynamics on the CORE backbone - the world model behind the MOTHER Robotics platform.',
    details: [
      { k: 'Task', v: 'image-text-to-text' },
      { k: 'Backbone', v: 'CORE 7B' },
      { k: 'Weights', v: '28.9 GB' },
      { k: 'Access', v: 'Gated repository on Hugging Face' },
      { k: 'Serving', v: 'Sovereign GB10 / DGX' },
    ],
    training: {
      note:
        'Trained on the CORE backbone with vision-encoder and action / dynamics heads on top. Robotics material is MSAI-authored under a non-weapon, human-in-the-loop posture.',
    },
    capabilities: [
      'Predicts the consequence of an action before it is taken',
      'One model across humanoids, drones, arms and vehicles',
      'Feeds the layered cognitive stack from L0 motor control to the Guardian action filter',
      'Runs on-prem, weights and data staying in the country',
    ],
    links: [
      { label: 'MOTHER_EXO on Hugging Face (gated)', href: `${HF}/MOTHER_EXO` },
      { label: 'Inside MOTHER EXO', href: '/exo' },
    ],
  },
  {
    id: 't2v',
    name: 'MOTHER EXO T2V',
    kicker: 'Sovereign text-to-video',
    availability: 'gated',
    blurb:
      'The multi-modal generation half of the family: a diffusion transformer with flow matching, trained as part of the EXO world model.',
    details: [
      { k: 'Task', v: 'text-to-video' },
      { k: 'Architecture', v: 'Diffusion transformer · flow matching' },
      { k: 'Components', v: 'DiT + 256px VAE' },
      { k: 'Access', v: 'Gated repository on Hugging Face' },
    ],
    training: {
      note:
        'Video generation trained alongside the world model rather than as a separate product line, so generation and prediction share one representation.',
    },
    capabilities: [
      'Text-to-video generation on sovereign infrastructure',
      'Shares the EXO world-model representation',
      'Drives the generative surfaces across IntuiTV and IntuiStudio',
    ],
    links: [
      { label: 'MOTHER_EXO_T2V on Hugging Face (gated)', href: `${HF}/MOTHER_EXO_T2V` },
      { label: 'IntuiTV & IntuiStudio', href: '/intuitv' },
    ],
  },
  {
    id: 'deepvision',
    name: 'MOTHER DeepVision',
    kicker: 'Sovereign perception',
    availability: 'in-family',
    blurb:
      'The vision tower the rest of the family sees through - detection, tracking, faces, expression, spatial relations and scene graphs.',
    details: [
      { k: 'Architecture', v: 'Sovereign ViT' },
      { k: 'Layers', v: '27 · hidden 1152' },
      { k: 'Input', v: '896px' },
      { k: 'Used by', v: 'EXO · Defence · IntuiStudio' },
    ],
    training: {
      note:
        'Perception training is MSAI-curated. Defence and security material is defensive and observe-and-advise only, with a human in the loop.',
    },
    capabilities: [
      'Detection and tracking',
      'Faces and expression',
      'Spatial relations and scene graphs',
      'Feeds the DeepVision scene graph used by EXO and OverWatch',
    ],
    links: [
      { label: 'The technology stack', href: '/technology' },
      { label: 'MOTHER Defence', href: '/defence' },
    ],
  },
  {
    id: 'core-70b',
    name: 'MOTHER CORE 70B',
    kicker: 'Next scale step',
    availability: 'planned',
    blurb:
      'The planned scale-up of the deterministic CORE line, sized for tensor-parallel serving on the sovereign estate.',
    details: [
      { k: 'Status', v: 'Planned - not released' },
      { k: 'Serving target', v: '4× H200 tensor-parallel' },
      { k: 'Line', v: 'Deterministic CORE (T=0)' },
    ],
    training: {
      note:
        'Not yet trained. When it is published it will carry its own Art. 53 training-content summary, as V2 and V3 do.',
    },
    capabilities: [
      'Same deterministic reasoning contract as CORE 7B, at greater scale',
      'Targeted at the CORE specialisations: reasoning, science, defence, legal, maths',
    ],
    links: [{ label: 'MOTHER AI', href: MOTHER_AI }],
  },
];

const TABS = [
  { id: 'details', label: 'Model details', icon: Cpu },
  { id: 'training', label: 'Training data', icon: Database },
  { id: 'capabilities', label: 'Capabilities', icon: Sparkles },
] as const;
type TabId = (typeof TABS)[number]['id'];

export default function ModelCards() {
  const [openId, setOpenId] = useState<string | null>(MODELS[0].id);
  const [tab, setTab] = useState<Record<string, TabId>>({});

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {MODELS.map((model) => {
        const isOpen = openId === model.id;
        const active = tab[model.id] ?? 'details';
        const badge = AVAILABILITY[model.availability];

        return (
          <div
            key={model.id}
            className={`card-night overflow-hidden transition-colors ${isOpen ? 'md:col-span-2 border-cyan/25' : 'card-hover'}`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : model.id)}
              aria-expanded={isOpen}
              aria-controls={`${model.id}-panel`}
              className="flex w-full items-start gap-4 p-5 text-left"
            >
              <span className="flex-1">
                <span className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-xl text-mist">{model.name}</span>
                  <span className={`chip !text-[10px] !py-0.5 ${badge.className}`}>{badge.label}</span>
                </span>
                <span className="mt-1 block text-xs uppercase tracking-widest text-muted">{model.kicker}</span>
                <span className="mt-2.5 block text-sm leading-relaxed text-muted">{model.blurb}</span>
              </span>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-cyan transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div id={`${model.id}-panel`} className="border-t border-hair px-5 pb-5">
                <div role="tablist" aria-label={`${model.name} information`} className="flex flex-wrap gap-2 py-4">
                  {TABS.map((t) => {
                    const selected = active === t.id;
                    return (
                      <button
                        key={t.id}
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setTab((s) => ({ ...s, [model.id]: t.id }))}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                          selected ? 'border-cyan/40 bg-cyan/[0.08] text-mist' : 'border-hair text-muted hover:text-mist'
                        }`}
                      >
                        <t.icon className="h-3.5 w-3.5" /> {t.label}
                      </button>
                    );
                  })}
                </div>

                <div role="tabpanel">
                  {active === 'details' && (
                    <dl className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {model.details.map((d) => (
                        <div key={d.k} className="flex justify-between gap-4 border-b border-hair/60 pb-2 text-sm">
                          <dt className="text-muted">{d.k}</dt>
                          <dd className="text-right text-mist">{d.v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {active === 'training' && (
                    <div>
                      <p className="text-sm leading-relaxed text-muted">{model.training.note}</p>
                      {model.training.rows && (
                        <dl className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                          {model.training.rows.map((r) => (
                            <div key={r.k} className="flex justify-between gap-4 border-b border-hair/60 pb-2 text-sm">
                              <dt className="text-muted">{r.k}</dt>
                              <dd className="text-right text-mist">{r.v}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      <p className="mt-4 text-xs text-muted/70">
                        Shares by record count, measured over the corpus. Published in full under EU AI Act Art. 53(1)(d).
                      </p>
                    </div>
                  )}

                  {active === 'capabilities' && (
                    <ul className="space-y-2.5">
                      {model.capabilities.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hair pt-4">
                  {model.links.map((l) => {
                    const external = l.href.startsWith('http');
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center gap-1.5 text-sm text-cyan hover:underline"
                      >
                        {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
