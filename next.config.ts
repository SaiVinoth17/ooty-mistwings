import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ensure Three.js ecosystem is transpiled correctly */
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],

  /* Turbopack config (Next.js 16 default bundler) */
  turbopack: {},
};

export default nextConfig;
