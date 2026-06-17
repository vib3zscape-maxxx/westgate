import { Link } from 'react-router-dom';
import { Send, Globe, Users } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const transferTypes = [
  {
    title: 'Domestic wire',
    description: 'Send USD to domestic US accounts',
    icon: Send,
    to: '/app/transfers/domestic',
  },
  {
    title: 'International / SWIFT',
    description: 'Send across borders with SWIFT/IBAN',
    icon: Globe,
    to: '/app/transfers/international',
  },
  {
    title: 'Bulk / payroll run',
    description: 'Send to multiple recipients at once',
    icon: Users,
    to: '/app/transfers/payroll',
  },
];

export function TransfersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Transfer & Payment Hub</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Choose a transfer type to get started</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {transferTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Link key={type.to} to={type.to}>
              <Card padding="lg" interactive className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <IconComponent size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary dark:text-white">{type.title}</h3>
                  <p className="mt-1 text-sm text-secondary dark:text-secondary/80">{type.description}</p>
                </div>
                <p className="text-sm font-semibold text-accent">Start →</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
