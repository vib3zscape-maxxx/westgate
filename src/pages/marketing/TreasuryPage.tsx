import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { useMemo, useState } from 'react';

const products = [
  { title: 'Overnight sweep account', apy: 4.15, min: '$1,000,000', terms: 'Next-day liquidity' },
  { title: 'Money market deposit account', apy: 4.35, min: '$500,000', terms: '1-2 business day liquidity' },
  { title: 'Short-duration treasury ladder', apy: 4.75, min: '$2,500,000', terms: '7-30 day maturities' },
];

export function TreasuryPage() {
  const [balance, setBalance] = useState(2500000);
  const [productIndex, setProductIndex] = useState(0);

  const product = products[productIndex];
  const yieldEstimate = useMemo(() => ((balance * product.apy) / 100).toFixed(2), [balance, product.apy]);
  const nonInterest = useMemo(() => ((balance * 0.02) / 100).toFixed(2), [balance]);
  const productWidth = Math.min(100, product.apy * 18);
  const nonInterestWidth = 20;

  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight">Idle cash is a missed decision, not a default.</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">Move working capital into yield products that preserve access while keeping treasury in control.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((item, index) => (
            <Card key={item.title} className="space-y-4">
              <div className="text-sm font-semibold text-primary dark:text-white">{item.title}</div>
              <div className="text-3xl font-semibold tabular-nums text-primary dark:text-white">{item.apy}% APY</div>
              <p className="text-sm leading-7 text-secondary dark:text-secondary/80">{item.terms}</p>
              <p className="text-sm text-secondary dark:text-secondary/80">Minimum {item.min}</p>
              <p className="text-xs text-secondary/70">Rates shown are illustrative for demo purposes only.</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="rounded-xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Yield calculator</h2>
              <p className="mt-4 text-sm leading-7 text-secondary dark:text-secondary/80">Estimate illustrative annual yield based on a sample balance and product selection.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setProductIndex(index)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold ${index === productIndex ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-muted text-primary dark:bg-navy-100 dark:text-white'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-xl bg-muted p-5 dark:bg-navy-100">
              <label className="text-sm font-medium text-primary dark:text-white">Hypothetical balance</label>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={balance}
                onChange={(event) => setBalance(Number(event.target.value))}
                className="w-full accent-accent"
              />
              <div className="text-sm text-secondary dark:text-secondary/80">{balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
            </div>
            <div className="space-y-2 rounded-xl bg-muted p-5 dark:bg-navy-100">
              <p className="text-sm text-secondary dark:text-secondary/80">Selected product</p>
              <p className="text-lg font-semibold text-primary dark:text-white">{product.title}</p>
              <p className="text-sm text-secondary dark:text-secondary/80">Illustrative yield: {product.apy}%</p>
            </div>
            <div className="space-y-2 rounded-xl bg-muted p-5 dark:bg-navy-100">
              <p className="text-sm text-secondary dark:text-secondary/80">Annual yield estimate</p>
              <p className="text-3xl font-semibold tabular-nums text-primary dark:text-white">${yieldEstimate}</p>
              <p className="text-xs text-secondary/70">Purely illustrative and not a commitment to pay.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="rounded-xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <p className="text-sm text-secondary dark:text-secondary/80">Comparison versus a typical non-interest operating account</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-muted p-4 dark:bg-navy-100">
              <div className="mb-2 text-sm text-secondary dark:text-secondary/80">Selected product</div>
              <div className="h-4 rounded-full bg-accent/20">
                <div className="h-full rounded-full bg-accent" style={{ width: `${productWidth}%` }} />
              </div>
            </div>
            <div className="rounded-xl bg-muted p-4 dark:bg-navy-100">
              <div className="mb-2 text-sm text-secondary dark:text-secondary/80">Typical non-interest operating account</div>
              <div className="h-4 rounded-full bg-muted/70">
                <div className="h-full rounded-full bg-white" style={{ width: `${nonInterestWidth}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-navy px-8 py-12 text-white dark:bg-navy-100">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to put idle cash to work?</h2>
          <div className="mt-8">
            <Button size="lg">Open a corporate account</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
