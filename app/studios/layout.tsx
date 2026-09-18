import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'For Studios - AI Production & 24/7 Playout',
  description: 'Production tooling, compliance and a 24/7 Playout engine for studios and broadcasters, running on the sovereign MOTHER stack with UK and EU data residency.',
  alternates: { canonical: '/studios' },
  openGraph: {
    type: 'website',
    url: '/studios',
    title: 'Media Stream AI for studios',
    description: 'Production tooling, compliance and a 24/7 Playout engine for studios and broadcasters, running on the sovereign MOTHER stack with UK and EU data residency.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
