// const nextTranslate = require("next-translate-plugin");
import nextTranslate from "next-translate-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "react-hot-toast",
      "react-query",
      "@reduxjs/toolkit",
      "gsap",
      "react-type-animation",
      "react-responsive",
    ],
    // Включаем modern tree-shaking
    esmExternals: true,
  },

  // Включаем компрессию
  compress: true,

  // Оптимизация изображений
  // images: {
  //   formats: ["image/webp", "image/avif"],
  //   minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "**",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "**",
  //     },
  //   ],
  // },

  webpack: (config, { dev, isServer }) => {
    // Оптимизации для production
    if (!dev && !isServer) {
      // Улучшенное разделение на chunks
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Библиотеки анимаций в отдельный chunk
          animations: {
            name: "animations",
            test: /[\\/]node_modules[\\/](framer-motion|gsap|react-type-animation)[\\/]/,
            chunks: "all",
            priority: 30,
            enforce: true,
          },
          // React экосистема
          react: {
            name: "react-vendor",
            test: /[\\/]node_modules[\\/](react|react-dom|react-redux|@reduxjs[\\/]toolkit)[\\/]/,
            chunks: "all",
            priority: 25,
            enforce: true,
          },
          // UI библиотеки
          ui: {
            name: "ui-vendor",
            test: /[\\/]node_modules[\\/](react-hot-toast|react-responsive|react-query)[\\/]/,
            chunks: "all",
            priority: 20,
            enforce: true,
          },
          // Next.js vendor
          next: {
            name: "next-vendor",
            test: /[\\/]node_modules[\\/](next|next-seo|next-translate)[\\/]/,
            chunks: "all",
            priority: 15,
            enforce: true,
          },
          // Стили в отдельный chunk
          styles: {
            name: "styles",
            test: /\.(css|scss|sass)$/,
            chunks: "all",
            enforce: true,
            priority: 10,
          },
          // Остальные vendor библиотеки
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: 5,
            enforce: true,
          },
        },
      };

      // Tree shaking для lodash и других библиотек
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Минификация и оптимизация
      config.optimization.minimize = true;
    }

    // Bundle Analyzer можно запустить отдельно командой: npm run analyze

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
        destination: `${process.env.REACT_APP_SERVER_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextTranslate(nextConfig);
