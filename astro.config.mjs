// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// ✅ IMPORTANT: use one of these adapter entrypoints (NOT "@astrojs/vercel")
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});