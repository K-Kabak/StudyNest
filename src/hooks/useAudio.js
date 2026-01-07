import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook for managing audio playback with fallback to Web Audio API
 */
export const useAudio = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioElementRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize audio context and elements
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audioElementRef.current = audio;

    // Initialize Web Audio API context
    try {
      const context =
        window.AudioContext || window.webkitAudioContext
          ? new (window.AudioContext || window.webkitAudioContext)()
          : null;

      if (context) {
        const gain = context.createGain();
        gain.connect(context.destination);
        audioContextRef.current = context;
        gainNodeRef.current = gain;
      }
    } catch (error) {
      console.error('Web Audio API not supported:', error);
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioElementRef.current) {
      audioElementRef.current.volume = Math.max(0, Math.min(1, volume));
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = Math.max(0, Math.min(1, volume));
    }
  }, [volume]);

  /**
   * Generate ambient sound using Web Audio API
   */
  const generateAmbientSound = useCallback(
    (soundId) => {
      if (!audioContextRef.current || !gainNodeRef.current) return;

      try {
        // Stop current sound (if any)
        if (sourceNodeRef.current) {
          try { sourceNodeRef.current.stop(); } catch { /* ignore - already stopped */ }
        }

        const duration = 2; // 2-second loop buffer
        let buffer;

        const ctx = audioContextRef.current;
        const gain = gainNodeRef.current;

        switch (soundId) {
          case 'rain':
            buffer = generatePinkNoise(ctx, duration);
            break;
          case 'whitenoise':
            buffer = generateWhiteNoise(ctx, duration);
            break;
          case 'forest':
            buffer = generateForestSound(ctx, duration);
            break;
          case 'cafe':
            buffer = generateAmbientNoise(ctx, duration, 300);
            break;
          case 'ocean':
            buffer = generateOceanSound(ctx, duration);
            break;
          default:
            buffer = generateWhiteNoise(ctx, duration);
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        source.start(0);

        sourceNodeRef.current = source;
        setCurrentSound(soundId);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error generating audio:', error);
      }
    },
    []
  );

  const playSound = useCallback(
    (soundPath) => {
      if (currentSound === soundPath && isPlaying) {
        return;
      }

      // Extract sound ID from path
      const soundId = soundPath.split('/').pop().split('.')[0];

      // Try to play file first, fallback to generated audio
      const audioEl = audioElementRef.current;
      if (audioEl) {
        audioEl.src = soundPath;
        audioEl
          .play()
          .then(() => {
            setCurrentSound(soundPath);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn('Audio file not found, using generated audio:', error);
            generateAmbientSound(soundId);
          });
      } else {
        generateAmbientSound(soundId);
      }
    },
    [currentSound, isPlaying, generateAmbientSound]
  );

  const pauseSound = useCallback(() => {
    const audioEl = audioElementRef.current;
    if (audioEl) {
      audioEl.pause();
    }
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch {
        /* already stopped */
      }
    }
    setIsPlaying(false);
  }, []);

  const stopSound = useCallback(() => {
    const audioEl = audioElementRef.current;
    if (audioEl) {
      audioEl.pause();
      try { audioEl.currentTime = 0; } catch { /* ignore */ }
    }
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch {
        /* already stopped */
      }
    }
    setIsPlaying(false);
    setCurrentSound(null);
  }, []);

  const togglePlayPause = useCallback(() => {
    const audioEl = audioElementRef.current;
    const srcExists = audioEl && audioEl.src;

    if (!audioEl && !sourceNodeRef.current) return;

    if (isPlaying) {
      pauseSound();
    } else {
      if (srcExists) {
        audioEl.play().catch((error) => {
          console.warn('Cannot resume audio:', error);
        });
      }
      setIsPlaying(true);
    }
  }, [isPlaying, pauseSound]);

  return {
    currentSound,
    isPlaying,
    volume,
    playSound,
    pauseSound,
    stopSound,
    togglePlayPause,
    setVolume,
  };
};

/**
 * Helper functions to generate audio
 */

function generateWhiteNoise(context, duration) {
  const sampleRate = context.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.2; // Scale to prevent clipping
  }

  return buffer;
}

function generatePinkNoise(context, duration) {
  const sampleRate = context.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  let b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

  for (let i = 0; i < frameCount; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.049922035 * white + 0.950177995 * b0;
    b1 = 0.362034884 * b0 + 0.637965116 * b1;
    b2 = 0.085334327 * b1 + 0.914665673 * b2;
    b3 = 0.170683368 * b2 + 0.829316632 * b3;
    b4 = 0.07995985 * b3 + 0.92004015 * b4;
    b5 = 0.023259854 * b4 + 0.976740146 * b5;
    b6 = 0.049922035 * b5 + 0.950177995 * b6;
    data[i] = b6 * 0.12;
  }

  return buffer;
}

function generateForestSound(context, duration) {
  const sampleRate = context.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  // Mix of low frequency noise (wind) + occasional bird chirps
  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate;

    // Low frequency wind
    const wind = Math.sin(2 * Math.PI * 80 * t) * 0.1;

    // Random noise
    const noise = (Math.random() * 2 - 1) * 0.08;

    // Occasional higher pitched sounds (birds)
    const birdChirp = Math.sin(2 * Math.PI * (2000 + Math.sin(t * 20) * 500) * t) * 0.05 * Math.max(0, Math.sin(t * 0.5));

    data[i] = wind + noise + birdChirp;
  }

  return buffer;
}

function generateAmbientNoise(context, duration, baseFreq = 300) {
  const sampleRate = context.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate;

    // Low frequency hum
    const hum = Math.sin(2 * Math.PI * baseFreq * t) * 0.08;

    // Random noise for texture
    const noise = (Math.random() * 2 - 1) * 0.06;

    data[i] = hum + noise;
  }

  return buffer;
}

function generateOceanSound(context, duration) {
  const sampleRate = context.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate;

    // Wave-like oscillation
    const wave = Math.sin(2 * Math.PI * 50 * t) * 0.1;

    // Random noise with reverb-like quality
    const noise = (Math.random() * 2 - 1) * 0.12;

    // Add some higher harmonics
    const harmonics = Math.sin(2 * Math.PI * 150 * t) * 0.05;

    data[i] = wave + noise + harmonics;
  }

  return buffer;
}
