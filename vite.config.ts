import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/dichosoaljarafe/",
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
});
