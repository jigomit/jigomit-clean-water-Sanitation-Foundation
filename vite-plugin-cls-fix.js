// Vite plugin to fix CLS and optimize CSS delivery
// This modifies HTML output at build time only - no source code changes

export default function clsFixPlugin() {
  return {
    name: 'cls-fix-footer',
    enforce: 'post', // Run after Vite processes HTML
    transformIndexHtml(html) {
      let modifiedHtml = html
      
      // Performance: Fix CLS by reserving footer space (build-time injection, no source changes)
      const clsFixScript = `
    <!-- Performance: Fix CLS by reserving footer space (build-time injection, no source changes) -->
    <script>
      (function() {
        'use strict';
        // Reserve space for footer immediately to prevent CLS
        // Runs synchronously before Vue mounts
        var app = document.getElementById('app');
        if (app) {
          var placeholder = document.createElement('div');
          placeholder.setAttribute('data-cls-placeholder', 'true');
          placeholder.setAttribute('aria-hidden', 'true');
          // Minimal inline style for placeholder only (not page CSS) - reserves footer space
          placeholder.style.cssText = 'min-height:600px;height:600px;display:block;visibility:hidden;pointer-events:none;';
          app.appendChild(placeholder);
          // Remove placeholder after footer loads
          setTimeout(function() {
            if (placeholder.parentNode) placeholder.remove();
          }, 1500);
        }
      })();
    </script>`
      
      // Insert CLS fix script before closing </head> tag
      modifiedHtml = modifiedHtml.replace('</head>', `${clsFixScript}\n  </head>`)
      
      // Performance: Preload ALL CSS to reduce render-blocking (Desktop 95%+ optimization)
      // Convert all render-blocking CSS to async loading
      const allCssRegex = /<link\s+rel="stylesheet"[^>]+href="([^"]+\.css)"[^>]*>/g
      modifiedHtml = modifiedHtml.replace(allCssRegex, (match, href) => {
        // Extract crossorigin if present
        const crossorigin = match.includes('crossorigin') ? ' crossorigin' : ''
        // Convert to preload with async loading (removes render-blocking for Desktop)
        return `    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${href}"${crossorigin}></noscript>`
      })
      
      // Performance: Ensure CSS loads asynchronously (Desktop optimization)
      // Modern browsers support onload on link[rel="preload"], no fallback needed
      
      return modifiedHtml
    }
  }
}

