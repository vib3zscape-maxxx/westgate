import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { requireSupabase } from '../../lib/supabase';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    let client;

    try {
      client = requireSupabase();
    } catch (err) {
      setError('Supabase is not configured for this environment.');
      setLoading(false);
      return;
    }

    const { data, error: authError } = await client.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (authError || !data.user) {
      setError(authError?.message ?? 'Unable to sign in.');
      setLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('role, company_id')
      .eq('user_id', data.user.id)
      .single();

    if (profileError || !profile) {
      setError('Unable to load account profile.');
      setLoading(false);
      return;
    }

    if (profile.role === 'admin') {
      navigate('/admin/overview');
    } else {
      navigate('/2fa');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10 text-primary dark:text-white">
      <div className="rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
        <h1 className="text-4xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-secondary dark:text-secondary/80">
          Sign in with your demo credentials to continue to the Westgate dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
