import clsx from 'clsx';

/**
 * Input component
 */
export const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={clsx(
        'w-full px-4 py-2 rounded-lg border-2 border-neutral-200 dark:border-neutral-700',
        'focus:border-primary-600 dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600/20 dark:focus:ring-primary-500/20',
        'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 transition-colors',
        'disabled:bg-neutral-100 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-500 dark:disabled:text-neutral-500',
        className
      )}
      {...props}
    />
  );
};
