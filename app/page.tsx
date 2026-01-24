"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Users, TrendingUp, Award, ExternalLink, ArrowRight, CheckCircle } from "lucide-react";

// Animated particles background for desktop
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach(particle => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ opacity: 0.4 }}
    />
  );
}

// Mobile animated SVG
function MobileHeroSVG() {
  return (
    <div className="md:hidden mb-6 flex justify-center">
      <svg width="200" height="120" viewBox="0 0 200 120" className="animate-pulse">
        <defs>
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Central processor */}
        <rect x="75" y="40" width="50" height="50" rx="8" fill="url(#aiGradient)" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </rect>
        
        {/* Corner nodes */}
        <circle cx="30" cy="30" r="8" fill="#60a5fa">
          <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="30" r="8" fill="#60a5fa">
          <animate attributeName="r" values="6;10;6" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="90" r="8" fill="#60a5fa">
          <animate attributeName="r" values="6;10;6" dur="1.5s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="170" cy="90" r="8" fill="#60a5fa">
          <animate attributeName="r" values="6;10;6" dur="1.5s" begin="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Connection lines */}
        <line x1="30" y1="30" x2="75" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="30" x2="125" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="30" y1="90" x2="75" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="90" x2="125" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const sectors = [
    {
      icon: "📺",
      title: "Media & Broadcasting",
      description: "Global Broadcaster scale",
      stat: "75% faster",
      link: "/sectors#media"
    },
    {
      icon: "🎬",
      title: "Film & TV Production",
      description: "End-to-end production",
      stat: "60% reduction",
      link: "/sectors#film"
    },
    {
      icon: "🎨",
      title: "Creative Industries",
      description: "GenAI content at scale",
      stat: "30% savings",
      link: "/sectors#creative"
    },
    {
      icon: "📢",
      title: "Advertising",
      description: "AI-powered campaigns",
      stat: "Higher ROI",
      link: "/sectors#advertising"
    },
    {
      icon: "🛡️",
      title: "Government & Defence",
      description: "100% UK sovereign",
      stat: "Air-gapped",
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
    { icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />, value: "5", label: "UK/EU Data Centers planned 2026" },
    { icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />, value: "40-60%", label: "Cost Savings" },
    { icon: <Users className="w-6 h-6 md:w-8 md:h-8" />, value: "405+", label: "Jobs Created" },
    { icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />, value: "100%", label: "UK/EU Sovereign" }
  ];

  const solutions = [
    {
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
      title: "GPU INFRASTRUCTURE",
      description: "NVIDIA H200, B200, SambaNova RDU clusters across 5 UK/EU data centers",
      features: ["H200 at £4.50/hr", "Hourly or Monthly Billing", "5 UK/EU Data Centers", "Instant Provisioning", "24/7 Monitoring"],
      cta: "View GPU Pricing",
      link: "https://gpu.mediastreamai.com",
      external: true
    },
    {
      icon: <Zap className="w-8 h-8 md:w-10 md:h-10" />,
      title: "MOTHER AI AGENT DEPLOYMENTS",
      description: "Sovereign AI agents with Autm orchestration. Sector-specific implementations.",
      features: ["Custom£/mo", "Multi-Agent Workflows", "Custom Training", "GDPR Compliant"],
      cta: "Explore AI Agents",
      link: "https://mother.mediastreamai.com",
      external: true
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Particle Background - Desktop Only */}
      <ParticleBackground />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gradient-to-b from-black via-blue-950/20 to-black py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          {/* All Badges in One Line - Same Size */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            {/* Military Veteran Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 border border-blue-400/40 rounded-full">
              <span className="text-base">🎖️</span>
              <span className="text-xs font-semibold text-blue-300 whitespace-nowrap">Military Veteran Run</span>
            </div>
            
            {/* Ethnic Minority Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 border border-green-400/40 rounded-full">
              <span className="text-base">🤝</span>
              <span className="text-xs font-semibold text-green-300 whitespace-nowrap">Ethnic Minority Led</span>
            </div>
            
            {/* NVIDIA Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/10 border border-green-400/30 rounded-full">
              <span className="text-xs font-semibold text-green-300 whitespace-nowrap">NVIDIA Inception Member</span>
            </div>
            
            {/* Lenovo Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-400/30 rounded-full">
              <span className="text-xs font-semibold text-red-300 whitespace-nowrap">Lenovo AI Innovator</span>
            </div>
          </div>

          {/* Mobile Animated SVG */}
          <MobileHeroSVG />

          {/* Main Heading - Top Blue, Bottom White */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-extrabold mb-4 md:mb-6 leading-[1.15] text-center px-4"
          >
            <span className="block text-blue-400 text-[clamp(1.8rem,5vw,4.5rem)]">
              A European Sovereign
            </span>
            <span className="block text-white text-[clamp(2rem,6vw,5.5rem)]">
              AI Eco-System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-3 md:mb-4 px-4 text-center"
          >
            100% UK/EU data residency. GPU clusters, British Trained LLM & Reasoning Model MOTHER, AI Agents &Third Party Applicationplatform & Robotics
            for media & production, government & security, finance and enterprise deployments.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm md:text-base text-white/60 max-w-3xl mx-auto mb-6 md:mb-8 px-4 text-center"
          >
            True sovereignty from Company Ownership & Shareholding to European trained Large Language Model (MOTHER).
          </motion.p>

        {/* Primary CTAs */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4"
>
  {/* MOTHER AI – Primary / Highlighted */}
  <Link href="https://mother.mediastreamai.com" target="_blank" className="sm:col-span-2 lg:col-span-1">
    <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 
      bg-blue-600 hover:bg-blue-500 
      ring-2 ring-blue-400/60 shadow-lg shadow-blue-500/20
      rounded-lg font-semibold text-sm sm:text-base md:text-lg 
      transition-all flex items-center justify-center gap-2 whitespace-nowrap">
      MOTHER AI
      <ExternalLink size={16} className="flex-shrink-0" />
    </button>
  </Link>

    {/* MSAI Cloud */}
  <Link href="https://gpu.mediastreamai.com" target="_blank">
    <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 
      border-2 border-blue-400 text-blue-400 
      hover:bg-blue-500/20 rounded-lg font-semibold 
      text-sm sm:text-base md:text-lg transition-colors 
      flex items-center justify-center gap-2 whitespace-nowrap">
      MSAI Cloud
      <ExternalLink size={16} className="flex-shrink-0" />
    </button>
  </Link>

  {/* IntuiTV */}
  <Link href="https://www.intuitv.app" target="_blank">
    <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 
      border-2 border-blue-400 text-blue-400 
      hover:bg-blue-500/20 rounded-lg font-semibold 
      text-sm sm:text-base md:text-lg transition-colors 
      flex items-center justify-center gap-2 whitespace-nowrap">
      IntuiTV
      <ExternalLink size={16} className="flex-shrink-0" />
    </button>
  </Link>

  {/* IntuiTV Studio */}
  <Link href="https://studio.intuitv.app" target="_blank">
    <button className="w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 
      border-2 border-blue-400 text-blue-400 
      hover:bg-blue-500/20 rounded-lg font-semibold 
      text-sm sm:text-base md:text-lg transition-colors 
      flex items-center justify-center gap-2 whitespace-nowrap">
      IntuiTV Studio
      <ExternalLink size={16} className="flex-shrink-0" />
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
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-white">Choose Your Solution</h2>
          <p className="text-sm md:text-base text-white/60 text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            Deploy GPU infrastructure for full control or turnkey MOTHER LLM + AI agents for immediate impact
          </p>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 md:p-8 bg-black/40 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all"
              >
                <div className="text-blue-400 mb-4">{solution.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{solution.title}</h3>
                <p className="text-sm md:text-base text-white/70 mb-6">{solution.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm md:text-base text-white/80">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {solution.external ? (
                  <a href={solution.link} target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm md:text-base transition-colors flex items-center justify-center gap-2">
                      {solution.cta} <ExternalLink size={16} />
                    </button>
                  </a>
                ) : (
                  <Link href={solution.link} className="block">
                    <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm md:text-base transition-colors flex items-center justify-center gap-2">
                      {solution.cta} <ArrowRight size={16} />
                    </button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTORS SECTION (SMALLER CARDS) ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-white">Sector-Specific Deployments</h2>
          <p className="text-sm md:text-base text-white/60 text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            Proven AI solutions deployed across media, government, and enterprise sectors
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4">
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={sector.link}>
                  <div className="p-4 md:p-5 bg-black/40 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all h-full cursor-pointer group">
                    <div className="text-3xl md:text-4xl mb-2 md:mb-3">{sector.icon}</div>
                    <h3 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2 group-hover:text-blue-400 transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60 mb-2 md:mb-3 line-clamp-2">
                      {sector.description}
                    </p>
                    <div className="inline-block px-2 md:px-3 py-1 bg-green-500/20 border border-green-400/40 rounded-full">
                      <span className="text-xs font-semibold text-green-300">{sector.stat}</span>
                    </div>
                    {sector.highlight && (
                      <div className="mt-2 inline-block px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-400/40 rounded-full ml-2">
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
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 relative">
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
                <span className="text-xs md:text-sm text-white/60 group-hover:text-green-400 transition-colors">Inception Member</span>
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
                <span className="text-xs md:text-sm text-white/60 group-hover:text-red-400 transition-colors">AI Innovator</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SUSTAINABILITY SECTION (SMALLER CARDS) ================= */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 bg-gradient-to-b from-black via-green-950/10 to-black relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-white">Sustainable AI Infrastructure</h2>
          <p className="text-sm md:text-base text-white/60 text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            Canal-cooled data centers creating real economic and social impact
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">💼</div>
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 md:mb-2">405+</div>
              <div className="text-xs md:text-sm text-white/70">Regional tech jobs created</div>
            </div>

            <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">🍽️</div>
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 md:mb-2">24,000+</div>
              <div className="text-xs md:text-sm text-white/70">Meals/month to food banks at full operation</div>
            </div>

            <div className="p-4 md:p-6 bg-black/40 border border-white/10 rounded-2xl text-center col-span-2 sm:col-span-1">
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">🌱</div>
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 md:mb-2">40%</div>
              <div className="text-xs md:text-sm text-white/70">Energy reduction via canal cooling</div>
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
      <section className="py-12 md:py-20 px-4 md:px-6 border-t border-white/10 relative">
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
