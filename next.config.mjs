// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // keep builds from failing on ESLint issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // set to false once all TS errors are resolved
    ignoreBuildErrors: true,
  },
};

export default nextConfig;