/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_REDUX_PERSIST_SSR_DISABLE: 'true',
  },
  // Cấu hình cho @react-pdf/renderer
  transpilePackages: ['@react-pdf/renderer'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    remotePatterns: [

    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
  },
  // Cho phép đọc file từ public folder
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
};

export default nextConfig;
