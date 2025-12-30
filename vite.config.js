import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: [],
  },
  server: {
    // Disable caching in development
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    hmr: {
      overlay: true,
    },
    // Force full page reload on certain changes
    watch: {
      usePolling: false,
    },
  },
  // Optimize build output for production
  build: {
    // Enable minification (esbuild is faster than terser)
    minify: 'esbuild',
    // Remove console and debugger in production
    esbuild: {
      drop: ['console', 'debugger'],
      legalComments: 'none',
    },
    // Enable compression
    reportCompressedSize: true,
    // Reduce chunk size for better caching
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Optimize chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor'
            }
            if (id.includes('vue-router')) {
              return 'router-vendor'
            }
            return 'vendor'
          }
          // Split large view components for better code splitting
          if (id.includes('/views/')) {
            const viewName = id.split('/views/')[1].split('.')[0]
            if (viewName && viewName !== 'HomeView') {
              return `view-${viewName.toLowerCase()}`
            }
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Target modern browsers for smaller bundles
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    // Improve tree shaking
    treeshake: {
      moduleSideEffects: false,
    },
  },
  // Image optimization
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp'],
  // Clear cache on build
  clearScreen: false,
})
