const fs = require("fs");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const BASE_URL = "https://lunoweb.com";

const staticPaths = ["/", "/services", "/cases", "/contacts", "/blog"];

const getLocalizedPaths = (path) => {
  return [
    { lang: "ru", href: `${BASE_URL}${path}` },
    { lang: "en", href: `${BASE_URL}/en${path}` },
    { lang: "x-default", href: `${BASE_URL}${path}` },
  ];
};

const buildUrlEntry = (path) => {
  const localizedLinks = getLocalizedPaths(path)
    .map(
      ({ lang, href }) =>
        `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`
    )
    .join("");

  return `
<url>
  <loc>${BASE_URL}${path}</loc>
  ${localizedLinks}
</url>`;
};

async function generateSitemap() {
  const dynamicPaths = [];

  try {
    // Услуги
    const serviceRes = await fetch(`${BASE_URL}/api/services`);
    const services = await serviceRes.json();
    services.forEach((s) => dynamicPaths.push(`/services/${s.slug}`));

    // Проекты
    const projectRes = await fetch(`${BASE_URL}/api/projects`);
    const projects = await projectRes.json();
    projects.forEach((p) => dynamicPaths.push(`/cases/${p.slug}`));

    // Блоги
    const blogRes = await fetch(`${BASE_URL}/api/blogs`);
    if (blogRes.ok) {
      const blogs = await blogRes.json();
      blogs.forEach((b) => dynamicPaths.push(`/blog/${b.slug}`));
    }
  } catch (err) {
    console.error("❌ Ошибка при генерации sitemap:", err);
  }

  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemapEntries = allPaths.map(buildUrlEntry).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>`;

  fs.writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), sitemap);
  console.log("✅ Мультиязычный sitemap.xml с hreflang создан успешно.");
}

generateSitemap();
