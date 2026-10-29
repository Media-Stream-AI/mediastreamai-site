import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'For Creators - IntuiStudio, the Browser-Native AI Studio',
  description: 'IntuiStudio gives creators Premiere and After-Effects-grade editing in the browser with the MOTHER IntuiTV model inside: text-to-video, scene detect, AI captions and highlight cutting, rendered on sovereign GB10 nodes.',
  alternates: { canonical: '/creators' },
  openGraph: {
    type: 'website',
    url: '/creators',
    title: 'IntuiStudio for creators',
    description: 'IntuiStudio gives creators Premiere and After-Effects-grade editing in the browser with the MOTHER IntuiTV model inside: text-to-video, scene detect, AI captions and highlight cutting, rendered on sovereign GB10 nodes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
