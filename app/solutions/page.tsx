"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Shield, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "GPU & Infrastructure as a Service",
      icon: <Zap size={64} className="text-blue-400" />,
      description: "Raw compute power for your AI workloads. H200, B200, and SambaNova clusters with complete UK/EU sovereignty.",
      pricing: "From £5.80/hour",
      savingsTag: "40-60% below AWS/Azure",
      features: [
        "NVIDIA H200 at £8.50/hour",
        "NVIDIA B200 at £12.00/hour",
        "SambaNova RDU at £5.80/hour",
        "Hourly, monthly, or annual billing",
        "5 UK/EU data centers",
        "Instant provisioning",
        "24/7 monitoring",
        "99.99% uptime SLA",
        "Complete data residency",
        "No foreign data transfer"
      ],
      useCases: [
        "Model training and fine-tuning",
        "Video rendering and processing",
        "Large-scale inference",
        "Research and development",
        "Batch processing workloads"
      ],
      ctaText: "View GPU Pricing",
      ctaLink: "https://gpu.mediastreamai.com",
      external: true
    },
    {
      title: "MOTHER AI Agent Deployments",
      icon: <Shield size={64} className="text-blue-400" />,
      description: "Turnkey AI agents with Autm orchestration. Sector-specific implementations proven by BBC, ITV, and Channel 4.",
      pricing: "From £2,500/month",
      savingsTag: "Complete managed service",
      features: [
        "Starter tier: 1 agent, £2,500/mo",
        "Professional tier: 5 agents, £8,500/mo",
        "Enterprise tier: Unlimited agents",
        "MOTHER LLM backbone",
        "Autm workflow orchestration",
        "Custom agent training",
        "Sector-specific implementations",
        "GDPR compliant by design",
        "24/7 support included",
        "Proven ROI metrics"
      ],
      useCases: [
        "Content tagging and metadata",
        "Customer service automation",
        "Document processing",
        "Campaign optimization",
        "Multi-department workflows"
      ],
      ctaText: "Explore AI Agents",
      ctaLink: "https://mother.mediastreamai.com",
      external: true
    }
  ];

  const comparisonFeatures = [
    {
      feature: "Use Case",
      gpu: "You need raw compute for custom models",
      agents: "You want turnkey AI automation"
    },
    {
      feature: "Technical Expertise",
      gpu: "Your team builds and trains models",
      agents: "We handle implementation end-to-end"
    },
    {
      feature: "Time to Value",
      gpu: "Immediate (provision in minutes)",
      agents: "4-16 weeks (depends on sector)"
    },
    {
      feature: "Pricing Model",
      gpu: "Pay-per-hour for compute",
      agents: "Fixed monthly subscription"
    },
    {
      feature: "Management",
      gpu: "You manage infrastructure and models",
      agents: "Fully managed by our team"
    },
    {
      feature: "Best For",
      gpu: "ML teams, researchers, developers",
      agents: "Enterprises, broadcasters, government"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 md:mb-6 leading-tight">
            Choose Your AI Solution
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-4 px-4">
            Whether you need raw GPU compute or turnkey AI agents, we deliver 
            sovereign infrastructure at prices that matter.
          </p>
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto px-4">
            100% UK/EU data residency. Zero foreign dependencies. Proven by BBC, ITV, Channel 4.
          </p>
        </motion.div>

        {/* Two Solutions */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
          {solutions.map((solution, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-6 md:p-8 bg-gradient-to-br from-black to-blue-950/20 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all"
            >
              {/* Icon */}
              <div className="mb-4 md:mb-6">{solution.icon}</div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{solution.title}</h2>
              
              {/* Description */}
              <p className="text-sm md:text-base text-white/70 mb-4 md:mb-6">{solution.description}</p>

              {/* Pricing */}
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{solution.pricing}</div>
                <div className="text-xs md:text-sm text-green-300">{solution.savingsTag}</div>
              </div>

              {/* Features */}
              <h3 className="text-base md:text-lg font-semibold text-blue-300 mb-3">Key Features:</h3>
              <ul className="space-y-2 mb-4 md:mb-6">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80">
                    <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Use Cases */}
              <h3 className="text-base md:text-lg font-semibold text-blue-300 mb-3">Perfect For:</h3>
              <ul className="space-y-2 mb-6 md:mb-8">
                {solution.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80">
                    <Zap size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={solution.ctaLink} target={solution.external ? "_blank" : undefined}>
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm md:text-base transition-colors flex items-center justify-center gap-2">
                  {solution.ctaText} <ExternalLink size={18} />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 md:mb-8 text-center">
            GPU Infrastructure vs AI Agents
          </h2>
          <p className="text-center text-sm md:text-base text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Not sure which solution fits your needs? Here's a quick comparison.
          </p>

          <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-500/10">
                  <tr>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-white font-semibold text-xs md:text-base">Feature</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-blue-300 font-semibold text-xs md:text-base">GPU Infrastructure</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-blue-300 font-semibold text-xs md:text-base">AI Agents</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparisonFeatures.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3 md:px-6 py-3 md:py-4 font-semibold text-white text-xs md:text-sm">{row.feature}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-white/80 text-xs md:text-sm">{row.gpu}</td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-white/80 text-xs md:text-sm">{row.agents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Sector-Specific Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6 md:mb-8 text-center">
            Sector-Specific Solutions
          </h2>
          <p className="text-center text-sm md:text-base text-white/70 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            See how GPU infrastructure and AI agents work together in your industry.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { sector: 'Media & Broadcasting', icon: '📺', link: '/sectors#media' },
              { sector: 'Film & TV Production', icon: '🎬', link: '/sectors#film' },
              { sector: 'Creative Industries', icon: '🎨', link: '/sectors#creative' },
              { sector: 'Advertising', icon: '📢', link: '/sectors#advertising' },
              { sector: 'Government & Defence', icon: '🛡️', link: '/government-defence' },
              { sector: 'Research & Education', icon: '🔬', link: '/sectors#research' }
            ].map((item, i) => (
              <Link key={i} href={item.link}>
                <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all text-center cursor-pointer group">
                  <div className="text-4xl md:text-5xl mb-2 md:mb-3">{item.icon}</div>
                  <h3 className="text-sm md:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {item.sector}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <Link href="/sectors">
              <button className="px-6 md:px-8 py-2 md:py-3 border border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold text-sm md:text-base transition-colors inline-flex items-center gap-2">
                View All Sectors <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-6 md:p-12 rounded-2xl text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Still Not Sure?</h2>
          <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Talk to our team. We'll help you choose the right solution for your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-base md:text-lg transition-colors">
                Contact Sales
              </button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <button className="w-full px-6 md:px-8 py-3 md:py-4 border border-white/20 hover:border-blue-400 rounded-lg font-semibold text-base md:text-lg transition-colors">
                Learn About Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
