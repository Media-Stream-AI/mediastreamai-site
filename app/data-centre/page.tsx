"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Server, Zap, Droplets, Leaf, Users, Award, Shield, Globe, Cpu } from "lucide-react";

export default function DataCentrePage() {
  const datacenters = [
    {
      id: 'manchester',
      flag: '🇬🇧',
      city: 'Manchester',
      country: 'United Kingdom',
      type: 'Primary UK AI Hub',
      specs: [
        'NVIDIA H200 8x GPU Nodes',
        'NVIDIA B200 High-Performance Clusters',
        'SambaNova RDU SN40L Systems',
        'ISO 27001 Certified',
        'Liquid cooling with canal water reuse',
        '<40ms response latency',
        '99.99% uptime SLA'
      ],
      sustainability: [
        'Waste heat powers vertical farms',
        '10,000+ meals/month to local food banks',
        'Canal cooling reduces energy by 40%',
        'Carbon neutral operations'
      ],
      impact: [
        '120+ tech jobs created',
        'Partnership with 3 food banks',
        '2.5 tons fresh produce/month'
      ]
    },
    {
      id: 'liverpool',
      flag: '🇬🇧',
      city: 'Liverpool',
      country: 'United Kingdom',
      type: 'Secondary UK Operations',
      specs: [
        'NVIDIA B200 Supercomputing',
        'SambaNova Inference Acceleration',
        'Disaster Recovery & Failover',
        'ISO 27001 Certified',
        'Geographic redundancy with Manchester',
        '<45ms response latency',
        '99.99% uptime SLA'
      ],
      sustainability: [
        'Waste heat to community heating',
        '8,000+ meals/month to food banks',
        'Renewable energy powered',
        'Water recycling system'
      ],
      impact: [
        '85+ tech jobs created',
        'Community heating for 200 homes',
        'Local supplier partnerships'
      ]
    },
    {
      id: 'durham',
      flag: '🇬🇧',
      city: 'Durham',
      country: 'United Kingdom',
      type: 'Government & Research Hub',
      specs: [
        'Air-gapped deployment options',
        'NVIDIA B200 Supercomputing',
        'Government Cloud certification',
        'ISO 27001 + Cyber Essentials Plus',
        'MOD and intelligence service ready',
        'Physical access controls',
        'UK security-cleared personnel only'
      ],
      sustainability: [
        'Vertical farm partnership',
        '6,000+ meals/month to food banks',
        'Research collaboration with Durham University',
        'Zero carbon footprint'
      ],
      impact: [
        '95+ tech & research jobs',
        'University research partnerships',
        'Defence sector collaboration'
      ],
      highlight: 'Air-Gapped Secure'
    },
    {
      id: 'dusseldorf',
      flag: '🇩🇪',
      city: 'Düsseldorf',
      country: 'Germany',
      type: 'Primary EU Infrastructure',
      specs: [
        'NVIDIA B200 EU Sovereign Deployment',
        'GDPR-native architecture',
        'German data protection compliance (BDSG)',
        'ISO 27001 + BSI C5 Certified',
        'German-resident operations team',
        'EU Data Boundary guaranteed',
        '<40ms response latency across EU'
      ],
      sustainability: [
        'Rhine River cooling system',
        'Sustainable cooling technology',
        'Green energy powered',
        'Regional environmental compliance'
      ],
      impact: [
        '60+ tech jobs with local partners',
        'Regional tech ecosystem growth',
        'German AI industry collaboration'
      ],
      highlight: 'EU Sovereign'
    },
    {
      id: 'marseille',
      flag: '🇫🇷',
      city: 'Marseille',
      country: 'France',
      type: 'Southern EU Operations',
      specs: [
        'NVIDIA B200 French Deployment',
        'GDPR + French data sovereignty',
        'EU Digital Operational Resilience (DORA)',
        'ISO 27001 Certified',
        'French-resident operations team',
        'Mediterranean regional coverage',
        '<50ms response latency Southern EU'
      ],
      sustainability: [
        'Mediterranean cooling efficiency',
        'Solar power integration',
        'Regional renewable energy',
        'Environmental partnership programs'
      ],
      impact: [
        '45+ tech jobs with local partners',
        'French tech ecosystem collaboration',
        'Regional AI advancement'
      ],
      highlight: 'DORA Compliant'
    }
  ];

  const globalStats = [
    { label: 'Data Centers', value: '5', icon: <MapPin className="w-6 h-6" /> },
    { label: 'GPU Nodes', value: '200+', icon: <Server className="w-6 h-6" /> },
    { label: 'Jobs Created', value: '405+', icon: <Users className="w-6 h-6" /> },
    { label: 'Meals to Food Banks', value: '24K+/month', icon: <Leaf className="w-6 h-6" /> },
  ];

  const certifications = [
    { name: 'ISO 27001', desc: 'Information Security' },
    { name: 'Cyber Essentials Plus', desc: 'UK Government Standard' },
    { name: 'BSI C5', desc: 'German Cloud Security' },
    { name: 'GDPR Compliant', desc: 'EU Data Protection' },
    { name: 'DORA Ready', desc: 'EU Financial Resilience' },
    { name: 'Government Cloud', desc: 'UK Public Sector' },
  ];

  const whyUs = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Complete Data Sovereignty',
      description: 'UK & EU data residency with zero foreign cloud dependencies. Your data never leaves your jurisdiction.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Geographic Redundancy',
      description: 'Multi-site deployment across 5 locations ensures business continuity and <50ms latency across regions.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Latest GPU Technology',
      description: 'NVIDIA H200, B200, and SambaNova RDU systems providing cutting-edge AI compute power.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable Operations',
      description: 'Canal cooling, waste heat reuse, and renewable energy powering vertical farms and community heating.'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Hero Section */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-blue-400 mb-4 md:mb-6 leading-tight">
            UK & EU Sovereign Infrastructure
          </h1>
          <p className="text-center text-white/70 text-base sm:text-lg md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Five data centers delivering complete data residency, GDPR compliance, and sustainable regional impact
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {globalStats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }} 
                className="bg-black/40 border border-white/10 p-4 md:p-6 rounded-2xl text-center"
              >
                <div className="flex justify-center text-blue-400 mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8 md:mb-12">
              Why Choose Our Infrastructure
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {whyUs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all"
                >
                  <div className="text-blue-400 mb-4">{item.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-white/70">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data Centers */}
          <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
            {datacenters.map((dc, i) => (
              <motion.div 
                key={dc.id} 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }} 
                className="bg-black/40 border border-white/10 hover:border-blue-500/50 transition-all p-4 md:p-8 rounded-2xl"
              >
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Left Column */}
                  <div>
                    <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <span className="text-4xl md:text-5xl">{dc.flag}</span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{dc.city}</h3>
                        <p className="text-sm md:text-base text-white/70">{dc.country}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-block px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full text-xs font-semibold text-blue-300">
                            {dc.type}
                          </span>
                          {dc.highlight && (
                            <span className="inline-block px-2 md:px-3 py-1 bg-green-500/20 border border-green-400/40 rounded-full text-xs font-semibold text-green-300">
                              {dc.highlight}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Server size={18} className="flex-shrink-0" /> Technical Specifications
                    </h4>
                    <ul className="space-y-2 mb-6">
                      {dc.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80">
                          <Zap size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-base md:text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <Leaf size={18} className="flex-shrink-0" /> Sustainability
                    </h4>
                    <ul className="space-y-2">
                      {dc.sustainability.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80">
                          <Droplets size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-lg p-6 md:p-8 mb-6 h-48 md:h-64 flex items-center justify-center border border-blue-400/30">
                      <div className="text-center">
                        <Server size={48} className="md:w-16 md:h-16 text-blue-400 mx-auto mb-4" />
                        <p className="text-white/60 text-xs md:text-sm">{dc.city} Data Center</p>
                      </div>
                    </div>
                    
                    <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Users size={18} className="flex-shrink-0" /> Regional Impact
                    </h4>
                    <ul className="space-y-2">
                      {dc.impact.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-white/80">
                          <Award size={14} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8 md:mb-12">
              Certifications & Compliance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {certifications.map((cert, i) => (
                <div key={i} className="bg-black/40 border border-white/10 p-4 md:p-6 rounded-2xl text-center hover:border-blue-500/50 transition-all">
                  <Award size={28} className="md:w-8 md:h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="text-sm md:text-lg font-semibold text-white mb-1">{cert.name}</h4>
                  <p className="text-xs md:text-sm text-white/60">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-400/30 p-6 md:p-8 rounded-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Deploy on Sovereign Infrastructure</h2>
            <p className="text-sm md:text-base text-white/80 mb-6 max-w-2xl mx-auto px-4">
              Complete UK/EU data residency with zero foreign dependencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-500 px-6 md:px-8 py-3 rounded-lg font-semibold text-base md:text-lg transition-colors">
                  Contact Sales
                </button>
              </Link>
              <Link href="https://gpu.mediastreamai.com" target="_blank" className="w-full sm:w-auto">
                <button className="w-full border border-blue-400 text-blue-400 hover:bg-blue-500/20 px-6 md:px-8 py-3 rounded-lg font-semibold text-base md:text-lg transition-colors">
                  View GPU Pricing
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
