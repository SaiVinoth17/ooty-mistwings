import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for Netlify deployment */
  output: 'export',
  trailingSlash: true,

  /* Ensure Three.js ecosystem is transpiled correctly */
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],

  /* Image optimization — disabled for static export */
  images: {
    unoptimized: true,
  },

  /* Turbopack config (Next.js 16 default bundler) */
  turbopack: {},
};

export default nextConfig;
