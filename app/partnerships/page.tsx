"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, CheckCircle, ExternalLink } from "lucide-react";

export default function PartnershipsPage() {
  const partnerships = [
    {
      id: 'lenovo',
      name: 'Lenovo AI Innovator Program',
      logo: (
        <svg width="150" height="150" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" stroke="#E31C23" strokeWidth="4" fill="none"/>
          <path d="M70 100 L90 100 M90 70 L90 130 M110 100 L130 100 M120 90 L120 110" stroke="#E31C23" strokeWidth="4"/>
          <text x="100" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LENOVO</text>
          <text x="100" y="192" textAnchor="middle" fill="white" fontSize="11">AI INNOVATOR</text>
        </svg>
      ),
      description: "A Lenovo AI Innovator partner, collaborating to co-develop, validate, and bring AI solutions to market through a global ecosystem.",
      benefits: [
        "End-to-end technical collaboration with Lenovo AI experts",
        "Direct access to Lenovo AI Discover Lab and cutting-edge AI infrastructure",
        "Leverage expert support for testing, benchmarking, and full-stack validation",
        "Accelerated time-to-market through pre-validated architectures",
        "Joint go-to-market opportunities via Lenovo's global channel ecosystem",
        "Greater scale and reach through access to Lenovo's worldwide customer base"
      ],
      significance: "This partnership enables MediaStreamAI to bring its AI solutions and data centre infrastructure online faster and more efficiently, accelerating deployment while optimising performance at scale.",
      website: "https://www.lenovo.com/gb/en/servers-storage/alliance/ai-innovators/",
      color: 'red'
    }
  ];


  const certifications = [
    { name: 'ISO 27001', desc: 'Information Security Management' },
    { name: 'Cyber Essentials Plus', desc: 'UK Government Standard' },
    { name: 'BSI C5', desc: 'German Cloud Security' },
    { name: 'GDPR Compliant', desc: 'EU Data Protection' },
    { name: 'DORA Ready', desc: 'EU Financial Resilience' },
    { name: 'Government Cloud', desc: 'UK Public Sector' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-6">
            Industry Recognition & Partnerships
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
            Validated by global technology leaders and building partnerships that 
            deliver real social and economic impact.
          </p>
          <p className="text-white/60 max-w-2xl mx-auto">
            Lenovo's sustainable cooling technology enables our world-class sovereign AI infrastructure.
          </p>
        </motion.div>

        {/* Main Partnerships */}
        <div className="space-y-16 mb-20">
          {partnerships.map((partnership, i) => (
            <motion.div
              key={partnership.id}
              id={partnership.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`p-8 rounded-2xl border ${
                partnership.color === 'green' 
                  ? 'bg-gradient-to-br from-green-900/20 to-black border-green-400/30'
                  : 'bg-gradient-to-br from-red-900/20 to-black border-red-400/30'
              }`}
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Logo */}
                <div className="flex items-center justify-center">
                  {partnership.logo}
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold text-white mb-4">{partnership.name}</h2>
                  <p className="text-white/80 mb-6 text-lg">{partnership.description}</p>

                  {/* Benefits */}
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">Partnership Benefits:</h3>
                  <ul className="space-y-2 mb-6">
                    {partnership.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-white/80">
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Significance */}
                  <div className="p-4 bg-black/40 border border-white/10 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2">Why This Matters:</h4>
                    <p className="text-sm text-white/70">{partnership.significance}</p>
                  </div>

                  {/* CTA */}
                  <a href={partnership.website} target="_blank" rel="noopener noreferrer">
                    <button className={`px-6 py-2 border ${
                      partnership.color === 'green'
                        ? 'border-green-400 text-green-400 hover:bg-green-500/20'
                        : 'border-red-400 text-red-400 hover:bg-red-500/20'
                    } rounded-lg font-semibold transition-colors flex items-center gap-2`}>
                      Learn More <ExternalLink size={16} />
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Certifications & Compliance
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-black/40 border border-white/10 p-6 rounded-2xl text-center">
                <Award size={32} className="text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-1">{cert.name}</h4>
                <p className="text-sm text-white/60">{cert.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Target Partnership Impacts by 2027
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">405+</div>
              <div className="text-xl text-white/70 mb-2">Jobs Ecosystem</div>
              <p className="text-sm text-white/60">Across UK/EU data centres</p>
            </div>

            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">24,000+</div>
              <div className="text-xl text-white/70 mb-2">Target Meals Per Month</div>
              <p className="text-sm text-white/60">2027 target — from waste heat vertical farms</p>
            </div>

            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">40%</div>
              <div className="text-xl text-white/70 mb-2">Energy Reduction</div>
              <p className="text-sm text-white/60">Via Lenovo Neptune canal cooling</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-12 rounded-2xl text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Interested in Partnership?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We're always looking for partnerships that advance sovereign AI, sustainability, 
            and social impact.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors">
                Contact Partnerships Team
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-4 border border-white/20 hover:border-blue-400 rounded-lg font-semibold text-lg transition-colors">
                Learn About Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
