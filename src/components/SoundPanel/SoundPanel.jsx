/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { SOUND_PRESETS } from '../../utils/audioData';
import { Card } from '../ui/Card';
import clsx from 'clsx';

/**
 * Sound Preset Card
 */
const SoundPresetCard = ({ preset, isPlaying = false, onClick = () => {} }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        'p-4 rounded-lg transition-all border-2',
        isPlaying
          ? 'border-primary-600 bg-primary-50 shadow-lg'
          : 'border-neutral-200 bg-white hover:bg-neutral-50'
      )}
    >
      {/* Icon placeholder */}
      <div
        className="w-12 h-12 rounded-lg mb-3 mx-auto flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: preset.color }}
      >
        ♫
      </div>

      <h3 className="font-semibold text-sm text-neutral-900">{preset.name}</h3>
      <p className="text-xs text-neutral-500 mt-1">{preset.description}</p>

      {isPlaying && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-3 flex justify-center"
        >
          <span className="text-lg">🎵</span>
        </motion.div>
      )}
    </motion.button>
  );
};

/**
 * SoundPanel component - ambient sounds selector
 */
export const SoundPanel = ({
  currentSound = null,
  isPlaying = false,
  volume = 0.5,
  onSelectSound = () => {},
  onTogglePlay = () => {},
  onVolumeChange = () => {},
}) => {
  const handleSoundClick = (soundId, soundPath) => {
    onSelectSound(soundId, soundPath);
    // Auto-play when selecting
    if (!(isPlaying && currentSound === soundId)) {
      setTimeout(() => onTogglePlay(), 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Volume Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-neutral-900">Volume</label>
          <span className="text-xs text-neutral-600">{Math.round(volume * 100)}%</span>
        </div>

        <div className="flex items-center gap-3">
          <VolumeX size={18} className="text-neutral-500" />

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />

          <Volume2 size={18} className="text-neutral-500" />
        </div>
      </div>

      {/* Sound Presets Grid */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Ambient Sounds</h3>
        <p className="text-xs text-neutral-500 mb-4">
          {isPlaying ? '🔊 Playing generated audio' : 'Select a sound to focus'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {SOUND_PRESETS.map((preset) => (
            <SoundPresetCard
              key={preset.id}
              preset={preset}
              isPlaying={isPlaying && currentSound === preset.id}
              onClick={() => handleSoundClick(preset.id, preset.path)}
            />
          ))}
        </div>
      </div>

      {/* Now Playing */}
      {currentSound && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-primary-50 border border-primary-200 rounded-lg"
        >
          <p className="text-xs uppercase text-primary-700 font-semibold tracking-wider">Now Playing</p>
          <p className="text-primary-900 font-semibold mt-1">
            {SOUND_PRESETS.find((s) => s.id === currentSound)?.name || 'Custom Sound'}
          </p>
          {isPlaying && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-primary-600 font-medium mt-2"
            >
              🔊 Audio playing
            </motion.div>
          )}
          <p className="text-xs text-neutral-600 mt-2">
            ℹ️ Using generated audio. For better quality, add .mp3 files to /public/audio/
          </p>
        </motion.div>
      )}
    </div>
  );
};
