"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Smartphone, Tv, Monitor, Download, Check } from 'lucide-react';

export default function ViewersPage() {
  const features = [
    {
      icon: '🧠',
      title: 'AI That Learns You',
      description: 'Every second you watch teaches our AI what you love. Your channel evolves with you.',
    },
    {
      icon: '📱',
      title: 'Watch Everywhere',
      description: 'Mobile, Smart TV, Web - seamless experience across all your devices.',
    },
    {
      icon: '🎬',
      title: 'Create Your Own Shows',
      description: 'Type a sentence, get a full TV episode. Your creativity, our AI.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data stays in the UK/EU. GDPR compliant. 100% opt-in.',
    },
  ];

  const plans = [
    {
      name: 'Free',
      price: '£0',
      period: 'forever',
      features: [
        '10 hours/month viewing',
        'Basic personalization',
        'Mobile app only',
        'Ad-supported',
      ],
      cta: 'Start Free',
      href: '/viewers/signup?plan=free',
      highlight: false,
    },
    {
      name: 'Premium',
      price: '£9.99',
      period: '/month',
      features: [
        'Unlimited viewing',
        'Full AI personalization',
        'All devices (Mobile, TV, Web)',
        'Ad-free experience',
        '5 custom shows/month',
        '4K quality',
      ],
      cta: 'Start 7-Day Free Trial',
      href: '/viewers/signup?plan=premium',
      highlight: true,
    },
    {
      name: 'Family',
      price: '£14.99',
      period: '/month',
      features: [
        'Everything in Premium',
        'Up to 5 profiles',
        'Kids mode + parental controls',
        'Share across devices',
        '10 custom shows/month',
      ],
      cta: 'Start 7-Day Free Trial',
      href: '/viewers/signup?plan=family',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-padding relative">
        <div
          className="absolute inset-0 opacity-60"
          style={{ backgroundImage: 'radial-gradient(60% 120% at 50% 0%, rgba(99,102,241,0.16), transparent 60%)' }}
        />
        <div className="container-custom text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display mb-6 text-mist">
              Your <span className="text-gradient">Perfect Channel</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-8 max-w-3xl mx-auto">
              AI-powered personalized television that learns what you love and serves it perfectly
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Link href="/viewers/signup" className="btn-glow flex items-center gap-2 text-lg px-8 py-4">
                <Play className="w-5 h-5" />
                Start Free Trial
              </Link>
            </div>

            {/* Hero Image - TV Player Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative max-w-6xl mx-auto"
            >
              <div className="rounded-2xl border border-hair overflow-hidden">
                <Image
                  src="/tv-player-interface.png"
                  alt="IntuiTV Multi-Device Experience - Watch on Mobile, TV, and Web"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 card-night px-6 py-3 rounded-full font-semibold text-mist border border-hair hidden md:block">
                Watch on Any Device 📱💻📺
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How Personalization Works Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-mist mb-4">
              Your Personal <span className="text-gradient">AI Channel</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              MOTHER AI learns your preferences and creates a completely personalized viewing experience
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-5xl mx-auto"
          >
            <Image
              src="/personal-family-diagram.png"
              alt="IntuiTV AI Personalization Technology - MOTHER LLM and Sovereign Data Security"
              width={1400}
              height={900}
              className="rounded-2xl glass-night p-4 sm:p-8"
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src="/personalization-icon.png"
                  alt="AI Personalization"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-mist">Smart Recommendations</h3>
              <p className="text-muted">
                AI analyzes your viewing patterns and suggests content you'll love
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src="/hls-icon.png"
                  alt="Instant Content Creation"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-mist">Instant Content</h3>
              <p className="text-muted">
                Your prompts turn into full TV episodes in minutes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="font-semibold text-xl mb-2 text-mist">Privacy First</h3>
              <p className="text-muted">
                UK/EU sovereign data. GDPR compliant. Your data never leaves Europe
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-mist text-center mb-12">
            Why <span className="text-gradient">IntuiTV</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="card-night rounded-2xl border border-hair p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2 text-mist">{feature.title}</h3>
                <p className="text-sm text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-mist mb-4">
              Choose Your <span className="text-gradient">Plan</span>
            </h2>
            <p className="text-xl text-muted">
              7-day free trial on all paid plans. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`card-night rounded-2xl border border-hair p-8 card-hover ${
                  plan.highlight ? 'glow-ring border-cyan scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {plan.highlight && (
                  <div className="text-center mb-4">
                    <span className="chip">
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

      {/* Easy Setup Section with QR Pairing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-mist mb-4">
              Easy Setup on <span className="text-gradient">Any Device</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Get started in minutes. Scan a QR code and you're watching!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-2xl border border-hair overflow-hidden">
                <Image
                  src="/tv-pairing-qr.png"
                  alt="Pair Your TV with IntuiTV - QR Code Setup"
                  width={800}
                  height={600}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-mist">Open IntuiTV on Your TV</h3>
                  <p className="text-muted">
                    Find IntuiTV in your Smart TV app store (Samsung, LG, Android TV, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-mist">Scan the QR Code</h3>
                  <p className="text-muted">
                    Use your phone to scan the pairing code displayed on your TV
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-hair bg-white/5 text-cyan font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-mist">Start Watching!</h3>
                  <p className="text-muted">
                    Your AI channel is ready. Personalization begins from second one.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/viewers/signup" className="btn-glow inline-flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Get Started Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Apps */}
      <section id="download" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-mist mb-4">
              Download <span className="text-gradient">IntuiTV</span>
            </h2>
            <p className="text-xl text-muted">
              Available on all your devices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card-night rounded-2xl border border-hair p-6 text-center">
              <Smartphone className="w-16 h-16 mx-auto mb-4 text-cyan" />
              <h3 className="font-semibold mb-4 text-mist">Mobile</h3>
              <div className="space-y-3">
                <a
                  href="https://apps.apple.com/intuitv"
                  className="block btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/intuitv"
                  className="block btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Google Play
                </a>
              </div>
            </div>

            <div className="card-night rounded-2xl border border-hair p-6 text-center">
              <Tv className="w-16 h-16 mx-auto mb-4 text-iris" />
              <h3 className="font-semibold mb-4 text-mist">Smart TV</h3>
              <p className="text-sm text-muted mb-4">
                Search "IntuiTV" on your Smart TV app store
              </p>
              <div className="text-xs text-muted space-y-1">
                <p>✓ Samsung Tizen</p>
                <p>✓ LG webOS</p>
                <p>✓ Android TV</p>
                <p>✓ Fire TV</p>
                <p>✓ Apple TV</p>
                <p>✓ Roku</p>
              </div>
            </div>

            <div className="card-night rounded-2xl border border-hair p-6 text-center">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-violet" />
              <h3 className="font-semibold mb-4 text-mist">Web</h3>
              <p className="text-sm text-muted mb-4">
                Watch directly in your browser
              </p>
              <Link href="/viewers/signup" className="btn-glow inline-block">
                Launch Web App
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
