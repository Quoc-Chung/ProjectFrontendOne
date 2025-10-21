// Global chunk loading error handler script
// This script should be loaded early in the page to catch chunk loading errors

(function() {
  'use strict';
  
  // Store original webpack chunk loading function
  const originalWebpackChunkLoading = window.__webpack_require__;
  
  // Enhanced chunk loading with retry mechanism
  function enhancedChunkLoading(chunkId) {
    const maxRetries = 3;
    let retryCount = 0;
    
    function loadChunkWithRetry() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `/_next/static/chunks/${chunkId}.js`;
        script.async = true;
        
        script.onload = () => {
          resolve();
        };
        
        script.onerror = () => {
          if (retryCount < maxRetries) {
            retryCount++;
            const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
            
            console.warn(`Chunk ${chunkId} loading failed (attempt ${retryCount}/${maxRetries}), retrying in ${delay}ms...`);
            
            setTimeout(() => {
              loadChunkWithRetry().then(resolve).catch(reject);
            }, delay);
          } else {
            reject(new Error(`Failed to load chunk ${chunkId} after ${maxRetries} attempts`));
          }
        };
        
        document.head.appendChild(script);
      });
    }
    
    return loadChunkWithRetry();
  }
  
  // Override webpack chunk loading if available
  if (window.__webpack_require__) {
    const originalChunkLoading = window.__webpack_require__.e;
    if (originalChunkLoading) {
      window.__webpack_require__.e = function(chunkId) {
        return originalChunkLoading.call(this, chunkId).catch(error => {
          if (error.message && error.message.includes('Loading chunk')) {
            console.warn('Chunk loading error detected, attempting retry...', error);
            return enhancedChunkLoading(chunkId);
          }
          throw error;
        });
      };
    }
  }
  
  // Global error handler for chunk loading errors
  window.addEventListener('error', function(event) {
    if (event.error && 
        (event.error.message.includes('Loading chunk') || 
         event.error.message.includes('ChunkLoadError') ||
         event.error.name === 'ChunkLoadError')) {
      
      console.error('Global chunk loading error detected:', event.error);
      
      // Show user notification
      showChunkErrorNotification();
      
      // Prevent default error handling
      event.preventDefault();
    }
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && 
        (event.reason.message.includes('Loading chunk') || 
         event.reason.message.includes('ChunkLoadError') ||
         event.reason.name === 'ChunkLoadError')) {
      
      console.error('Global chunk loading promise rejection:', event.reason);
      
      // Show user notification
      showChunkErrorNotification();
      
      // Prevent default error handling
      event.preventDefault();
    }
  });
  
  // Show user-friendly error notification
  function showChunkErrorNotification() {
    // Remove existing notification if any
    const existingNotification = document.getElementById('chunk-error-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'chunk-error-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #f56565;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Lỗi tải trang. Đang thử lại...</span>
      </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
  
  // Retry mechanism for failed chunks
  function retryFailedChunks() {
    const failedChunks = window.__webpack_require__?.cache || {};
    const chunkIds = Object.keys(failedChunks).filter(id => 
      failedChunks[id] && failedChunks[id].error
    );
    
    if (chunkIds.length > 0) {
      console.log('Retrying failed chunks:', chunkIds);
      chunkIds.forEach(chunkId => {
        delete failedChunks[chunkId];
        if (window.__webpack_require__?.e) {
          window.__webpack_require__.e(chunkId).catch(console.error);
        }
      });
    }
  }
  
  window.retryFailedChunks = retryFailedChunks;
})();
