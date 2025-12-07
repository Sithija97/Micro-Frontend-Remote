import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";
import { PORT } from "./src/config/env-loader";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "remote_app",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/components/Button",
          "./Header": "./src/components/Header",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    server: {
      port: PORT, // Your desired port
      strictPort: true, // Exit if port is already in use (optional)
      host: true, // Listen on all addresses (optional)
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    preview: {
      port: PORT,
      strictPort: true,
      cors: true,
    },
  };
});
