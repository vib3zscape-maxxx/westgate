import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ padding = 'md', interactive = false, className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-white shadow-card dark:bg-navy-50 dark:border-navy-200/60',
        paddingClasses[padding],
        interactive && 'cursor-pointer transition-shadow hover:shadow-card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}
