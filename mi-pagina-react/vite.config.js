import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ya NO usamos '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()],
})
