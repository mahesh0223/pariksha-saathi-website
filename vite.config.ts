import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Hashed JS/CSS bundles go under /static/ instead of Vite's default /assets/, which the
    // un-hashed public images (public/assets/*) already live under - public/_headers can then
    // give the hashed files a one-year immutable cache without also freezing the images.
    assetsDir: 'static',
  },
})
