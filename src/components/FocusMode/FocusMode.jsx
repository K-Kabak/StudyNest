/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Play, Pause } from 'lucide-react';
import { formatTime } from '../../utils/formatTime';
import { SOUND_PRESETS } from '../../utils/audioData';
import { useEffect } from 'react';

/**
 * Focus Mode - Fullscreen timer with minimal UI
 */
export const FocusMode = ({
  isOpen = false,
  onClose = () => {},
  timer = {},
  audio = {},
  onTimerToggle = () => {},
  onSoundSelect = () => {},
  onVolumeChange = () => {},
}) => {
  // ESC key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { timeLeft = 0, isRunning = false } = timer;
  const { currentSound = null, volume = 0.5 } = audio;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center"
      >
        {/* Exit button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>

        {/* Main content */}
        <div className="flex flex-col items-center space-y-12 px-8">
          {/* Timer display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
            className="text-center"
          >
            <div className="text-9xl md:text-[12rem] font-bold text-white tracking-tight mb-4">
              {formatTime(timeLeft)}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl text-white/70"
            >
              {isRunning ? 'Focus Time' : 'Paused'}
            </motion.div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6"
          >
            {/* Play/Pause button */}
            <motion.button
              onClick={onTimerToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-20 h-20 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-2xl hover:shadow-white/20 transition-shadow"
            >
              {isRunning ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </motion.button>
          </motion.div>

          {/* Ambient sound controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl"
          >
            {/* Volume control */}
            <div className="flex items-center gap-4 mb-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Volume2 size={20} className="text-white/70" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <span className="text-white/70 text-sm min-w-[3rem] text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Sound presets */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {SOUND_PRESETS.map((preset) => (
                <motion.button
                  key={preset.id}
                  onClick={() => onSoundSelect(preset.id, preset.soundPath)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentSound?.includes(preset.id)
                      ? 'bg-white text-primary-600 shadow-lg'
                      : 'bg-white/10 text-white/90 hover:bg-white/20'
                  }`}
                >
                  {preset.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Helper text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/50 text-sm text-center"
          >
            Press <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd> to exit focus mode
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
