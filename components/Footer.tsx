// components/Footer.tsx
import Link from 'next/link';
import SocialBar from '@/components/site/SocialBar';

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: 'Models',
    links: [
      ['MOTHER Model Family', '/model-family'],
      ['MOTHER CORE 7B', '/model-family'],
      ['Quantum-AI', '/quantum'],
      ['Technology', '/technology'],
    ],
  },
  {
    title: 'IntuiTV',
    links: [
      ['For Viewers', '/viewers'],
      ['For Creators', '/creators'],
      ['For Studios', '/studios'],
      ['Pricing', '/pricing'],
    ],
  },
  {
    title: 'EXO & Defence',
    links: [
      ['MOTHER EXO', '/exo'],
      ['Robotics', '/exo'],
      ['MOTHER Defence', '/defence'],
      ['MSAI Scotland · Colocation', '/colocation'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Blog', '/blog'],
      ['Contact', '/contact'],
      ['Compliance & Transparency', '/compliance'],
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hair bg-night/60">
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan via-iris to-magenta">
                <span className="h-3.5 w-3.5 rounded-full bg-night" />
              </span>
              <span className="font-display text-2xl tracking-tight text-mist">MSAI</span>
            </Link>
            <p className="text-sm text-muted mb-5 max-w-xs leading-relaxed">
              Sovereign UK AI - one company group across the MOTHER model family, IntuiTV, MOTHER EXO
              and MOTHER Defence. Owned, hosted and trained in Britain.
            </p>
            <SocialBar />
            <a href="mailto:hello@mediastreamai.com" className="mt-3 inline-block text-sm text-muted hover:text-cyan transition-colors">
              hello@mediastreamai.com
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.18em] text-mist mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label + href}>
                    <Link href={href} className="text-muted hover:text-cyan transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-hair flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <div>© {year} Media Stream AI Limited · Manchester, UK. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              100% UK Sovereign
            </span>
            <span>GDPR compliant</span>
          </div>
        </div>

        {/* EU AI Act - Model Transparency (Article 53) */}
        <section aria-label="EU AI Act transparency" className="mt-8 pt-6 border-t border-hair">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan mb-2">
            EU AI Act - Model Transparency
          </p>
          <p className="text-xs text-muted leading-relaxed max-w-3xl mb-3">
            MOTHER CORE V2 &amp; V3 are open-weight general-purpose AI models. As their provider,
            Media Stream AI publishes the documents required under Article 53 of the EU AI Act
            (Regulation (EU) 2024/1689) - a copyright-compliance policy and a public summary of
            training content - together with our full technology due-diligence dossier:
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
            <a href="/downloads/MOTHER-EU-Copyright-Policy.pdf" target="_blank" rel="noopener" className="hover:text-cyan transition-colors">
              ↓ Copyright Policy - Art. 53(1)(c)
            </a>
            <a href="/downloads/MOTHER-Training-Content-Summary.pdf" target="_blank" rel="noopener" className="hover:text-cyan transition-colors">
              ↓ Training-Content Summary - Art. 53(1)(d)
            </a>
            <Link href="/compliance#documents" className="hover:text-cyan transition-colors">
              ↓ Technology White Paper (register)
            </Link>
            <Link href="/compliance" className="hover:text-cyan transition-colors">→ Full compliance &amp; transparency</Link>
          </div>
        </section>

        {/* Disclaimers */}
        <section aria-label="Disclaimers" className="mt-6 pt-6 border-t border-hair space-y-2 text-[11px] leading-relaxed text-muted/70">
          <p>
            <span className="text-muted">AI-generated content.</span> Parts of this site and the MOTHER
            products create or process AI-generated media. AI outputs may be inaccurate or synthetic and
            should be reviewed by a human before reliance. AI-generated media is labelled in-product where required.
          </p>
          <p>
            <span className="text-muted">Forward-looking statements.</span> Capacity, deployment dates,
            hardware and performance figures (including 2026 / 2027 GPU deployments and colocation availability)
            are indicative plans, not commitments, and may change. Nothing here is an offer, financial promotion
            or investment advice.
          </p>
          <p>
            <span className="text-muted">Trademarks.</span> NVIDIA, HGX, Blackwell, GB10 and other names are
            trademarks of their respective owners; use here is descriptive only and implies no affiliation or endorsement.
          </p>
          <p>
            Media Stream AI Limited (trading as MSAI) is registered in England &amp; Wales. Registered office:
            Manchester, United Kingdom. Data controller for UK/EU GDPR purposes - see our{' '}
            <Link href="/privacy" className="text-muted hover:text-cyan underline">Privacy Notice</Link> and{' '}
            <Link href="/compliance" className="text-muted hover:text-cyan underline">Compliance &amp; Transparency</Link> pages.
          </p>
        </section>
      </div>
    </footer>
  );
}
