import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /model-family. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'The MOTHER AI model family - seven sovereign models, 240B parameters';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MOTHER AI Models',
    title: 'Seven sovereign models. 240B parameters.',
    subtitle: 'Trained from scratch on owned data and served on our own compute - open-weight and commercially deployed.',
    facts: ['7 models', '240B parameters', 'EU AI Act Art. 53', 'Open weights'],
    accent: 'cyan',
  });
}
