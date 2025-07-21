import { defineConfig } from 'vite'

export default defineConfig({
  base: '/24/', // Base path for production
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})