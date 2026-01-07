import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing Pomodoro timer
 */
export const useTimer = (workDuration = 25, breakDuration = 5, onComplete = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalDuration] = useState(workDuration * 60);

  // Timer interval - perform tick and handle completion inside the interval callback
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;

          // prev === 1 -> next tick reaches 0, handle completion
          // Stop running and transition
          setIsRunning(false);

          if (!isBreak) {
            // Switch to break
            setIsBreak(true);
            setTimeLeft(breakDuration * 60);
            setSessionsCompleted((s) => s + 1);
            onComplete(workDuration);
          } else {
            // Break complete, reset to work
            setIsBreak(false);
            setTimeLeft(workDuration * 60);
          }

          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isBreak, workDuration, breakDuration, onComplete]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workDuration * 60);
  }, [workDuration]);

  const skipSession = useCallback(() => {
    const newIsBreak = !isBreak;
    setIsBreak(newIsBreak);
    setTimeLeft(newIsBreak ? breakDuration * 60 : workDuration * 60);
  }, [isBreak, workDuration, breakDuration]);

  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return {
    timeLeft,
    isRunning,
    isBreak,
    sessionsCompleted,
    progressPercent,
    toggleTimer,
    resetTimer,
    skipSession,
    setTimeLeft,
    setIsRunning,
  };
};
