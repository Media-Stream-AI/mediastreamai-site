import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Creator dashboard',
  description: 'Your IntuiStudio creator dashboard.',
  alternates: { canonical: '/creators/dashboard' },
  openGraph: {
    type: 'website',
    url: '/creators/dashboard',
    title: 'Creator dashboard',
    description: 'Your IntuiStudio creator dashboard.',
  },
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
