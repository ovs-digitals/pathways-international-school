import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const shim = (name) => path.resolve(__dirname, "src/shims", name);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // small built-in versions (no extra packages to install)
      "framer-motion": shim("framer-motion.jsx"),
      "lucide-react": shim("lucide-react.jsx"),
      "react-router-dom": shim("react-router-dom.jsx"),
      "radix-ui": shim("radix-ui.jsx"),
    },
  },
  // the portal talks to the server at /api
  define: { __PORTAL_API__: JSON.stringify("/api") },
  server: {
    port: 5173,
    // while developing, /api goes to your server (npm run dev in the server folder, port 4000)
    proxy: { "/api": { target: "http://localhost:4000", changeOrigin: false } },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
