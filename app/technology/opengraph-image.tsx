import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /technology. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MSAI technology - cooling, power and heat reuse';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MSAI Engineering',
    title: 'The building is the computer.',
    subtitle: 'Horizon free cooling, island-mode power, heat reuse, and MOTHER AI running the facility itself.',
    facts: ['PUE 1.10', '100% free cooling', 'Island gas-CHP', 'Heat reuse'],
    accent: 'ember',
  });
}
