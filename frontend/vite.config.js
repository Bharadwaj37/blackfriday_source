import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': { // Proxies calls to /api to the backend
                target: 'http://localhost:5000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // Removes /api prefix when sending to backend if backend doesn't expect it
                // Wait, my backend routes are /auth, /courses, /subscribe.
                // If I call /api/auth, it should rewrite to /auth.
                // Yes, this is correct.
            }
        }
    }
})
