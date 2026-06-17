export function OverviewPage() {
  return (
    <div className="space-y-8 rounded-3xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Available liquidity', value: '$12.4M' },
          { label: 'Active currencies', value: '6' },
          { label: 'Pending approvals', value: '2' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-muted p-6 dark:bg-navy-100">
            <p className="text-sm text-secondary dark:text-secondary/80">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-primary dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-light p-6 dark:bg-navy-50">
        <h2 className="text-xl font-semibold text-primary dark:text-white">Welcome back</h2>
        <p className="mt-3 text-sm leading-7 text-secondary dark:text-secondary/80">
          Your treasury command center brings account balances, recent flows, and operational alerts together in one place.
        </p>
      </div>
    </div>
  );
}
