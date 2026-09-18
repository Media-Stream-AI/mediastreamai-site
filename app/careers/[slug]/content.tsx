'use client';

// A single role. Full specification, the process, and the application form
// pre-set to this role so a candidate never has to pick it out of a list of
// forty-three.

import Link from 'next/link';
import {
  ArrowLeft, ArrowUpRight, Banknote, Building2, Clock3, MapPin, ShieldCheck, Users,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import ShareBar from '@/components/site/ShareBar';
import JobApplicationForm from '@/components/site/JobApplicationForm';
import {
  SITES, CAREERS_EMAIL, getJob, fullTitle, salaryBand, positionsLabel, processForSite,
} from '@/lib/jobs';

export default function RoleContent({ slug }: { slug: string }) {
  const job = getJob(slug)!;
  const site = SITES[job.site];
  const title = fullTitle(job);
  const accent = site.accent === 'ember' ? 'text-ember' : 'text-magenta';
  const process = processForSite(job.site);

  const facts = [
    { icon: Banknote, k: 'Salary', v: salaryBand(job) },
    {
      icon: Clock3,
      k: 'Contract',
      v: job.employment === 'contract' ? `Fixed term · ${job.term}` : 'Permanent',
    },
    { icon: MapPin, k: 'Location', v: `${site.locality}, ${site.region}` },
    ...(job.positions
      ? [{ icon: Users, k: 'Positions', v: positionsLabel(job) }]
      : []),
  ];

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-12 md:pt-44 md:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div
            className={`absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full blur-3xl ${
              site.accent === 'ember' ? 'bg-ember/10' : 'bg-magenta/10'
            }`}
          />
        </div>
        <div className="container-custom relative">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-mist">
            <ArrowLeft className="h-4 w-4" /> All roles
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`chip ${site.accent === 'ember' ? '!border-ember/30 !text-ember' : '!border-magenta/30 !text-magenta'}`}>
                <Building2 className="h-3.5 w-3.5" /> {site.label}
              </span>
              <span className="chip">{job.family}</span>
              {job.employment === 'contract' && <span className="chip">Contract · {job.term}</span>}
              {job.shift && <span className="chip">Shift work</span>}
            </div>

            <h1 className="font-display text-4xl leading-[0.95] md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{job.purpose}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#apply" className="btn-glow px-7 py-3.5 text-base">
                Apply for this role <ArrowUpRight className="h-5 w-5" />
              </Link>
              <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(title)}`} className="btn-ghost px-7 py-3.5 text-base">
                Email us instead
              </a>
            </div>

            <ShareBar className="mt-8" title={`${title} - ${site.label}`} summary={job.purpose} label="Share this role" />
          </div>
        </div>
      </section>

      {/* ================= FACT STRIP ================= */}
      <section className="border-y border-hair bg-night-800/40">
        <div className="container-custom grid grid-cols-2 divide-x divide-hair md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="px-4 py-7">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted">
                <f.icon className={`h-3.5 w-3.5 ${accent}`} /> {f.k}
              </div>
              <div className="mt-2 text-sm font-medium text-mist md:text-base">{f.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SPECIFICATION ================= */}
      <section className="section-padding">
        <div className="container-custom grid gap-10 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Reveal>
              <div className="glass-night p-7">
                <h2 className="text-xl font-semibold text-mist">Key responsibilities</h2>
                <ul className="mt-4 space-y-3">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${site.accent === 'ember' ? 'bg-ember' : 'bg-magenta'}`} />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="glass-night p-7">
                <h2 className="text-xl font-semibold text-mist">Requirements</h2>
                <p className="mt-3 leading-relaxed text-muted">{job.requirements}</p>
                {job.certifications && job.certifications.length > 0 && (
                  <>
                    <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">Bring to interview</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.certifications.map((c) => (
                        <span key={c} className="chip !py-1 !text-[11px]">
                          <ShieldCheck className={`h-3 w-3 ${accent}`} /> {c}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal>
              <div className="glass-night p-7">
                <h2 className="text-xl font-semibold text-mist">Where you would work</h2>
                <p className="mt-3 leading-relaxed text-muted">{site.blurb}</p>
                <p className="mt-3 text-sm text-muted">
                  {site.street}, {site.locality}, {site.region}
                </p>
                {site.note && <p className="mt-4 text-sm leading-relaxed text-muted/80">{site.note}</p>}
              </div>
            </Reveal>

            <Reveal>
              <div className="glass-night p-7">
                <h2 className="text-xl font-semibold text-mist">How we hire</h2>
                <ol className="mt-4 space-y-3">
                  {process.map((p) => (
                    <li key={p.step} className="flex gap-4">
                      <span className="font-mono text-xs leading-6 tracking-[0.2em] text-cyan">{p.step}</span>
                      <span className="text-[15px] leading-relaxed text-muted">
                        <span className="text-mist">{p.title}.</span> {p.body}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-5 text-sm leading-relaxed text-muted/80">
                  Interviews are held at {site.interview.name}, {site.interview.locality}
                  {site.interview.postcode ? ` (${site.interview.postcode})` : ''}.{' '}
                  <a href={site.interview.map} target="_blank" rel="noopener noreferrer" className="text-cyan underline">
                    View on map
                  </a>
                  . Please bring photo ID and any relevant certifications.
                </p>
              </div>
            </Reveal>
          </div>

          {/* summary rail */}
          <Reveal>
            <div className="card-night sticky top-24 p-6 font-mono text-sm">
              <div className="mb-4 text-xs uppercase tracking-widest text-muted">At a glance</div>
              <dl className="space-y-2.5">
                {([
                  ['role', title],
                  ['site', site.label],
                  ['location', site.locality],
                  ['discipline', job.family],
                  ['contract', job.employment === 'contract' ? `fixed term · ${job.term}` : 'permanent'],
                  ...(job.shift ? [['pattern', 'shift work'] as [string, string]] : []),
                  ...(job.positions ? [['positions', String(job.positions)] as [string, string]] : []),
                  ['salary', salaryBand(job)],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 border-b border-hair pb-2.5">
                    <dt className="shrink-0 text-muted">{k}</dt>
                    <dd className={`text-right ${accent}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link href="#apply" className="btn-glow mt-6 w-full justify-center py-3 text-sm">
                Apply with your CV
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= APPLY ================= */}
      <section id="apply" className="section-padding scroll-mt-24 pt-0">
        <div className="container-custom">
          <Reveal className="mx-auto mb-8 max-w-2xl text-center">
            <span className="chip mx-auto mb-5">Apply</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Apply for <span className="text-gradient">{title}.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Your application and CV go straight to{' '}
              <a href={`mailto:${CAREERS_EMAIL}`} className="text-cyan underline">{CAREERS_EMAIL}</a>. Shortlisted
              candidates are invited to interview, with the date agreed individually.
            </p>
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <JobApplicationForm defaultRole={job.slug} />
            </div>
          </Reveal>
          <div className="mt-10 text-center">
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-cyan link-grow">
              <ArrowLeft className="h-4 w-4" /> Back to all roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
