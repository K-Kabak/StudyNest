/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Card } from '../ui/Card';
import { AdvancedStats } from '../AdvancedStats/AdvancedStats';
import { Clock, Flame } from 'lucide-react';

const MOTIVATIONAL_MESSAGES = [
  '🌟 Great focus today!',
  '💪 Keep up the momentum!',
  '🔥 On fire today!',
  '🚀 Amazing progress!',
  '✨ You are crushing it!',
];

/**
 * Stats Card component
 */
/* eslint-disable-next-line no-unused-vars */
const StatCard = ({ icon: Icon, label, value, unit = '', color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400',
    success: 'bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400',
    warning: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${colors[color]}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={24} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
          <p className="text-2xl font-bold mt-1">
            {value}
            <span className="text-sm font-medium ml-1">{unit}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * StatsPanel component - session statistics
 */
export const StatsPanel = ({
  stats = {},
  todaySessions = 0,
  todayMinutes = 0,
}) => {


  const motivationalMessage = useMemo(() => {
    if (todaySessions === 0) return '☀️ Start your first session!';
    if (todaySessions < 2) return '🌱 Good start!';
    if (todaySessions < 4) return '💪 Great effort!';
    return MOTIVATIONAL_MESSAGES[todaySessions % MOTIVATIONAL_MESSAGES.length];
  }, [todaySessions]);

  return (
    <div className="space-y-4">
      {/* Today's Stats */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Today's Progress</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Clock}
            label="Sessions"
            value={todaySessions}
            unit="completed"
            color="primary"
          />
          <StatCard
            icon={Clock}
            label="Focus Time"
            value={todayMinutes}
            unit="min"
            color="success"
          />
        </div>
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="p-4 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-900/50"
      >
        <p className="text-center text-lg font-semibold text-primary-900 dark:text-primary-200">
          {motivationalMessage}
        </p>
      </motion.div>

      {/* All-time Stats */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">All Time</h3>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Clock}
            label="Total Sessions"
            value={stats.totalSessions || 0}
            color="neutral"
          />
          <StatCard
            icon={Flame}
            label="Total Focus"
            value={stats.totalMinutes || 0}
            unit="min"
            color="warning"
          />
        </div>
      </div>

      {/* Advanced Statistics Charts */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Detailed Analytics
        </h3>
        <AdvancedStats stats={stats} />
      </div>
    </div>
  );
};
