import type { Metadata } from 'next';
import CareersContent from './content';
import { JOBS, SITES, TOTAL_POSITIONS, TOTAL_ROLES, fullTitle } from '@/lib/jobs';
import { jobPostingLd } from '@/lib/job-schema';

// The careers index. Metadata and structured data are emitted here, on the
// server, so search engines and AI crawlers get the whole job list without
// running the filters in content.tsx.

export const metadata: Metadata = {
  title: 'Careers - MSAI Dundee Data Centre & MSAI Manchester Robotics Jobs',
  description:
    `${TOTAL_ROLES} open roles at Media Stream AI: ${TOTAL_POSITIONS} positions at the MSAI Scotland sovereign AI data centre campus in Dundee - ` +
    'data centre managers, critical facilities and HV engineers, technicians, NOC, GPU and security roles - plus MOTHER EXO humanoid robotics, ' +
    'AI and manufacturing roles at MSAI Manchester. Apply with your CV and we will arrange an interview.',
  keywords: [
    'MSAI careers', 'Media Stream AI jobs', 'data centre jobs Dundee', 'data centre jobs Scotland',
    'critical facilities engineer jobs', 'HV authorised person jobs', 'data centre technician jobs',
    'GPU engineer jobs UK', 'NOC engineer jobs Scotland', 'robotics jobs Manchester',
    'humanoid robotics jobs UK', 'robotics engineer jobs Manchester', 'AI jobs UK', 'sovereign AI jobs',
  ],
  alternates: { canonical: 'https://www.mediastreamai.com/careers' },
  openGraph: {
    type: 'website',
    url: 'https://www.mediastreamai.com/careers',
    title: 'MSAI Careers - build the sovereign stack',
    description: `${TOTAL_ROLES} open roles across MSAI Dundee and MSAI Manchester. Apply with your CV.`,
  },
};

export const dynamic = 'force-dynamic';

export default function Page() {
  const base = 'https://www.mediastreamai.com';

  // One ItemList of every JobPosting, so a crawler that only reads the index
  // still sees all of them; each role also carries its own JobPosting on its
  // own page, which is what Google for Jobs actually indexes.
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Careers', item: `${base}/careers` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Open roles at Media Stream AI',
        numberOfItems: JOBS.length,
        itemListElement: JOBS.map((job, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${fullTitle(job)} - ${SITES[job.site].locality}`,
          url: `${base}/careers/${job.slug}`,
        })),
      },
      ...JOBS.map((job) => jobPostingLd(job)),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <CareersContent />
    </>
  );
}
