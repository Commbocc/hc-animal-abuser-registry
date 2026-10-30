import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  server: {
    proxy: {
      "/caar.api": {
        target: "https://app.hillsboroughcounty.org/CAAR/Abuser",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/caar\.api/, ""),
      },
    },
  },
});
