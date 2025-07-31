const fs = require("fs");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const staticPages = [
  "/",
  "privacy",
  "delivery",
  "/terms",
  "/warranty",
  "/faq",
  "/catalog",
];

async function generateSitemap() {
  const gameSlugsResponse = await fetch(
    "https://domination-cheats.com/api/games"
  );
  const gameSlugs = await gameSlugsResponse.json();

  const cheatSlugsResponse = await fetch(
    "https://domination-cheats.com/api/cheats"
  );
  const cheatSlugs = await cheatSlugsResponse.json();

  const sitemapEntries = [
    ...staticPages,
    ...gameSlugs.map((game) => `/game/${game.slug}`),
    ...cheatSlugs.map((cheat) => `/cheat/${cheat.slug}`),
  ];

  const sitemap = sitemapEntries
    .map(
      (page) =>
        `<url><loc>${`https://domination-cheats.com${page}`}</loc></url>`
    )
    .join("");

  fs.writeFileSync(
    "public/sitemap.xml",
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`
  );
}

generateSitemap();
