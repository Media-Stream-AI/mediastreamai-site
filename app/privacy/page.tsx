"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          Privacy Policy
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          How we collect, use, and protect information across Media Stream AI products.
        </p>
      </section>

      <section className="section border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 space-y-8 leading-relaxed text-white/80">
          <div>
            <h2 className="text-2xl sm:text-3xl">Overview</h2>
            <p className="mt-3">
              We are committed to privacy by design. Personal data is processed with lawful basis, data minimisation,
              and clear retention limits. Aggregated analytics may be used to improve service quality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Data We Process</h2>
            <ul className="mt-3 list-disc ml-6">
              <li>Account & contact details for business enquiries</li>
              <li>Usage metrics and device attributes (pseudonymous)</li>
              <li>Optional consented signals (e.g., biometrics) where supported</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">How We Use Data</h2>
            <ul className="mt-3 list-disc ml-6">
              <li>To provide and improve personalized TV services</li>
              <li>To ensure safety, compliance, and content suitability</li>
              <li>To respond to sales and support enquiries</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Consent & Control</h2>
            <p className="mt-3">
              Where local law or product requires consent (e.g., biometric signals), we present clear opt-in controls
              and the ability to revoke at any time. Features continue to function with reduced personalization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Retention</h2>
            <p className="mt-3">
              Data is retained only as long as necessary for the stated purpose or legal requirements, then deleted or
              irreversibly anonymised.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Your Rights</h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may request access, correction, deletion, or portability of your
              personal data. Contact us via <a href="/contact" className="underline">the contact form</a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Contact</h2>
            <p className="mt-3">
              For privacy questions, please reach us through the site contact page. We’ll respond promptly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}