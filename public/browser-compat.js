// Browser compatibility script for older browsers
(function() {
  'use strict';
  
  // Simple browser detection that works on very old browsers
  var ua = navigator.userAgent;
  var isOldBrowser = false;
  
  // Check for Internet Explorer
  if (ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1) {
    isOldBrowser = true;
  }
  
  // Check for very old Safari (before version 12)
  if (ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') === -1) {
    var safariVersion = ua.match(/Version\/(\d+)/);
    if (safariVersion && parseInt(safariVersion[1]) < 12) {
      isOldBrowser = true;
    }
  }
  
  // Check for very old Chrome (before version 64)
  if (ua.indexOf('Chrome') !== -1) {
    var chromeVersion = ua.match(/Chrome\/(\d+)/);
    if (chromeVersion && parseInt(chromeVersion[1]) < 64) {
      isOldBrowser = true;
    }
  }
  
  // Check for very old Firefox (before version 67)
  if (ua.indexOf('Firefox') !== -1) {
    var firefoxVersion = ua.match(/Firefox\/(\d+)/);
    if (firefoxVersion && parseInt(firefoxVersion[1]) < 67) {
      isOldBrowser = true;
    }
  }
  
  // Check for basic JavaScript features
  var hasPromise = typeof Promise !== 'undefined';
  var hasFetch = typeof fetch !== 'undefined';
  
  // If browser is too old, show fallback
  if (isOldBrowser || !hasPromise || !hasFetch) {
    // Wait for DOM to be ready
    function showFallback() {
      var body = document.body;
      if (!body) {
        setTimeout(showFallback, 100);
        return;
      }
      
      // Hide the React app
      var reactRoot = document.getElementById('__next');
      if (reactRoot) {
        reactRoot.style.display = 'none';
      }
      
      // Create and show fallback content
      var fallback = document.createElement('div');
      fallback.innerHTML = [
        '<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, #e83e8c, #ff6b9d); color: white; display: flex; align-items: center; justify-content: center; z-index: 10000; font-family: Arial, sans-serif; padding: 20px; text-align: center;">',
        '<div style="max-width: 600px; background: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 10px;">',
        '<h1 style="color: #fff; margin-bottom: 20px; font-size: 2.5em;">缘份婚庆</h1>',
        '<h2 style="color: #ffebf0; margin-bottom: 30px;">Yuanfen Wedding Planning</h2>',
        '<p style="margin-bottom: 20px; font-size: 1.1em;">We create unforgettable lifetime moments with our premium wedding planning services since 2012.</p>',
        '<p style="margin-bottom: 20px; font-size: 1.1em;">我们专业提供婚礼策划服务，为您打造难忘的美好时光。</p>',
        '<div style="background: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 5px; margin: 20px 0;">',
        '<h3>Contact Us | 联系我们</h3>',
        '<p>📞 咨询热线: <strong>138-8888-8888</strong></p>',
        '<p>📧 Email: <strong>contact@yuanfen-wedding.com</strong></p>',
        '<p>📍 地址: 北京市朝阳区婚庆大厦8楼</p>',
        '</div>',
        '<div style="background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 5px; margin-top: 30px; font-size: 0.9em;">',
        '<strong>Browser Update Required | 需要更新浏览器</strong><br>',
        'For the best experience, please update your browser to:<br>',
        'Chrome 64+, Safari 12+, Firefox 67+, or Edge 79+<br><br>',
        '为了更好的体验，请将浏览器更新至：<br>',
        'Chrome 64+, Safari 12+, Firefox 67+, 或 Edge 79+',
        '</div>',
        '</div>',
        '</div>'
      ].join('');
      
      body.appendChild(fallback);
    }
    
    // Show fallback when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showFallback);
    } else {
      showFallback();
    }
  }
})(); 