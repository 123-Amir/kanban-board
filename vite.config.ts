import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // For root domain deployment
  // base: '/subdirectory/', // If deploying to subdirectory
})


