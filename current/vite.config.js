import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  server: {
    proxy: {
      "/rodeo": {
        target: process.env.VITE_RODEO_URL ?? "https://rodeo.freetailhackers.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rodeo/, ""),
      },
    },
  },
});
