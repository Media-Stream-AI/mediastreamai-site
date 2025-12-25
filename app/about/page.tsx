"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Globe, Users, Award, TrendingUp, Zap, Heart, Target, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    {
      year: "2024",
      title: "NVIDIA Inception & Lenovo AI Innovator",
      description: "Joined NVIDIA Inception Program and Lenovo AI Innovator Program, validating our sovereign AI approach."
    },
    {
      year: "2024",
      title: "MOTHER AI & Autm Platform Launch",
      description: "Launched UK's first fully sovereign LLM platform with proven deployments at BBC, ITV, and Channel 4."
    },
    {
      year: "2024",
      title: "Multi-DC Expansion Complete",
      description: "Operational across 5 data centers (Manchester, Liverpool, Durham, Düsseldorf, Marseille) with 100% UK/EU sovereignty."
    },
    {
      year: "2023",
      title: "Canal Cooling Innovation",
      description: "Pioneered sustainable AI infrastructure with canal-cooled data centers, achieving 40% energy reduction."
    },
    {
      year: "2023",
      title: "Company Founded",
      description: "Media Stream AI Limited established as UK's first military veteran-run, ethnic minority-led sovereign AI infrastructure provider."
    }
  ];

  const values = [
    {
      icon: <Shield size={32} className="text-blue-400" />,
      title: "100% Sovereign",
      description: "Zero foreign data transfer. Your data never leaves UK/EU boundaries. Complete independence from US hyperscalers."
    },
    {
      icon: <Users size={32} className="text-green-400" />,
      title: "Military Integrity",
      description: "Veteran-run leadership bringing operational discipline, security awareness, and unwavering commitment to service."
    },
    {
      icon: <Heart size={32} className="text-red-400" />,
      title: "Social Impact",
      description: "405+ jobs created, 24K meals/month to food banks, vertical farms powered by waste heat. AI that serves communities."
    },
    {
      icon: <Target size={32} className="text-blue-400" />,
      title: "Proven Results",
      description: "BBC 75% faster content discovery. ITV scaling AI campaigns. Channel 4 automation. Results, not promises."
    }
  ];

  const uniqueFactors = [
    {
      title: "UK-Owned Multi-DC AI Provider",
      description: "MSAI is proudly a UK company operating 5+ sovereign data centers with complete AI infrastructure. AWS, Azure, Google are all US-owned with CLOUD Act exposure."
    },
    {
      title: "Military Veteran Leadership",
      description: "Our veteran-run team brings operational excellence, security protocols, and integrity to sovereign AI deployment. We understand national security requirements."
    },
    {
      title: "Ethnic Minority Business",
      description: "As an ethnic minority-led organization, we bring diverse perspectives to AI development and understand the importance of representative technology leadership."
    },
    {
      title: "Canal Cooling Innovation",
      description: "Proprietary sustainable cooling reduces energy by 40%, powers vertical farms, and feeds 24,000 meals/month to food banks. No other provider matches this ESG impact."
    },
    {
      title: "40-60% Cost Savings",
      description: "UK/EU pricing without markup. H200 at £8.50/hour vs AWS £14+/hour. B200 at £12/hour vs Azure £20+/hour. Real sovereign value."
    },
    {
      title: "Proven at Scale",
      description: "Enterprise level deployments prove we deliver enterprise results. Not a startup—we're already production-proven with measurable ROI."
    }
  ];

  const certifications = [
    "ISO 27001 Certified",
    "Cyber Essentials Plus",
    "GDPR Compliant",
    "DORA Ready",
    "BSI C5 Certified",
    "MOD Engagement",
    "NVIDIA Inception Member",
    "Lenovo AI Innovator"
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-black via-blue-950/20 to-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-400/40 rounded-full">
                <span className="text-2xl">🎖️</span>
                <span className="text-sm font-semibold text-blue-300">Military Veteran Run</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-400/40 rounded-full">
                <span className="text-2xl">🤝</span>
                <span className="text-sm font-semibold text-green-300">Ethnic Minority Led</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-white">Who We Are</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto">
              The UK's first military veteran-run, ethnic minority-led sovereign AI infrastructure company. 
              Delivering proven results for BBC, ITV, and Channel 4 while creating 405+ regional jobs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-400 mb-8 text-center">Our Story</h2>
            
            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                <strong className="text-white">Media Stream AI was founded with a clear mission:</strong> deliver 
                world-class AI infrastructure that remains 100% under UK/EU control. No foreign data transfer. 
                No CLOUD Act exposure. No hyperscaler lock-in.
              </p>

              <p>
                As a <strong className="text-blue-300">military veteran-run organization</strong>, we bring 
                operational discipline, security protocols, and unwavering integrity to every deployment. 
                Our veteran leadership understands that <strong className="text-white">sovereignty isn't 
                just technical—it's operational, legal, and strategic.</strong>
              </p>

              <p>
                As an <strong className="text-green-300">ethnic minority-led business</strong>, we're committed 
                to building representative AI that serves diverse communities. We understand that technology 
                leadership must reflect the populations it serves.
              </p>

              <p>
                From day one, we've prioritized <strong className="text-white">measurable social impact</strong>. 
                Our canal-cooled data centers don't just reduce energy—they power vertical farms growing fresh 
                produce for food banks. We've created 405+ regional tech jobs. We feed 24,000 meals/month to 
                communities. <strong className="text-green-300">This is AI infrastructure with purpose.</strong>
              </p>

              <p>
                Today, we're proud to be recognized by <strong className="text-white">NVIDIA Inception</strong> and 
                <strong className="text-white"> Lenovo AI Innovator</strong> programs while delivering proven 
                results for the UK's leading broadcasters and enterprises.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY WE'RE UNIQUE ================= */}
      <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Why We're Unique in the Market
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {uniqueFactors.map((factor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-3">{factor.title}</h3>
                <p className="text-white/70 leading-relaxed">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">Our Core Values</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">Our Journey</h2>

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="text-2xl font-bold text-blue-400">{item.year}</div>
                </div>
                <div className="flex-shrink-0 w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                <div className="flex-1 pb-8 border-l-2 border-white/10 pl-6 -ml-1.5">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PARTNERSHIPS ================= */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Industry Recognition
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* NVIDIA Inception */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-br from-green-900/20 to-black border border-green-400/30 rounded-2xl text-center"
            >
              <svg width="120" height="120" viewBox="0 0 200 200" className="mx-auto mb-6">
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
              <h3 className="text-2xl font-bold text-white mb-3">NVIDIA Inception Program</h3>
              <p className="text-white/70 mb-4">
                Selected for NVIDIA's exclusive Inception program for cutting-edge AI startups, 
                validating our sovereign AI architecture and technical excellence.
              </p>
              <Link href="/partnerships#nvidia">
                <button className="px-6 py-2 border border-green-400 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                  Learn More
                </button>
              </Link>
            </motion.div>

            {/* Lenovo AI Innovator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gradient-to-br from-red-900/20 to-black border border-red-400/30 rounded-2xl text-center"
            >
              <svg width="120" height="120" viewBox="0 0 200 200" className="mx-auto mb-6">
                <circle cx="100" cy="100" r="60" stroke="#E31C23" strokeWidth="4" fill="none"/>
                <path d="M70 100 L90 100 M90 70 L90 130 M110 100 L130 100 M120 90 L120 110" stroke="#E31C23" strokeWidth="4"/>
                <text x="100" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LENOVO</text>
                <text x="100" y="192" textAnchor="middle" fill="white" fontSize="11">AI INNOVATOR</text>
              </svg>
              <h3 className="text-2xl font-bold text-white mb-3">Lenovo AI Innovator Program</h3>
              <p className="text-white/70 mb-4">
                Partner in Lenovo's AI Innovator Program, leveraging Lenovo Neptune liquid cooling 
                technology for sustainable AI infrastructure.
              </p>
              <Link href="/partnerships#lenovo">
                <button className="px-6 py-2 border border-red-400 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="text-center">
            <Link href="/partnerships">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
                View All Partnerships
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section className="py-20 px-6 border-t border-white/10 bg-gradient-to-b from-black via-blue-950/10 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Certifications & Compliance
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-black/40 border border-white/10 rounded-lg text-center"
              >
                <Award className="text-blue-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-semibold text-white">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT METRICS ================= */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-12 text-center">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 bg-black/40 border border-white/10 rounded-2xl text-center">
              <Users size={48} className="text-blue-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-blue-400 mb-2">405+</div>
              <div className="text-xl text-white/70 mb-2">Regional Jobs Created</div>
              <p className="text-sm text-white/60">
                Manchester, Liverpool, Durham, Düsseldorf, Marseille tech positions
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 rounded-2xl text-center">
              <Heart size={48} className="text-green-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-green-400 mb-2">24,000+</div>
              <div className="text-xl text-white/70 mb-2">Meals Per Month</div>
              <p className="text-sm text-white/60">
                Fresh produce from waste heat-powered vertical farms to food banks
              </p>
            </div>

            <div className="p-8 bg-black/40 border border-white/10 rounded-2xl text-center">
              <Zap size={48} className="text-yellow-400 mx-auto mb-4" />
              <div className="text-5xl font-bold text-yellow-400 mb-2">40%</div>
              <div className="text-xl text-white/70 mb-2">Energy Reduction</div>
              <p className="text-sm text-white/60">
                Canal-cooled infrastructure with ORC heat recovery
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/data-centre">
              <button className="px-8 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-colors">
                Learn About Our Sustainability
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the AI & Data Sovereignty Movement
          </h2>
          <p className="text-xl text-white/70 mb-8">
            Work with a military veteran-run, ethnic minority-led team delivering 
            proven AI infrastructure with real social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-lg transition-colors">
                Get Started
              </button>
            </Link>
            <Link href="/sectors">
              <button className="px-8 py-4 border-2 border-white/20 hover:border-blue-400 rounded-lg font-semibold text-lg transition-colors">
                View Sector Solutions
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
