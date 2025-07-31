/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* Production FOUC prevention script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Prevent FOUC in production
                (function() {
                  function addCSSReadyClass() {
                    if (!document.body.classList.contains('css-ready')) {
                      document.body.classList.add('css-ready');
                    }
                  }
                  
                  // Add CSS ready class as soon as possible
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', function() {
                      setTimeout(addCSSReadyClass, 50);
                    });
                  } else {
                    setTimeout(addCSSReadyClass, 50);
                  }
                  
                  // Handle page transitions - only ensure CSS is ready
                  if (typeof window !== 'undefined') {
                    function setupRouterEvents() {
                      if (window.next && window.next.router) {
                        window.next.router.events.on('routeChangeComplete', function() {
                          // Ensure CSS is ready after route change
                          setTimeout(addCSSReadyClass, 50);
                        });
                      }
                    }
                    
                    // Setup router events
                    if (document.readyState === 'complete') {
                      setupRouterEvents();
                    } else {
                      window.addEventListener('load', setupRouterEvents);
                    }
                  }
                })();
              `,
            }}
          />
        )}
      </body>
    </Html>
  );
}
