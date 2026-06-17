import { ArrowRight, Banknote, ChartBar, ShieldCheck } from 'lucide-react';
import { HeroSection } from '../../components/marketing/HeroSection';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { HeroDashboardMockup } from '../../components/marketing/HeroDashboardMockup';

const pillars = [
  {
    title: 'Treasury operations',
    description: 'Real-time visibility across every account and currency, with controls built for finance teams, not individuals.',
    icon: Banknote,
  },
  {
    title: 'Trade & working capital',
    description: 'Lines of credit, trade finance, and payroll-scale payment infrastructure that scales with your business.',
    icon: ChartBar,
  },
  {
    title: 'Yield on idle cash',
    description: 'Put working capital to work overnight without sacrificing same-day liquidity.',
    icon: ShieldCheck,
  },
];

export function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />

      <section className="bg-light text-primary dark:bg-navy-50 dark:text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-6 rounded-xl bg-white/80 px-6 py-4 text-sm text-secondary shadow-card dark:bg-navy-100 dark:text-secondary/80">
            <p>Trusted by finance teams managing treasury across 40+ countries</p>
            <div className="flex flex-wrap items-center gap-3 opacity-70 transition hover:opacity-100">
              {['G10', 'Astra', 'Helix', 'Oro', 'Vanta'].map((label) => (
                <span key={label} className="rounded-md bg-muted px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/80 dark:bg-navy-50">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} padding="lg" className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-white">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-primary dark:text-white">{pillar.title}</h2>
                  <p className="text-sm leading-7 text-secondary dark:text-secondary/80">{pillar.description}</p>
                  <a className="inline-flex items-center gap-2 text-sm font-semibold text-accent" href="#">
                    Learn more <ArrowRight size={14} />
                  </a>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">One platform for multi-currency treasury and payments.</h2>
              <ul className="space-y-4 text-sm leading-7 text-secondary dark:text-secondary/80">
                <li>Centralized visibility for every account, currency, and counterparty.</li>
                <li>Same-day domestic wires and same-day SWIFT initiation for time-sensitive treasury flows.</li>
                <li>Composable dashboards with real-time account and FX exposure insights.</li>
              </ul>
            </div>
            <HeroDashboardMockup />
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <HeroDashboardMockup />
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Payments and controls built around treasury teams.</h2>
              <ul className="space-y-4 text-sm leading-7 text-secondary dark:text-secondary/80">
                <li>Approval workflows, FX controls, and dual authorization for large transfers.</li>
                <li>Automated reconciliation-ready transaction data across payroll and vendor payments.</li>
                <li>Embedded compliance checks for fast, finance-friendly execution.</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 grid gap-4 rounded-xl bg-navy px-8 py-12 text-white">
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { label: '$12.4B simulated AUM' },
                { label: '50+ currencies supported' },
                { label: 'Same-day SWIFT initiation' },
                { label: 'Founded 1998' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/5 p-6">
                  <p className="text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-xl bg-white p-8 text-primary shadow-card dark:bg-navy-100 dark:text-white">
            <p className="text-sm text-secondary dark:text-secondary/80">“We moved our treasury onto a single platform, and the visibility across every currency finally feels executive-grade.”</p>
            <p className="mt-4 text-sm font-semibold">VP of Treasury, mid-market manufacturer</p>
          </div>

          <div className="mt-16 rounded-xl bg-accent/10 px-8 py-12 text-center text-white dark:bg-accent/20">
            <h2 className="text-3xl font-semibold tracking-tight">Ready to move your treasury operations to Westgate?</h2>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">Open a corporate account</Button>
            </div>
            <p className="mt-4 text-sm text-white/80">Member FDIC · Chartered 1998 · $0 minimum balance to open</p>
          </div>
        </div>
      </section>
    </div>
  );
}
