import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        strategy: './strategy.html',
        contact: './contact.html',
        careers: './careers.html',
      },
    },
  },
})
