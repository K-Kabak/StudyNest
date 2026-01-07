/**
 * Audio Generator - Creates Web Audio API based ambient sounds
 * Generates simple tones instead of requiring audio files
 */

/**
 * Generate simple noise sound using Web Audio API
 * @param {number} duration Duration in seconds
 * @param {string} type Type of noise: 'white', 'pink', 'brown'
 * @returns {AudioBuffer}
 */
export const generateNoiseBuffer = (audioContext, duration, type = 'white') => {
  const sampleRate = audioContext.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'white') {
    // White noise
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === 'pink') {
    // Simple pink noise approximation
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
      data[i] = b6 * 0.11; // Scale to prevent clipping
    }
  }

  return buffer;
};

/**
 * Generate tone sound
 * @param {AudioContext} audioContext
 * @param {number} frequency Frequency in Hz
 * @param {number} duration Duration in seconds
 * @param {number} volume Volume 0-1
 * @returns {AudioBuffer}
 */
export const generateToneBuffer = (audioContext, frequency, duration, volume = 0.3) => {
  const sampleRate = audioContext.sampleRate;
  const frameCount = sampleRate * duration;
  const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    const t = i / sampleRate;
    // Simple sine wave with fade out
    const envelope = Math.max(0, 1 - t / duration);
    data[i] = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
  }

  return buffer;
};
