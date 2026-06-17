import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { CurrencyTag } from '../ui/CurrencyTag';

const stats = [
  { label: 'USD balance', value: '$12,482,600' },
  { label: 'EUR balance', value: '€3,140,800' },
  { label: 'GBP balance', value: '£1,062,400' },
];

export function HeroDashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-navy-50 shadow-elevated">
      <div className="bg-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="ml-3 rounded-full bg-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-secondary/70">
            app.westgatebank.com
          </div>
        </div>
      </div>
      <div className="space-y-4 px-4 pb-5 pt-4">
        <div className="grid gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-secondary/70">{stat.label}</div>
              <div className="mt-2 text-lg font-semibold tabular-nums text-white">{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm text-secondary/80">
            <span>Projected 24h liquidity</span>
            <span className="text-white">+1.2%</span>
          </div>
          <div className="mt-3 h-12 rounded-lg bg-white/10" />
        </div>
        <Card className="bg-white/5 border-white/10 p-4">
          <div className="flex items-center justify-between gap-3 text-sm text-secondary/80">
            <div>
              <div className="font-semibold text-white">SWIFT payout</div>
              <div className="text-xs text-secondary/70">EUR to GBP</div>
            </div>
            <CurrencyTag code="EUR" />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm">
            <div>
              <div className="text-sm font-semibold text-white">€82,500</div>
              <div className="text-xs text-secondary/70">Beneficiary</div>
            </div>
            <Badge tone="success">Completed</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
