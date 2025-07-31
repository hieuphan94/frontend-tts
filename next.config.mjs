/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_REDUX_PERSIST_SSR_DISABLE: 'true',
  },
  transpilePackages: ['@react-pdf/renderer'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    remotePatterns: [],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
  },
  publicRuntimeConfig: {
    staticFolder: '/public',
  },

  // 👇 Thêm đoạn này để proxy request từ local sang backend
  async rewrites() {
    return [
      {
        source: '/api/trips/:path*',
        destination: 'https://backend.ima-workspace.hieuspace.com/api/trips/:path*',
      },
    ];
  },
};

export default nextConfig;
