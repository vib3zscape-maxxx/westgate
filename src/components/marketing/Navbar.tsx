import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Business banking', to: '/business' },
  { label: 'Loans', to: '/loans' },
  { label: 'Treasury & yield', to: '/treasury' },
  { label: 'Resources', to: '/resources' },
  { label: 'About', to: '/about' },
];

export function Navbar({ solid }: { solid: boolean }) {
  return (
    <div
      className={cn(
        'sticky top-0 z-50 border-b border-transparent transition-all duration-300',
        solid
          ? 'bg-light/95 text-primary shadow-sm backdrop-blur dark:bg-navy/95 dark:text-white'
          : 'bg-transparent text-white',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Westgate
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition hover:text-accent',
                  isActive ? 'text-accent' : '',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={cn(
              'text-sm font-semibold transition hover:text-accent',
              solid ? '' : 'text-white',
            )}
          >
            Sign in
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">Open a corporate account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
