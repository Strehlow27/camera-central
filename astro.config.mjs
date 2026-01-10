// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // ✅ Your production domain (VERY important for SEO + sitemap)
  site: "https://camera-central.com",

  // ✅ Output optimized for Vercel
  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});