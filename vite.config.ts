import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Public site URL used for canonical/hreflang/sitemap/OG URLs.
// Accepts SITE_URL or VITE_SITE_URL, with or without a scheme.
const rawSiteUrl =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  "https://sharon-mazganim.pages.dev";
const siteUrl = (
  /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`
).replace(/\/+$/, "");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: { "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl) },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: { port: 3000, host: true },
});
