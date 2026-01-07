/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatTime';
import clsx from 'clsx';

/**
 * Timer Display component - shows circular progress + digital time
 */
export const TimerDisplay = ({
  timeLeft = 0,
  totalDuration = 1500,
  isBreak = false,
  isRunning = false,
}) => {
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
  const circumference = 2 * Math.PI * 90; // radius 90
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const formattedTime = formatTime(timeLeft);
  const bgColor = isBreak ? 'bg-success-50' : 'bg-neutral-50';
  const accentColor = isBreak ? '#a8d5ba' : '#5b4e9e';

  return (
    <div className={clsx('flex flex-col items-center justify-center rounded-3xl p-12', bgColor)} role="timer" aria-live="polite" aria-atomic="true">
      {/* Circular Progress */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg className="w-80 h-80 -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
          {/* Background circle */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e5e5" strokeWidth="8" />

          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={accentColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Digital time display */}
        <motion.div
          key={formattedTime}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="absolute text-center"
        >
          <div className="text-6xl font-mono font-bold text-neutral-900 dark:text-neutral-100 tracking-tight" aria-label={`${formattedTime} remaining`}>
            {formattedTime}
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 uppercase tracking-wider font-medium">
            {isBreak ? 'Break Time' : 'Focus'}
          </p>
        </motion.div>
      </div>

      {/* Status indicator */}
      {isRunning && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={clsx(
            'mt-8 flex items-center gap-2 text-sm font-medium',
            isBreak ? 'text-success-600' : 'text-primary-600'
          )}
          role="status"
        >
          <span className={clsx('w-2 h-2 rounded-full', isBreak ? 'bg-success-600' : 'bg-primary-600')} aria-hidden="true" />
          {isBreak ? 'Relax & Recharge' : 'Stay Focused'}
        </motion.div>
      )}
    </div>
  );
};
