import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.10.4.92',
    port: 3000 // или любой другой порт, который вам нужен
  }
})
