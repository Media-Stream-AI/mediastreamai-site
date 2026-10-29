// schema.org JobPosting for a role.
//
// This is what puts MSAI vacancies into Google for Jobs and into the job
// aggregators and AI assistants that read the same markup, so the shape
// matters: `hiringOrganization`, `jobLocation`, `datePosted` and `validThrough`
// are the fields those consumers actually require.
//
// `baseSalary` is emitted only where a band has genuinely been set. A role
// advertised as "salary on application" gets no salary property at all rather
// than a guessed one - a wrong band in structured data is worse than none.

import { SITES, POSTED_DATE, fullTitle, salaryBand, type Job } from '@/lib/jobs';

const BASE = 'https://www.mediastreamai.com';

/** Postings stay valid for a year from publication unless refreshed. */
function validThrough(from: string): string {
  const d = new Date(`${from}T00:00:00Z`);
  d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function jobPostingLd(job: Job): Record<string, unknown> {
  const site = SITES[job.site];
  const title = fullTitle(job);

  const description = [
    `<p>${job.purpose}</p>`,
    '<p><strong>Key responsibilities:</strong></p>',
    `<ul>${job.responsibilities.map((r) => `<li>${r}</li>`).join('')}</ul>`,
    `<p><strong>Requirements:</strong> ${job.requirements}</p>`,
    `<p><strong>Salary:</strong> ${salaryBand(job)}</p>`,
    job.shift ? '<p>This role is shift work.</p>' : '',
    site.note ? `<p>${site.note}</p>` : '',
  ].join('');

  const ld: Record<string, unknown> = {
    '@type': 'JobPosting',
    '@id': `${BASE}/careers/${job.slug}`,
    title,
    name: title,
    description,
    identifier: { '@type': 'PropertyValue', name: 'Media Stream AI Limited', value: job.slug },
    datePosted: POSTED_DATE,
    validThrough: validThrough(POSTED_DATE),
    employmentType: job.employment === 'contract' ? 'CONTRACTOR' : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Media Stream AI Limited',
      sameAs: BASE,
      logo: `${BASE}/icon.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      name: site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.street,
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
    },
    jobLocationType: undefined,
    applicantLocationRequirements: { '@type': 'Country', name: 'United Kingdom' },
    directApply: true,
    url: `${BASE}/careers/${job.slug}`,
    industry: 'Artificial Intelligence, Data Centres and Robotics',
    occupationalCategory: job.family,
  };

  if (job.positions && job.positions > 1) ld.totalJobOpenings = job.positions;

  if (job.salary) {
    ld.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'GBP',
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: 'YEAR',
      },
    };
  }

  if (job.employment === 'contract' && job.term) {
    ld.employmentUnit = { '@type': 'Organization', name: `Fixed term - ${job.term}` };
  }

  // `undefined` values survive JSON.stringify as omitted keys, but being
  // explicit keeps the emitted object clean for anyone reading the source.
  delete ld.jobLocationType;

  return ld;
}
