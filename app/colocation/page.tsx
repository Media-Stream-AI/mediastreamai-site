import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, Snowflake, Cpu, Network, ShieldCheck, Boxes, ArrowRight, MapPin, Factory, Server, Flame,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import ColocationForm from '@/components/site/ColocationForm';

export const metadata: Metadata = {
  title: 'MSAI Scotland - Sovereign GPU Colocation & 2026/2027 Deployments',
  description:
    'MSAI Scotland (Dundee): 10–15 MW of sovereign UK AI capacity with NVIDIA HGX B300 / GB10 Blackwell, direct liquid cooling and island-mode gas-CHP power. Colocation, private suites, GPU-as-a-Service and build-to-suit available across 2026–2027.',
};

export const dynamic = 'force-dynamic';

const QUICK = [
  { k: '10 MW', v: 'Available now' },
  { k: '2,048×', v: 'H200 · Oct 2026' },
  { k: '1,600×', v: 'B300 · 2026–27' },
  { k: 'Dundee', v: 'Scotland, UK' },
];

const ROADMAP = [
  {
    tag: 'Available now', color: '#22D3EE',
    title: 'Colocation · 10 MW',
    body: '10 MW of colocation available now - racks, cages and private suites in a live direct-liquid-cooled hall. Bring your own GPUs onto sovereign UK infrastructure today.',
    chips: ['10 MW now', 'DLC', 'Racks · cages', 'Private suites'],
  },
  {
    tag: 'Oct/Nov 2026 · confirmed', color: '#A855F7',
    title: '2,048× NVIDIA H200',
    body: 'A confirmed deployment of 2,048 NVIDIA H200 GPUs landing October/November 2026 - reservable now for training and inference on the sovereign estate.',
    chips: ['2,048× H200', 'Oct/Nov 2026', 'Confirmed', 'Reserve now'],
  },
  {
    tag: 'Oct 2026 – Feb 2027 · confirmed', color: '#F59E0B',
    title: '1,600× NVIDIA B300',
    body: 'A confirmed 1,600× NVIDIA B300 (Blackwell Ultra) deployment phasing in from October 2026 to February 2027 - next-generation capacity for frontier workloads.',
    chips: ['1,600× B300', 'Oct 2026 – Feb 2027', 'Blackwell Ultra', 'Confirmed'],
  },
];

const SPECS = [
  { icon: Zap, title: 'Power & resilience', body: 'Island-mode gas-CHP (3+1 N+1) plus grid, with a 4 MWh BESS buffer. 10–15 MW available across the estate.' },
  { icon: Snowflake, title: 'Cooling', body: 'Direct liquid cooling with well-water free cooling through a titanium WRAS Cat-5 PHE - PUE ~1.15, near-zero water waste.' },
  { icon: Cpu, title: 'Compute', body: 'NVIDIA HGX B300 and GB10 Blackwell, up to ~58 kW per rack. Bring your own hardware or take GPU-as-a-Service.' },
  { icon: Network, title: 'Network', body: 'Sovereign UK backbone with low-latency routes and dark-fibre options. Private interconnect to your estate.' },
  { icon: ShieldCheck, title: 'Security & compliance', body: 'UK sovereign throughout - GDPR, EASR, on-prem / air-gap options and 24/7 MOTHER Vision monitoring.' },
  { icon: Boxes, title: 'Space & footprint', body: 'DC1-B ~463 m² DLC hall plus DC3 halls. Racks, cages, private suites and build-to-suit floor.' },
];

const OPTIONS = [
  { title: 'Colocation', body: 'Racks and cages in a live DLC hall - you own the GPUs, we run the estate.' },
  { title: 'Private suite', body: 'A dedicated, secured suite sized to your deployment, with your own access control.' },
  { title: 'GPU-as-a-Service', body: 'Reserved HGX B300 / GB10 capacity billed by the hour or committed term - no capex.' },
  { title: 'Build-to-suit', body: 'We design and build to your spec on MSAI freehold - powered, cooled and operated by us.' },
];

const SHEET: [string, string][] = [
  ['location', 'Dundee, Scotland (A85 / Riverside)'],
  ['colocation', '10 MW available now'],
  ['H200', '2,048× · Oct/Nov 2026'],
  ['B300', '1,600× · Oct 2026 – Feb 2027'],
  ['estate', '10–15 MW sovereign'],
  ['cooling', 'DLC + well-water free cooling'],
  ['rack density', 'up to 58 kW'],
  ['PUE', '~1.15'],
  ['power', 'island gas-CHP (3+1 N+1) + grid'],
  ['heat reuse', 'CHP → building HVAC (absorption)'],
  ['compliance', 'UK sovereign · GDPR · EASR'],
];

export default function Page() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24">
        {/* Static ember wash - this page carries no video; the DC3 scope-of-supply
            drawing below does the explaining the aerial footage used to. */}
        <div aria-hidden className="absolute inset-0 -z-[5] overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(70% 60% at 50% 30%, transparent, rgba(5,6,10,0.85))' }} />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="chip !text-ember !border-ember/30" style={{ background: 'rgba(245,158,11,0.08)' }}>
                <MapPin className="w-3.5 h-3.5" /> MSAI Scotland · Dundee
              </span>
              <span className="chip">2026 / 2027 deployments</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.9]">
              Sovereign GPU capacity,<br /><span className="text-gradient-ember">available now.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              <span className="text-mist">10 MW of colocation available now</span> in Scotland - plus confirmed GPU
              deployments: <span className="text-mist">2,048× NVIDIA H200</span> (Oct/Nov 2026) and
              <span className="text-mist"> 1,600× NVIDIA B300</span> (Oct 2026 – Feb 2027). Direct liquid cooling,
              island-mode gas-CHP power, 100% UK sovereign.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="#enquire" className="btn-ember text-base px-7 py-3.5">Request capacity &amp; pricing <ArrowRight className="w-5 h-5" /></Link>
              <Link href="#roadmap" className="btn-ghost text-base px-7 py-3.5">View deployments</Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="border-y border-hair bg-night-800/40">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 divide-x divide-hair">
          {QUICK.map((s) => (
            <div key={s.v} className="px-4 py-8 text-center">
              <div className="font-display text-3xl text-gradient-ember">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-12">
            <span className="chip mb-5">GPU deployment roadmap</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">2026 / 2027 <span className="text-gradient-ember">deployments.</span></h2>
            <p className="mt-4 text-muted text-lg">Live capacity today, with new sovereign suites opening through 2027.</p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-5">
            {ROADMAP.map((r) => (
              <Reveal key={r.title}>
                <div className="card-night card-hover h-full p-6 relative overflow-hidden">
                  <span className="absolute left-0 top-0 h-1 w-full" style={{ background: r.color }} />
                  <span className="chip" style={{ color: r.color, borderColor: `${r.color}55` }}>{r.tag}</span>
                  <h3 className="mt-4 text-lg font-semibold text-mist">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{r.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.chips.map((c) => <span key={c} className="chip !text-[10px] !py-1">{c}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <figure className="mt-6">
              {/* The drawing is drafted on white - kept on a light card so the
                  single-line diagram stays legible against the dark page. */}
              <div className="overflow-hidden rounded-2xl border border-hair bg-white p-3">
                <Image
                  src="/dc3-protected-power.webp"
                  alt="DC3 protected power infrastructure, scope of supply: five 1200 kW UPS systems in N+1 parallel giving 6 MW installed, 35 lithium battery cabinets at five minutes autonomy, maintenance bypass system and client handoff panel"
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1024px) 940px, 100vw"
                  className="h-auto w-full rounded-lg"
                />
              </div>
              <figcaption className="mt-3 text-center font-mono text-[10px] tracking-wide text-slate-400">
                DC3 · protected power · 6 MW installed, N+1 parallel, 5 min autonomy
              </figcaption>
            </figure>
          </Reveal>
          <p className="mt-6 text-xs text-muted/70 max-w-3xl">
            Forward-looking: capacity, hardware and 2026 / 2027 deployment dates are indicative plans, not commitments,
            and may change. NVIDIA, HGX, Blackwell, GB10, AMD and Instinct are trademarks of their respective owners. See our{' '}
            <a href="/compliance" className="underline hover:text-cyan">Compliance &amp; Transparency</a> page.
          </p>
        </div>
      </section>

      {/* SPEC GRID */}
      <section className="pb-8">
        <div className="container-custom grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {SPECS.map((s) => (
              <Reveal key={s.title}>
                <div className="card-night card-hover h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-ember">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-mist">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="card-night p-6 font-mono text-sm sticky top-24">
              <div className="text-xs uppercase tracking-widest text-muted mb-4">Quick overview</div>
              <dl className="space-y-2.5">
                {SHEET.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 border-b border-hair pb-2.5">
                    <dt className="text-muted shrink-0">{k}</dt>
                    <dd className="text-right text-ember">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="section-padding">
        <div className="container-custom">
          <Reveal className="max-w-2xl mb-10">
            <span className="chip mb-5">Ways to deploy</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">However you <span className="text-gradient-ember">need it.</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OPTIONS.map((o) => (
              <Reveal key={o.title}>
                <div className="card-night card-hover h-full p-6">
                  <h3 className="text-lg font-semibold text-mist">{o.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MOTHER COMPUTE */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-ember/20 bg-gradient-to-br from-ember/[0.07] via-night-800/60 to-night-800/60 p-8 md:p-12">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
              <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="chip !text-ember !border-ember/30" style={{ background: 'rgba(245,158,11,0.08)' }}>MOTHER Compute</span>
                  <h2 className="mt-5 font-display text-3xl md:text-5xl leading-[0.95]">
                    GPU-as-a-Service,<br /><span className="text-gradient-ember">sovereign &amp; affordable.</span>
                  </h2>
                  <p className="mt-5 text-muted text-lg max-w-xl">
                    Don’t want to own hardware? Reserve NVIDIA B300 / H200 and AMD Instinct capacity on the MSAI
                    estate - billed by the hour or committed term, on UK-sovereign, free-cooled infrastructure.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k: 'PUE ~1.15', v: 'Cooling' }, { k: 'B300 · H200', v: 'NVIDIA' }, { k: 'Instinct', v: 'AMD' },
                    { k: 'Titanium', v: 'WRAS PHE' }, { k: 'N+1', v: 'Resilient' }, { k: 'Hourly', v: 'or committed' },
                  ].map((s) => (
                    <div key={s.v} className="card-night p-4 text-center">
                      <div className="font-display text-base text-ember">{s.k}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquire" className="section-padding pt-0">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <span className="chip mb-5">Client enquiry</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">Reserve <span className="text-gradient-ember">your capacity.</span></h2>
            <p className="mt-4 text-muted text-lg max-w-md">
              Tell us your workload and target window. The MSAI Scotland team replies within one business day
              with available capacity, pricing and a site visit.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-mist">
              {[
                [Factory, 'Island-mode gas-CHP power · N+1'],
                [Server, 'HGX B300 / GB10 Blackwell · up to 58 kW/rack'],
                [Flame, 'CHP heat reuse · PUE ~1.15'],
                [ShieldCheck, 'UK sovereign · GDPR · air-gap options'],
              ].map(([Icon, label], i) => {
                const I = Icon as typeof Factory;
                return (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hair bg-white/5 text-ember"><I className="w-4 h-4" /></span>
                    {label as string}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal>
            <ColocationForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
