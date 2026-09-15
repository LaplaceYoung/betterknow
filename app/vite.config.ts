import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

// 生产由 hyperclone/server（Fastify :8787）静态托管 dist/ 并提供 /api/* 与 WS；
// 开发时把 /api 与各 WS 通道代理到后端，前端永远只走相对路径。
export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://127.0.0.1:8787', changeOrigin: true, ws: true },
      '/ws': { target: 'ws://127.0.0.1:8787', ws: true },
      '/health': 'http://127.0.0.1:8787',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
