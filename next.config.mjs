/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 defaults to Turbopack; declare empty turbopack config when using webpack()
  // https://nextjs.org/docs/app/api-reference/next-config-js/turbopack
  turbopack: {},
  webpack(config, { dev }) {
    // On some Windows setups, webpack persistent caching can OOM with
    // "PackFileCacheStrategy ... Array buffer allocation failed".
    // Disabling cache in dev stabilizes the dev server.
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
