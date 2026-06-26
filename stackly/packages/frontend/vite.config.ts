import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      events: path.resolve(__dirname, './src/polyfills/events.ts'),
      util: path.resolve(__dirname, './src/polyfills/util.ts'),
    },
  },
  define: {
    global: 'window',
    process: {
      env: {},
      nextTick: 'queueMicrotask', // Browser alternative for nextTick
    },
  },
})
