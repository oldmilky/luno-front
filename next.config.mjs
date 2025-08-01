// const nextTranslate = require("next-translate-plugin");
import nextTranslate from "next-translate-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  // optimizeFonts: true, // Default is true, removing the false override
  
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  
  // Enable compression for better performance
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", 
        hostname: "**",
      },
    ],
  },
  
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          styles: {
            name: 'styles',
            test: /\.(css|scss|sass)$/,
            chunks: 'all',
            enforce: true,
            priority: 10,
          },
        },
      };
    }
    
    return config;
  },
  
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://lunoweb.com/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "https://lunoweb.com/uploads/:path*",
      },
      // {
      //   source: "/api/:path*",
      //   destination: "http://localhost:4200/api/:path*",
      // },
      // {
      //   source: "/uploads/:path*",
      //   destination: "http://localhost:4200/uploads/:path*",
      // },
    ];
  },
};

// module.exports = nextTranslate(nextConfig);
export default nextTranslate(nextConfig);
