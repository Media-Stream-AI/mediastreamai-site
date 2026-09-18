'use client';

// The careers index: every open role across both MSAI sites, filterable, each
// linking to its own page, with one application form at the foot that posts
// the CV straight to the recruitment inbox.
//
// Client component because of the filters and the form. The structured data
// and metadata live in page.tsx on the server, where crawlers see them without
// executing anything.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ArrowUpRight, Banknote, Building2, Clock3, MapPin, Users,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import ShareBar from '@/components/site/ShareBar';
import JobApplicationForm from '@/components/site/JobApplicationForm';
import {
  JOBS, SITES, PROCESS, CAREERS_EMAIL, TOTAL_ROLES, TOTAL_POSITIONS,
  fullTitle, salaryBand, positionsLabel, jobsForSite, positionsForSite,
  type Family, type SiteId,
} from '@/lib/jobs';

const SITE_FILTERS: { id: SiteId | 'all'; label: string }[] = [
  { id: 'all', label: 'All sites' },
  { id: 'dundee', label: SITES.dundee.label },
  { id: 'manchester', label: SITES.manchester.label },
];

const FAMILIES: Family[] = [
  'Leadership',
  'Engineering',
  'Robotics engineering',
  'AI & autonomy',
  'Manufacturing',
  'Operations',
  'Security',
  'Build & commissioning',
];

const STATS = [
  { k: String(TOTAL_ROLES), v: 'Open roles' },
  { k: String(TOTAL_POSITIONS), v: 'Dundee positions' },
  { k: '2', v: 'UK sites' },
  { k: 'Q1 2027', v: 'Manchester online' },
];

export default function CareersContent() {
  const [site, setSite] = useState<SiteId | 'all'>('all');
  const [family, setFamily] = useState<Family | 'all'>('all');
  const [employment, setEmployment] = useState<'all' | 'permanent' | 'contract'>('all');

  const visible = useMemo(
    () =>
      JOBS.filter(
        (j) =>
          (site === 'all' || j.site === site) &&
          (family === 'all' || j.family === family) &&
          (employment === 'all' || j.employment === employment),
      ),
    [site, family, employment],
  );

  // Only offer families that actually exist inside the current site filter, so
  // a visitor cannot filter their way into an empty list.
  const availableFamilies = useMemo(() => {
    const pool = site === 'all' ? JOBS : JOBS.filter((j) => j.site === site);
    return FAMILIES.filter((f) => pool.some((j) => j.family === f));
  }, [site]);

  const pill = (active: boolean) =>
    `rounded-xl border px-3.5 py-2 text-sm transition-colors ${
      active ? 'border-cyan/50 bg-cyan/[0.1] text-mist' : 'border-hair text-muted hover:text-mist'
    }`;

  return (
    <div className="overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="chip">MSAI Careers</span>
              <span className="chip !border-ember/30 !text-ember" style={{ background: 'rgba(245,158,11,0.08)' }}>
                <MapPin className="h-3.5 w-3.5" /> Dundee
              </span>
              <span className="chip !border-magenta/30 !text-magenta" style={{ background: 'rgba(236,72,153,0.08)' }}>
                <MapPin className="h-3.5 w-3.5" /> Manchester
              </span>
            </div>
            <h1 className="font-display text-5xl leading-[0.9] md:text-7xl">
              Build the <span className="text-gradient">sovereign stack.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Britain is building its own AI infrastructure, and these are the people who run it. A sovereign
              AI data centre campus in Dundee, and the UK humanoid factory in Manchester that comes online in
              Q1 2027. Send your CV and we will arrange an interview.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#roles" className="btn-glow px-7 py-3.5 text-base">
                See all {TOTAL_ROLES} roles <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#apply" className="btn-ghost px-7 py-3.5 text-base">Apply now</Link>
            </div>
            <ShareBar
              className="mt-8"
              title="MSAI is hiring - sovereign AI data centre (Dundee) and humanoid robotics (Manchester)"
              summary={`${TOTAL_ROLES} open roles across two UK sites. Apply with your CV.`}
              label="Share these jobs"
            />
          </div>

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hair bg-hair md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.v} className="bg-night-800/70 px-4 py-6">
                <div className="font-display text-2xl text-gradient md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SITES ================= */}
      <section className="pb-4">
        <div className="container-custom grid gap-5 md:grid-cols-2">
          {(['dundee', 'manchester'] as SiteId[]).map((id) => {
            const s = SITES[id];
            const n = jobsForSite(id).length;
            const pos = positionsForSite(id);
            const accent = s.accent === 'ember' ? 'text-ember' : 'text-magenta';
            return (
              <Reveal key={id}>
                <button
                  type="button"
                  onClick={() => {
                    setSite(id);
                    setFamily('all');
                    document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="card-night card-hover h-full w-full p-6 text-left md:p-7"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className={`h-4 w-4 ${accent}`} />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl text-mist md:text-3xl">{s.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="chip !py-1 !text-[10px]">{n} roles</span>
                    {pos > 0 && <span className="chip !py-1 !text-[10px]">{pos} positions</span>}
                    <span className="chip !py-1 !text-[10px]">{s.locality}</span>
                  </div>
                  {s.note && <p className="mt-4 text-xs leading-relaxed text-muted/70">{s.note}</p>}
                  <span className={`mt-5 inline-flex items-center gap-1.5 text-sm ${accent}`}>
                    View {s.label} roles <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= ROLES ================= */}
      <section id="roles" className="section-padding scroll-mt-24">
        <div className="container-custom">
          <Reveal className="mb-8 max-w-2xl">
            <span className="chip mb-5">Open roles</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Every role, <span className="text-gradient">live.</span>
            </h2>
            <p className="mt-4 text-lg text-muted">
              Permanent and contract, across engineering, operations, robotics, AI and manufacturing. Open a
              role for the full specification, then apply with your CV.
            </p>
          </Reveal>

          {/* filters */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {SITE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => { setSite(f.id); setFamily('all'); }}
                  className={pill(site === f.id)}
                  aria-pressed={site === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setFamily('all')} className={pill(family === 'all')} aria-pressed={family === 'all'}>
                All disciplines
              </button>
              {availableFamilies.map((f) => (
                <button key={f} type="button" onClick={() => setFamily(f)} className={pill(family === f)} aria-pressed={family === f}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'permanent', 'contract'] as const).map((e) => (
                <button key={e} type="button" onClick={() => setEmployment(e)} className={pill(employment === e)} aria-pressed={employment === e}>
                  {e === 'all' ? 'Permanent & contract' : e[0].toUpperCase() + e.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="mt-6 text-sm text-muted">
            Showing <span className="text-mist">{visible.length}</span> of {TOTAL_ROLES} roles.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {visible.map((job) => {
              const s = SITES[job.site];
              const accent = s.accent === 'ember' ? 'text-ember' : 'text-magenta';
              return (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className="group card-night card-hover flex h-full flex-col p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] uppercase tracking-[0.16em] ${accent}`}>{s.label}</span>
                    <span className="text-hair">·</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-muted">{job.family}</span>
                  </div>

                  <h3 className="mt-2 flex items-start gap-2 font-display text-xl leading-tight text-mist md:text-2xl">
                    <span className="flex-1">{fullTitle(job)}</span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-cyan opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{job.purpose}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hair pt-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Banknote className="h-3.5 w-3.5 text-cyan" /> {salaryBand(job)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5 text-cyan" />
                      {job.employment === 'contract' ? `Contract · ${job.term}` : 'Permanent'}
                      {job.shift ? ' · shift' : ''}
                    </span>
                    {positionsLabel(job) && (
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-cyan" /> {positionsLabel(job)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {visible.length === 0 && (
            <p className="mt-6 text-muted">
              No roles match that combination. Clear a filter, or send a speculative CV to{' '}
              <a href={`mailto:${CAREERS_EMAIL}`} className="text-cyan underline">{CAREERS_EMAIL}</a>.
            </p>
          )}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="section-padding bg-night-800/50 pt-16">
        <div className="container-custom">
          <Reveal className="mb-10 max-w-2xl">
            <span className="chip mb-5">How we hire</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A straightforward process, <span className="text-gradient">the same for every role.</span>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <Reveal key={p.step}>
                <div className="card-night h-full p-5">
                  <span className="font-mono text-xs tracking-[0.2em] text-cyan">{p.step}</span>
                  <h3 className="mt-2 font-semibold text-mist">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {(['dundee', 'manchester'] as SiteId[]).map((id) => {
                const v = SITES[id].interview;
                return (
                  <div key={id} className="card-night p-6">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                      {SITES[id].label} · interviews
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-mist">{v.name}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {v.street}, {v.locality}{v.postcode ? `, ${v.postcode}` : ''}
                    </p>
                    <a
                      href={v.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-cyan link-grow"
                    >
                      View on map <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
              Interview dates are set individually with each candidate at the point their submission is
              shortlisted. Please bring photo ID and any relevant certifications - for example HV Authorised
              Person, SIA, F-Gas, NEBOSH or IPC.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= APPLY ================= */}
      <section id="apply" className="section-padding scroll-mt-24">
        <div className="container-custom grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="chip mb-5">Apply</span>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Send your CV. <span className="text-gradient">We will arrange the interview.</span>
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">
              One form, every role. Your application and CV go straight to our recruitment team at{' '}
              <a href={`mailto:${CAREERS_EMAIL}`} className="text-cyan underline">{CAREERS_EMAIL}</a>.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-mist">
              {[
                'Shortlisted against the published role requirements',
                'Interview in person, date agreed with you',
                'Short technical or practical assessment for engineering roles',
                'Offer subject to references, checks and vetting where relevant',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-hair bg-white/5 text-cyan">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-relaxed text-muted">
              These roles are also advertised through Jobcentre Plus across Fife, Find a Job, s1jobs, Indeed,
              CV-Library and LinkedIn - but applying here reaches us directly.
            </p>
            <ShareBar
              className="mt-7"
              title="MSAI is hiring across Dundee and Manchester"
              summary="Sovereign AI data centre and humanoid robotics roles. Apply with your CV."
            />
          </Reveal>

          <Reveal>
            <JobApplicationForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
