"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Shield, Zap, Users, BarChart3, Code, Server, Check } from 'lucide-react';

export default function StudiosPage() {
  const features = [
    {
      icon: Shield,
      title: 'UK/EU Sovereignty',
      description: 'Complete data sovereignty. GDPR compliant. Your data never leaves Europe.',
      color: 'text-cyan'
    },
    {
      icon: Zap,
      title: 'White-Label Platform',
      description: 'Your brand, our technology. Custom domain, branding, and full control.',
      color: 'text-cyan'
    },
    {
      icon: Server,
      title: 'Owned GPU Compute',
      description: 'NVIDIA B300 & H200 GPUs in Scotland and Manchester. Owned compute and sovereign power.',
      color: 'text-ember'
    },
    {
      icon: Code,
      title: 'API & Integrations',
      description: 'RESTful API, webhooks, SSO. Integrate with your existing systems.',
      color: 'text-cyan'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: '24/7 account management. Technical support. Success engineering.',
      color: 'text-cyan'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time insights. Custom dashboards. Data export. API access.',
      color: 'text-cyan'
    },
  ];

  const useCases = [
    {
      title: 'Broadcasters',
      description: 'Transform traditional broadcasting with AI personalization',
      icon: '📺',
      benefits: [
        'Personalized linear channels',
        'AI content generation',
        'Multi-platform distribution',
        'Audience insights'
      ]
    },
    {
      title: 'Content Studios',
      description: 'Scale content production with AI while maintaining creative control',
      icon: '🎬',
      benefits: [
        'Rapid content creation',
        'Multi-format output',
        'Brand consistency',
        'Cost reduction'
      ]
    },
    {
      title: 'Telecom Providers',
      description: 'Differentiate your TV offering with AI-powered features',
      icon: '📡',
      benefits: [
        'White-label platform',
        'Subscriber retention',
        'New revenue streams',
        'Competitive edge'
      ]
    },
    {
      title: 'Government & Defence',
      description: 'Secure, sovereign AI infrastructure for sensitive operations',
      icon: '🏛️',
      benefits: [
        'Air-gapped deployment',
        'UK/EU data residency',
        'Custom security',
        'Compliance ready'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* HERO */}
      <section className="section-padding relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: 'radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.16), transparent 60%)' }}
        />

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="chip mb-6">
                🏢 Enterprise-Grade AI Television
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 leading-tight">
                Enterprise <span className="text-gradient">AI Television</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted mb-8 leading-relaxed">
                White-label platform. Complete sovereignty. Your brand, our AI infrastructure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/contact" className="btn-glow text-lg px-8 py-4">
                  <Building2 className="w-5 h-5" />
                  Request Demo
                </Link>
                <Link href="#platform" className="btn-ghost text-lg px-8 py-4">
                  View Platform
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan" />
                  Enterprise SLA
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan" />
                  UK/EU Sovereign
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan" />
                  Dedicated Support
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-2xl border border-hair overflow-hidden">
                <Image
                  src="/ai-platform-diagram.webp"
                  alt="IntuiTV Enterprise Platform Architecture"
                  width={1200}
                  height={800}
                  className="w-full"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DATA CENTERS */}
      <section className="section-padding bg-night-800/60 border border-hair rounded-2xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              <span className="text-gradient-ember">Sovereign</span> Infrastructure
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              UK/EU sovereign by design. Owned GPU compute and owned power, built for data residency and GDPR.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-night border border-hair rounded-2xl p-6">
              <div className="text-3xl mb-3">🇬🇧</div>
              <h3 className="font-semibold text-mist mb-2">Owned GPU Compute</h3>
              <p className="text-sm text-muted">NVIDIA B300 &amp; H200 GPUs in Scotland (Dundee) and Manchester (2026).</p>
            </div>
            <div className="card-night border border-hair rounded-2xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-mist mb-2">Sovereign Power</h3>
              <p className="text-sm text-muted">Owned compute and sovereign power with low-PUE free-cooling.</p>
            </div>
            <div className="card-night border border-hair rounded-2xl p-6">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-mist mb-2">Data Residency &amp; GDPR</h3>
              <p className="text-sm text-muted">Built for UK/EU data residency and GDPR. Weights, data and inference under UK control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM ARCHITECTURE */}
      <section id="platform" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              Complete <span className="text-gradient">AI Platform</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Everything you need for AI-powered television at enterprise scale
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="glass-night rounded-2xl p-4 md:p-8 border border-hair mx-auto overflow-hidden">
              <Image
                src="/ai-platform-diagram.webp"
                alt="Complete IntuiTV Platform Stack"
                width={1400}
                height={900}
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-night border border-hair rounded-2xl p-6 text-center card-hover"
            >
              <Image
                src="/vp-studio-icon.webp"
                alt="Content Creation"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-mist mb-2">Content Pipeline</h3>
              <p className="text-sm text-muted">Full production pipeline from ideas to episodes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-night border border-hair rounded-2xl p-6 text-center card-hover"
            >
              <Image
                src="/personalization-icon.webp"
                alt="AI Personalization"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-mist mb-2">AI Personalization</h3>
              <p className="text-sm text-muted">MOTHER LLM powers intelligent recommendations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-night border border-hair rounded-2xl p-6 text-center card-hover"
            >
              <Image
                src="/hls-icon.webp"
                alt="Streaming Infrastructure"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-mist mb-2">HLS Streaming</h3>
              <p className="text-sm text-muted">Enterprise-grade delivery with DRM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-night border border-hair rounded-2xl p-6 text-center card-hover"
            >
              <div className="text-6xl mb-4">🏷️</div>
              <h3 className="font-semibold text-mist mb-2">White-Label</h3>
              <p className="text-sm text-muted">Your brand, complete customization</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section-padding bg-night-800/60 border border-hair rounded-2xl">
        <div className="container-custom">
          <h2 className="text-4xl font-semibold text-mist text-center mb-12">
            Enterprise <span className="text-gradient">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="card-night border border-hair rounded-2xl p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-mist mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              Built for <span className="text-gradient">Your Industry</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-night border border-hair rounded-2xl p-8 card-hover"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-semibold text-mist mb-2">{useCase.title}</h3>
                <p className="text-muted mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-cyan flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INTUITV */}
      <section className="section-padding bg-night-800/60 border border-hair rounded-2xl">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-semibold text-mist mb-4">
              Why <span className="text-gradient">IntuiTV</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🔒', name: 'UK/EU Sovereign' },
              { icon: '🛡️', name: 'GDPR Compliant' },
              { icon: '🏷️', name: 'White-Label Ready' },
              { icon: '⚙️', name: 'API & Integrations' },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-night border border-hair rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-sm font-semibold text-mist">{item.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-night rounded-2xl p-12 md:p-16 text-center border border-hair glow-ring">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mb-6">
                Ready to <span className="text-gradient-ember">Scale</span>?
              </h2>
              <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
                Bring AI-powered television to your broadcast or studio. Schedule your enterprise demo today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/contact" className="btn-ember text-lg px-10 py-5">
                  <Building2 className="w-5 h-5" />
                  Request Demo
                </Link>
                <a href="/contact" className="btn-ghost text-lg px-10 py-5">
                  Contact Sales
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted">
                <span>✓ Custom pricing</span>
                <span>✓ Dedicated support</span>
                <span>✓ Enterprise SLA</span>
                <span>✓ White-label ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
