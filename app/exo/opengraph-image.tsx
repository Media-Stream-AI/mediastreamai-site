import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /exo. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MOTHER EXO - one sovereign brain, physical AI';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MOTHER EXO',
    title: 'One sovereign brain.',
    subtitle: 'A world model that acts - one inference driving a humanoid, two drones, a vehicle and a manipulator.',
    facts: ['15 weights', '5 bodies', '60-DOF humanoid', 'Manchester Q1 2027'],
    accent: 'violet',
  });
}
