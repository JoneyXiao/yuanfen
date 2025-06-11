import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  // Ensure compatibility with older browsers
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure webpack for better browser support
  webpack: (config, { dev, isServer }) => {
    // Set target for older browser support
    if (!dev && !isServer) {
      config.target = ['web', 'es5'];
      
      // Add polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "net": false,
        "tls": false,
      };
    }
    
    return config;
  },

  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add transpilation for legacy browsers
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
