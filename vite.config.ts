import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {readFileSync} from 'node:fs';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const appVersion = (JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string }).version;

export default defineConfig(() => {
  const base = process.env.VITE_BASE_PATH || '/';
  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: false,
        scope: base,
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
          navigateFallback: 'index.html',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    optimizeDeps: {
      // Editor chunks are lazy-loaded; pre-bundling avoids mid-session
      // re-optimization that can fail E2E on cold CI runners.
      include: [
        '@tiptap/react',
        '@tiptap/starter-kit',
        '@tiptap/extension-table',
        '@tiptap/extension-table-row',
        '@tiptap/extension-table-cell',
        '@tiptap/extension-table-header',
        'codemirror',
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/commands',
        '@codemirror/lang-html',
        '@codemirror/lang-css',
        '@codemirror/lang-javascript',
        '@codemirror/theme-one-dark',
        'sql.js',
      ],
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react-vendor',
                test: /node_modules[\\/](react|react-dom|scheduler|use-sync-external-store)[\\/]/,
                priority: 30,
              },
              {
                name: 'icons',
                test: /node_modules[\\/]lucide-react[\\/]/,
                priority: 20,
              },
              {
                name: 'codemirror-langs',
                test: /node_modules[\\/](@codemirror[\\/]lang-[^\\/]+|@lezer[\\/](javascript|css|html))[\\/]/,
                priority: 27,
                includeDependenciesRecursively: false,
              },
              {
                name: 'codemirror-core',
                test: /node_modules[\\/](@codemirror|@lezer|codemirror|style-mod|w3c-keyname|@marijn)[\\/]/,
                priority: 25,
                includeDependenciesRecursively: false,
              },
              {
                name: 'content-lessons',
                test: /src[\\/]content[\\/]lessons[\\/]/,
                priority: 15,
              },
              {
                name: 'content-levels',
                test: /src[\\/]content[\\/]levels/,
                priority: 14,
              },
              {
                name: 'content-cases',
                test: /src[\\/]content[\\/]caseFiles/,
                priority: 13,
              },
            ],
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
