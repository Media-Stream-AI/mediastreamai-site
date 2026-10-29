import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /colocation. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MSAI Scotland - sovereign GPU colocation in Dundee';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MSAI Scotland',
    title: 'Sovereign GPU capacity, available now.',
    subtitle: 'A 38 MW site in Dundee scaling to 70 MW from 2027, with 25 MW of colocation available today.',
    facts: ['38 MW site', '25 MW colo now', '70 MW from 2027', 'GPU 28 Dec 2026'],
    accent: 'ember',
  });
}
