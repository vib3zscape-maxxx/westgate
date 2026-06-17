import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="rounded-xl border border-border bg-white p-5 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between text-left text-sm font-semibold text-primary dark:text-white"
            >
              <span>{item.title}</span>
              <ChevronDown className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} size={18} />
            </button>
            {isOpen ? <p className="mt-4 text-sm leading-7 text-secondary dark:text-secondary/80">{item.content}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
