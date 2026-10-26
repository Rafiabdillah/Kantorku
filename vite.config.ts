import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-webmanifest',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const urlPath = req.url?.split('?')[0];
            if (urlPath === '/manifest.webmanifest' || urlPath === '/manifest.json') {
              const filePath = path.resolve(import.meta.dirname, 'public/manifest.webmanifest');
              if (fs.existsSync(filePath)) {
                res.setHeader('Content-Type', 'application/manifest+json');
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
            next();
          });
        },
        closeBundle() {
          // Remove only large archive zip from dist to keep dist bundle light, keep SVG logos
          const distZip = path.resolve(import.meta.dirname, 'dist/assets/aistudio/kantorku---game-simulasi-karier-kantor__1__2465f0dc.zip');
          if (fs.existsSync(distZip)) {
            fs.rmSync(distZip, { force: true });
          }
        },
      },
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'KantorKu - Game Simulasi Karier Kantor',
          short_name: 'KantorKu',
          description: 'Simulasi karier kantor interaktif dari Magang hingga Direktur di PT Maju Sejahtera dengan tantangan nyata Excel, Word, dan Coding.',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
      dedupe: ['react', 'react-dom', 'zustand'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'zustand'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('zustand')) {
                return 'vendor-react';
              }
              if (id.includes('@tiptap') || id.includes('prosemirror')) {
                return 'vendor-tiptap';
              }
              if (id.includes('@codemirror') || id.includes('codemirror')) {
                return 'vendor-codemirror';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('canvas-confetti') || id.includes('motion')) {
                return 'vendor-anim';
              }
              return 'vendor';
            }
            if (id.includes('/content/lessons')) {
              return 'content-lessons';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
