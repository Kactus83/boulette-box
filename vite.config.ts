/**
 * @module vite.config
 * @remarks Compile le composant MCP Apps en fichier HTML autonome.
 * @internal
 */
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: resolve("dashboard.html") },
  },
});
