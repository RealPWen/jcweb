import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['jcweb.parigain.local'],
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
        index: './index.html',
        company: './company.html',
        about: './about.html',
        strategy: './strategy.html',
        contact: './contact.html',
        careers: './careers.html',
      },
    },
  },
})
