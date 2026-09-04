/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp'],
    qualities: [75, 80],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 390, 430, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [32, 40, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
