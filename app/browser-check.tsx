'use client';

import { useEffect, useState } from 'react';

export default function BrowserCheck() {
  const [isUnsupported, setIsUnsupported] = useState(false);

  useEffect(() => {
    // Simple browser detection for very old browsers
    const userAgent = window.navigator.userAgent;
    const isOldSafari = /Safari/.test(userAgent) && /Version\/([0-9]+)/.test(userAgent) && 
                       parseInt(userAgent.match(/Version\/([0-9]+)/)?.[1] || '0') < 12;
    const isOldChrome = /Chrome/.test(userAgent) && /Chrome\/([0-9]+)/.test(userAgent) && 
                       parseInt(userAgent.match(/Chrome\/([0-9]+)/)?.[1] || '0') < 64;
    const isOldFirefox = /Firefox/.test(userAgent) && /Firefox\/([0-9]+)/.test(userAgent) && 
                        parseInt(userAgent.match(/Firefox\/([0-9]+)/)?.[1] || '0') < 67;

    if (isOldSafari || isOldChrome || isOldFirefox) {
      setIsUnsupported(true);
    }

    // Check for basic JavaScript features
    try {
      // Test for ES6 features
      const arrow = () => true;
      const hasPromise = typeof Promise !== 'undefined';
      const hasFetch = typeof fetch !== 'undefined';
      
      if (!arrow() || !hasPromise || !hasFetch) {
        setIsUnsupported(true);
      }
    } catch {
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