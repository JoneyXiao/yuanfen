// Browser compatibility detection and handling

export interface BrowserInfo {
  name: string;
  version: number;
  isOld: boolean;
  needsPolyfills: boolean;
}

export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return { name: 'unknown', version: 0, isOld: false, needsPolyfills: false };
  }

  const userAgent = window.navigator.userAgent;
  let browserName = 'unknown';
  let browserVersion = 0;

  // Safari detection
  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    browserName = 'safari';
    const match = userAgent.match(/Version\/([\d.]+)/);
    if (match) {
      browserVersion = parseFloat(match[1]);
    }
  }
  // Chrome detection  
  else if (/Chrome/.test(userAgent)) {
    browserName = 'chrome';
    const match = userAgent.match(/Chrome\/([\d.]+)/);
    if (match) {
      browserVersion = parseFloat(match[1]);
    }
  }
  // Firefox detection
  else if (/Firefox/.test(userAgent)) {
    browserName = 'firefox';
    const match = userAgent.match(/Firefox\/([\d.]+)/);
    if (match) {
      browserVersion = parseFloat(match[1]);
    }
  }
  // Edge detection
  else if (/Edg/.test(userAgent)) {
    browserName = 'edge';
    const match = userAgent.match(/Edg\/([\d.]+)/);
    if (match) {
      browserVersion = parseFloat(match[1]);
    }
  }

  // Determine if browser is old and needs polyfills
  const isOld = (
    (browserName === 'safari' && browserVersion < 15) ||
    (browserName === 'chrome' && browserVersion < 100) ||
    (browserName === 'firefox' && browserVersion < 90) ||
    (browserName === 'edge' && browserVersion < 90)
  );

  const needsPolyfills = (
    (browserName === 'safari' && browserVersion < 14) ||
    (browserName === 'chrome' && browserVersion < 80) ||
    (browserName === 'firefox' && browserVersion < 70) ||
    (browserName === 'edge' && browserVersion < 80)
  );

  return {
    name: browserName,
    version: browserVersion,
    isOld,
    needsPolyfills
  };
}

export function applyCompatibilityFixes() {
  if (typeof window === 'undefined') return;

  const browser = detectBrowser();
  
  // Add browser-specific CSS classes
  document.documentElement.classList.add(`browser-${browser.name}`);
  if (browser.isOld) {
    document.documentElement.classList.add('browser-old');
  }
  if (browser.needsPolyfills) {
    document.documentElement.classList.add('browser-needs-polyfills');
  }

  // Safari-specific fixes
  if (browser.name === 'safari' && browser.version < 15) {
    // Fix for webkit transform issues
    const style = document.createElement('style');
    style.textContent = `
      .animate-petal-fall,
      .animate-sparkle {
        -webkit-animation-duration: inherit;
        -webkit-animation-timing-function: inherit;
        -webkit-animation-delay: inherit;
        -webkit-animation-iteration-count: inherit;
        -webkit-animation-direction: inherit;
      }
      
      /* Fix for backdrop-filter issues */
      .backdrop-blur-xl,
      .backdrop-blur-lg,
      .backdrop-blur-md {
        background: rgba(255, 255, 255, 0.95) !important;
      }
      
      /* Fix for CSS custom properties in older Safari */
      .browser-safari.browser-old {
        --wedding-primary: #e83e8c !important;
        --wedding-secondary: #FFD700 !important;
        --wedding-accent: #8e44ad !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Chrome 92 specific fixes
  if (browser.name === 'chrome' && browser.version < 100) {
    const style = document.createElement('style');
    style.textContent = `
      /* Fix for gap property in flexbox */
      .browser-chrome.browser-old .flex.gap-4 > * + * {
        margin-left: 1rem;
      }
      
      .browser-chrome.browser-old .flex.gap-6 > * + * {
        margin-left: 1.5rem;
      }
      
      /* Fix for aspect-ratio property */
      .browser-chrome.browser-old [style*="aspect-ratio"] {
        position: relative;
      }
      
      .browser-chrome.browser-old [style*="aspect-ratio"]::before {
        content: '';
        display: block;
        padding-top: 56.25%; /* 16:9 aspect ratio fallback */
      }
    `;
    document.head.appendChild(style);
  }

  // General old browser fixes
  if (browser.isOld) {
    // Disable complex animations for better performance
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || browser.needsPolyfills) {
      const style = document.createElement('style');
      style.textContent = `
        .browser-old * {
          animation-duration: 0.1s !important;
          transition-duration: 0.1s !important;
        }
        
        .animate-petal-fall,
        .animate-sparkle {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  console.log(`Browser detected: ${browser.name} ${browser.version} (old: ${browser.isOld}, needs polyfills: ${browser.needsPolyfills})`);
}

// Image format detection and fallback
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpg' {
  if (typeof window === 'undefined') return 'jpg';

  const browser = detectBrowser();
  
  // AVIF support check (very modern browsers)
  if (browser.name === 'chrome' && browser.version >= 85) return 'avif';
  if (browser.name === 'firefox' && browser.version >= 93) return 'avif';
  if (browser.name === 'safari' && browser.version >= 16) return 'avif';
  
  // WebP support check (moderately modern browsers)
  if (browser.name === 'chrome' && browser.version >= 23) return 'webp';
  if (browser.name === 'firefox' && browser.version >= 65) return 'webp';
  if (browser.name === 'safari' && browser.version >= 14) return 'webp';
  if (browser.name === 'edge' && browser.version >= 18) return 'webp';
  
  // Fallback to JPEG for older browsers
  return 'jpg';
}

// Feature detection utilities
export const featureSupport = {
  cssCustomProperties: typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('(--custom: property)'),
  backdropFilter: typeof window !== 'undefined' && CSS.supports && CSS.supports('backdrop-filter', 'blur(10px)'),
  cssGrid: typeof window !== 'undefined' && CSS.supports && CSS.supports('display', 'grid'),
  flexboxGap: typeof window !== 'undefined' && CSS.supports && CSS.supports('gap', '1rem'),
  intersectionObserver: typeof window !== 'undefined' && 'IntersectionObserver' in window,
  resizeObserver: typeof window !== 'undefined' && 'ResizeObserver' in window,
  scrollBehavior: typeof window !== 'undefined' && 'scrollBehavior' in document.documentElement.style,
};

// Initialize compatibility fixes when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCompatibilityFixes);
  } else {
    applyCompatibilityFixes();
  }
} 