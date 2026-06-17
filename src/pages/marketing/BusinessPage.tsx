import { Table } from '../../components/ui/Table';
import { Card } from '../../components/ui/Card';
import { ArrowRight, Globe, ShieldCheck, Wallet } from 'lucide-react';

const accounts = [
  {
    title: 'Operating account',
    bullets: ['No monthly fees on domestic activity', 'Fast same-day ACH and wire initiation', 'Dedicated reconciliation controls'],
    icon: Wallet,
  },
  {
    title: 'Multi-currency account',
    bullets: ['USD, EUR, GBP, JPY, CAD, AUD', 'One platform for cross-border holdings', 'Real-time FX exposure visibility'],
    icon: Globe,
  },
  {
    title: 'Payroll account',
    bullets: ['Bulk payment workflows for payroll runs', 'Approval controls and audit trail', 'Integrated reporting for workforce spend'],
    icon: ShieldCheck,
  },
];

export function BusinessPage() {
  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight">Operating accounts built for how finance teams actually work.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">A single platform for account operations, multi-currency reserves, and payment readiness across treasury workflows.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <Card key={account.title} className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-semibold">{account.title}</h2>
                <ul className="space-y-2 text-sm leading-7 text-secondary dark:text-secondary/80">
                  {account.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">Multi-currency visibility that makes 50+ currencies feel manageable.</h2>
            <p className="text-base leading-8 text-secondary dark:text-secondary/80">See balances, FX exposure, and available liquidity side by side in a dashboard designed for treasury teams.</p>
            <div className="space-y-3 rounded-xl border border-border bg-white p-6 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
              {['USD 12,482,600', 'EUR 3,140,800', 'GBP 1,062,400', 'JPY 180,000,000', 'CAD 2,310,000', 'AUD 1,780,000'].map((line) => (
                <div key={line} className="flex items-center justify-between rounded-md bg-muted/70 px-4 py-3 text-sm text-primary dark:bg-navy-100 dark:text-white">
                  <span>{line.split(' ')[1]} {line.split(' ')[0]}</span>
                  <span className="text-secondary dark:text-secondary/80">Available</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <div className="space-y-4">
              <div className="rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white">Currency reserves</div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl bg-muted p-4 dark:bg-navy-100">
                    <p className="text-secondary">USD</p>
                    <p className="mt-2 text-lg font-semibold">$12.48M</p>
                  </div>
                  <div className="rounded-xl bg-muted p-4 dark:bg-navy-100">
                    <p className="text-secondary">EUR</p>
                    <p className="mt-2 text-lg font-semibold">€3.14M</p>
                  </div>
                </div>
                <div className="h-48 rounded-xl bg-white/5 p-4 text-sm text-secondary dark:bg-navy-100 dark:text-secondary/80">
                  <p className="font-semibold text-white">Balance trend</p>
                  <div className="mt-4 h-24 rounded-xl bg-navy/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Payment rails comparison</h2>
        <div className="mt-6">
          <Table
            headers={['Rail', 'Speed', 'Cost', 'Use case']}
            rows={[
              ['Domestic wire', 'Same-day', '$15 per transfer', 'Vendor payments, payroll'],
              ['International SWIFT', 'Same-day initiation', '$35 + FX margin', 'Cross-border treasury flows'],
              ['Bulk payroll', 'Next-business-day', '$0.12 per item', 'Payroll runs and mass payments'],
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Security and controls for modern treasury operations.</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-secondary dark:text-secondary/80">Approval workflows, 2FA gating, and fraud monitoring are all designed for corporate finance, not consumer banking.</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-3 text-sm text-secondary dark:text-secondary/80">
                <p className="font-semibold text-primary dark:text-white">Control features</p>
                <ul className="space-y-2">
                  <li>Multi-step approvals for high-value transfers</li>
                  <li>Device-aware 2FA with approval alerts</li>
                  <li>Audit-ready activity logs and access controls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
