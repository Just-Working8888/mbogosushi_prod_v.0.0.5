import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
    host: true, // This will set the server to use the local IP address
    port: 7100, // You can change the port if needed
  }
});
