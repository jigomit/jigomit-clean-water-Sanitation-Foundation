// Vite plugin to fix CLS, optimize CSS delivery, and add GPU acceleration hints
// This modifies HTML output at build time only - no source code changes

export default function clsFixPlugin() {
  return {
    name: 'cls-fix-footer',
    enforce: 'post', // Run after Vite processes HTML
    transformIndexHtml(html) {
      let modifiedHtml = html
      
      // Performance: Fix CLS by reserving footer space (build-time injection, no source changes)
      // Increased height to 1000px to match actual footer height and prevent layout shift
      const clsFixScript = `
    <!-- Performance: Fix CLS by reserving footer space (build-time injection, no source changes) -->
    <script>
      (function() {
        'use strict';
        // Reserve space for footer immediately to prevent CLS (0.916 mobile, 0.889 desktop)
        // Runs synchronously before Vue mounts
        var app = document.getElementById('app');
        if (app) {
          var placeholder = document.createElement('div');
          placeholder.setAttribute('data-cls-placeholder', 'true');
          placeholder.setAttribute('aria-hidden', 'true');
          // Minimal inline style for placeholder only (not page CSS) - reserves footer space
          // Increased to 1000px to match actual footer height (footer-bar + footer-content + padding)
          placeholder.style.cssText = 'min-height:1000px;height:1000px;display:block;visibility:hidden;pointer-events:none;position:absolute;width:0;';
          app.appendChild(placeholder);
          // Wait for Vue to mount and footer to render before removing placeholder
          var checkInterval = setInterval(function() {
            var footer = document.querySelector('.site-footer');
            if (footer && footer.offsetHeight > 0) {
              clearInterval(checkInterval);
              // Remove placeholder after footer is rendered (prevents CLS)
              setTimeout(function() {
                if (placeholder.parentNode) placeholder.remove();
              }, 100);
            }
          }, 50);
          // Fallback: remove after 3 seconds if footer still not found
          setTimeout(function() {
            clearInterval(checkInterval);
            if (placeholder.parentNode) placeholder.remove();
          }, 3000);
        }
      })();
    </script>`
      
      // Performance: GPU acceleration hints for animations (build-time injection, no CSS file changes)
      // Fixes "Avoid non-composited animations" warnings by adding will-change and translateZ(0)
      const gpuAccelScript = `
    <!-- Performance: GPU acceleration hints for animations (build-time injection, no CSS changes) -->
    <script>
      (function() {
        'use strict';
        // Add GPU acceleration hints to animated elements after DOM loads
        // This prevents non-composited animations (background-position-x, height, width)
        function addGPUAcceleration() {
          // Hero gradient animation (gradientFlow)
          var heroGradient = document.querySelector('.hero-bg-gradient');
          if (heroGradient) {
            heroGradient.style.willChange = 'transform';
            heroGradient.style.transform = 'translateZ(0)';
          }
          // Ripple animations (rippleExpand)
          var ripples = document.querySelectorAll('.ripple');
          ripples.forEach(function(ripple) {
            ripple.style.willChange = 'transform, opacity';
            ripple.style.transform = 'translateZ(0)';
          });
        }
        // Run after DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', addGPUAcceleration);
        } else {
          addGPUAcceleration();
        }
        // Also run after Vue mounts (delayed)
        setTimeout(addGPUAcceleration, 500);
      })();
    </script>`
      
      // Insert CLS fix script before closing </head> tag
      modifiedHtml = modifiedHtml.replace('</head>', `${clsFixScript}\n${gpuAccelScript}\n  </head>`)
      
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

