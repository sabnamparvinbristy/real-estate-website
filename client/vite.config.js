import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/real-estate-website/",
  plugins: [react()],
})
