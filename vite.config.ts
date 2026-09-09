import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
        support: resolve(import.meta.dirname, 'support.html'),
        cookies: resolve(import.meta.dirname, 'cookies.html'),
        dataDeletion: resolve(import.meta.dirname, 'data-deletion.html'),
        refunds: resolve(import.meta.dirname, 'refunds.html'),
      },
    },
  },
})
