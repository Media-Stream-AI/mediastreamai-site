/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Prevent type/eslint from failing Netlify builds
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // If you don't need Next Image optimization on Netlify
  images: { unoptimized: true },

  // Keep this minimal—no deprecated experimental flags like `appDir`
};

module.exports = nextConfig;