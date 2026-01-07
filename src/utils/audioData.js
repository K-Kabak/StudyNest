/**
 * Ambient sound presets with metadata
 */
export const SOUND_PRESETS = [
  {
    id: 'rain',
    name: 'Rain',
    description: 'Calm rain ambience',
    icon: 'cloud-rain',
    path: '/audio/rain.mp3',
    color: '#8b7ebd',
  },
  {
    id: 'cafe',
    name: 'Café',
    description: 'Coffee shop background',
    icon: 'coffee',
    path: '/audio/cafe.mp3',
    color: '#a8856e',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Birds and forest sounds',
    icon: 'trees',
    path: '/audio/forest.mp3',
    color: '#6b8e6f',
  },
  {
    id: 'whitenoise',
    name: 'White Noise',
    description: 'Pure white noise',
    icon: 'wind',
    path: '/audio/whitenoise.mp3',
    color: '#a8a8a8',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Waves and seagulls',
    icon: 'waves',
    path: '/audio/ocean.mp3',
    color: '#5b9fbb',
  },
];

export const getSoundById = (id) => {
  return SOUND_PRESETS.find((sound) => sound.id === id);
};
