/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { Button } from '../ui/Button';

/**
 * Timer Controls - buttons for play/pause, reset, skip
 */
export const TimerControls = ({
  isRunning = false,
  onToggle = () => {},
  onReset = () => {},
  onSkip = () => {},
  onFocusMode = () => {},
}) => {
  return (
    <div className="space-y-4" role="group" aria-label="Timer controls">
      <div className="flex gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={isRunning ? 'secondary' : 'primary'}
            size="lg"
            onClick={onToggle}
            className="px-8"
            aria-label={isRunning ? 'Pause timer (Space)' : 'Start timer (Space)'}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="lg" onClick={onReset} className="px-6" aria-label="Reset timer (R)">
            Reset
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="lg" onClick={onSkip} className="px-6" aria-label="Skip session (N)">
            Skip
          </Button>
        </motion.div>
      </div>

      {/* Focus Mode Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFocusMode}
          className="text-sm text-neutral-600 hover:text-primary-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800"
          aria-label="Enter focus mode (F)"
        >
          <Maximize2 size={16} aria-hidden="true" />
          Focus Mode <kbd className="text-xs bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded ml-1" aria-label="Keyboard shortcut F">F</kbd>
        </motion.button>
      </div>
    </div>
  );
};
