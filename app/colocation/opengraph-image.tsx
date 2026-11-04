import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../lib/og';

// Social hero card for /colocation. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MSAI Scotland - sovereign GPU colocation in Dundee';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MSAI Scotland',
    title: 'Sovereign GPU capacity, available now.',
    subtitle: 'Sovereign GPU colocation in Dundee: Phase One 25 MWth live, Phase Two 75 MWth from December 2026, Phase Three 25 MW from Q1 2028.',
    facts: ['25 MWth live', '75 MWth Dec 2026', '25 MW Q1 2028', 'GPU 28 Dec 2026'],
    accent: 'ember',
  });
}
