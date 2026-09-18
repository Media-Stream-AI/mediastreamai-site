import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms on which Media Stream AI Limited provides mediastreamai.com, IntuiTV and related services.',
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'website',
    url: '/terms',
    title: 'Media Stream AI terms of service',
    description: 'The terms on which Media Stream AI Limited provides mediastreamai.com, IntuiTV and related services.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
