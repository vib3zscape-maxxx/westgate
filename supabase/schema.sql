-- Westgate Bank Supabase schema
-- Run this in your Supabase SQL editor or migrate using the Supabase CLI.

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  primary_contact text,
  status text not null default 'active',
  created_at timestamptz default now()
);

create table balances (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  currency text not null,
  amount numeric not null default 0,
  updated_at timestamptz default now(),
  unique (company_id, currency)
);

create table transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  description text,
  channel text,
  currency text not null,
  amount numeric not null,
  fx_rate numeric,
  fee_amount numeric,
  status text not null default 'completed',
  swift_ref text,
  routing_number text,
  created_at timestamptz default now()
);

create table payroll_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  total_amount numeric not null,
  currency text not null,
  payee_count int not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create table payroll_payees (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references payroll_runs(id) on delete cascade,
  name text,
  account_masked text,
  amount numeric
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  type text not null,
  title text,
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

create table auth_codes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade,
  code text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);

create table profiles (
  user_id uuid primary key,
  company_id uuid references companies(id) on delete set null,
  role text not null default 'company_user',
  created_at timestamptz default now()
);

create table admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  admin_user text,
  action text,
  target_company_id uuid references companies(id),
  created_at timestamptz default now()
);
