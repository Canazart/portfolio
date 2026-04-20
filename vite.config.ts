import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['react','react-dom'], charts: ['recharts'] }
      }
    }
  }
})
