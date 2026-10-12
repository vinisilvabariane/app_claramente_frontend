import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: '0.0.0.0',
    port: 5173,
    // Libera tuneis (localtunnel/cloudflared) usados para testar a pagina
    // de AR no celular: a camera no navegador exige HTTPS, e o Vite
    // bloqueia hosts externos por padrao.
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app'],
    proxy: {
      '/api': {
        target: 'http://localhost:5090',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
