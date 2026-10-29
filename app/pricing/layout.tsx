import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Pricing - IntuiTV & MOTHER AI Plans',
  description: 'Plans and pricing for IntuiTV, IntuiStudio and access to the sovereign MOTHER model family. UK and EU data residency, GDPR compliant.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    type: 'website',
    url: '/pricing',
    title: 'Media Stream AI pricing',
    description: 'Plans and pricing for IntuiTV, IntuiStudio and access to the sovereign MOTHER model family. UK and EU data residency, GDPR compliant.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
