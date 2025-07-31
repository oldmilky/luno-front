// const nextTranslate = require("next-translate-plugin");
import nextTranslate from "next-translate-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  optimizeFonts: false,
  
  experimental: {
    optimizePackageImports: ['framer-motion'],
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
  images: {
    //optimized: true,
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
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "https://domination-cheats.com/api/:path*",
      // },
      // {
      //   source: "/uploads/:path*",
      //   destination: "https://domination-cheats.com/uploads/:path*",
      // },
      {
        source: "/api/:path*",
        destination: "http://localhost:4200/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4200/uploads/:path*",
      },
    ];
  },
};

// module.exports = nextTranslate(nextConfig);
export default nextTranslate(nextConfig);
