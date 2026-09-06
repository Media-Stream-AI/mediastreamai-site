/** @type {import('next').NextConfig} */

// Enforced security headers applied to every response (SSR pages + route
// handlers included). CSP origins: same-origin app + API routes, the intuitv.app
// / mediastreamai service subdomains, Supabase, Google Fonts, and Stripe.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), usb=(), payment=(), interest-cohort=(), browsing-topics=()' },
  { key: 'X-XSS-Protection', value: '0' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://hooks.stripe.com",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https://streams.intuitv.app https://stream.intuitv.app https://cdn.intuitv.app https://*.intuitv.app https://*.mediastreamai.com",
      "connect-src 'self' https://*.intuitv.app https://api.intuitv.app https://*.mediastreamai.com https://*.supabase.co wss://*.supabase.co https://api.stripe.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Marketing pages prerender with framer-motion + SVG motifs; give the static
  // worker more headroom on slower CI boxes than the 60s default.
  staticPageGenerationTimeout: 180,

  experimental: {
    serverComponentsExternalPackages: [
      "pg",
      "mongodb",
      "stripe",
    ],
  },

  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
};

module.exports = nextConfig;
