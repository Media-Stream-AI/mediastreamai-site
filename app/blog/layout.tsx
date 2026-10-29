import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Blog - Notes from a Sovereign AI Company',
  description: 'Engineering, models and infrastructure from the team building the UK sovereign AI stack: MOTHER models, data centre design, robotics and defence.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Media Stream AI blog',
    description: 'Engineering, models and infrastructure from the team building the UK sovereign AI stack: MOTHER models, data centre design, robotics and defence.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
