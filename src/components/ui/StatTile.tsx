import { ReactNode } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

interface StatTileProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'success' | 'danger';
  sparkline?: ReactNode;
}

export function StatTile({ label, value, delta, deltaTone = 'success', sparkline }: StatTileProps) {
  return (
    <Card padding="md" className="space-y-4">
      <div className="text-sm text-secondary">{label}</div>
      <div className="flex items-center gap-3">
        <div className="text-3xl font-semibold tabular-nums text-primary">{value}</div>
        {delta ? <Badge tone={deltaTone}>{delta}</Badge> : null}
      </div>
      {sparkline ? <div className="h-8">{sparkline}</div> : null}
    </Card>
  );
}
