import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-[#8F6A36] border-transparent',
  secondary: 'bg-white text-primary border border-border hover:border-accent',
  ghost: 'bg-transparent text-primary hover:text-accent underline-offset-4 hover:underline',
  danger: 'bg-danger text-white hover:bg-[#962F29] border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm md:text-base',
  lg: 'px-8 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <span className="opacity-70">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
