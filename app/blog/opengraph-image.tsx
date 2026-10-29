import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /blog. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Media Stream AI blog';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MSAI Journal',
    title: 'Notes from a sovereign AI company.',
    subtitle: 'Engineering, models and infrastructure from the team building the UK stack.',
    facts: ['Engineering', 'Models', 'Infrastructure'],
    accent: 'cyan',
  });
}
