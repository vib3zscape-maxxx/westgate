import { Card } from '../../components/ui/Card';

const milestones = [
  { year: '1998', label: 'Chartered regionally' },
  { year: '2004', label: 'Expanded national charter' },
  { year: '2012', label: 'Launched multi-currency treasury platform' },
  { year: '2019', label: 'Crossed $10B simulated AUM' },
  { year: '2024', label: 'Launched current platform' },
];

const leaders = [
  { title: 'Chief Executive Officer', description: 'Oversees strategic direction for treasury and corporate banking services.', initials: 'CE' },
  { title: 'Chief Treasury Officer', description: 'Designs the platform roadmap for multi-currency operations and liquidity management.', initials: 'CT' },
  { title: 'Chief Risk Officer', description: 'Builds the risk framework and compliance controls for the bank’s treasury operations.', initials: 'CR' },
];

export function AboutPage() {
  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight">Built for the businesses that keep the economy moving.</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-12 px-6 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight">A treasury bank designed for modern corporate finance.</h2>
            <p className="text-base leading-8 text-secondary dark:text-secondary/80">Westgate Bank began as a regional commercial bank in 1998 and evolved into a national treasury platform built for middle-market companies with complex cash operations.</p>
            <p className="text-base leading-8 text-secondary dark:text-secondary/80">The platform emphasizes account visibility, payment control, and yield management, while preserving the discipline expected of a corporate bank.</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <div className="relative h-2 bg-muted dark:bg-navy-100">
              <div className="absolute left-0 top-0 h-2 w-1/4 bg-accent" />
            </div>
            <div className="mt-8 space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="space-y-1">
                  <p className="text-sm font-semibold text-primary dark:text-white">{milestone.year}</p>
                  <p className="text-sm text-secondary dark:text-secondary/80">{milestone.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {leaders.map((leader) => (
            <Card key={leader.title} className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">{leader.initials}</div>
              <div>
                <p className="text-sm font-semibold text-primary dark:text-white">{leader.title}</p>
                <p className="mt-2 text-sm leading-7 text-secondary dark:text-secondary/80">{leader.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div id="careers" className="rounded-xl border border-border bg-white p-10 text-primary shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <h2 className="text-3xl font-semibold tracking-tight">Careers at Westgate</h2>
          <p className="mt-4 text-base leading-8 text-secondary dark:text-secondary/80">We’re not currently displaying open roles in this demo environment.</p>
          <button type="button" className="mt-6 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-semibold text-secondary dark:text-secondary/80 cursor-not-allowed opacity-60">
            View open roles
          </button>
        </div>
      </section>
    </div>
  );
}
