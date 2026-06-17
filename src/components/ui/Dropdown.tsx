import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
  className?: string;
}

export function Dropdown({ label, value, items, onChange, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        buttonRef.current &&
        panelRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)}>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary shadow-sm transition hover:border-accent"
      >
        <span>{label}: {value}</span>
        <span className="ml-3 text-secondary">▾</span>
      </button>
      {open ? (
        <div ref={panelRef} className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-border bg-white shadow-elevated p-1">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-primary hover:bg-muted"
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
