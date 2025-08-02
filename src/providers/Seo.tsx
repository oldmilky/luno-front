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
      hrefLang: "ru",
      href: `https://lunoweb.com/${
        lang === "ru" ? cleanPath : `ru${cleanPath}`
      }`,
    },
    {
      hrefLang: "en",
      href: `https://lunoweb.com/${
        lang === "en" ? cleanPath : `en${cleanPath}`
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
  const fullCanonical = canonical + (asPath === "/" ? "" : asPath);
  const languageAlternates = generateLanguageAlternates(lang, asPath);

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

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          locale: lang === "ru" ? "ru_RU" : "en_US",
          siteName: "LUNOWEB",
          images: [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: "LUNOWEB — preview for social media",
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

      {breadcrumbs && breadcrumbs.length >= 2 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: `https://lunoweb.com${crumb.path}`,
              })),
            }),
          }}
        />
      )}

      <main>
        {/* <StairsLayout> */}
        <Curve>
          <SmoothScroll>{children}</SmoothScroll>
        </Curve>
        {/* </StairsLayout> */}
      </main>
    </>
  );
};

export default Seo;
