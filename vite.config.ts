import { defineConfig } from 'vite'

export default defineConfig({
    base: '/key',
    build: {
        outDir: 'docs',
        emptyOutDir: true
    },
})