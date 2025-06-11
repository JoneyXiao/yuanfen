'use client';

import { useEffect, useState } from 'react';

export default function BrowserCheck() {
  const [isOldBrowser, setIsOldBrowser] = useState(false);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);
  const [isVeryOldBrowser, setIsVeryOldBrowser] = useState(false);

  useEffect(() => {
    // Detect older browsers that need fallback CSS
    const userAgent = navigator.userAgent;
    
    // More aggressive browser detection
    const isOldSafari = /Safari/.test(userAgent) && /Version\/([0-9]+)/.test(userAgent) && 
                       parseInt(userAgent.match(/Version\/([0-9]+)/)?.[1] || '0') < 15;
    const isOldChrome = /Chrome/.test(userAgent) && /Chrome\/([0-9]+)/.test(userAgent) && 
                       parseInt(userAgent.match(/Chrome\/([0-9]+)/)?.[1] || '0') < 88;
    const isOldFirefox = /Firefox/.test(userAgent) && /Firefox\/([0-9]+)/.test(userAgent) && 
                         parseInt(userAgent.match(/Firefox\/([0-9]+)/)?.[1] || '0') < 85;
    
    // Check for very old browsers (your specific targets)
    const isVeryOldSafari = /Safari/.test(userAgent) && /Version\/([0-9]+)/.test(userAgent) && 
                           parseInt(userAgent.match(/Version\/([0-9]+)/)?.[1] || '0') <= 14;
    const isVeryOldChrome = /Chrome/.test(userAgent) && /Chrome\/([0-9]+)/.test(userAgent) && 
                           parseInt(userAgent.match(/Chrome\/([0-9]+)/)?.[1] || '0') <= 92;

    // Check for CSS support
    const supportsCSSVars = window.CSS && CSS.supports && CSS.supports('color', 'var(--test)');
    const supportsOklch = window.CSS && CSS.supports && CSS.supports('color', 'oklch(0.5 0.1 180)');
    const supportsGridGap = window.CSS && CSS.supports && CSS.supports('gap', '1rem');
    
    if (isVeryOldSafari || isVeryOldChrome) {
      setIsVeryOldBrowser(true);
      loadVeryOldBrowserFallback();
    } else if (isOldSafari || isOldChrome || isOldFirefox || !supportsCSSVars || !supportsOklch || !supportsGridGap) {
      setIsOldBrowser(true);
      loadFallbackCSS();
    }
  }, []);

  const loadVeryOldBrowserFallback = () => {
    // For very old browsers, override everything with inline styles
    const ultraFallbackStyles = document.createElement('style');
    ultraFallbackStyles.innerHTML = `
      /* Ultra-aggressive fallback for very old browsers */
      * {
        box-sizing: border-box !important;
        -webkit-box-sizing: border-box !important;
      }
      
      body {
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
        line-height: 1.6 !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: #ffffff !important;
        color: #333333 !important;
      }
      
      .text-wedding-primary, [class*="text-wedding-primary"] {
        color: #e83e8c !important;
      }
      
      .bg-wedding-primary, [class*="bg-wedding-primary"] {
        background-color: #e83e8c !important;
      }
      
      .text-wedding-secondary, [class*="text-wedding-secondary"] {
        color: #FFD700 !important;
      }
      
      .bg-wedding-secondary, [class*="bg-wedding-secondary"] {
        background-color: #FFD700 !important;
      }
      
      .text-wedding-dark, [class*="text-wedding-dark"] {
        color: #4a235a !important;
      }
      
      .bg-wedding-light, [class*="bg-wedding-light"] {
        background-color: #fff9fb !important;
      }
      
      /* Simple grid fallback using floats for very old browsers */
      .grid {
        display: block !important;
        overflow: hidden !important;
      }
      
      .grid > * {
        float: left !important;
        width: 100% !important;
        padding: 10px !important;
      }
      
      @media (min-width: 768px) {
        .md\\\\:grid-cols-2 > * {
          width: 50% !important;
        }
        .lg\\\\:grid-cols-4 > * {
          width: 25% !important;
        }
      }
      
      .max-w-7xl {
        max-width: 1280px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      
      .px-4 {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }
      
      .py-16 {
        padding-top: 4rem !important;
        padding-bottom: 4rem !important;
      }
      
      .text-center {
        text-align: center !important;
      }
      
      .mb-16 {
        margin-bottom: 4rem !important;
      }
      
      .mb-6 {
        margin-bottom: 1.5rem !important;
      }
      
      .text-3xl {
        font-size: 1.875rem !important;
        line-height: 2.25rem !important;
      }
      
      .font-bold {
        font-weight: bold !important;
      }
      
      .text-lg {
        font-size: 1.125rem !important;
      }
      
      .text-gray-600 {
        color: #6b7280 !important;
      }
      
      /* Simple button styles */
      button, .btn, [role="button"] {
        background: #e83e8c !important;
        color: white !important;
        border: none !important;
        padding: 12px 24px !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        text-decoration: none !important;
        display: inline-block !important;
      }
      
      button:hover, .btn:hover, [role="button"]:hover {
        background: #c7336c !important;
      }
      
      /* Hide problematic animations and transforms */
      * {
        animation: none !important;
        transform: none !important;
        transition: none !important;
      }
    `;
    document.head.appendChild(ultraFallbackStyles);
    setFallbackLoaded(true);
  };

  const loadFallbackCSS = () => {
    // Load fallback CSS for older browsers
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'stylesheet';
    fallbackLink.href = '/globals-fallback.css';
    fallbackLink.onload = () => setFallbackLoaded(true);
    fallbackLink.onerror = () => {
      console.warn('Failed to load fallback CSS');
      setFallbackLoaded(true);
    };
    
    // Insert before existing CSS to allow override
    const existingLinks = document.head.querySelectorAll('link[rel="stylesheet"]');
    if (existingLinks.length > 0) {
      document.head.insertBefore(fallbackLink, existingLinks[0]);
    } else {
      document.head.appendChild(fallbackLink);
    }

    // Also add some critical inline styles immediately
    const inlineStyles = document.createElement('style');
    inlineStyles.innerHTML = `
      /* Critical styles for immediate compatibility */
      .text-wedding-primary { color: #e83e8c !important; }
      .bg-wedding-primary { background-color: #e83e8c !important; }
      .text-wedding-secondary { color: #FFD700 !important; }
      .bg-wedding-secondary { background-color: #FFD700 !important; }
      .text-wedding-dark { color: #4a235a !important; }
      .bg-wedding-light { background-color: #fff9fb !important; }
      body { 
        font-family: 'Inter', 'HarmonyOS Sans SC', sans-serif !important; 
        color: #4a235a !important;
        background-color: #ffffff !important;
      }
      .font-header { font-family: 'Noto Serif SC', serif !important; }
    `;
    document.head.appendChild(inlineStyles);
  };

  // Show loading message only briefly for old browsers
  if ((isOldBrowser || isVeryOldBrowser) && !fallbackLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(232, 62, 140, 0.95)',
        color: 'white',
        padding: '20px 40px',
        borderRadius: '12px',
        zIndex: 10000,
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <div style={{ 
          width: '24px', 
          height: '24px', 
          border: '3px solid rgba(255,255,255,0.3)',
          borderTop: '3px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 10px'
        }}></div>
        <p style={{ margin: 0, fontSize: '14px' }}>
          {isVeryOldBrowser ? 
            '正在为您的浏览器优化... | Optimizing for your browser...' :
            '优化浏览器兼容性中... | Loading compatibility mode...'
          }
        </p>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  return null;
} 