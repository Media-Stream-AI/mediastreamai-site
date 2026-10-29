import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /studios. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Media Stream AI for studios';

export default function Image() {
  return renderOgImage({
    eyebrow: 'For Studios',
    title: 'Broadcast on a sovereign stack.',
    subtitle: 'Playout, compliance and AI production tooling for studios and broadcasters.',
    facts: ['24/7 Playout', 'HLS delivery', 'UK sovereign'],
    accent: 'violet',
  });
}
