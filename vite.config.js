import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Update 'base' to match your GitHub repo name before deploying
export default defineConfig({
  plugins: [react()],
  base: '/birth-reflection/',
})
