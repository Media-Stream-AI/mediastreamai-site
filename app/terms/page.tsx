"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
          Terms of Service
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          The rules and conditions for using Media Stream AI’s services and sites.
        </p>
      </section>

      <section className="section border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 space-y-8 leading-relaxed text-white/80">
          <div>
            <h2 className="text-2xl sm:text-3xl">Agreement</h2>
            <p className="mt-3">
              By accessing our services, you agree to these terms and any product-specific agreements you accept during onboarding.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Acceptable Use</h2>
            <ul className="mt-3 list-disc ml-6">
              <li>No unlawful, harmful, or abusive activity</li>
              <li>No attempts to breach security, misuse APIs, or disrupt services</li>
              <li>Respect content rights and applicable local laws</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Intellectual Property</h2>
            <p className="mt-3">
              Media Stream AI retains rights in its software, models, and branding. Client content and data remain the client’s property.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Service Levels</h2>
            <p className="mt-3">
              SLAs (e.g., uptime, support) are defined in individual contracts. We may update services to improve reliability and performance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Liability</h2>
            <p className="mt-3">
              To the extent permitted by law, our liability is limited. We are not liable for indirect or consequential damages.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Governing Law</h2>
            <p className="mt-3">
              Unless stated otherwise in a contract, these terms are governed by the laws of England and Wales.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Contact</h2>
            <p className="mt-3">
              Questions about these terms? <a href="/contact" className="underline">Get in touch</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}