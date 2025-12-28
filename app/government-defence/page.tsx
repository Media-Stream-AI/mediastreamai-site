"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Award, Users, CheckCircle, AlertTriangle } from "lucide-react";

export default function GovernmentDefencePage() {
  const capabilities = [
    {
      title: "Air-Gapped Infrastructure",
      icon: <Lock size={32} className="text-blue-400" />,
      description: "Completely isolated deployment at Durham facility with zero internet connectivity. Your classified workloads remain physically and logically separated from all other systems."
    },
    {
      title: "UK Security Cleared Personnel",
      icon: <Shield size={32} className="text-blue-400" />,
      description: "All personnel with access to government and defence infrastructure hold appropriate UK security clearances. No foreign nationals. No offshore support."
    },
    {
      title: "MOD Engagement",
      icon: <Award size={32} className="text-blue-400" />,
      description: "Active engagement with Ministry of Defence for classified AI workloads. We understand the unique requirements of defence and intelligence operations."
    },
    {
      title: "Military Veteran Leadership",
      icon: <Users size={32} className="text-green-400" />,
      description: "Founded and run by military veterans who understand operational security, chain of command, and the importance of mission success."
    }
  ];

  const useCases = [
    {
      category: "Intelligence Analysis",
      examples: [
        "Classified document processing and synthesis",
        "Multi-source intelligence correlation",
        "Pattern recognition in signals intelligence",
        "Automated threat assessment",
        "Real-time situation awareness"
      ]
    },
    {
      category: "Defence Operations",
      examples: [
        "Operational planning and scenario modeling",
        "Autonomous systems coordination",
        "Logistics optimization",
        "Supply chain security",
        "Mission rehearsal and simulation"
      ]
    },
    {
      category: "Cybersecurity",
      examples: [
        "Network threat detection",
        "Incident response automation",
        "Vulnerability assessment",
        "Security operations center (SOC) automation",
        "Threat intelligence analysis"
      ]
    },
    {
      category: "Government Services",
      examples: [
        "Citizen inquiry processing (public-facing)",
        "Policy document analysis",
        "Cross-department coordination",
        "Fraud detection and prevention",
        "Emergency response coordination"
      ]
    }
  ];

  const securityFeatures = [
    "Physical access controls with biometric authentication",
    "Faraday cage EMI/RF shielding",
    "Dedicated power supply with UPS backup",
    "UK security-cleared operations team only",
    "No remote access - on-premises only",
    "Complete audit trail and logging",
    "Compliance with UK Official Secrets Act",
    "STRAP classified workload capability",
    "Government Cloud certification",
    "Cyber Essentials Plus certified"
  ];

  const differentiators = [
    {
      title: "Zero Foreign Dependencies",
      description: "Unlike US hyperscalers, we have no US parent company and no CLOUD Act exposure. Your data never touches foreign legal jurisdictions."
    },
    {
      title: "100% UK Ownership",
      description: "Media Stream AI is British-owned and operated. No foreign investors. No offshore subsidiaries. Complete UK control."
    },
    {
      title: "Military Veteran Run",
      description: "Our leadership team includes veterans who understand operational security, mission-critical systems, and the unique requirements of defence operations."
    },
    {
      title: "Purpose-Built for Sovereignty",
      description: "We didn't add sovereignty as an afterthought. Our entire infrastructure was designed from day one for UK/EU data residency and operational independence."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600/20 border border-blue-400/40 rounded-full">
              <span className="text-sm font-semibold text-blue-300">Military Veteran Run</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-600/20 border border-red-400/40 rounded-full">
              <span className="text-sm font-semibold text-red-300">MOD Engaged</span>
            </div>
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-600/20 border border-green-400/40 rounded-full">
              <span className="text-sm font-semibold text-green-300">Air-Gapped Available</span>
            </div>
          </div>

          {/* Large Two-Line Title - Fills Screen */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[1.1] mb-6 md:mb-8 px-4">
            <span className="block text-white">Government &</span>
            <span className="block text-blue-400">Defence AI</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 px-4">
            100% UK sovereign AI infrastructure for national security operations. 
            Air-gapped deployment with military veteran leadership.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Zero foreign dependencies. Zero CLOUD Act exposure. Complete operational independence.
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Core Capabilities
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {capabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <div className="mb-4">{capability.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{capability.title}</h3>
                <p className="text-sm md:text-base text-white/70">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Government & Defence Use Cases
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {useCases.map((useCase, i) => (
              <div key={i} className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{useCase.category}</h3>
                <ul className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm md:text-base text-white/80">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Security Features & Certifications
          </h2>

          <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-400/30 rounded-2xl p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Shield size={16} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why We're Different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 md:mb-12 text-center">
            Why Government & Defence Choose Us
          </h2>

          <div className="space-y-6 md:space-y-8">
            {differentiators.map((diff, i) => (
              <div key={i} className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{diff.title}</h3>
                <p className="text-sm md:text-base lg:text-lg text-white/70">{diff.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="bg-yellow-600/10 border border-yellow-400/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle size={32} className="text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-3">
                  CLOUD Act Exposure: A Critical Risk
                </h3>
                <p className="text-sm md:text-base text-white/80 mb-4">
                  US hyperscalers (AWS, Azure, Google Cloud) are all subject to the 
                  CLOUD Act, which compels them to provide US government agencies with access 
                  to data stored anywhere in the world, including UK and EU data centers.
                </p>
                <p className="text-sm md:text-base text-white/80">
                  <strong className="text-white">Media Stream AI is UK-owned with zero US parent exposure.</strong> Your 
                  classified data remains under UK jurisdiction and UK law exclusively.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Durham Facility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">
            Durham Air-Gapped Facility
          </h2>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Location: Durham, UK</h3>
                <ul className="space-y-3 text-sm md:text-base text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Completely isolated from public internet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>NVIDIA B200 supercomputing clusters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>UK security-cleared personnel only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Physical access controls with biometrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Faraday cage EMI/RF shielding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Dedicated power with military-grade UPS</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-lg p-8 flex items-center justify-center border border-blue-400/30">
                <div className="text-center">
                  <Shield size={80} className="text-blue-400 mx-auto mb-4" />
                  <p className="text-white/60 text-sm">Durham Air-Gapped Facility</p>
                  <p className="text-white/40 text-xs mt-2">100% Isolated Infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-8 md:p-12 rounded-2xl text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Classified Briefing</h2>
          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto px-4">
            Discuss your sovereign AI requirements with our military veteran leadership team.
          </p>
          <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl mx-auto px-4">
            All briefings conducted on UK sovereign territory with appropriate security protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-base md:text-lg transition-colors">
                Contact Government Sales
              </button>
            </Link>
            <Link href="/data-centre#durham" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 border border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold text-base md:text-lg transition-colors">
                View Durham Facility
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
