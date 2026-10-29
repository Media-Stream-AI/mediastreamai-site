import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /contact. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Contact Media Stream AI';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Contact MSAI',
    title: 'Talk to Media Stream AI.',
    subtitle: 'Compute, models, physical AI or defence - every layer of the stack is ours, so every layer is negotiable.',
    facts: ['UK sovereign', 'contact@mediastreamai.com'],
    accent: 'cyan',
  });
}
