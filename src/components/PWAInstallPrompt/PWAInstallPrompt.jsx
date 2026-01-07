import { useState, useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * PWA Install Prompt Component
 */
export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user previously dismissed
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 p-4 z-50"
      >
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <X size={18} className="text-neutral-600 dark:text-neutral-400" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
            <Download size={24} className="text-primary-600" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Install StudyNest
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Install our app for a better experience. Works offline!
            </p>

            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleInstall}
                className="flex-1"
              >
                Install
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
              >
                Not now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
