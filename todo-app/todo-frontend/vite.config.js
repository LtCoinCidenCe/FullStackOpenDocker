import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  },
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 5173,
    },
    port: 5173,
    watch: {
      usePolling: true
    }
  }
})
