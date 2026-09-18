import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Start your IntuiTV trial',
  description: 'Create your IntuiTV account and start watching.',
  alternates: { canonical: '/viewers/signup' },
  openGraph: {
    type: 'website',
    url: '/viewers/signup',
    title: 'Start your IntuiTV trial',
    description: 'Create your IntuiTV account and start watching.',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
