import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Media Stream AI Limited collects, uses and protects personal data across mediastreamai.com, IntuiTV and our recruitment process, under UK GDPR.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    url: '/privacy',
    title: 'Media Stream AI privacy policy',
    description: 'How Media Stream AI Limited collects, uses and protects personal data across mediastreamai.com, IntuiTV and our recruitment process, under UK GDPR.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
