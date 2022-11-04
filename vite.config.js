import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: true,
    proxy: {
      '/api': 'http://localhost:9188',
    },
  },
  build: {
    outDir: 'dist/public',
  },
})
