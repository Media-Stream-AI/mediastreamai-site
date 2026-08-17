import type { Metadata } from 'next';
import PillarContent from './content';

export const metadata: Metadata = {
  title: 'IntuiTV & IntuiStudio - AI Television, End to End',
  description:
    'IntuiTV is the AI-powered personalised TV platform; IntuiStudio adds a browser-native Creator editor (Premiere / After-Effects-grade) and a 24/7 Playout engine - all on the sovereign MOTHER model family.',
};

export const dynamic = 'force-dynamic';

export default function Page() {
  return <PillarContent />;
}
