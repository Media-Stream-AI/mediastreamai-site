"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Check, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function SignupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan') || 'premium';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const plans: Record<string, any> = {
    free: {
      name: 'Free',
      price: '£0',
      period: 'forever',
      priceId: null,
      trial: false,
    },
    premium: {
      name: 'Premium',
      price: '£9.99',
      period: '/month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIEWER_PREMIUM_MONTHLY,
      trial: true,
      trialDays: 7,
    },
    family: {
      name: 'Family',
      price: '£14.99',
      period: '/month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIEWER_FAMILY_MONTHLY,
      trial: true,
      trialDays: 7,
    },
  };

  const selectedPlan = plans[plan];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (plan === 'free') {
        // Free tier - just create account
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, plan: 'free' }),
        });

        if (response.ok) {
          router.push('/success?plan=free');
        }
      } else {
        // Paid tier - create Stripe checkout
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            priceId: selectedPlan.priceId,
            plan,
          }),
        });

        const { sessionId } = await response.json();
        const stripe = await stripePromise;

        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 section-padding">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-night rounded-2xl border border-hair p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Plan Summary */}
            <div>
              <h2 className="text-3xl font-semibold text-mist mb-6">
                {selectedPlan.name} Plan
              </h2>

              <div className="mb-8">
                <div className="text-5xl font-bold text-mist mb-2">
                  {selectedPlan.price}
                  <span className="text-xl text-muted">{selectedPlan.period}</span>
                </div>
                {selectedPlan.trial && (
                  <div className="text-cyan font-space-mono">
                    {selectedPlan.trialDays}-day free trial
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {[
                  plan === 'free' ? '10 hours/month viewing' : 'Unlimited viewing',
                  'AI personalization',
                  plan === 'free' ? 'Mobile app only' : 'All devices',
                  plan === 'free' ? 'Ad-supported' : 'Ad-free',
                  plan !== 'free' && '4K quality',
                  plan !== 'free' && `${plan === 'family' ? '10' : '5'} custom shows/month`,
                  plan === 'family' && 'Up to 5 profiles',
                ].filter(Boolean).map((feature) => (
                  <div key={feature as string} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-cyan" />
                    <span className="text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signup Form */}
            <div>
              <h3 className="text-2xl font-semibold text-mist mb-6">Create Account</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none transition-colors text-mist"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none transition-colors text-mist"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-hair focus:border-cyan focus:outline-none transition-colors text-mist"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glow w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {plan === 'free' ? 'Create Free Account' : 'Start Free Trial'}
                    </>
                  )}
                </button>

                {plan !== 'free' && (
                  <p className="text-xs text-muted text-center">
                    No charge for {selectedPlan.trialDays} days. Cancel anytime.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ViewerSignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
