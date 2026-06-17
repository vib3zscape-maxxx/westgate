import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function CardsPage() {
  const mockCards = [
    {
      id: '1',
      lastDigits: '4821',
      status: 'Active' as const,
      company: 'Acme Corp',
      expiry: '02/28',
    },
    {
      id: '2',
      lastDigits: '5739',
      status: 'Active' as const,
      company: 'Acme Corp',
      expiry: '08/27',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Card Management</h2>
        <Button size="sm">
          <Plus size={16} />
          Request new card
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCards.map((card) => (
          <div
            key={card.id}
            className="relative h-52 overflow-hidden rounded-xl bg-gradient-to-br from-navy to-navy-100 p-6 text-white shadow-card"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between items-start">
                <CreditCard size={24} />
                <span className="text-xs font-semibold text-white/70">WESTGATE</span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-[0.24em]">Card number</p>
                  <p className="mt-2 font-mono text-lg tracking-widest">•••• •••• •••• {card.lastDigits}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-[0.24em]">Cardholder</p>
                    <p className="mt-1 text-sm font-semibold">{card.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60 uppercase tracking-[0.24em]">Expires</p>
                    <p className="mt-1 font-mono text-sm">{card.expiry}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Card controls</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Manage your card settings and security preferences</p>
        </div>

        <div className="space-y-4">
          {mockCards.map((card) => (
            <div key={card.id} className="flex items-center justify-between rounded-lg border border-border p-4 dark:border-navy-200/60">
              <div>
                <p className="font-semibold text-primary dark:text-white">
                  {card.company} •••• {card.lastDigits}
                </p>
                <p className="text-sm text-secondary dark:text-secondary/80">Status: {card.status}</p>
              </div>
              <Button variant="ghost" size="sm">Freeze card</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
