/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don’t fail the build on ESLint errors/warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep this false so type errors still fail builds (recommended)
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;