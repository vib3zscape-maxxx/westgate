import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, trailing, className, ...props }, ref) => (
    <label className="space-y-2 text-sm text-primary">
      <span className="font-medium">{label}</span>
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            'w-full rounded-md border border-border bg-muted px-3 py-2.5 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20',
            className,
          )}
          {...props}
        />
        {trailing ? <div className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</div> : null}
      </div>
      <p className={cn('text-xs text-secondary/70', error && 'text-danger')}>{error ?? helperText}</p>
    </label>
  ),
);

Input.displayName = 'Input';
