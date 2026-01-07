import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Hook for managing session statistics
 */
export const useStats = () => {
  const [stats, setStats] = useLocalStorage(STORAGE_KEYS.STATS, {
    totalSessions: 0,
    totalMinutes: 0,
    todaySessions: 0,
    todayMinutes: 0,
    streakDays: 0,
    lastSessionDate: null,
    history: [], // Array of { date: 'YYYY-MM-DD', sessions: 1, minutes: 25 }
  });

  const addSession = (durationMinutes) => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.lastSessionDate ? new Date(stats.lastSessionDate).toISOString().split('T')[0] : null;
    const isNewDay = lastDate !== today;

    // Update history
    const history = [...(stats.history || [])];
    const todayIndex = history.findIndex((h) => h.date === today);

    if (todayIndex !== -1) {
      history[todayIndex] = {
        ...history[todayIndex],
        sessions: history[todayIndex].sessions + 1,
        minutes: history[todayIndex].minutes + durationMinutes,
      };
    } else {
      history.push({
        date: today,
        sessions: 1,
        minutes: durationMinutes,
      });
    }

    // Keep only last 30 days of history to save space
    const trimmedHistory = history.slice(-30);

    const newStats = {
      ...stats,
      totalSessions: stats.totalSessions + 1,
      totalMinutes: stats.totalMinutes + durationMinutes,
      todaySessions: isNewDay ? 1 : stats.todaySessions + 1,
      todayMinutes: isNewDay ? durationMinutes : stats.todayMinutes + durationMinutes,
      streakDays: isNewDay && lastDate ? stats.streakDays + 1 : stats.streakDays || 1,
      lastSessionDate: new Date().toISOString(),
      history: trimmedHistory,
    };

    setStats(newStats);
    return newStats;
  };

  const resetToday = () => {
    setStats((prev) => ({
      ...prev,
      todaySessions: 0,
      todayMinutes: 0,
    }));
  };

  return {
    stats,
    addSession,
    resetToday,
    setStats,
  };
};
