/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * Button component with variants
 * @param {string} variant - primary, secondary, ghost, danger
 * @param {string} size - sm, md, lg
 * @param {boolean} isLoading - show loading state
 * @param {boolean} disabled - disable button
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-500 active:scale-95 disabled:bg-neutral-400 focus:ring-primary-600 dark:focus:ring-primary-500 dark:focus:ring-offset-neutral-900',
    secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 active:scale-95 disabled:bg-neutral-300 focus:ring-neutral-400 dark:focus:ring-neutral-600 dark:focus:ring-offset-neutral-900',
    ghost: 'bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 disabled:text-neutral-400 focus:ring-primary-600 dark:focus:ring-primary-500 dark:focus:ring-offset-neutral-900',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 dark:bg-danger-600 dark:hover:bg-danger-500 active:scale-95 disabled:bg-neutral-400 focus:ring-danger-500 dark:focus:ring-danger-600 dark:focus:ring-offset-neutral-900',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={clsx(baseStyles, variants[variant], sizes[size], disabled && 'opacity-60 cursor-not-allowed', className)}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />}
      {!isLoading && children}
    </motion.button>
  );
};
