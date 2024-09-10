import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//this is how you configure a vite.config to "enable proxy requests"

const SERVER_PORT = 8080;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
