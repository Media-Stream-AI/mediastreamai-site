import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /creators. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'IntuiStudio for creators';

export default function Image() {
  return renderOgImage({
    eyebrow: 'For Creators',
    title: 'Create with IntuiStudio.',
    subtitle: 'Studio-grade editing in the browser with the MOTHER IntuiTV model inside, rendering on sovereign GB10 nodes.',
    facts: ['Browser-native', 'AI Copilot', 'Run on GB10'],
    accent: 'violet',
  });
}
