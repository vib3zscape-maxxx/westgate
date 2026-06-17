import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface TableProps {
  headers: string[];
  rows: ReactNode[][];
  className?: string;
}

export function Table({ headers, rows, className }: TableProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-white dark:bg-navy-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-secondary/60"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-navy-50">
          {rows.map((cells, rowIndex) => (
            <tr key={rowIndex} className={cn('border-b border-border last:border-0 hover:bg-muted/60 text-sm')}>
              {cells.map((cell, cellIndex) => (
                <td key={cellIndex} className={cn('px-4 py-4', cellIndex === cells.length - 1 ? 'text-right tabular-nums' : '')}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
