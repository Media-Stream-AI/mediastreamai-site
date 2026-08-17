/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
