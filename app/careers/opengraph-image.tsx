import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { TOTAL_ROLES, TOTAL_POSITIONS } from '@/lib/jobs';

// Social hero card for /careers - the one that travels when a vacancy is
// shared to LinkedIn, so it leads with the headline numbers.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MSAI careers - open roles at the Dundee data centre campus and the Manchester humanoid factory';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MSAI Careers · we are hiring',
    title: 'Build the sovereign stack.',
    subtitle:
      'Sovereign AI data centre roles in Dundee and MOTHER EXO humanoid robotics roles in Manchester. Apply with your CV.',
    facts: [`${TOTAL_ROLES} open roles`, `${TOTAL_POSITIONS} Dundee positions`, 'Dundee', 'Manchester'],
    accent: 'cyan',
  });
}
