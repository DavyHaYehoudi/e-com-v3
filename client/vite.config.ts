import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/lib/utils": path.resolve(__dirname, "./src/lib/utils"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/service": path.resolve(__dirname, "./src/service"),
      "@/redux": path.resolve(__dirname, "./src/redux"),
      "@/layout": path.resolve(__dirname, "./src/layout"),
    },
  },
});

