import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        company2: './company2.html',
        company1: './company1.html',
        about: './about.html',
        strategy: './strategy.html',
        contact: './contact.html',
        careers: './careers.html',
      },
    },
  },
})
