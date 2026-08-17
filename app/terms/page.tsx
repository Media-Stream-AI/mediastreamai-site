"use client";

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using IntuiTV, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our service.

These terms constitute a legally binding agreement between you and Media Stream AI Limited (trading as IntuiTV).`,
    },
    {
      title: '2. Service Description',
      content: `IntuiTV is an AI-powered personalized television platform providing:
- Streaming video content across mobile, TV, and web platforms
- AI-generated personalized content recommendations
- Content creation tools for creators
- White-label enterprise solutions

**Beta Features:** Some features may be in beta and subject to change.`,
    },
    {
      title: '3. Eligibility',
      content: `You must be:
- At least 18 years old (or age of majority in your jurisdiction)
- Capable of forming a binding contract
- Not prohibited from using the service under applicable law

**Family Accounts:** Parents/guardians are responsible for minors' use.`,
    },
    {
      title: '4. Account Registration',
      content: `**Your Responsibilities:**
- Provide accurate, current information
- Maintain security of your password
- Notify us immediately of unauthorized access
- You are responsible for all activity under your account

**One Account Per Person:** Do not share accounts (except Family plans with designated profiles).`,
    },
    {
      title: '5. Subscriptions & Payments',
      content: `**Billing:**
- Subscriptions auto-renew monthly unless cancelled
- You authorize recurring charges to your payment method
- Prices may change with 30 days notice
- No refunds for partial months

**Free Trials:**
- Available for first-time subscribers only
- Cancel anytime during trial to avoid charges
- Auto-converts to paid subscription if not cancelled

**Cancellation:**
- Cancel anytime via Settings
- Access continues until end of billing period
- No refunds for early cancellation

**Payment Processing:** Handled securely by Stripe. We never store full payment details.`,
    },
    {
      title: '6. Content Rights & Licenses',
      content: `**Our Content:**
- All IntuiTV content is protected by copyright and intellectual property laws
- We grant you a limited, non-exclusive, non-transferable license to stream content
- You may NOT download, copy, redistribute, or create derivative works

**User-Generated Content (Creators):**
- You retain copyright to content you create
- You grant IntuiTV a worldwide, non-exclusive license to host, distribute, and promote your content
- You represent you own all rights to content you upload
- Revenue sharing per Creator Agreement (70% creator, 30% platform)

**Prohibited Content:**
- Illegal, defamatory, harassing, or discriminatory content
- Content infringing third-party rights
- Sexually explicit material involving minors
- Malicious code or spam

We reserve the right to remove any content violating these terms.`,
    },
    {
      title: '7. Acceptable Use',
      content: `You agree NOT to:
- Circumvent DRM or security measures
- Use automated tools to access the service (scraping, bots)
- Reverse engineer, decompile, or hack the platform
- Share account credentials (except Family plans)
- Upload malicious code or viruses
- Impersonate others or misrepresent affiliation
- Use the service for illegal purposes
- Abuse or harass other users or staff

Violation may result in account suspension or termination.`,
    },
    {
      title: '8. AI & Personalization',
      content: `**How It Works:**
- Our AI analyzes your viewing behavior to personalize recommendations
- Biometric tracking is 100% opt-in and can be disabled anytime
- Data used is described in our Privacy Policy

**AI-Generated Content:**
- Content created by our AI is original but may reference training data
- We do not guarantee accuracy of AI-generated content
- You use AI features at your own discretion

**No Guarantee of Availability:** AI features may be modified or discontinued.`,
    },
    {
      title: '9. Third-Party Services',
      content: `IntuiTV integrates with:
- Payment processors (Stripe)
- App stores (Apple App Store, Google Play)
- Smart TV platforms

You agree to those platforms' separate terms. We are not responsible for third-party services.`,
    },
    {
      title: '10. Disclaimers & Limitations',
      content: `**Service "AS IS":**
- We provide IntuiTV "as is" without warranties
- We do not guarantee uninterrupted or error-free service
- Content accuracy is not guaranteed

**Limitation of Liability:**
- Our liability is limited to amount you paid in past 12 months
- We are not liable for indirect, incidental, or consequential damages
- Some jurisdictions do not allow liability limitations - in those cases, minimum legally required applies

**Content Ratings:**
- We provide content ratings as guidance only
- Parents are responsible for monitoring children's viewing`,
    },
    {
      title: '11. Indemnification',
      content: `You agree to indemnify and hold harmless IntuiTV and Media Stream AI Limited from claims arising from:
- Your use of the service
- Your content uploads (for creators)
- Your violation of these terms
- Your violation of third-party rights`,
    },
    {
      title: '12. Termination',
      content: `**By You:** Cancel subscription anytime via Settings

**By Us:** We may suspend or terminate your account for:
- Violation of these terms
- Fraudulent payment activity
- Abusive behavior
- Legal requirements

**Effect of Termination:**
- Access ends immediately (or at end of billing period if you cancel)
- No refunds for remaining subscription time
- Content you created remains subject to license granted`,
    },
    {
      title: '13. Governing Law & Disputes',
      content: `**Governing Law:** These terms are governed by the laws of England and Wales

**Jurisdiction:** Courts of England and Wales have exclusive jurisdiction

**Dispute Resolution:**
1. Contact us first: legal@intuitv.app
2. Good faith negotiation (30 days)
3. Arbitration (if negotiation fails)
4. Litigation as last resort

**EU/UK Consumer Rights:** Nothing in these terms affects your statutory consumer rights.`,
    },
    {
      title: '14. Changes to Terms',
      content: `We may modify these terms:
- Material changes: 30 days notice via email
- Minor changes: Effective immediately
- Continued use constitutes acceptance

Review terms periodically. Effective date shown at top.`,
    },
    {
      title: '15. General Provisions',
      content: `**Entire Agreement:** These terms (+ Privacy Policy) constitute the entire agreement

**Severability:** If any provision is unenforceable, others remain in effect

**No Waiver:** Our failure to enforce any right does not waive that right

**Assignment:** You cannot assign these terms. We may assign to successors.

**Force Majeure:** We're not liable for delays due to circumstances beyond our control`,
    },
    {
      title: '16. Contact Information',
      content: `**Media Stream AI Limited (IntuiTV)**

Legal Inquiries: legal@intuitv.app
Support: support@intuitv.app
Address: Manchester, United Kingdom

Company Registration: [UK Company Number]
VAT Number: [UK VAT Number]`,
    },
  ];

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="container-custom max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-muted">Last updated: January 4, 2026</p>
          </div>

          <div className="card-night rounded-2xl border border-hair p-8 mb-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="mb-8 last:mb-0"
              >
                <h2 className="text-2xl font-semibold mb-4 text-cyan">
                  {section.title}
                </h2>
                <div className="text-muted whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-muted">
            <p>
              Questions? Email us at{' '}
              <a href="mailto:legal@intuitv.app" className="text-cyan hover:underline">
                legal@intuitv.app
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
