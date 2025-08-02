import { DefaultSeoProps } from "next-seo";

const defaultTitle = "LUNOWEB — Премиум разработка сайтов и дизайнов под ключ";
const defaultDescription =
  "Создаём премиальные сайты под ключ: от дизайна и UX до запуска и SEO. Веб-студия LUNOWEB — полный цикл разработки, индивидуальный подход, гарантии результата. Закажите сайт, который приносит клиентов.";

const config: DefaultSeoProps = {
  title: defaultTitle,
  titleTemplate: "%s | LUNOWEB",
  description: defaultDescription,

  canonical: "https://lunoweb.com/",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://lunoweb.com/",
    siteName: "LUNOWEB",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "https://lunoweb.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LUNOWEB – Веб-студия",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@lunoweb",
    site: "@lunoweb",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#000000" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    { name: "robots", content: "index, follow" },
    { name: "Content-Type", content: "text/html; charset=utf-8" },
    { name: "language", content: "Russian" },
    { name: "author", content: "LUNOWEB" },
    { name: "publisher", content: "LUNOWEB" },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "alternate",
      href: "https://lunoweb.com/",
      hrefLang: "ru",
    },
    {
      rel: "alternate",
      href: "https://lunoweb.com/en",
      hrefLang: "en",
    },
  ],
};

export default config;
