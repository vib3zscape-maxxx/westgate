import { Link, NavLink, Outlet } from 'react-router-dom';

const adminNav = [
  { label: 'Overview', to: '/admin/overview' },
  { label: 'Companies', to: '/admin/companies' },
  { label: 'Fund injection', to: '/admin/fund-injection' },
  { label: 'Auth codes', to: '/admin/auth-codes' },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-navy-100 p-6 shadow-elevated">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary/70">Westgate admin</p>
            <h2 className="mt-4 text-2xl font-semibold">Platform control</h2>
          </div>

          <nav className="space-y-2 text-sm text-secondary/70">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 transition ${isActive ? 'bg-accent/15 text-white' : 'hover:bg-white/5'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-navy-100 p-8 shadow-elevated">
            <h1 className="text-3xl font-semibold">Admin dashboard</h1>
            <p className="mt-3 text-sm leading-7 text-secondary/70">Admin tools for the demo platform are coming online here.</p>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
