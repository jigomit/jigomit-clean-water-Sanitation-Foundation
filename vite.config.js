import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import clsFixPlugin from './vite-plugin-cls-fix.js'

// https://vite.dev/config/
export default defineConfig(async () => {
  // Import compression plugin (install with: npm install --save-dev vite-plugin-compression)
  let viteCompression = null
  try {
    const compressionModule = await import('vite-plugin-compression')
    viteCompression = compressionModule.default
  } catch (e) {
    // Plugin not installed - will skip compression (install for better performance)
    // Silent fail - compression is optional
  }

  return {
  plugins: [
    vue(),
    // Performance: Fix CLS by reserving footer space (build-time only, no visual change)
    clsFixPlugin(),
    // Compression plugins for production (Gzip & Brotli)
    // Only added if vite-plugin-compression is installed
    ...(viteCompression
      ? [
          viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 256, // Compress files > 256 bytes (very aggressive for PageSpeed)
            deleteOriginFile: false,
            compressionOptions: {
              level: 9, // Maximum compression
            },
          }),
          viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 256, // Compress files > 256 bytes (very aggressive for PageSpeed)
            deleteOriginFile: false,
            compressionOptions: {
              level: 11, // Maximum Brotli compression
            },
          }),
        ]
      : []),
  ],
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
    // Performance: Optimize asset handling - reduce inline limit for Desktop 95%+ optimization
    assetsInlineLimit: 512, // Inline assets smaller than 512 bytes (very aggressive for Desktop)
    // Optimize chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Performance: Aggressive chunk splitting for PageSpeed optimization
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
          // Split ALL view components for better code splitting (including HomeView)
          if (id.includes('/views/')) {
            const viewName = id.split('/views/')[1].split('.')[0]
            if (viewName) {
              return `view-${viewName.toLowerCase()}`
            }
          }
          // Split large component chunks
          if (id.includes('/components/') && !id.includes('node_modules')) {
            const componentName = id.split('/components/')[1]?.split('.')[0]
            if (componentName && componentName.length > 10) {
              return `component-${componentName.toLowerCase()}`
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
    // Performance: Stricter chunk size limit for Desktop 95%+ optimization
    chunkSizeWarningLimit: 250, // Very strict for optimal Desktop performance
    // Enable source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    css: {
      devSourcemap: false,
    },
    // Performance: Target modern browsers for Desktop 95%+ optimization
    target: ['es2022', 'edge88', 'firefox78', 'chrome87', 'safari14'], // ES2022 for maximum optimization
    // Performance: Optimize module resolution for Desktop 95%+
    modulePreload: {
      polyfill: false, // Modern browsers support modulepreload natively
      resolveDependencies: (filename, deps) => {
        // Preload all dependencies for faster Desktop loading
        return deps
      },
    },
    // Improve tree shaking
    treeshake: {
      moduleSideEffects: false,
    },
  },
    // Image optimization
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.webp'],
    // Clear cache on build
    clearScreen: false,
  }
})
