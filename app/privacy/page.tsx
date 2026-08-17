"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-2xl font-semibold text-mist mb-4">{n}. {title}</h2>
      <div className="text-muted leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2">{children}</ul>
);
const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan/70" />{children}</li>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-4">Privacy <span className="text-gradient">Notice</span></h1>
            <p className="text-muted mb-2">How MSAI collects, uses and protects your personal data under the UK GDPR and the Data Protection Act 2018.</p>
            <p className="text-sm text-muted/70 mb-10">Last updated: 17 August 2026 · See also our <Link href="/compliance" className="text-cyan hover:underline">Compliance &amp; Transparency</Link> page.</p>

            <div className="max-w-none space-y-9">
              <Section n="1" title="Who we are">
                <p>Media Stream AI Limited (trading as <span className="text-mist">MSAI</span>), Manchester, United Kingdom, is the
                  <span className="text-mist"> data controller</span> for personal data processed through this website and our products
                  (including IntuiTV, IntuiStudio, MOTHER models, MOTHER EXO and MOTHER Defence). Contact our data-protection team at{' '}
                  <a href="mailto:privacy@mediastreamai.com" className="text-cyan hover:underline">privacy@mediastreamai.com</a>.</p>
              </Section>

              <Section n="2" title="Data we collect">
                <UL>
                  <LI><span className="text-mist">Account &amp; billing</span> - name, email, password hash, and payment details (processed by our payment provider).</LI>
                  <LI><span className="text-mist">Usage &amp; preferences</span> - viewing history, settings, content you create, and interactions with our services.</LI>
                  <LI><span className="text-mist">Technical</span> - device information, IP address, approximate location, and cookies/similar technologies.</LI>
                  <LI><span className="text-mist">Communications</span> - messages, enquiries and support requests you send us.</LI>
                  <LI><span className="text-mist">Special-category (biometric)</span> - only where you explicitly opt in to biometric personalisation; withdrawable at any time.</LI>
                </UL>
              </Section>

              <Section n="3" title="How and why we use it (lawful bases)">
                <UL>
                  <LI><span className="text-mist">To provide the service</span> - performance of our contract with you (Art. 6(1)(b)).</LI>
                  <LI><span className="text-mist">To secure, operate and improve our platforms</span> - our legitimate interests (Art. 6(1)(f)), balanced against your rights.</LI>
                  <LI><span className="text-mist">Analytics, marketing and biometric personalisation</span> - your consent (Art. 6(1)(a); Art. 9(2)(a) for biometric), withdrawable anytime.</LI>
                  <LI><span className="text-mist">Legal &amp; regulatory obligations</span> - where we must process or retain data by law (Art. 6(1)(c)).</LI>
                </UL>
                <p>We do not sell your personal data.</p>
              </Section>

              <Section n="4" title="Sharing & processors">
                <p>We share personal data only with vetted service providers acting on our instructions (e.g. hosting on our own UK
                  infrastructure, payment processing, email delivery, CRM), each under a written data-processing agreement, and where
                  required by law or to protect our rights. We do not share your data for third-party advertising.</p>
              </Section>

              <Section n="5" title="International transfers & data sovereignty">
                <p>Your personal data is stored and processed on <span className="text-mist">UK sovereign infrastructure</span>. We do not
                  transfer personal data outside the UK/EEA except under a UK adequacy decision or appropriate safeguards (such as the
                  IDTA or SCCs). Weights and customer data never leave your control; on-prem and air-gapped options are available.</p>
              </Section>

              <Section n="6" title="Retention">
                <p>We keep personal data only for as long as necessary for the purposes above - for the life of your account and a limited
                  period afterwards - or as required by law (e.g. tax and accounting records). We then delete or anonymise it.</p>
              </Section>

              <Section n="7" title="Security">
                <p>We protect personal data with encryption in transit and at rest, strict access controls, network segmentation, and
                  continuous monitoring. Our infrastructure is UK-owned and operated, with on-prem / air-gap options for regulated customers.</p>
              </Section>

              <Section n="8" title="Automated decisions & AI">
                <p>We use AI to personalise and generate content. We do not make decisions producing legal or similarly significant effects
                  about you based solely on automated processing without a lawful basis and appropriate safeguards. AI-generated content is
                  labelled where required - see our <Link href="/compliance" className="text-cyan hover:underline">Compliance &amp; Transparency</Link> page.</p>
              </Section>

              <Section n="9" title="Cookies">
                <p>We use strictly necessary cookies to run the site and, only with your consent, optional analytics and marketing cookies.
                  You can change your choice at any time via your browser or our cookie controls.</p>
              </Section>

              <Section n="10" title="Your rights">
                <UL>
                  <LI>Access a copy of your personal data</LI>
                  <LI>Rectify inaccurate or incomplete data</LI>
                  <LI>Erase your data (right to be forgotten)</LI>
                  <LI>Restrict or object to processing</LI>
                  <LI>Data portability</LI>
                  <LI>Withdraw consent at any time (without affecting prior processing)</LI>
                  <LI>Not be subject to solely automated decisions with legal effect</LI>
                </UL>
                <p>To exercise any right, email <a href="mailto:privacy@mediastreamai.com" className="text-cyan hover:underline">privacy@mediastreamai.com</a>.
                  You also have the right to complain to the UK Information Commissioner’s Office (ICO) at{' '}
                  <a href="https://ico.org.uk" target="_blank" rel="noopener" className="text-cyan hover:underline">ico.org.uk</a>.</p>
              </Section>

              <Section n="11" title="Children">
                <p>Our services are not directed to children under 13 (or the applicable age of digital consent), and we do not knowingly
                  collect their data. If you believe a child has provided us data, contact us and we will delete it.</p>
              </Section>

              <Section n="12" title="Changes & contact">
                <p>We may update this notice; material changes will be posted here with a new “last updated” date.</p>
                <p>Data controller: Media Stream AI Limited (MSAI), Manchester, United Kingdom.<br />
                  Data protection: <a href="mailto:privacy@mediastreamai.com" className="text-cyan hover:underline">privacy@mediastreamai.com</a>.</p>
              </Section>
            </div>

            <div className="mt-12 pt-8 border-t border-hair flex flex-wrap gap-4">
              <Link href="/compliance" className="btn-glow inline-block">Compliance &amp; Transparency</Link>
              <Link href="/" className="btn-ghost inline-block">Back to home</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
