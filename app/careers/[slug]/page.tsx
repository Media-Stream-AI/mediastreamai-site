import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RoleContent from './content';
import { JOBS, SITES, getJob, fullTitle, salaryBand } from '@/lib/jobs';
import { jobPostingLd } from '@/lib/job-schema';

// One page per role. This is the unit Google for Jobs indexes, so each one
// carries its own JobPosting structured data, its own canonical URL and its
// own generated social hero card.

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = getJob(params.slug);
  if (!job) return { title: 'Role not found' };

  const site = SITES[job.site];
  const title = fullTitle(job);
  const url = `https://www.mediastreamai.com/careers/${job.slug}`;
  const description = `${job.purpose} ${salaryBand(job)}. ${site.label}, ${site.locality}. Apply with your CV and we will arrange an interview.`;

  return {
    title: `${title} - ${site.locality} | MSAI Careers`,
    description,
    keywords: [
      `${job.title} jobs`,
      `${job.title} ${site.locality}`,
      `${job.family} jobs ${site.locality}`,
      'Media Stream AI careers',
      'MSAI jobs',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${title} - ${site.label}`,
      description,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) notFound();

  const base = 'https://www.mediastreamai.com';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      jobPostingLd(job),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: base },
          { '@type': 'ListItem', position: 2, name: 'Careers', item: `${base}/careers` },
          { '@type': 'ListItem', position: 3, name: fullTitle(job), item: `${base}/careers/${job.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <RoleContent slug={job.slug} />
    </>
  );
}
