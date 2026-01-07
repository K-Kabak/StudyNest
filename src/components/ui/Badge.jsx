import clsx from 'clsx';

/**
 * Badge component for status indicators
 */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-600',
    danger: 'bg-danger-500 bg-opacity-10 text-danger-600',
    neutral: 'bg-neutral-200 text-neutral-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded',
    md: 'px-3 py-1 text-sm rounded-md',
    lg: 'px-4 py-2 text-base rounded-lg',
  };

  return (
    <span
      className={clsx('inline-block font-medium', variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};
