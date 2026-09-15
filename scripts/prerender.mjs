// Prerenders every locale page into static HTML (dist/index.html, dist/en/index.html, dist/fr/index.html),
// plus 404.html, sitemap.xml and robots.txt. Runs after `vite build` and the SSR build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ssrEntry = fs
  .readdirSync(ssrDir)
  .find(f => f.startsWith("entry-server") && f.endsWith(".js"));
if (!ssrEntry) throw new Error("SSR bundle not found in dist-ssr");
const { render, LOCALES, localePath, absoluteUrl, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, ssrEntry)).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function writePage(url, outFile) {
  const { html, head, lang, dir } = render(url);
  const page = template
    .replace(
      /<html lang="[^"]*" dir="[^"]*">/,
      `<html lang="${lang}" dir="${dir}">`
    )
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, page);
  console.log("prerendered", path.relative(root, outFile));
}

for (const locale of LOCALES) {
  const p = localePath(locale);
  writePage(
    p,
    p === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, p.slice(1), "index.html")
  );
}
writePage("/__not_found__", path.join(dist, "404.html"));

const lastmod = new Date().toISOString().slice(0, 10);
const urls = LOCALES.map(l => absoluteUrl(localePath(l)));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(
  (l, i) => `  <url>
    <loc>${urls[i]}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${l === "he" ? "1.0" : "0.8"}</priority>
${LOCALES.map((alt, j) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urls[j]}" />`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urls[0]}" />
  </url>`
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("sitemap + robots written for", SITE_URL);
