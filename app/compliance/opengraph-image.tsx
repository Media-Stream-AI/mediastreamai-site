import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /compliance. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Media Stream AI compliance and transparency';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Compliance',
    title: 'Compliance and transparency.',
    subtitle: 'EU AI Act Article 53 filings, UK GDPR, copyright policy and the published training-content summary.',
    facts: ['EU AI Act Art. 53', 'UK GDPR', 'Open filings'],
    accent: 'cyan',
  });
}
