import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Browser compatibility configuration
  compiler: {
    // Enable SWC for better browser compatibility
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Transpile modules for older browser support
  transpilePackages: [
    'lucide-react',
    '@radix-ui/react-dialog',
    '@radix-ui/react-navigation-menu',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge'
  ],
};

export default nextConfig;
