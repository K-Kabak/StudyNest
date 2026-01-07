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
        'rounded-lg bg-white text-neutral-900 p-6',
        elevated && 'shadow-lg',
        !elevated && 'border border-neutral-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
