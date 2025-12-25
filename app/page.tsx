"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, TrendingUp, Award, ExternalLink, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  const sectors = [
    {
      icon: "📺",
      title: "Media & Broadcasting",
      description: "Global Broadcaster scale deployments",
      stat: "75% faster",
      link: "/sectors#media"
    },
    {
      icon: "🎬",
      title: "Film & TV Production",
      description: "End-to-end production intelligence",
      stat: "60% reduction",
      link: "/sectors#film"
    },
    {
      icon: "🎨",
      title: "Creative Industries",
      description: "GenAI content at scale",
      stat: "30% cost savings",
      link: "/sectors#creative"
    },
    {
      icon: "📢",
      title: "Advertising",
      description: "AI-powered campaigns proven",
      stat: "Higher ROI",
      link: "/sectors#advertising"
    },
    {
      icon: "🛡️",
      title: "Government & Defence",
      description: "100% UK sovereign, air-gapped",
      stat: "Military Veteran founded business",
      link: "/government-defence",
      highlight: true
    },
    {
      icon: "🔬",
      title: "Research & Education",
      description: "Academic AI acceleration",
      stat: "Data sovereign",
      link: "/sectors#research"
    }
  ];

  const stats = [
    { value: "5", label: "UK/EU Data Centers in 2026", icon: <Globe className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "405+", label: "Jobs Eco-system", icon: <Users className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "24K+", label: "targeted Meals/Month to Food Banks", icon: <CheckCircle className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "100%", label: "UK/EU Sovereign", icon: <Shield className="w-6 h-6 md:w-8 md:h-8" /> }
  ];

  const solutions = [
    {
      title: "GPU & Infrastructure as a Service",
      description: "H200, B200, SambaNova clusters. 40-60% below AWS/Azure pricing.",
      features: ["Hourly or Monthly Billing", "5 UK/EU Data Centers", "Instant Provisioning", "24/7 Monitoring"],
      cta: "View GPU Pricing",
      link: "https://gpu.mediastreamai.com",
      external: true,
      icon: <Zap className="text-blue-400 w-8 h-8 md:w-10 md:h-10" />
    },
    {
      title: "MOTHER AI Agent Deployments",
      description: "Sovereign AI agents with Autm orchestration. Sector-specific implementations.",
      features: ["Starter from £2,500/mo", "Multi-Agent Workflows", "Custom Training", "GDPR Compliant"],
      cta: "Explore AI Agents",
      link: "https://mother.mediastreamai.com",
      external: true,
      icon: <Shield className="text-blue-400 w-8 h-8 md:w-10 md:h-10" />
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-black via-blue-950/20 to-black py-12 md:py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          {/* Badges Strip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8"
          >
            {/* Military Veteran Run */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600/20 border border-blue-400/40 rounded-full">
              <span className="text-lg md:text-2xl">🎖️</span>
              <span className="text-xs md:text-sm font-semibold text-blue-300">Military Veteran Run</span>
            </div>

            {/* Ethnic Minority Run */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-600/20 border border-green-400/40 rounded-full">
              <span className="text-lg md:text-2xl">🤝</span>
              <span className="text-xs md:text-sm font-semibold text-green-300">Ethnic Minority Led</span>
            </div>

            {/* NVIDIA Inception */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-600/20 border border-green-400/40 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-5 md:h-5">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#76B900"/>
                <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="#76B900"/>
              </svg>
              <span className="text-xs md:text-sm font-semibold text-green-300">NVIDIA Inception</span>
            </div>

            {/* Lenovo AI Innovator */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-red-600/20 border border-red-400/40 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="md:w-5 md:h-5">
                <circle cx="12" cy="12" r="10" stroke="#E31C23" strokeWidth="2"/>
                <path d="M8 12H16M12 8V16" stroke="#E31C23" strokeWidth="2"/>
              </svg>
              <span className="text-xs md:text-sm font-semibold text-red-300">Lenovo AI Innovator</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-extrabold mb-4 md:mb-6 leading-tight text-center px-4"
          >
            <span className="block text-white text-[clamp(1.8rem,5vw,4.5rem)] leading-tight">
              A European Leading
            </span>
            <span className="block text-blue-400 text-[clamp(2rem,6vw,5.5rem)] leading-tight">
              Sovereign AI Eco-system
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-3 md:mb-4 px-4"
          >
            100% UK/EU data residency. GPU clusters, AI agents & Robotics
            for media, government, and enterprise deployments.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm md:text-base text-white/60 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
          >
            True sovereignty from Company Ownership & Shareholding to European Large Language Model (MOTHER).
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4"
          >
            <Link href="https://gpu.mediastreamai.com" target="_blank" className="w-full sm:w-auto">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                <span className="hidden sm:inline">GPU Infrastructure</span>
                <span className="sm:hidden">GPU Infra</span>
                <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
              </button>
            </Link>
            <Link href="https://mother.mediastreamai.com" target="_blank" className="w-full sm:w-auto">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                AI Agents <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="p-3 md:p-4 bg-black/40 border border-white/10 rounded-lg">
                <div className="flex justify-center mb-2 text-blue-400">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= SOLUTIONS SECTION ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-3 md:mb-4">
              Choose Your Solution
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Whether you need raw GPU compute or turnkey AI agents, we deliver 
              sovereign infrastructure at 40-60% below hyperscaler pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 md:p-8 bg-gradient-to-br from-black to-blue-950/20 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all group"
              >
                <div className="mb-4 md:mb-6">{solution.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{solution.title}</h3>
                <p className="text-sm md:text-base text-white/70 mb-4 md:mb-6">{solution.description}</p>

                <ul className="space-y-2 mb-6 md:mb-8">
                  {solution.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm md:text-base text-white/80">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={solution.link} target={solution.external ? "_blank" : undefined}>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm md:text-base transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                    {solution.cta} <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTORS SECTION ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-3 md:mb-4">
              Sector-Specific Deployments
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Proven AI implementations across high-performance industries with 
              measurable ROI and complete UK/EU sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={sector.link}>
                  <div className={`p-5 md:p-6 rounded-2xl border transition-all cursor-pointer h-full ${
                    sector.highlight
                      ? 'bg-gradient-to-br from-blue-600/30 to-blue-500/20 border-blue-400/50 hover:border-blue-400'
                      : 'bg-black/40 border-white/10 hover:border-blue-500/50'
                  }`}>
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">{sector.icon}</div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{sector.title}</h3>
                    <p className="text-xs md:text-sm text-white/70 mb-3">{sector.description}</p>
                    <div className="inline-block px-2 md:px-3 py-1 bg-green-500/20 border border-green-400/40 rounded-full">
                      <span className="text-xs md:text-sm font-semibold text-green-300">{sector.stat}</span>
                    </div>
                    {sector.highlight && (
                      <div className="mt-3 inline-block px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full ml-2">
                        <span className="text-xs font-semibold text-blue-300">Air-Gapped Available</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/sectors">
              <button className="px-4 sm:px-6 md:px-8 py-2 md:py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                View All Sectors <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= PARTNERSHIPS SECTION ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Trusted Partners</h2>
          <p className="text-sm md:text-base text-white/60 mb-8 md:mb-12">Recognized by industry leaders in AI innovation</p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* NVIDIA Inception */}
            <Link href="/partnerships#nvidia" className="group">
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <svg width="100" height="100" viewBox="0 0 200 200" className="group-hover:scale-105 transition-transform md:w-[120px] md:h-[120px]">
                  <defs>
                    <linearGradient id="nvidiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#76B900', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#5A9000', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <path d="M100 20 L40 60 L100 100 L160 60 Z" fill="url(#nvidiaGrad)"/>
                  <path d="M40 140 L100 180 L160 140 L100 100 Z" fill="url(#nvidiaGrad)" opacity="0.7"/>
                  <text x="100" y="110" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">NVIDIA</text>
                  <text x="100" y="128" textAnchor="middle" fill="white" fontSize="12">INCEPTION</text>
                </svg>
                <span className="text-xs md:text-sm text-white/60 group-hover:text-white/80">NVIDIA Inception Program</span>
              </div>
            </Link>

            {/* Lenovo AI Innovator */}
            <Link href="/partnerships#lenovo" className="group">
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <svg width="100" height="100" viewBox="0 0 200 200" className="group-hover:scale-105 transition-transform md:w-[120px] md:h-[120px]">
                  <circle cx="100" cy="100" r="60" stroke="#E31C23" strokeWidth="4" fill="none"/>
                  <path d="M70 100 L90 100 M90 70 L90 130 M110 100 L130 100 M120 90 L120 110" stroke="#E31C23" strokeWidth="4"/>
                  <text x="100" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LENOVO</text>
                  <text x="100" y="192" textAnchor="middle" fill="white" fontSize="11">AI INNOVATOR</text>
                </svg>
                <span className="text-xs md:text-sm text-white/60 group-hover:text-white/80">Lenovo AI Innovator Program</span>
              </div>
            </Link>
          </div>

          <div className="mt-8 md:mt-12">
            <Link href="/partnerships">
              <button className="px-5 md:px-6 py-2 border border-white/20 hover:border-blue-400 rounded-lg text-xs md:text-sm font-semibold transition-colors">
                View All Partnerships
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY & IMPACT ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 bg-gradient-to-b from-black via-green-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Sustainable AI Infrastructure
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Canal-cooled data centers creating real economic and social impact
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl text-center">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">💼</div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">405+</div>
              <div className="text-sm md:text-base text-white/70">Regional tech jobs created</div>
            </div>

            <div className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl text-center">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">🍽️</div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24,000+</div>
              <div className="text-sm md:text-base text-white/70">Meals/month to food banks</div>
            </div>

            <div className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl text-center sm:col-span-2 lg:col-span-1">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4">🌱</div>
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">40%</div>
              <div className="text-sm md:text-base text-white/70">Energy reduction via canal cooling</div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Link href="/data-centre">
              <button className="px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold text-sm md:text-base transition-colors">
                <span className="hidden sm:inline">Learn About Our ESG Impact</span>
                <span className="sm:hidden">Our ESG Impact</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Deploy Sovereign AI?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/70 mb-6 md:mb-8 px-4">
            From GPU infrastructure to turnkey AI agents, we deliver complete UK/EU 
            sovereignty with proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors whitespace-nowrap">
                Contact Sales
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 border-2 border-white/20 hover:border-blue-400 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-colors whitespace-nowrap">
                Learn More About Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
