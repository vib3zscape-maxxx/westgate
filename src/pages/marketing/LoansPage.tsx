import { ArrowRight, Briefcase, ClipboardCheck, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';

const products = [
  {
    title: 'Working capital line of credit',
    details: ['Flexible drawdown for cash flow gaps', 'Indicative rate range: 6.5%–8.5%', 'Term: 12–24 months'],
    icon: Briefcase,
  },
  {
    title: 'Trade finance / letters of credit',
    details: ['Support for supplier obligations', 'Indicative rate range: 5.8%–7.5%', 'Term: 30–180 days'],
    icon: ClipboardCheck,
  },
  {
    title: 'Equipment & growth financing',
    details: ['Structured financing for capital projects', 'Indicative rate range: 7.0%–9.0%', 'Term: 24–60 months'],
    icon: Sparkles,
  },
];

const steps = ['Apply', 'Underwriting review', 'Funds available'];

export function LoansPage() {
  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight">Capital that moves as fast as your business does.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">Trade finance, working capital, and equipment financing designed to support growth while letting treasury teams keep control.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.title} className="space-y-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon size={20} />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-primary dark:text-white">{product.title}</h2>
                  <ul className="space-y-2 text-sm leading-7 text-secondary dark:text-secondary/80">
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">How it works</h2>
        <div className="mt-8 flex flex-col gap-6 rounded-xl border border-border bg-white p-6 shadow-card dark:border-navy-200/60 dark:bg-navy-50 md:flex-row md:items-center md:justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white font-semibold">{index + 1}</div>
              <p className="text-sm font-semibold text-primary dark:text-white">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary dark:text-secondary/80">Indicative only — not a commitment to lend</p>
        <div className="mt-6">
          <Table
            headers={['Product', 'Indicative APR range', 'Term', 'Collateral']}
            rows={[
              ['Working capital line of credit', '6.5%–8.5%', '12–24 months', 'General business assets'],
              ['Trade finance / letters of credit', '5.8%–7.5%', '30–180 days', 'Export/import goods'],
              ['Equipment & growth financing', '7.0%–9.0%', '24–60 months', 'Equipment or project assets'],
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-navy px-8 py-12 text-white dark:bg-navy-100">
          <h2 className="text-3xl font-semibold tracking-tight">Talk to a relationship manager</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">Discuss your financing needs with a team built to support treasury-driven capital solutions.</p>
          <div className="mt-8">
            <Button size="lg">Talk to a relationship manager</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
