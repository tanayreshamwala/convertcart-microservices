import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/products": {
        target: "http://product-service:4000",
        changeOrigin: true,
        secure: false,
      },
      "/segments": {
        target: "http://segment-service:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
