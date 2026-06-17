import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { requireSupabase } from '../../lib/supabase';

export function TwoFactorPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      let client;
      try {
        client = requireSupabase();
      } catch {
        navigate('/login');
        return;
      }

      const { data } = await client.auth.getSession();
      if (!data.session?.user) {
        navigate('/login');
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    let client;
    try {
      client = requireSupabase();
    } catch (err) {
      setError('Supabase is not configured for this environment.');
      setLoading(false);
      return;
    }

    const { data: sessionData } = await client.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) {
      setError('Please sign in first.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const { data: profile, error: profileError } = await client
      .from('profiles')
      .select('company_id')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile?.company_id) {
      setError('Unable to verify your account.');
      setLoading(false);
      return;
    }

    const now = new Date().toISOString();
    const { data: codes, error: codesError } = await client
      .from('auth_codes')
      .select('*')
      .eq('company_id', profile.company_id)
      .eq('code', code.trim())
      .eq('used', false)
      .gt('expires_at', now)
      .limit(1);

    if (codesError || !codes?.length) {
      setError("That code didn't match — check with your admin and try again.");
      setLoading(false);
      return;
    }

    const authCode = codes[0];
    const { error: updateError } = await client
      .from('auth_codes')
      .update({ used: true })
      .eq('id', authCode.id);

    if (updateError) {
      setError('Unable to verify your authentication code.');
      setLoading(false);
      return;
    }

    navigate('/app/overview');
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10 text-primary dark:text-white">
      <div className="rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
        <h1 className="text-4xl font-semibold tracking-tight">Two-factor authentication</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-secondary dark:text-secondary/80">
          Enter the authentication code generated for your company. This is a demonstration 2FA flow.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Input
            label="Authentication code"
            placeholder="Enter code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? 'Verifying…' : 'Verify code'}
          </Button>
        </form>
      </div>
    </div>
  );
}
