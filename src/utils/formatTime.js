/**
 * Format time from seconds to MM:SS format
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format time in minutes to readable format
 */
export const formatMinutes = (minutes) => {
  return `${minutes} min${minutes !== 1 ? 's' : ''}`;
};

/**
 * Get time progress percentage (0-100)
 */
export const getProgressPercent = (current, total) => {
  return Math.round((current / total) * 100);
};

/**
 * Calculate remaining time
 */
export const getRemainingTime = (current, total) => {
  return Math.max(0, total - current);
};
