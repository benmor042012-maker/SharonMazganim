// Generates the Open Graph image (1200x630 PNG), icon PNGs and favicon.ico using Playwright's bundled Chromium.
// Run manually: `node scripts/og-image.mjs` (needs `playwright` installed, or PLAYWRIGHT_MODULE pointing at one).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve playwright from node_modules, or from PLAYWRIGHT_MODULE (e.g. a global install path).
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "client", "public", "images");
const icon = fs.readFileSync(path.join(out, "icon.svg"), "utf8");
const iconData = `data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`;

const html = `<!doctype html><html dir="rtl"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Heebo:wght@500;800&family=Rubik:wght@700;800&display=swap">
<style>html,body{margin:0;width:1200px;height:630px;overflow:hidden}body{background:linear-gradient(135deg,#0d213d,#173553 60%,#1f4a6e);font-family:Heebo,Rubik,sans-serif;color:#f2f7fa;display:flex;flex-direction:column;justify-content:center;padding:0 80px;box-sizing:border-box;position:relative}
.c{position:absolute;border:1px solid rgba(143,192,211,.25);border-radius:50%;left:-120px;bottom:-260px;width:600px;height:600px;box-shadow:0 0 0 80px rgba(143,192,211,.05),0 0 0 160px rgba(143,192,211,.03)}
h1{font-family:Rubik,sans-serif;font-size:84px;line-height:1;margin:0 0 24px;letter-spacing:-.04em}h1 em{font-style:normal;color:#7ec7d2}
p{font-size:30px;margin:0;color:#b9cfdd;max-width:640px;line-height:1.5}
.b{display:flex;align-items:center;gap:18px;margin-bottom:34px;font-size:30px;font-weight:800}.b img{width:64px;height:64px}
.tag{margin-top:34px;display:inline-block;padding:14px 26px;border-radius:99px;background:#d8b476;color:#163453;font-size:26px;font-weight:800}
.en{font-family:Rubik,sans-serif;font-size:22px;color:#8ca4b6;letter-spacing:.2em;position:absolute;left:80px;bottom:60px;direction:ltr}
</style></head><body><div class="c"></div>
<div><div class="b"><img src="${iconData}">שרון מזגנים</div><h1>אוויר טוב <em>מתחיל</em><br>באבחון נכון.</h1><p>תיקון, התקנה ותחזוקה של מזגנים בנתניה והשרון</p><div class="tag">050-644-3344</div></div>
<div class="en">SHARON AC SERVICE · NETANYA</div></body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(out, "og-image.png"), type: "png" });

for (const [name, size] of [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon-32.png", 32],
]) {
  const p = await browser.newPage({ viewport: { width: size, height: size } });
  await p.setContent(
    `<body style="margin:0"><img src="${iconData}" width="${size}" height="${size}" style="display:block"></body>`
  );
  await p.screenshot({
    path: path.join(out, name),
    type: "png",
    omitBackground: true,
  });
  await p.close();
}
await browser.close();
console.log("images written to", out);
