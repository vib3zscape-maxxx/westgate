import { Link, NavLink, Outlet } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const appNav = [
  { label: 'Overview', to: '/app/overview' },
  { label: 'Transactions', to: '/app/transactions' },
  { label: 'Transfers', to: '/app/transfers' },
  { label: 'Cards', to: '/app/cards' },
  { label: 'Settings', to: '/app/settings' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-light text-primary dark:bg-navy dark:text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-border bg-white p-6 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <div className="mb-10 space-y-4">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary dark:text-secondary/80">Westgate dashboard</div>
            <h2 className="text-2xl font-semibold text-primary dark:text-white">Company view</h2>
          </div>

          <nav className="space-y-2 text-sm text-secondary dark:text-secondary/80">
            {appNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 transition ${isActive ? 'bg-accent/10 text-accent' : 'hover:bg-muted dark:hover:bg-navy-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10">
            <Button variant="secondary" size="sm">Sign out</Button>
          </div>
        </aside>

        <main className="space-y-8">
          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-white p-6 shadow-card dark:border-navy-200/60 dark:bg-navy-50 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-secondary dark:text-secondary/80">Signed in to the Westgate demo environment</p>
              <h1 className="text-2xl font-semibold text-primary dark:text-white">App overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm">New transfer</Button>
              <Link to="/app/transactions" className="text-sm font-semibold text-accent hover:text-primary">
                View transactions
              </Link>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
