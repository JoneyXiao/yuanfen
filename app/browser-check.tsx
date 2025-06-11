'use client';

import { useEffect, useState } from 'react';

export default function BrowserCheck() {
  const [isUnsupported, setIsUnsupported] = useState(false);

  useEffect(() => {
    try {
      // Simple browser detection for very old browsers
      const userAgent = window.navigator.userAgent;
      
      // Check for very old browsers first
      const isIE = /MSIE|Trident/.test(userAgent);
      if (isIE) {
        setIsUnsupported(true);
        return;
      }

      // Extract version numbers more safely
      let isOldBrowser = false;
      
      if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        const safariMatch = userAgent.match(/Version\/(\d+)/);
        if (safariMatch && parseInt(safariMatch[1]) < 12) {
          isOldBrowser = true;
        }
      }
      
      if (userAgent.includes('Chrome')) {
        const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
        if (chromeMatch && parseInt(chromeMatch[1]) < 64) {
          isOldBrowser = true;
        }
      }
      
      if (userAgent.includes('Firefox')) {
        const firefoxMatch = userAgent.match(/Firefox\/(\d+)/);
        if (firefoxMatch && parseInt(firefoxMatch[1]) < 67) {
          isOldBrowser = true;
        }
      }

      // Check for basic JavaScript features
      const hasPromise = typeof Promise !== 'undefined';
      const hasFetch = typeof fetch !== 'undefined';
      const hasArrowFunctions = (() => {
        try {
          eval('(() => {})');
          return true;
        } catch {
          return false;
        }
      })();
      
      if (isOldBrowser || !hasPromise || !hasFetch || !hasArrowFunctions) {
        setIsUnsupported(true);
      }
    } catch {
      // If any error occurs in detection, assume unsupported
      setIsUnsupported(true);
    }
  }, []);

  if (!isUnsupported) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '500px' }}>
        <h2 style={{ marginBottom: '20px', color: '#e83e8c' }}>
          Browser Not Supported | 浏览器不支持
        </h2>
        <p style={{ marginBottom: '15px', lineHeight: '1.5' }}>
          Your browser version is too old to display this website properly.
        </p>
        <p style={{ marginBottom: '15px', lineHeight: '1.5' }}>
          您的浏览器版本过旧，无法正常显示此网站。
        </p>
        <p style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.8 }}>
          Please update to:<br/>
          Chrome 64+, Safari 12+, Firefox 67+, or Edge 79+
        </p>
        <button 
          onClick={() => setIsUnsupported(false)}
          style={{
            backgroundColor: '#e83e8c',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Continue Anyway | 仍要继续
        </button>
      </div>
    </div>
  );
} 