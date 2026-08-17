"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Play, Sparkles, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const viewerPlans = [
    {
      name: 'Free',
      price: { monthly: '£0', annual: '£0' },
      features: [
        '10 hours/month viewing',
        'Basic personalization',
        'Mobile app only',
        'Ad-supported',
      ],
      cta: 'Start Free',
      href: '/viewers/signup?plan=free',
    },
    {
      name: 'Premium',
      price: { monthly: '£9.99', annual: '£99' },
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
      savings: 'Save £20/year'
    },
    {
      name: 'Family',
      price: { monthly: '£14.99', annual: '£149' },
      features: [
        'Everything in Premium',
        'Up to 5 profiles',
        'Kids mode + parental controls',
        'Share across devices',
        '10 custom shows/month',
      ],
      cta: 'Start 7-Day Free Trial',
      href: '/viewers/signup?plan=family',
      savings: 'Save £30/year'
    },
  ];

  const creatorPlans = [
    {
      name: 'Starter',
      price: { monthly: '£29', annual: '£290' },
      features: [
        '10 AI episodes/month',
        'Up to 15 min per episode',
        '1080p quality',
        'Basic analytics',
        'Community support',
      ],
      cta: 'Start 14-Day Trial',
      href: 'https://creator.intuitv.app?plan=starter',
      savings: 'Save £58/year'
    },
    {
      name: 'Professional',
      price: { monthly: '£99', annual: '£990' },
      features: [
        '50 AI episodes/month',
        'Up to 60 min per episode',
        '4K quality',
        'Advanced analytics',
        'White-label content',
        'API access',
        'Priority support',
      ],
      cta: 'Start 14-Day Trial',
      href: 'https://creator.intuitv.app?plan=pro',
      highlight: true,
      savings: 'Save £198/year'
    },
    {
      name: 'Studio',
      price: { monthly: '£499', annual: '£4,990' },
      features: [
        'Unlimited episodes',
        'Unlimited length',
        '4K quality',
        'Custom AI model training',
        'Full white-label platform',
        'Dedicated account manager',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      href: '/contact',
      savings: 'Save £998/year'
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display mb-6">
              Simple <span className="text-gradient">pricing</span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include free trials.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-night-800/60 rounded-full p-1 border border-hair">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold tracking-wide transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-exo-spectrum text-night-900'
                    : 'text-muted hover:text-mist'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-semibold tracking-wide transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-exo-spectrum text-night-900'
                    : 'text-muted hover:text-mist'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-cyan/15 text-cyan px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* VIEWERS PRICING */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-mist text-center mb-8 flex items-center justify-center gap-2">
              <Play className="w-8 h-8 text-cyan" />
              For viewers
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {viewerPlans.map((plan, i) => (
                <PricingCard 
                  key={plan.name} 
                  plan={plan} 
                  billingCycle={billingCycle}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* CREATORS PRICING */}
          <div>
            <h2 className="text-3xl font-semibold text-mist text-center mb-8 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-violet" />
              For creators
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {creatorPlans.map((plan, i) => (
                <PricingCard 
                  key={plan.name} 
                  plan={plan} 
                  billingCycle={billingCycle}
                  delay={i * 0.1}
                  color="purple"
                />
              ))}
            </div>
          </div>

          {/* ENTERPRISE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-night border border-hair rounded-2xl glow-ring p-12 text-center"
          >
            <Building2 className="w-16 h-16 mx-auto mb-6 text-cyan" />
            <h2 className="text-4xl font-semibold text-mist mb-4">
              Enterprise solutions
            </h2>
            <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
              Custom pricing for broadcasters, studios, and large-scale deployments.
              White-label platform powered by sovereign MOTHER AI models, with owned GPU compute
              (NVIDIA B300 &amp; H200) in Scotland and Manchester, built for UK/EU data residency and GDPR.
            </p>
            <Link href="/contact" className="btn-glow inline-flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ plan, billingCycle, delay, color = 'blue' }: any) {
  const price = plan.price[billingCycle];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`card-night card-hover p-8 relative ${
        plan.highlight
          ? 'border-cyan/40 glow-ring scale-105'
          : ''
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-night-900 bg-exo-spectrum shadow-glow-cyan whitespace-nowrap">
            Most popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-semibold text-mist mb-2">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-display text-mist">{price}</span>
        {billingCycle === 'monthly' && price !== '£0' && (
          <span className="text-muted">/month</span>
        )}
        {billingCycle === 'annual' && price !== '£0' && (
          <div className="text-sm text-success-green mt-1">{plan.savings}</div>
        )}
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.href}
        className={`block text-center w-full ${
          plan.highlight ? 'btn-glow' : 'btn-ghost'
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}
