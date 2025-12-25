"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, ExternalLink, ArrowRight } from "lucide-react";

export default function SectorsPage() {
  const sectors = [
    {
      id: 'media',
      icon: '📺',
      title: 'Media & Broadcasting',
      subtitle: 'AI-powered production workflows proven by BBC, ITV, and Channel 4',
      stat: '75% faster',
      statDetail: 'content discovery (BBC-proven)',
      useCases: [
        'Automated speech-to-text for live broadcasts',
        'Real-time video quality enhancement',
        'Automated metadata generation',
        'Multi-language subtitle generation',
        'Live event analytics',
        'Compliance checking automation'
      ],
      gpuOption: 'H200 clusters for video processing and live transcription',
      agentOption: 'MOTHER AI agents for content tagging, metadata, compliance',
      clients: 'BBC, ITV, Channel 4',
      implementationTime: '6-8 weeks'
    },
    {
      id: 'film',
      icon: '🎬',
      title: 'TV, Film & Online Content Production',
      subtitle: 'End-to-end production intelligence with automated workflows',
      stat: '60% reduction',
      statDetail: 'in editing time',
      useCases: [
        'Automated rough cut assembly',
        'AI-powered color grading',
        'Script-to-production timeline automation',
        'Footage organization with intelligent search',
        'Automated compliance checking',
        'IntuiTV personalized channel generation'
      ],
      gpuOption: 'B200 clusters for VFX rendering and color grading',
      agentOption: 'MOTHER AI agents for script analysis, shot planning, dailies processing',
      clients: 'Production studios, post-houses',
      implementationTime: '4-6 weeks'
    },
    {
      id: 'creative',
      icon: '🎨',
      title: 'Creative Industries',
      subtitle: 'GenAI content creation and brand intelligence',
      stat: '30% cost reduction',
      statDetail: '15% sales increase',
      useCases: [
        'AI-powered concept generation',
        'Intelligent creative brief analysis',
        'Multi-format content adaptation',
        'Automated asset versioning',
        'Creative performance analytics',
        'Real-time trend analysis'
      ],
      gpuOption: 'H200 for generative AI and image/video synthesis',
      agentOption: 'MOTHER AI agents for concept generation, campaign optimization',
      clients: 'Creative agencies, brand teams',
      implementationTime: '3-4 weeks'
    },
    {
      id: 'advertising',
      icon: '📢',
      title: 'Advertising & Marketing',
      subtitle: 'ITV and Channel 4 scaling AI-created adverts',
      stat: 'Higher ROI',
      statDetail: 'campaigns proven',
      useCases: [
        'Real-time ad placement optimization',
        'Automated campaign performance analysis',
        'Dynamic creative optimization (DCO)',
        'AI-generated TV commercials',
        'Sentiment analysis and brand safety',
        'Multi-channel attribution modeling'
      ],
      gpuOption: 'SambaNova RDU for real-time bidding and inference',
      agentOption: 'MOTHER AI agents for campaign management, A/B testing, audience insights',
      clients: 'ITV, Channel 4',
      implementationTime: '4-6 weeks'
    },
    {
      id: 'government',
      icon: '🏛️',
      title: 'Government & Public Services',
      subtitle: '100% UK sovereign infrastructure for national security',
      stat: '100% sovereign',
      statDetail: 'UK infrastructure',
      useCases: [
        'Automated citizen inquiry processing',
        'Policy document analysis',
        'Multi-language public service delivery',
        'Real-time crisis management',
        'Fraud detection and compliance monitoring',
        'Data-driven resource allocation'
      ],
      gpuOption: 'Air-gapped B200 clusters at Durham facility',
      agentOption: 'MOTHER AI agents with full audit trails and cross-department coordination',
      clients: 'Government departments',
      implementationTime: '12-16 weeks (security clearance)',
      highlight: true
    },
    {
      id: 'defence',
      icon: '🛡️',
      title: 'Defence & Security',
      subtitle: 'Air-gapped deployment with zero foreign dependencies',
      stat: 'Air-gapped',
      statDetail: 'secure deployment',
      useCases: [
        'Classified information analysis',
        'Real-time threat detection',
        'Secure multi-agency coordination',
        'Operational planning and scenario modeling',
        'Autonomous systems coordination',
        'Cybersecurity monitoring'
      ],
      gpuOption: 'Isolated B200 clusters with UK security-cleared access only',
      agentOption: 'MOTHER AI agents in fully isolated environment with MOD certification',
      clients: 'MOD, intelligence services',
      implementationTime: '12-16 weeks (security clearance)',
      highlight: true
    },
    {
      id: 'research',
      icon: '🔬',
      title: 'Science & Research',
      subtitle: 'Research acceleration with data sovereignty',
      stat: 'Data sovereignty',
      statDetail: 'for UK/EU institutions',
      useCases: [
        'Automated literature review',
        'Experimental data analysis',
        'Multi-institutional collaboration',
        'Grant proposal optimization',
        'Research methodology validation',
        'Scientific publication discovery'
      ],
      gpuOption: 'H200 clusters for molecular modeling and simulation',
      agentOption: 'MOTHER AI agents for research synthesis, collaboration coordination',
      clients: 'Universities, research institutions',
      implementationTime: '8-12 weeks'
    },
    {
      id: 'education',
      icon: '🎓',
      title: 'Education',
      subtitle: 'Personalized learning with GDPR student data protection',
      stat: 'GDPR-compliant',
      statDetail: 'student data',
      useCases: [
        'Adaptive learning pathways',
        'Automated grading and feedback',
        'Student performance prediction',
        'Multi-language educational content',
        'Administrative workflow automation',
        'Accessibility enhancement'
      ],
      gpuOption: 'H200 for personalized learning models and content generation',
      agentOption: 'MOTHER AI agents for curriculum delivery, student services coordination',
      clients: 'Universities, schools, EdTech companies',
      implementationTime: '6-10 weeks'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-blue-400 mb-6">
            Sector-Specific AI Deployments
          </h1>
          <p className="text-center text-white/70 text-xl mb-4 max-w-3xl mx-auto">
            Proven AI implementations across high-performance industries with measurable ROI 
            and complete UK/EU sovereignty
          </p>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Choose GPU infrastructure or AI agents for your sector
          </p>

          {/* Sector Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.id}
                id={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border transition-all ${
                  sector.highlight
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-blue-400/50'
                    : 'bg-black/40 border-white/10'
                } hover:border-blue-500/50`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{sector.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{sector.title}</h3>
                      {sector.highlight && (
                        <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-xs font-semibold text-blue-300 mt-2">
                          Air-Gapped Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-white/70 mb-4">{sector.subtitle}</p>

                {/* Key Stat */}
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-1">{sector.stat}</div>
                  <div className="text-sm text-white/70">{sector.statDetail}</div>
                </div>

                {/* Use Cases */}
                <h4 className="text-lg font-semibold text-blue-300 mb-3">Use Cases:</h4>
                <ul className="space-y-2 mb-6">
                  {sector.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>

                {/* Deployment Options */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-blue-300 mb-2">GPU Option:</h5>
                    <p className="text-xs text-white/70">{sector.gpuOption}</p>
                  </div>
                  <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
                    <h5 className="text-sm font-semibold text-blue-300 mb-2">AI Agent Option:</h5>
                    <p className="text-xs text-white/70">{sector.agentOption}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-white/60 mb-4">
                  <span><strong>Clients:</strong> {sector.clients}</span>
                  <span><strong>Timeline:</strong> {sector.implementationTime}</span>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <Link href="https://gpu.mediastreamai.com" target="_blank" className="flex-1">
                    <button className="w-full px-4 py-2 border border-blue-400 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                      GPU Pricing <ExternalLink size={14} />
                    </button>
                  </Link>
                  <Link href="https://mother.mediastreamai.com" target="_blank" className="flex-1">
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                      AI Agents <ExternalLink size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Sector?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              MOTHER AI and GPU infrastructure deliver proven results across all high-performance 
              sectors with complete UK/EU sovereignty.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact">
                <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                  Schedule Implementation Call
                </button>
              </Link>
              <Link href="/data-centre">
                <button className="border border-blue-400 text-blue-400 hover:bg-blue-500/20 px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2">
                  View Infrastructure <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
