/**
 * App-wide constants
 */

export const DEFAULT_WORK_DURATION = 25; // minutes
export const DEFAULT_BREAK_DURATION = 5; // minutes
export const LONG_BREAK_DURATION = 15; // minutes
export const SESSIONS_BEFORE_LONG_BREAK = 4;

export const TIMER_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  BREAK: 'break',
  SESSION_END: 'session_end',
  BREAK_END: 'break_end',
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

export const STORAGE_KEYS = {
  SETTINGS: 'studynest_settings',
  TASKS: 'studynest_tasks',
  SESSIONS: 'studynest_sessions',
  STATS: 'studynest_stats',
};

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};
