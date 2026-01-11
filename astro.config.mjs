// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://camera-central.com",

  integrations: [
    sitemap(),
  ],

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});