
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const shim = (name) => path.resolve(__dirname, "src/shims", name);

export default defineConfig({
  // GitHub Pages repository path
  base: "/pathways-international-school/",

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "framer-motion": shim("framer-motion.jsx"),
      "lucide-react": shim("lucide-react.jsx"),
      "react-router-dom": shim("react-router-dom.jsx"),
      "radix-ui": shim("radix-ui.jsx"),
    },
  },

  // API configuration
  define: {
    __PORTAL_API__: JSON.stringify("/api"),
  },

  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: false,
      },
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
