import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Media Stream AI - from power to physical AI';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Sovereign UK AI',
    title: 'From power to physical AI.',
    subtitle: 'A European full-stack sovereign AI company: our own data centres, compute, models, applications and robots.',
    facts: ['240B parameters', '34 MW IT', '7 models', 'UK sovereign'],
    accent: 'cyan',
  });
}
