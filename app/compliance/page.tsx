import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ScrollText, Scale, Globe, Eye, Cookie, FileDown, Lock, UserCheck } from 'lucide-react';
import GatedDownload from '@/components/site/GatedDownload';

export const metadata: Metadata = {
  title: 'Compliance & Transparency - EU AI Act & UK GDPR',
  description:
    'How MSAI (Media Stream AI Limited) meets the EU AI Act (Regulation (EU) 2024/1689) and UK GDPR: our role as a general-purpose AI provider, Article 53 documentation, transparency and human oversight, lawful bases, data-subject rights, sovereignty and AI-content labelling.',
};

export const dynamic = 'force-dynamic';

const TOC = [
  ['overview', 'Our commitment'],
  ['ai-act', 'EU AI Act'],
  ['gdpr', 'UK GDPR'],
  ['sovereignty', 'Data sovereignty'],
  ['ai-content', 'AI-content transparency'],
  ['cookies', 'Cookies'],
  ['documents', 'Documents & contact'],
];

function Section({ id, icon: Icon, title, chip, children }: { id: string; icon: typeof Scale; title: string; chip?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan"><Icon className="w-5 h-5" /></span>
        <h2 className="text-2xl font-semibold text-mist">{title}</h2>
        {chip && <span className="chip">{chip}</span>}
      </div>
      <div className="glass-night p-6 md:p-8 space-y-4 text-muted leading-relaxed">{children}</div>
    </section>
  );
}

const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-mist font-semibold mt-2">{children}</h3>;
const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />{children}</li>
);

export default function Page() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-12 md:pt-44 md:pb-16">
        <div className="absolute inset-0 -z-[5] opacity-60" style={{ backgroundImage: 'radial-gradient(60% 100% at 50% 0%, rgba(99,102,241,0.16), transparent 60%)' }} />
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-5">
            <span className="chip"><ShieldCheck className="w-3.5 h-3.5 text-cyan" /> Transparency by design</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.9] max-w-4xl">
            Compliance &amp; <span className="text-gradient">transparency.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            MSAI is a sovereign, full-stack UK AI company - and we hold ourselves to the highest transparency bar.
            This page sets out, in full, how we meet the EU AI Act and UK GDPR across everything we build.
          </p>
          <p className="mt-3 text-sm text-muted/70">Last updated: 17 August 2026 · Media Stream AI Limited (trading as MSAI)</p>
        </div>
      </section>

      <div className="container-custom grid lg:grid-cols-[240px_1fr] gap-10 pb-24">
        {/* TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1 text-sm">
            <div className="text-xs uppercase tracking-widest text-muted mb-3">On this page</div>
            {TOC.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="block py-1.5 text-muted hover:text-cyan transition-colors">{label}</a>
            ))}
          </nav>
        </aside>

        <div className="space-y-12 min-w-0">
          <Section id="overview" icon={ShieldCheck} title="Our commitment">
            <p>
              We believe sovereign AI must also be <span className="text-mist">accountable</span> AI. MSAI designs,
              owns, hosts and trains its models and infrastructure in the United Kingdom, and we publish the
              documentation, disclosures and safeguards required by law - and often more than is required - so that
              customers, regulators and the public can see exactly how our systems work.
            </p>
            <ul className="space-y-2">
              <LI>Open-weight MOTHER models with published model cards and checkpoint lineage.</LI>
              <LI>Human-in-the-loop by default; a signed Guardian layer governs any embodied action.</LI>
              <LI>UK/EU data residency; on-prem and air-gapped deployment options.</LI>
              <LI>Clear labelling of AI-generated and synthetic media.</LI>
            </ul>
          </Section>

          <Section id="ai-act" icon={Scale} title="EU AI Act" chip="Reg. (EU) 2024/1689">
            <H3>Our role - provider of general-purpose AI models</H3>
            <p>
              MOTHER CORE V2 &amp; V3 are open-weight general-purpose AI (GPAI) models. As their provider, we meet the
              obligations in <span className="text-mist">Article 53</span> and make the following available:
            </p>
            <ul className="space-y-2">
              <LI>Up-to-date <span className="text-mist">technical documentation</span> of the models and their training and testing (Art. 53(1)(a)–(b)).</LI>
              <LI>A <span className="text-mist">copyright-compliance policy</span> respecting the Art. 4(3) text-and-data-mining reservation of rights (Art. 53(1)(c)).</LI>
              <LI>A <span className="text-mist">public summary of training content</span> using the AI Office template (Art. 53(1)(d)).</LI>
              <LI>Information enabling downstream providers to understand and comply with their own obligations.</LI>
            </ul>

            <H3>Systemic risk (Art. 55)</H3>
            <p>
              Our models are 7B-parameter class and are not trained above the 10²⁵ FLOP threshold that presumes
              systemic risk, so the additional Article 55 obligations for systemic-risk GPAI do not currently apply.
              We nonetheless perform model evaluations, adversarial testing and incident tracking as good practice, and
              will adopt Article 55 measures if a future model crosses that threshold.
            </p>

            <H3>Prohibited practices (Art. 5)</H3>
            <p>We do not build or offer AI for any practice prohibited by the Act - including social scoring, subliminal or
              manipulative techniques, exploitation of vulnerabilities, untargeted facial-image scraping, emotion inference
              in the workplace or education, or real-time remote biometric identification in public spaces for law enforcement.</p>

            <H3>Transparency to people (Art. 50)</H3>
            <ul className="space-y-2">
              <LI>Where users interact with an AI system (e.g. a chatbot or copilot), that fact is disclosed.</LI>
              <LI>AI-generated or manipulated image, audio and video (including deepfakes) is marked as artificially generated.</LI>
              <LI>Synthetic-media outputs are, where technically feasible, machine-readable and detectable as AI-generated.</LI>
            </ul>

            <H3>Human oversight &amp; high-risk use</H3>
            <p>
              For embodied and safety-critical deployments (MOTHER EXO, MOTHER Defence), a signed
              <span className="text-mist"> Guardian action filter</span> holds veto authority over every actuation, red-lines
              are enforced independently of the model, and every decision is logged to an auditable ledger. Where a customer
              deploys our technology in a high-risk context under Annex III, we support their conformity obligations with
              documentation, logging and human-oversight tooling.
            </p>
          </Section>

          <Section id="gdpr" icon={UserCheck} title="UK GDPR & Data Protection Act 2018" chip="Controller">
            <p><span className="text-mist">Data controller:</span> Media Stream AI Limited (trading as MSAI), Manchester, United Kingdom.
              For data-protection queries: <a href="mailto:privacy@mediastreamai.com" className="text-cyan hover:underline">privacy@mediastreamai.com</a>.</p>

            <H3>Lawful bases (Art. 6)</H3>
            <ul className="space-y-2">
              <LI><span className="text-mist">Contract</span> - to provide the service you sign up for.</LI>
              <LI><span className="text-mist">Legitimate interests</span> - to secure, improve and operate our platforms (balanced against your rights).</LI>
              <LI><span className="text-mist">Consent</span> - for optional analytics, marketing, and any special-category processing.</LI>
              <LI><span className="text-mist">Legal obligation</span> - where we must retain or disclose data by law.</LI>
            </ul>

            <H3>Special-category data (Art. 9)</H3>
            <p>Any biometric personalisation is strictly <span className="text-mist">opt-in</span> and processed only on your
              explicit consent, which you can withdraw at any time. We do not use biometric data for identification of others.</p>

            <H3>Your rights</H3>
            <ul className="space-y-2 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
              <LI>Access a copy of your data</LI>
              <LI>Rectify inaccurate data</LI>
              <LI>Erase your data (right to be forgotten)</LI>
              <LI>Restrict or object to processing</LI>
              <LI>Data portability</LI>
              <LI>Withdraw consent at any time</LI>
              <LI>Not be subject to solely automated decisions with legal effect</LI>
              <LI>Complain to the ICO (ico.org.uk)</LI>
            </ul>

            <H3>Transfers, retention &amp; security</H3>
            <p>Personal data is stored and processed on <span className="text-mist">UK sovereign infrastructure</span>. We do not
              transfer personal data outside the UK/EEA except under an adequacy decision or appropriate safeguards. We retain
              data only as long as necessary for the purposes above or as required by law, and protect it with encryption,
              access controls and on-prem / air-gap options. See the full <Link href="/privacy" className="text-cyan hover:underline">Privacy Notice</Link>.</p>
          </Section>

          <Section id="sovereignty" icon={Globe} title="Data sovereignty & residency">
            <p>Sovereignty is ownership across every layer - land, power, data centres, compute and models, in Britain. Weights and
              customer data never leave your control: default UK residency, sovereign GB10 / DGX serving, and on-prem or
              air-gapped deployment for regulated and defence customers, all on UK sovereign infrastructure.</p>
          </Section>

          <Section id="ai-content" icon={Eye} title="AI-content transparency">
            <p>Content generated or materially altered by our AI (image, audio, video, text) is disclosed as AI-generated in
              accordance with Article 50 of the EU AI Act. Where feasible we embed machine-readable provenance so downstream
              platforms can detect synthetic media. Human review is expected before reliance on any AI output.</p>
          </Section>

          <Section id="cookies" icon={Cookie} title="Cookies & analytics">
            <p>We use strictly necessary cookies to run the site, and optional analytics/marketing cookies only with your consent.
              You can change your choice at any time. Details of the cookies we set and their purposes are in our{' '}
              <Link href="/privacy" className="text-cyan hover:underline">Privacy Notice</Link>.</p>
          </Section>

          <Section id="documents" icon={FileDown} title="Documents & downloads">
            <p className="text-mist font-semibold">White papers &amp; dossiers</p>
            <p>Register with your name and email to download our white papers and due-diligence dossier - this helps us
              keep you informed and route your interest to the right team.</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <GatedDownload file="/downloads/MOTHER-Technology-Due-Diligence.pdf" title="Technology White Paper" subtitle="MOTHER technology & due diligence" />
              <GatedDownload file="/downloads/MOTHER-EU-Copyright-Policy.pdf" title="EU AI Act - Copyright Policy" subtitle="Art. 53(1)(c)" />
              <GatedDownload file="/downloads/MOTHER-Training-Content-Summary.pdf" title="Training-Content Summary" subtitle="Art. 53(1)(d)" />
            </div>

            <p className="text-mist font-semibold pt-4">Publicly available under EU AI Act Art. 53</p>
            <p>The statutory copyright policy and training-content summary are also available without registration, as the
              Regulation requires:</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="/downloads/MOTHER-EU-Copyright-Policy.pdf" target="_blank" rel="noopener" className="text-cyan hover:underline">↓ Copyright Policy (public)</a>
              <a href="/downloads/MOTHER-Training-Content-Summary.pdf" target="_blank" rel="noopener" className="text-cyan hover:underline">↓ Training-Content Summary (public)</a>
            </div>
            <p className="pt-2">
              Data protection: <a href="mailto:privacy@mediastreamai.com" className="text-cyan hover:underline">privacy@mediastreamai.com</a>{' · '}
              AI Act / model transparency: <a href="mailto:compliance@mediastreamai.com" className="text-cyan hover:underline">compliance@mediastreamai.com</a>{' · '}
              General: <a href="mailto:hello@mediastreamai.com" className="text-cyan hover:underline">hello@mediastreamai.com</a>.
            </p>
            <div className="flex items-center gap-2 pt-2 text-sm">
              <Lock className="w-4 h-4 text-cyan" />
              <Link href="/privacy" className="text-cyan hover:underline">Privacy Notice</Link>
              <span className="text-muted">·</span>
              <Link href="/terms" className="text-cyan hover:underline">Terms of Service</Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
