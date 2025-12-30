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
      
      // Performance: Preload critical CSS to reduce render-blocking
      // Convert render-blocking CSS to async loading for main CSS only
      const mainCssRegex = /<link\s+rel="stylesheet"[^>]+href="([^"]*index[^"]*\.css)"[^>]*>/g
      modifiedHtml = modifiedHtml.replace(mainCssRegex, (match, href) => {
        // Extract crossorigin if present
        const crossorigin = match.includes('crossorigin') ? ' crossorigin' : ''
        // Convert to preload with async loading (removes render-blocking)
        return `    <link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${href}"${crossorigin}></noscript>`
      })
      
      return modifiedHtml
    }
  }
}

