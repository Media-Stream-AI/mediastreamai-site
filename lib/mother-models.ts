// The MOTHER model family - one source of truth for every surface that lists
// it (the home page strip, the /model-family cards, the nav blurbs).
//
// Figures come from what MSAI already publishes: the model cards on Hugging
// Face and the EU AI Act Art. 53(1)(d) public training-content summary in
// /downloads. Models that are not released say so, and the access-gated
// repositories are labelled gated rather than implying a download, so the
// site and the filings cannot drift apart.
//
// FAMILY_PARAMETERS is the group headline for the family as a whole; the
// per-model `spec` rows carry each model's own published size.

export const HF_ORG = 'https://huggingface.co/MediaStreamAI';
export const MOTHER_AI_SITE = 'https://motherai.uk';
export const ART53_SUMMARY = '/downloads/MOTHER-Training-Content-Summary.pdf';

/** Headline figures for the family. */
export const FAMILY_PARAMETERS = '240B';
export const FAMILY_COUNT = 7;

export type Availability = 'open' | 'gated' | 'in-family' | 'pipeline';

export interface ModelLink {
  label: string;
  href: string;
  /** Marks the canonical Hugging Face repository for this model. */
  huggingface?: boolean;
}

export interface MotherModel {
  id: string;
  /** Display name. */
  name: string;
  /** One-line role, shown as the card kicker and in the home-page strip. */
  kicker: string;
  /** Short strapline for compact surfaces. */
  short: string;
  availability: Availability;
  status: string;
  /** The single most quotable spec, shown on the compact card. */
  headline: string;
  blurb: string;
  details: { k: string; v: string }[];
  training: { note: string; rows?: { k: string; v: string }[] };
  capabilities: string[];
  links: ModelLink[];
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  open: 'Open weights',
  gated: 'Access-gated',
  'in-family': 'In the family',
  pipeline: 'In pipeline',
};

export const MOTHER_MODELS: MotherModel[] = [
  {
    id: 'core',
    name: 'MOTHER CORE',
    kicker: 'Sovereign reasoning & agentic core',
    short: 'The deterministic reasoning brain every other model is built on.',
    availability: 'open',
    status: 'Live',
    headline: '6.72B · 48L · 3072d',
    blurb:
      'A custom decoder-only transformer trained from scratch on owned, licence-clean data - not distilled from anyone else’s weights. Built for deterministic reasoning at T=0, multi-step tool-calling and RAG, and shared as the frozen backbone across the family.',
    details: [
      { k: 'Parameters', v: '6.72B' },
      { k: 'Architecture', v: 'MotherCoreModel · decoder-only' },
      { k: 'Layers', v: '48 · hidden 3072 · 24/6 GQA · SwiGLU' },
      { k: 'Context', v: '4096 · RoPE θ=10000 · RMSNorm' },
      { k: 'Vocab', v: '50258 SentencePiece · bf16' },
      { k: 'Languages', v: 'English · Welsh · Irish · Scottish Gaelic' },
      { k: 'Next scale step', v: 'CORE 70B · planned, 4× H200 TP' },
    ],
    training: {
      note:
        'Phase One: 2,400,092 training records balanced-sampled from a 1,662,215-record source corpus, across nine capability groups. No distillation, no first-party web scraping, no user data.',
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
      '77% on the MSAI agentic benchmark at V3, up from 51/105 at V2',
      'Multi-step tool-calling, planning and decomposition with clean call termination',
      'Retrieval-augmented generation - single-call and synthesis',
      'Document and code generation, verification and planning',
      'UK domain knowledge and the three UK Celtic languages',
      'Safety-trained: refusal and observe-and-advise posture, human in the loop',
    ],
    links: [
      { label: 'MOTHER_CORE_V3 on Hugging Face', href: `${HF_ORG}/MOTHER_CORE_V3`, huggingface: true },
      { label: 'MOTHER_CORE_V2 on Hugging Face', href: `${HF_ORG}/MOTHER_CORE_V2`, huggingface: true },
      { label: 'Training-content summary (Art. 53)', href: ART53_SUMMARY },
    ],
  },
  {
    id: 'core-cc',
    name: 'MOTHER CORE · CC',
    kicker: 'Defensive cyber cognition',
    short: 'Cyber defence reasoning, trained into CORE and run inside the air gap.',
    availability: 'in-family',
    status: 'In CORE',
    headline: '26k security chain-of-thought',
    blurb:
      'The cyber-defence capability of the CORE line: exposed-asset discovery, vulnerability correlation and SOC automation, fused with live threat intelligence. Defensive posture only, inside the air gap.',
    details: [
      { k: 'Form', v: 'Capability trained into CORE' },
      { k: 'Security corpus', v: '26k security CoT · 12k security · 8k code · 6k RAG' },
      { k: 'Backbone', v: 'MOTHER CORE 6.72B' },
      { k: 'Posture', v: 'Defensive only · no offensive tooling' },
      { k: 'Deployment', v: 'Air-gapped, on-premises' },
    ],
    training: {
      note:
        'Security reasoning is MSAI-authored and defensive by construction. CORE · CC inherits the CORE corpus and adds the security chain-of-thought set; it is a capability of CORE rather than a separate checkpoint.',
    },
    capabilities: [
      'Live threat-intel fusion: CISA KEV, SANS InfoCon, URLhaus IOCs, Shodan exposure, CVE/CVSS',
      'Exposed-asset discovery and vulnerability correlation',
      'Detection, triage and incident-response orchestration',
      'Runs fully air-gapped with an immutable audit trail',
    ],
    links: [
      { label: 'MOTHER Defence', href: '/defence' },
      { label: 'MOTHER AI', href: MOTHER_AI_SITE },
    ],
  },
  {
    id: 'llm',
    name: 'MOTHER LLM',
    kicker: 'From-scratch public language line',
    short: 'The expressive, human-facing language engine - trained from zero.',
    availability: 'pipeline',
    status: 'Not yet released',
    headline: '13M – 1B · from scratch',
    blurb:
      'A from-scratch language line trained on the MSAI tokenizer and HDF5 pipeline, sized from 13M up to 1B. Where CORE is deterministic, MOTHER LLM is the expressive engine for narrative, code, policy and teaching.',
    details: [
      { k: 'Sizes', v: '13M → 1B' },
      { k: 'Tokenizer', v: 'r50k_base' },
      { k: 'Data pipeline', v: 'HDF5 sharded' },
      { k: 'Line', v: 'Public language engine' },
      { k: 'Specialisations', v: 'Creative · Coder · Policy · Education' },
    ],
    training: {
      note:
        'Trained from random initialisation on the owned corpus - the line exists to prove the whole pipeline end to end, from tokenizer to checkpoint, without importing anyone else’s weights.',
    },
    capabilities: [
      'Narrative and long-form generation',
      'Code and documentation',
      'Government and policy drafting',
      'Teaching and explanation',
    ],
    links: [
      { label: 'MOTHER AI', href: MOTHER_AI_SITE },
      { label: 'Training-content summary (Art. 53)', href: ART53_SUMMARY },
    ],
  },
  {
    id: 'deepvision',
    name: 'MOTHER DeepVision',
    kicker: 'Sovereign perception',
    short: 'The eye the rest of the family sees through.',
    availability: 'in-family',
    status: 'Live',
    headline: '27L · 1152d · 896px',
    blurb:
      'The sovereign vision tower: detection, tracking, faces, expression, spatial relations and scene graphs fused into one live checkpoint. It understands layout, not just labels - and it is the perception core behind OverWatch and every EXO platform.',
    details: [
      { k: 'Architecture', v: 'SigLIP-SO400M class sovereign ViT' },
      { k: 'Layers', v: '27 · hidden 1152' },
      { k: 'Input', v: '896px' },
      { k: 'Measured', v: 'kNN 1.0' },
      { k: 'Used by', v: 'EXO · Defence · OverWatch · IntuiStudio' },
    ],
    training: {
      note:
        'Perception training is MSAI-curated: 682k detection frames (COCO + LVIS + aircraft), 5.4M face crops and an affect corpus. Defence and security material is defensive and observe-and-advise only, with a human in the loop.',
      rows: [
        { k: 'Detection frames', v: '682k' },
        { k: 'Face crops', v: '5.4M' },
        { k: 'Detection classes', v: '1,233' },
      ],
    },
    capabilities: [
      '1,233-class presence and bounding boxes with safety tagging',
      'Persistent multi-object identity across frames (re-ID)',
      'Face representation with consent-only recognition',
      'Affect reading - calm / worried / shocked - never identity',
      'Spatial relations and scene-graph construction',
    ],
    links: [
      { label: 'MOTHER Defence', href: '/defence' },
      { label: 'The technology stack', href: '/technology' },
    ],
  },
  {
    id: 't2v',
    name: 'MOTHER T2V',
    kicker: 'Sovereign text-to-video',
    short: 'A 3D video VAE and flow-matching DiT, trained from scratch.',
    availability: 'gated',
    status: 'Live',
    headline: '~0.85B · VAE + LatentDiT',
    blurb:
      'MOTHER’s own 3D video VAE plus a flow-matching Diffusion Transformer, conditioned on the frozen CORE backbone. No Sora, Wan, LTX or SVD weights are embedded - the entire generative stack is MOTHER-trained. It is the generative half of EXO and the frozen core of IntuiTV.',
    details: [
      { k: 'Parameters', v: '~0.85B · ≈118M VAE + ≈734M DiT' },
      { k: 'VAE', v: '8× spatial / 4× temporal → 16-channel latent' },
      { k: 'DiT', v: '24 blocks · hidden 1024 · 16 heads · patch 2' },
      { k: 'Objective', v: 'Flow-matching velocity · MSE' },
      { k: 'Generative fit', v: '256×256 · 16 frames' },
      { k: 'Conditioning', v: 'Cross-attention to frozen CORE · CFG' },
    ],
    training: {
      note:
        'Trained on an owned, licence-clean corpus of 50,000 video hours of TV and film accumulated over twenty years by the founding team, with the generative fit on real captioned clips. External models are data-only teachers for captions - never embedded weights.',
      rows: [
        { k: 'Owned corpus', v: '50,000 video hours' },
        { k: 'Generative fit', v: '~13k real captioned clips' },
        { k: 'External weights embedded', v: 'none' },
      ],
    },
    capabilities: [
      'Text-conditioned short-video synthesis on sovereign infrastructure',
      'Shares one representation with the EXO world model',
      'Frozen generative core for MOTHER IntuiTV',
      'VBench scored only as measured - never hand-entered',
    ],
    links: [
      { label: 'MOTHER_EXO_T2V on Hugging Face (gated)', href: `${HF_ORG}/MOTHER_EXO_T2V`, huggingface: true },
      { label: 'IntuiTV & IntuiStudio', href: '/intuitv' },
    ],
  },
  {
    id: 'intuitv',
    name: 'MOTHER IntuiTV',
    kicker: 'IntuiTV Studio model · prompt → programme',
    short: 'One prompt becomes a full 720p programme, with sound.',
    availability: 'in-family',
    status: 'Live',
    headline: '720p · 24fps · 5 heads · 6 agents',
    blurb:
      'The model behind IntuiTV Studio. It loads the frozen T2V core read-only and adds five independently trained heads and a six-agent fleet, so it does not just make a clip - it directs, writes, scores, casts and stitches a story.',
    details: [
      { k: 'Output', v: '720p · 24 fps · with sound' },
      { k: 'Heads', v: 'Scene-memory · story · audio · music · identity' },
      { k: 'Agent fleet', v: 'Director · Screenwriter · Casting · Continuity · Shot · Composer' },
      { k: 'Generative core', v: 'Frozen MOTHER T2V (3D-VAE + LatentDiT)' },
      { k: 'Conditioning', v: 'CORE 3072d ⊕ scene memory ⊕ identity tokens' },
      { k: 'Delivery', v: 'MP4 + 720p HLS ladder + manifest' },
    ],
    training: {
      note:
        'Story, identity and sound heads are trained on a provenance-logged corpus: public-domain / CC or licensed-with-permission only, with a fail-closed licence log. Nothing in MOTHER T2V is overwritten - IntuiTV forks every new weight to a new file.',
      rows: [
        { k: 'Stories', v: '13,597' },
        { k: 'Scenes', v: '193,708' },
        { k: 'Dialogue lines', v: '614,896 · 16 languages' },
        { k: 'Character identities', v: '79,412 view-lists' },
      ],
    },
    capabilities: [
      'Decomposes a premise into filmable beats, shot grammar and per-scene dialogue',
      'Carries characters, wardrobe, palette and locations across every cut',
      'Locks a recurring character’s face and build across a whole feature',
      'Original tempo-aware score plus diegetic ambience and foley',
      'Assembles and muxes to a 720p HLS ladder for playout',
    ],
    links: [
      { label: 'IntuiTV & IntuiStudio', href: '/intuitv' },
      { label: 'Open IntuiStudio', href: 'https://studio.intuitv.app' },
    ],
  },
  {
    id: 'exo',
    name: 'MOTHER EXO',
    kicker: 'Physical AI · frontier world model',
    short: 'One world model, five bodies, one inference.',
    availability: 'gated',
    status: 'V.5 baseline',
    headline: '15 weights · 5 bodies',
    blurb:
      'A frozen CORE mind and a frozen DeepVision eye with head-only training on top: one sovereign world model that sees, hears, speaks, reasons, remembers and acts. Proven driving a humanoid, two drones, a vehicle and a manipulator from a single inference. Strike = 0.',
    details: [
      { k: 'Checkpoint', v: 'world_model_exo_final · V.5' },
      { k: 'Weights', v: '15 · frozen base ⊕ trained heads' },
      { k: 'Language backbone', v: 'MOTHER CORE · 48L · 3072d (frozen)' },
      { k: 'Vision backbone', v: 'DeepVision ViT · 27L · 1152d · 896px (frozen)' },
      { k: 'Trainable', v: 'Cross-attn adapters + per-head projections + task heads' },
      { k: 'Bodies', v: 'Humanoid · drone · vehicle · manipulator · defence COP' },
      { k: 'Serving', v: 'Sovereign GB10 Blackwell · bf16' },
    ],
    training: {
      note:
        'Head-only training on real corpora held on the node: 150k real teleoperation steps, 682k detection frames, 5.4M face crops, real flight and ego-motion dynamics, and captioned video encoded through the frozen T2V 3D-VAE. All 15 weights demonstrated learning on real data; formal leaderboard ranks are not claimed until measured.',
      rows: [
        { k: 'Teleop steps', v: '150k · Open-X + GR00T' },
        { k: 'Reasoning QA', v: '861k · memory 800k' },
        { k: 'Flight / drive', v: 'EuRoC MAV + KITTI raw' },
        { k: 'Audio', v: 'LibriSpeech + RAVDESS/CREMA-D' },
      ],
    },
    capabilities: [
      'Predicts the consequence of an action before it is taken (multi-step latent rollout)',
      'One model across humanoids, drones, arms and vehicles - one inference',
      'Detection, tracking, faces, expression, relations, memory, speech and audio heads',
      'Every action passes the L4 Guardian signed action filter',
      'Observe-and-advise, human-in-the-loop, Strike = 0 in every domain',
    ],
    links: [
      { label: 'MOTHER_EXO on Hugging Face (gated)', href: `${HF_ORG}/MOTHER_EXO`, huggingface: true },
      { label: 'MSAI Robotics platform', href: 'https://robotics.mediastreamai.com' },
      { label: 'Inside MOTHER EXO', href: '/exo' },
    ],
  },
];
