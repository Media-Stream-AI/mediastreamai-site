import type { Metadata } from 'next';

// Segment metadata. The page itself is a client component and so cannot export
// metadata; without this every route here would inherit the root title,
// description and - worse for search - the root canonical URL, telling
// crawlers each page was a duplicate of the homepage.
export const metadata: Metadata = {
  title: 'Technology - Cooling, Power & Heat Reuse at MSAI Scotland',
  description: 'How the MSAI Scotland campus is built: the Horizon sewer-source free-cooling loop at PUE 1.10, island-mode gas-CHP power, the three-tier heat-reuse cascade, MOTHER AI running the facility as its mainframe, and the 60-DOF MOTHER EXO humanoid build.',
  alternates: { canonical: '/technology' },
  openGraph: {
    type: 'website',
    url: '/technology',
    title: 'The building is the computer - MSAI engineering',
    description: 'How the MSAI Scotland campus is built: the Horizon sewer-source free-cooling loop at PUE 1.10, island-mode gas-CHP power, the three-tier heat-reuse cascade, MOTHER AI running the facility as its mainframe, and the 60-DOF MOTHER EXO humanoid build.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
