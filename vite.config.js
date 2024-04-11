import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePluginCopy } from "vite-plugin-copy";
export default defineConfig({
  plugins: [
    react(),
    VitePluginCopy({
      targets: [{ src: "src/assets/**/*", dest: "dist/assets" }],
    }),
  ],
});
