import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Life-Architecture-Despina/',
  plugins: [
    react(),
                            VitePWA({
                              registerType: 'autoUpdate',
                              manifest: {
                                name: "Despina's Health System",
                                short_name: 'Despina SHS',
                                description: 'Sovereign Health System for Despina',
                                theme_color: '#13100d',
                                background_color: '#13100d',
                                display: 'standalone',
                                orientation: 'portrait',
                                icons: [
                                  { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
                                  { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
                                ]
                              }
                            })
  ],
})
