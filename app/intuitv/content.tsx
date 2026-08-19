'use client';

// Client component: the pillar data carries lucide icon components, which
// cannot cross the server/client boundary as props. Keeping the data and the
// render together on the client side avoids that serialization error.
import { Play, Sparkles, Radio, Scissors, Wand2, Film, Users, Tv, Layers } from 'lucide-react';
import PillarPage, { type PillarData } from '@/components/site/PillarPage';



const data: PillarData = {
  accent: 'cyan',
  variant: 'intuitv',
  eyebrow: 'IntuiTV · IntuiStudio',
  title: 'AI television,',
  gradientWord: 'end to end.',
  intro:
    'The consumer platform where you create the show and the star - plus IntuiStudio: a browser-native Creator editor with studio-grade tooling and a Playout engine driving real, always-on channels. All powered by the sovereign MOTHER brain.',
  heroImage: {
    src: '/intuitv-app-site.webp',
    alt: 'The IntuiTV platform at intuitv.app - "Stop choosing, start imagining" - an AI-powered television platform available on smart TV apps, iOS, Android and in the browser',
    label: 'intuitv.app · AI television',
  },
  primary: { label: 'Start watching', href: '/viewers' },
  secondary: { label: 'For creators', href: '/creators' },
  stats: [
    { k: '11', v: 'Platforms · HLS' },
    { k: '4K', v: 'Streaming' },
    { k: '24/7', v: 'Playout' },
    { k: 'UK/EU', v: 'Sovereign' },
  ],
  features: [
    { icon: Play, title: 'IntuiTV - personalised AI TV', body: 'AI-curated channels that adapt to you, across smart TV, mobile and web - you create the shows and the star.' },
    { icon: Wand2, title: 'IntuiStudio Creator', body: 'A browser-native editor with Premiere / After-Effects-grade tooling: masks, keyframes, expressions, 3D, tracking, roto and particles.' },
    { icon: Radio, title: 'Playout engine', body: 'Schedule, brand and broadcast 24/7 channels with automated continuity, graphics and compliance - production-wired.' },
    { icon: Scissors, title: 'Studio-grade editing', body: 'Ripple / roll / slip / slide trim, multi-layer blend, track mattes and adjustment layers - all in the browser.' },
    { icon: Sparkles, title: 'AI-native Looks', body: 'Describe the vibe - "Nolan trailer", "golden hour" - and the model composes the grade, motion and sound design.' },
    { icon: Film, title: 'Every format', body: 'Format-first delivery to Instagram, TikTok, YouTube and broadcast, with a reframing preview that never distorts.' },
  ],
  sections: [
    {
      title: 'Creator + Playout on one sovereign core',
      body: 'IntuiStudio is two halves of the same pipeline: a creator studio for making content and a playout system for broadcasting it. Both share MOTHER DeepVision and the CORE brain, so scene understanding, captions and continuity are consistent from edit to air.',
      points: ['WebGL2 real-time compositor', 'WebCodecs export · every codec', 'In-browser proxy + frame cache', 'Screen record · voiceover · beat sync', 'Watermark + animated lower-thirds', 'MOTHER Copilot with agent memory'],
    },
  ],
  ctaTitle: 'Make it. Air it. Own it.',
  ctaBody: 'Create with IntuiStudio and broadcast with Playout - on a platform that keeps your content sovereign.',
  cta: { label: 'Explore creator tools', href: '/creators' },
};

export default function PillarContent() {
  return <PillarPage data={data} />;
}
