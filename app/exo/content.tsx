'use client';

// Client component: the pillar data carries lucide icon components, which
// cannot cross the server/client boundary as props. Keeping the data and the
// render together on the client side avoids that serialization error.
import { Boxes, Cog, Cpu, Bot, Plane, Car, Hand, Factory, Shield } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';
import ExoCadViewer from '@/components/site/ExoCadViewer';

const ROBOTICS = 'https://robotics.mediastreamai.com';

const data: PillarData = {
  accent: 'cyan',
  variant: 'exo',
  eyebrow: 'MOTHER EXO · Physical AI',
  badge: 'V.5 · 15 WEIGHTS',
  // The family page speaks for all seven models; this page is where the one
  // brain actually gets a body, so the tagline belongs here.
  title: 'One sovereign',
  gradientWord: 'brain.',
  intro:
    'MOTHER EXO is the world model that acts. A frozen MOTHER CORE mind and a frozen DeepVision eye, with ' +
    'head-only training on top, give one sovereign model that sees, hears, speaks, reasons, remembers and ' +
    'moves - proven driving a humanoid, two drones, a vehicle and a manipulator from a single inference.',
  primary: { label: 'Enter the robotics platform', href: ROBOTICS },
  secondary: { label: 'The model family', href: '/model-family' },
  // The hero frame is a real CAD area: the humanoid's URDF and meshes are
  // pulled live from the robotics platform through /api/exo-cad, so the page
  // always shows the current design rather than a rendered still. The MOTHER
  // EXO film moves to the media band below.
  media: { src: '/video/mother-exo-v2.mp4', label: 'world model · latent dynamics' },
  disclaimer:
    'MOTHER EXO is an upgraded humanoid model based on the ASIMOV V.1 open-source robotics backbone, ' +
    'redesigned with over 5,000 modifications and graphene-infused materials throughout. Forward-looking: ' +
    'the Manchester factory date and production target are current plans, not commitments, and may change.',
  stats: [
    { k: '15 / 15', v: 'Trained weights' },
    { k: '5 bodies', v: 'One inference' },
    { k: '60-DOF', v: 'Humanoid build' },
    { k: 'Q1 2027', v: 'Manchester factory' },
  ],
  features: [
    { icon: Boxes, title: 'World model', body: 'Video-native latent dynamics: the model encodes clips through the frozen MOTHER T2V 3D-VAE and predicts future latent frames, so it knows the consequence of an action before it takes it.' },
    { icon: Bot, title: '60-DOF humanoid', body: 'A 60-degree-of-freedom humanoid at 1 kHz L0 motor control, behaviour-cloned from 150,000 real teleoperation steps, with a layered cognitive stack from motor to Guardian.' },
    { icon: Cog, title: 'Robotics design & build', body: 'A full control plane: motion capture, vision tracks, sim-to-real, flight learning and a drone / airframe design studio - a wired build-and-test platform, not a mock-up.' },
    { icon: Plane, title: 'Autonomous flight & ISR', body: 'A UAV velocity policy trained on real EuRoC MAV flight dynamics, sharing the same world model and DeepVision scene graph. Observe-and-advise, no fire control.' },
    { icon: Car, title: 'Autonomous driving', body: 'An ego-motion policy - steer, throttle, brake - trained on real KITTI ego-motion on the same sovereign backbone. One model, many bodies.' },
    { icon: Hand, title: 'Manipulation', body: 'The motor head drives a robot arm through reach, grasp and place under human-in-the-loop authority - the same weights that walk the humanoid.' },
    { icon: Factory, title: 'Manchester humanoid factory', body: 'A UK humanoid lab and assembly line in Manchester comes online Q1 2027, targeting 1,000 units a year on a sovereign supply chain.' },
    { icon: Cpu, title: 'Sovereign GB10 / DGX', body: 'Trains and serves on sovereign Blackwell nodes in bf16; weights and data never leave the country.' },
    { icon: Shield, title: 'Guardian · Strike = 0', body: 'Every action passes an L4 signed action filter. Observe-and-advise, human-in-the-loop, no targeting, no fire control, no kill chains - in every domain.' },
  ],
  sections: [
    {
      title: 'Frozen base, head-only training',
      body:
        'MOTHER EXO shares the full 48-layer / 3072-dim CORE transformer as its reasoning backbone and the 27-layer DeepVision ViT as its visual cortex - both frozen. Only cross-attention adapters, per-head projections and the task heads train, packaged atomically as world_model_exo_final so the proven base is never overwritten. Fifteen weights, one file, one inference.',
      points: [
        'L0 · 1 kHz motor control',
        'L1 · sim2real policies',
        'L2.5 · DeepVision scene graph',
        'L3 · CORE reasoning',
        'L4 · Guardian signed action filter',
        'GB10 Blackwell bridge',
      ],
    },
    {
      title: 'The 15 weights',
      body:
        'Reasoning, vision, detect, track, worldmodel, worldmodel_latent, face, relations, memory, speech, audio, expression, humanoid, flight and driving. All fifteen demonstrated learning on real data this run - real trainer, real corpora, loss moving. Formal leaderboard ranks (nuScenes, CARLA, HumanoidBench, Flightmare) are not claimed until each harness is wired and measured.',
      points: [
        '682k detection frames · 1,233 classes',
        '5.4M face crops · consent-only recognition',
        '150k real teleoperation steps',
        '861k sovereign reasoning QA · 800k memory',
        'Real EuRoC MAV + KITTI dynamics',
        'Captioned video → frozen T2V 3D-VAE latents',
      ],
    },
    {
      title: 'Self-evolving in simulation',
      body:
        'A closed generate → criticise → revise loop rolls out interactions inside MOTHER’s own world model, critiques them, and stages the high-quality episodes as new training data. Each body runs as a real closed-loop physics simulation - driving, humanoid, manipulation, drone - steered by the trained control heads. Every deployment is a learning chance, but nothing touches the live stack without human, sim-gated promotion.',
    },
    {
      title: 'Built for humanitarian response, land, sea and air',
      body:
        'One model coordinates a mixed team around a single live picture: what a drone sees overhead informs the vehicle on the ground and the boat on the water, in real time, human-in-the-loop. It surveys, assesses and recommends; a human makes every consequential decision.',
      points: [
        'Drones · survey and access routes',
        'Vehicles · aid along passable roads',
        'Humanoids · clear debris where it is unsafe for people',
        'Boats · maritime body on the roadmap',
      ],
    },
  ],
  specs: [
    { k: 'checkpoint', v: 'world_model_exo_final · V.5' },
    { k: 'weights', v: '15 · frozen base ⊕ heads' },
    { k: 'language', v: 'CORE 48L · 3072d (frozen)' },
    { k: 'vision', v: 'DeepVision 27L · 1152d · 896px' },
    { k: 'trainable', v: 'adapters + heads only' },
    { k: 'bodies', v: '5 · one inference' },
    { k: 'humanoid', v: '60-DOF · 1 kHz L0' },
    { k: 'precision', v: 'bf16 · GB10 Blackwell' },
    { k: 'posture', v: 'observe-and-advise · Strike 0' },
    { k: 'factory', v: 'Manchester · Q1 2027' },
  ],
  ctaTitle: 'Teach a body to think.',
  ctaBody:
    'The MOTHER Robotics platform is where EXO is designed, simulated, trained and flown - digital twin, ' +
    'motion capture, sim-to-real and the humanoid build, all in one place.',
  cta: { label: 'Open robotics.mediastreamai.com', href: ROBOTICS },
  paper: {
    file: '/downloads/MOTHER-EXO-Graphene-Robotics.pdf',
    title: 'MOTHER EXO and graphene in robotics',
    subtitle: 'White paper - the stages, the research and the engineering',
  },
};

export default function PillarContent() {
  return <PillarPage data={{ ...data, heroSlot: <ExoCadViewer className="relative" /> }} />;
}
