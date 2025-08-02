import Curve from "@/components/animate/CurvePage/CurvePage";
import SmoothScroll from "@/components/animate/SmoothScroll/SmoothScroll";
import { FC, ReactNode } from "react";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { useRouter } from "next/router";

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  lang?: "ru" | "en";
  children: ReactNode;
  noindex?: boolean;
  breadcrumbs?: {
    name: string;
    path: string;
  }[];
}

const generateLanguageAlternates = (lang: "ru" | "en", path: string) => {
  const cleanPath = path === "/" ? "" : path;
  return [
    {
      hrefLang: "x-default",
      href: `https://lunoweb.com${cleanPath}`,
    },
    {
      hrefLang: "ru",
      href: `https://lunoweb.com${
        lang === "ru" ? cleanPath : `/ru${cleanPath}`
      }`,
    },
    {
      hrefLang: "en",
      href: `https://lunoweb.com${
        lang === "en" ? cleanPath : `/en${cleanPath}`
      }`,
    },
  ];
};

const Seo: FC<SeoProps> = ({
  title,
  description,
  image = "https://lunoweb.com/og-image.png",
  canonical = "https://lunoweb.com/",
  lang = "ru",
  children,
  noindex = false,
  breadcrumbs,
}) => {
  const { asPath } = useRouter();
  const currentPath = asPath.split("?")[0];
  const fullCanonical = `${canonical}${currentPath === "/" ? "" : currentPath}`;
  const languageAlternates = generateLanguageAlternates(lang, currentPath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: canonical,
    name: title,
    description: description,
    publisher: {
      "@type": "Organization",
      name: "LUNOWEB",
      logo: {
        "@type": "ImageObject",
        url: "https://lunoweb.com/logo.svg",
      },
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LUNOWEB",
    url: "https://lunoweb.com/",
    logo: "https://lunoweb.com/logo.svg",
    sameAs: [
      "https://t.me/lunoweb",
      // "https://instagram.com/lunoweb",
      "https://wa.me/77057009801",
      // "https://github.com/lunoweb",
      "https://www.behance.net/lunoweb",
    ],
  };

  const breadcrumbJsonLd =
    breadcrumbs && breadcrumbs.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `https://lunoweb.com${crumb.path}`,
          })),
        }
      : null;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: fullCanonical,
          locale: lang === "ru" ? "ru_RU" : "en_US",
          siteName: "LUNOWEB",
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: "LUNOWEB — preview",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@lunoweb",
          site: "@lunoweb",
          cardType: "summary_large_image",
        }}
        languageAlternates={languageAlternates}
        noindex={noindex}
        additionalMetaTags={[
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "theme-color", content: "#000000" },
          { name: "mobile-web-app-capable", content: "yes" },
          { name: "apple-mobile-web-app-capable", content: "yes" },
          { name: "apple-mobile-web-app-status-bar-style", content: "default" },
          {
            name: "robots",
            content: noindex ? "noindex, nofollow" : "index, follow",
          },
          { name: "Content-Type", content: "text/html; charset=utf-8" },
          { name: "language", content: lang === "ru" ? "Russian" : "English" },
          { name: "author", content: "LUNOWEB" },
          { name: "publisher", content: "LUNOWEB" },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      <main>
        <Curve>
          <SmoothScroll>{children}</SmoothScroll>
        </Curve>
      </main>
    </>
  );
};

export default Seo;
