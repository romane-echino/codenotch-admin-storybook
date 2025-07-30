import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import compression from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cssInjectedByJsPlugin(), compression({
    include: /\.(js|mjs|cjs)$/,
    algorithms: ['gzip']
  })],
   build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'bundle',
      formats: ['es'],
    },
    minify: 'esbuild',
    rollupOptions: {
    },
  },
})
