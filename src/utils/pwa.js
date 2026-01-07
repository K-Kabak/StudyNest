/**
 * Register Service Worker for PWA support
 */
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    });
  }
};

/**
 * Check if app is installable
 */
export const canInstallPWA = () => {
  return 'BeforeInstallPromptEvent' in window;
};
