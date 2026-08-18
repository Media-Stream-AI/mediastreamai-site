'use client';

// Client component: the pillar data carries lucide icon components, which
// cannot cross the server/client boundary as props. Keeping the data and the
// render together on the client side avoids that serialization error.
import { Boxes, Cog, Cpu, Bot, Plane, Car, Hand, Activity, Layers } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';



const data: PillarData = {
  accent: 'cyan',
  variant: 'exo',
  eyebrow: 'MOTHER EXO',
  badge: '2027 RELEASE',
  title: 'A frontier world model',
  gradientWord: 'that acts.',
  intro:
    'Built on the CORE 7B backbone, MOTHER EXO learns the latent dynamics of vision and action - a true world model that perceives, predicts and acts. It drives the MOTHER Robotics platform: design, simulate and build embodied systems, from humanoids to autonomous flight.',
  primary: { label: 'Enter the platform', href: '/contact' },
  secondary: { label: 'The AI brain', href: '/model-family' },
  // The MOTHER Robotics footage now runs in the hero frame, filling the
  // world model / latent dynamics slot that previously held a placeholder
  // motif. It is the page's only clip, so there is no separate media band.
  heroMedia: { src: '/video/exo-robotics.mp4', label: 'world model · latent dynamics' },
  stats: [
    { k: '28.9 GB', v: 'World model' },
    { k: '23-DOF', v: 'Humanoid' },
    { k: '1 kHz', v: 'Control loop' },
    { k: '2027', v: 'Release' },
  ],
  features: [
    { icon: Boxes, title: 'World model', body: 'Latent video + action dynamics on the CORE 7B backbone - the model predicts the consequences of an action before taking it.' },
    { icon: Cog, title: 'Robotics design & build', body: 'A full control plane: motion capture, vision tracks, sim-to-real, flight learning and a drone / airframe design studio.' },
    { icon: Bot, title: 'Humanoid', body: '23-DOF humanoid at 1 kHz L0 control with a layered cognitive stack from motor to Guardian action filter.' },
    { icon: Plane, title: 'Autonomous flight & ISR', body: 'UAV flight learning and inspection, sharing the same world model and DeepVision scene graph.' },
    { icon: Car, title: 'Autonomous driving', body: 'Trained driving heads on the same sovereign backbone - one model, many bodies.' },
    { icon: Cpu, title: 'Sovereign GB10 / DGX', body: 'Trains and serves on sovereign Blackwell nodes; weights and data never leave the country.' },
  ],
  sections: [
    {
      title: 'One model, many bodies',
      body: 'MOTHER EXO shares the full 48-layer / 3072-dim CORE transformer as its reasoning backbone; vision-encoder and action / dynamics heads train on top. The same brain drives humanoids, drones, arms and vehicles - with a layered cognitive stack (L0 motor → L4 Guardian).',
      points: ['L0 · 1 kHz motor control', 'L1 · sim2real policies', 'L2.5 · DeepVision scene graph', 'L3 · CORE 7B reasoning', 'L4 · Guardian signed action filter', 'GB10 Blackwell bridge'],
    },
    {
      title: 'Self-evolving in simulation',
      body: 'A closed generate → criticise → revise loop rolls out interactions inside MOTHER’s own world model, critiques them, and stages the high-quality episodes as new training data. Every deployment is a learning chance - but nothing touches the live stack without human, sim-gated promotion.',
    },
  ],
  specs: [
    { k: 'backbone', v: 'CORE 7B (48L·3072d)' },
    { k: 'heads', v: 'vision + dynamics + action' },
    { k: 'modality', v: 'video/action latent' },
    { k: 'weights', v: '28.9 GB' },
    { k: 'robot', v: 'humanoid · 23-DOF' },
    { k: 'control', v: '1 kHz L0' },
    { k: 'serving', v: 'robotics' },
    { k: 'release', v: '2027' },
  ],
  ctaTitle: 'Teach a body to think.',
  ctaBody: 'Partner with us, or apply to test and teach MOTHER EXO on sovereign infrastructure.',
  cta: { label: 'Get involved', href: '/contact' },
};

export default function PillarContent() {
  return <PillarPage data={data} />;
}
