import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /intuitv. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'IntuiTV and IntuiStudio - AI television, end to end';

export default function Image() {
  return renderOgImage({
    eyebrow: 'IntuiTV / IntuiStudio',
    title: 'Make it. Air it. Own it.',
    subtitle: 'AI television end to end: a browser-native creator studio and a 24/7 playout engine on the sovereign MOTHER stack.',
    facts: ['720p / 24fps', 'Creator studio', '24/7 Playout', 'UK sovereign'],
    accent: 'violet',
  });
}
