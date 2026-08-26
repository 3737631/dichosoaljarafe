import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(() => {
  // GitHub Pages necesita /dichosoaljarafe/, Cloudflare Pages y dev usan /
  const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
  const isCloudflarePages = process.env.CF_PAGES === "1" || !!process.env.CF_PAGES_URL;
  const base = isCloudflarePages ? "/" : isGitHubActions ? "/dichosoaljarafe/" : "/";
  // Para generar docs correcto para GitHub Pages en local, ejecuta: GITHUB_ACTIONS=true npm run build
  return {
    base,
    plugins: [tailwindcss(), react()],
    server: {
      port: 5173,
    },
    build: {
      outDir: "docs",
    },
  };
});
