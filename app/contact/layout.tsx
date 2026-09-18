import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Contact Media Stream AI',
  description: 'Talk to Media Stream AI about sovereign compute, the MOTHER model family, IntuiTV, MOTHER EXO physical AI or MOTHER Defence. Every enquiry reaches contact@mediastreamai.com.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact Media Stream AI',
    description: 'Talk to Media Stream AI about sovereign compute, the MOTHER model family, IntuiTV, MOTHER EXO physical AI or MOTHER Defence. Every enquiry reaches contact@mediastreamai.com.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
