import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { JOBS, SITES, getJob, fullTitle, salaryBand } from '@/lib/jobs';

// A social hero card per role, so sharing a single vacancy shows that vacancy
// - its title, its site and its salary band - rather than a generic company
// card. Pre-generated for every role at build time.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'MSAI role';

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const job = getJob(params.slug);
  if (!job) {
    return renderOgImage({ eyebrow: 'MSAI Careers', title: 'Open roles at Media Stream AI' });
  }

  const site = SITES[job.site];
  const facts = [
    site.locality,
    job.employment === 'contract' ? `Contract · ${job.term}` : 'Permanent',
    salaryBand(job),
  ];
  if (job.positions && job.positions > 1) facts.push(`${job.positions} positions`);

  return renderOgImage({
    eyebrow: `${site.label} · now hiring`,
    title: fullTitle(job),
    subtitle: job.purpose,
    facts,
    accent: site.accent === 'ember' ? 'ember' : 'violet',
  });
}
