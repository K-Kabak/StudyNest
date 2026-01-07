import clsx from 'clsx';

/**
 * Card component
 */
export const Card = ({
  children,
  className = '',
  elevated = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 p-6',
        elevated && 'shadow-lg dark:shadow-2xl dark:shadow-neutral-950/50',
        !elevated && 'border border-neutral-200 dark:border-neutral-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
