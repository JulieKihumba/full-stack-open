import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  //add allowed host - http://julie.donwritersllsc.com/
  plugins: [react()],
  server: {
    allowedHosts: ['julie.donwritersllsc.com']
  }
})
