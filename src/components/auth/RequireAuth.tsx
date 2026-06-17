import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { requireSupabase } from '../../lib/supabase';

type RequireAuthProps = {
  children: ReactNode;
  role?: 'company_user' | 'admin';
};

export function RequireAuth({ children, role }: RequireAuthProps) {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      let client;
      try {
        client = requireSupabase();
      } catch (err) {
        setAuthorized(false);
        setIsReady(true);
        return;
      }

      const { data } = await client.auth.getSession();
      if (!data.session?.user) {
        setAuthorized(false);
        setIsReady(true);
        return;
      }

      const { data: profile, error } = await client
        .from('profiles')
        .select('role')
        .eq('user_id', data.session.user.id)
        .single();

      if (error || !profile) {
        setAuthorized(false);
      } else if (role && profile.role !== role) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }

      setIsReady(true);
    };

    verify();
  }, [role]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-light px-6 py-20 text-center text-primary dark:bg-navy dark:text-white">
        <div className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-5 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent/40 border-t-accent" />
          <span className="ml-3 text-sm font-semibold">Checking your session…</span>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
