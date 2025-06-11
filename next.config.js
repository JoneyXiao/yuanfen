/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  assetPrefix: process.env.PAGES_BASE_PATH,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig; 