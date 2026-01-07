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
        'w-full px-4 py-2 rounded-lg border-2 border-neutral-200 focus:border-primary-600 focus:outline-none',
        'bg-white text-neutral-900 placeholder-neutral-500 transition-colors',
        'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500',
        className
      )}
      {...props}
    />
  );
};
