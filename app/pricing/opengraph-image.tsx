import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /pricing. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Media Stream AI pricing';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Pricing',
    title: 'Sovereign AI, priced plainly.',
    subtitle: 'Plans for viewers, creators and studios on the sovereign MOTHER stack.',
    facts: ['UK/EU sovereign', 'GDPR', 'No lock-in'],
    accent: 'violet',
  });
}
