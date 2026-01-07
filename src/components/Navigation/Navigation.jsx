/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Clock, ListTodo, Volume2, Settings, BarChart3 } from 'lucide-react';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import clsx from 'clsx';

/**
 * Navigation component - bottom nav on mobile, sidebar on desktop
 */
export const Navigation = ({
  activeView = 'dashboard',
  onNavigate = () => {},
  onSettingsClick = () => {},
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Session', icon: Clock },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'sounds', label: 'Sounds', icon: Volume2 },
    { id: 'stats', label: 'Stats', icon: BarChart3 },
  ];

  const isActive = (itemId) => activeView === itemId;

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 md:hidden z-40" aria-label="Main navigation">
        <div className="flex justify-around" role="tablist">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-colors',
                  active ? 'text-primary-600' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                )}
                role="tab"
                aria-selected={active}
                aria-label={`${item.label} view`}
              >
                <Icon size={24} aria-hidden="true" />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="indicator"
                    className="h-1 w-6 bg-primary-600 rounded-t-full"
                  />
                )}
              </motion.button>
            );
          })}

          {/* Settings button on mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onSettingsClick}
            className="flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-colors text-neutral-600 hover:text-neutral-900"
          >
            <Settings size={24} />
            <span className="text-xs font-medium">Settings</span>
          </motion.button>
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:flex flex-col gap-2 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg h-fit sticky top-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);

          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.id)}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                active
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}

        {/* Settings button on desktop */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSettingsClick}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </motion.button>

        {/* Dark Mode Toggle */}
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <DarkModeToggle />
        </div>
      </nav>
    </>
  );
};
