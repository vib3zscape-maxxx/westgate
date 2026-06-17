import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function MarketingLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const [solidNav, setSolidNav] = useState(location.pathname !== '/');

  useEffect(() => {
    if (location.pathname !== '/') {
      setSolidNav(true);
      return;
    }

    const handleScroll = () => {
      setSolidNav(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-light text-primary dark:bg-navy dark:text-white">
      <Navbar solid={solidNav} />
      <main className="pt-0">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
