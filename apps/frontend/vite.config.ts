import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
  plugins: [tanstackRouter(), tailwindcss(), react()],
  server: { port: 5175, open: true, proxy: { "/api": "http://localhost:3000" } },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: { outDir: "./dist", emptyOutDir: true },
})
