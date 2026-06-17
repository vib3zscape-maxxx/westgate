import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type BadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

const toneClasses: Record<BadgeTone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-info/10 text-info',
  neutral: 'bg-muted text-secondary',
};

export function Badge({ tone = 'neutral', className, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-md px-2.5 py-0.5 text-xs font-semibold', toneClasses[tone], className)}>
      {children}
    </span>
  );
}
