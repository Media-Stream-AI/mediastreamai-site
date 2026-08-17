"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, DollarSign, BarChart3, Users, Check, ArrowRight, Play } from 'lucide-react';

export default function CreatorsPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Content Creation',
      description: 'Type a brief, get long-form video. Text-to-video on MOTHER DeepVision handles scripting, visuals and editing in 60+ languages.',
    },
    {
      icon: DollarSign,
      title: '70% Revenue Share',
      description: 'Industry-leading creator split. Fair, transparent payments. Earn from day one.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track views, engagement, revenue. Understand your audience. Optimize content.',
    },
    {
      icon: Users,
      title: 'Reach Your Audience',
      description: 'Engaged audience. Global reach. Multi-device distribution.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      price: '£29',
      period: '/month',
      features: [
        '10 AI episodes/month',
        'Up to 15 min per episode',
        '1080p quality',
        'Basic analytics',
        'Community support',
        'Mobile & web distribution',
      ],
   cta: 'Start 14-Day Trial',
  href: 'https://creator.intuitv.app',
},
    {
      name: 'Professional',
      price: '£99',
      period: '/month',
      features: [
        '50 AI episodes/month',
        'Up to 60 min per episode',
        '4K quality',
        'Advanced analytics',
        'White-label content',
        'API access',
        'Priority support',
        'All platforms + TV apps',
      ],
      cta: 'Start 14-Day Trial',
      href: 'https://creator.intuitv.app?plan=pro',
      highlight: true,
    },
    {
      name: 'Studio',
      price: '£499',
      period: '/month',
      features: [
        'Unlimited episodes',
        'Unlimited length',
        '4K quality',
        'Custom AI model training',
        'Full white-label platform',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom integrations',
      ],
      cta: 'Contact Sales',
      href: '/contact',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: 'radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.16), transparent 60%)' }}
        />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="chip mb-6">
              AI Content Creation Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 leading-tight">
              Build Your <span className="text-gradient">Content Empire</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Create professional TV content with AI. One sentence becomes a full episode. Earn 70% revenue share.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="https://creator.intuitv.app" className="btn-glow text-lg px-8 py-4">
                <Sparkles className="w-5 h-5" />
                Start Creating Free
              </Link>
              <Link href="/creators/dashboard" className="btn-ghost text-lg px-8 py-4">
                <Play className="w-5 h-5" />
                View Dashboard Demo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-6">
                AI Creates Your <span className="text-gradient">Entire Show</span>
              </h2>
              <p className="text-xl text-muted mb-6">
                MOTHER LLM and CORE turn your brief into scenes and shots, MOTHER DeepVision generates the video, and it is assembled into long-form output up to ~1.5 hours. You bring the ideas, we build the episodes.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 card-night border border-hair rounded-2xl p-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-mist mb-1">Type Your Idea</h4>
                    <p className="text-sm text-muted">A documentary about AI in healthcare</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 card-night border border-hair rounded-2xl p-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-mist mb-1">AI Generates Everything</h4>
                    <p className="text-sm text-muted">Script, narration, visuals, music, editing</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 card-night border border-hair rounded-2xl p-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-mist mb-1">Publish & Earn</h4>
                    <p className="text-sm text-muted">Go live on all platforms, start earning immediately</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl border border-hair overflow-hidden">
                <Image
                  src="/ai-platform-diagram.png"
                  alt="IntuiTV AI Content Creation Platform"
                  width={1200}
                  height={800}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-mist mb-4">
              How Creators <span className="text-gradient">Earn</span>
            </h2>
            <p className="text-xl text-muted">
              A simple, transparent path from idea to revenue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Keep 70% Revenue', body: 'Earn a 70% share on your content with transparent, monthly payouts.' },
              { title: 'Reach Every Screen', body: 'Distribute across mobile, web, and smart TV from a single workflow.' },
              { title: 'Optimize with Data', body: 'Real-time analytics on views, engagement, and revenue help you grow.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-night border border-hair rounded-2xl p-6 card-hover"
              >
                <div className="inline-flex h-16 w-16 mx-auto mb-4 items-center justify-center rounded-2xl border border-hair bg-white/5 text-2xl font-bold text-cyan">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-mist mb-2 text-center">{item.title}</h3>
                <p className="text-sm text-muted text-center">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-night-800/60 border border-hair rounded-2xl">
        <div className="container-custom">
          <h2 className="text-4xl font-semibold text-mist text-center mb-12">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="card-night border border-hair rounded-2xl p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-mist mb-2">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-mist mb-4">
              Creator <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-xl text-muted">
              14-day free trial on all plans. No credit card required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`card-night border rounded-2xl p-8 ${
                  plan.highlight ? 'border-cyan glow-ring scale-105 relative' : 'border-hair card-hover'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="chip text-cyan border-cyan/40">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-semibold text-mist mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-mist">{plan.price}</span>
                  <span className="text-muted">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center ${
                    plan.highlight ? 'btn-glow' : 'btn-ghost'
                  } w-full`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-night rounded-2xl p-12 border border-hair glow-ring">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-semibold text-mist mb-6">
                  Powered by <span className="text-gradient">MOTHER AI</span>
                </h2>
                <p className="text-xl text-muted mb-8">
                  Access MediaStream AI&apos;s sovereign MOTHER models - trained in-house in the UK and hosted on owned GPU compute (NVIDIA B300 &amp; H200) in Scotland and Manchester. Built for UK/EU data residency and GDPR.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {['Scheduler Agent', 'Power Agent', 'Cost Agent', 'Incident Agent', 'Drift Agent', 'Content Agent'].map((agent) => (
                    <div key={agent} className="card-night border border-hair rounded-xl p-3 text-sm text-center text-cyan">
                      {agent}
                    </div>
                  ))}
                </div>
                <a
                  href="https://mother.mediastreamai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Learn About MOTHER AI <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="relative">
                <Image
                  src="/vp-studio-icon.png"
                  alt="MOTHER AI Content Creation"
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="glass-night rounded-2xl p-12 md:p-16 text-center border border-hair">
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl mb-6">
              Start Creating <span className="text-gradient">Today</span>
            </h2>
            <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
              Start earning from AI-powered content. 14-day free trial, no credit card required.
            </p>

            <Link href="https://creator.intuitv.app" className="btn-glow text-lg px-10 py-5">
              <Sparkles className="w-5 h-5" />
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
