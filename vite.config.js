import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from "path";

// https://vite.dev/config/

export default defineConfig({
  base: "https://Sabishi2.github.io/",
  plugins: [svelte()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  }
})
