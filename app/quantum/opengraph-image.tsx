import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

// Social hero card for /quantum. Generated from the page's own headline so the
// card and the page can never disagree.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MOTHER Quantum-AI - quantum-enhanced sovereign RAG';

export default function Image() {
  return renderOgImage({
    eyebrow: 'MOTHER Quantum-AI',
    title: 'Quantum-enhanced sovereign RAG.',
    subtitle: 'Swap-test retrieval over 1.67M chunks, reasoned on MOTHER CORE at T=0 - air-gapped and fully sovereign.',
    facts: ['1.67M chunks', 'PennyLane', 'Air-gapped', 'Live in production'],
    accent: 'cyan',
  });
}
