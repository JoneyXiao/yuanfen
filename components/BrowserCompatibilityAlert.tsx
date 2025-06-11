'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface BrowserInfo {
  name: string;
  version: number;
  isSupported: boolean;
}

const SUPPORTED_BROWSERS = {
  chrome: 95, // Increased for better React 19 compatibility
  firefox: 67,
  safari: 15, // Increased for better React 19 and modern features compatibility 
  edge: 95,
  opera: 81,
} as const;

export default function BrowserCompatibilityAlert() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the warning
    const warningDismissed = localStorage.getItem('browserWarningDismissed');
    if (warningDismissed === 'true') {
      return;
    }

    const detectBrowser = (): BrowserInfo => {
      const userAgent = navigator.userAgent;
      let name = 'unknown';
      let version = 0;

      // Chrome detection (must be before Safari since Chrome includes Safari in UA)
      if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) {
        name = 'chrome';
        const match = userAgent.match(/Chrome\/(\d+)/);
        version = match ? parseInt(match[1]) : 0;
      }
      // Edge detection (must be before Safari)
      else if (userAgent.indexOf('Edg') !== -1) {
        name = 'edge';
        const match = userAgent.match(/Edg\/(\d+)/);
        version = match ? parseInt(match[1]) : 0;
      }
      // Firefox detection
      else if (userAgent.indexOf('Firefox') !== -1) {
        name = 'firefox';
        const match = userAgent.match(/Firefox\/(\d+)/);
        version = match ? parseInt(match[1]) : 0;
      }
      // Safari detection
      else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
        name = 'safari';
        const match = userAgent.match(/Version\/(\d+)/);
        version = match ? parseInt(match[1]) : 0;
      }
      // Opera detection
      else if (userAgent.indexOf('OPR') !== -1 || userAgent.indexOf('Opera') !== -1) {
        name = 'opera';
        const match = userAgent.match(/(?:OPR|Opera)\/(\d+)/) || userAgent.match(/Opera\/(\d+)/);
        version = match ? parseInt(match[1]) : 0;
      }

      const minVersion = SUPPORTED_BROWSERS[name as keyof typeof SUPPORTED_BROWSERS];
      const isSupported = minVersion ? version >= minVersion : false;

      return { name, version, isSupported };
    };

    const browser = detectBrowser();
    setBrowserInfo(browser);
    
    // Additional feature detection for React 19 compatibility
    const hasRequiredFeatures = () => {
      try {
        // Check for essential ES2020+ features used by React 19
        return (
          typeof globalThis !== 'undefined' &&
          typeof Promise.allSettled === 'function' &&
          typeof String.prototype.matchAll === 'function' &&
          typeof BigInt !== 'undefined' &&
          typeof queueMicrotask === 'function'
        );
      } catch {
        return false;
      }
    };
    
    // Show alert if browser is not supported, unknown, or lacks required features
    if (!browser.isSupported || browser.name === 'unknown' || !hasRequiredFeatures()) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible || !browserInfo || browserInfo.isSupported) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    // Store in localStorage to remember user's choice
    localStorage.setItem('browserWarningDismissed', 'true');
  };

  const getBrowserDisplayName = (name: string) => {
    switch (name) {
      case 'chrome': return 'Chrome';
      case 'firefox': return 'Firefox';
      case 'safari': return 'Safari';
      case 'edge': return 'Edge';
      case 'opera': return 'Opera';
      default: return 'Unknown Browser';
    }
  };



  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-50 border-b border-yellow-200 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-yellow-800 mb-1">
            Browser Compatibility Warning
          </h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>
              You are using {getBrowserDisplayName(browserInfo.name)} {browserInfo.version}, 
              which may not fully support all features of this website.
            </p>
            <p>
              For the best experience, please update to a newer version or use one of these supported browsers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li>Chrome {SUPPORTED_BROWSERS.chrome}+ or newer</li>
              <li>Firefox {SUPPORTED_BROWSERS.firefox}+ or newer</li>
              <li>Safari {SUPPORTED_BROWSERS.safari}+ or newer</li>
              <li>Edge {SUPPORTED_BROWSERS.edge}+ or newer</li>
            </ul>
            <p className="text-xs mt-2">
              Some features may not work correctly or display properly in your current browser.
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 text-yellow-600 hover:text-yellow-800 transition-colors"
          aria-label="Dismiss browser warning"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 