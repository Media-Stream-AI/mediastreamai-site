import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /defence. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MOTHER Defence - sovereign cognitive defence platform';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MOTHER Defence',
    title: 'One sovereign mind. Every domain.',
    subtitle: 'A UK-built, air-gapped defence AI: multi-source intelligence fusion, cyber defence and embodied autonomy under human authority.',
    facts: ['Air-gapped', '25,000+ sources', 'Observe and advise', 'Strike 0'],
    accent: 'ember',
  });
}
