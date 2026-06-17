import { createClient } from '@supabase/supabase-js';
import { MOCK_COMPANIES, MOCK_NOTIFICATIONS, MOCK_AUTH_CODES } from '../src/data/mock/fixtures';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to run the seed script.');
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

function companySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function randomAmount(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) / 100) * 100;
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

async function seed() {
  console.log('Seeding Westgate demo data...');

  const createdCompanies = [] as Array<{ id: string; name: string }>;

  for (const company of MOCK_COMPANIES) {
    const { data, error } = await supabase
      .from('companies')
      .insert({ name: company.name, primary_contact: company.contact, status: company.status })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to insert company ${company.name}: ${error.message}`);
    }

    createdCompanies.push({ id: data.id, name: company.name });
  }

  const adminEmail = 'admin@westgatebank.demo';
  const adminPassword = 'WestgateAdmin123!';

  const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,
  });

  if (adminError || !adminUser) {
    throw new Error(`Failed to create admin user: ${adminError?.message ?? 'unknown error'}`);
  }

  const { error: adminProfileError } = await supabase.from('profiles').insert({
    user_id: adminUser.id,
    company_id: null,
    role: 'admin',
  });

  if (adminProfileError) {
    throw new Error(`Failed to create admin profile: ${adminProfileError.message}`);
  }

  for (const company of createdCompanies) {
    const email = `${companySlug(company.name)}@westgatebank.demo`;
    const password = 'CompanyUser123!';

    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (userError || !user) {
      throw new Error(`Failed to create auth user for ${company.name}: ${userError?.message ?? 'unknown error'}`);
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      user_id: user.id,
      company_id: company.id,
      role: 'company_user',
    });

    if (profileError) {
      throw new Error(`Failed to create profile for ${company.name}: ${profileError.message}`);
    }

    const currencies = MOCK_COMPANIES.find((item) => item.name === company.name)?.currencies ?? ['USD'];

    const balanceInserts = currencies.map((currency) => ({
      company_id: company.id,
      currency,
      amount: randomAmount(250_000, 15_000_000),
    }));

    const { error: balanceError } = await supabase.from('balances').insert(balanceInserts);
    if (balanceError) {
      throw new Error(`Failed to insert balances for ${company.name}: ${balanceError.message}`);
    }

    const transactionTemplates = [
      { description: 'Supplier payment', channel: 'Wire', amount: -128_400, status: 'completed', fee_amount: 15, currency: 'USD' },
      { description: 'Payroll run', channel: 'ACH', amount: -425_000, status: 'pending', fee_amount: 45, currency: 'USD' },
      { description: 'Client settlement', channel: 'SWIFT', amount: 310_000, status: 'completed', fee_amount: 55, currency: 'USD' },
      { description: 'FX settlement', channel: 'SWIFT', amount: 210_000, status: 'held', fee_amount: 42, currency: 'EUR' },
      { description: 'Card rebate', channel: 'Card', amount: 18_750, status: 'completed', fee_amount: 0, currency: 'USD' },
    ];

    const transactions = transactionTemplates.flatMap((template, index) => {
      const currency = currencies.includes(template.currency) ? template.currency : currencies[0];

      return {
        company_id: company.id,
        description: template.description,
        channel: template.channel,
        currency,
        amount: template.amount,
        fx_rate: template.currency === 'USD' ? null : 1.0,
        fee_amount: template.fee_amount,
        status: template.status,
        swift_ref: template.channel === 'SWIFT' ? `SWFT-${company.id.slice(0, 8).toUpperCase()}-${index + 1}` : null,
        routing_number: template.channel === 'Wire' ? '071000890' : null,
        created_at: daysAgo(3 + index * 2),
      };
    });

    const { error: transactionError } = await supabase.from('transactions').insert(transactions);
    if (transactionError) {
      throw new Error(`Failed to insert transactions for ${company.name}: ${transactionError.message}`);
    }
  }

  const notificationInserts = MOCK_NOTIFICATIONS.map((notification) => {
    const company = createdCompanies.find((item) => item.name === notification.companyName);
    return {
      company_id: company?.id,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      read: notification.read,
      created_at: daysAgo(10),
    };
  }).filter((notification) => notification.company_id);

  const { error: notificationError } = await supabase.from('notifications').insert(notificationInserts);
  if (notificationError) {
    throw new Error(`Failed to insert notifications: ${notificationError.message}`);
  }

  const authCodeInserts = MOCK_AUTH_CODES.map((authCode) => {
    const company = createdCompanies.find((item) => item.name === authCode.companyName);
    return {
      company_id: company?.id,
      code: authCode.code,
      expires_at: authCode.expiresAt,
      used: authCode.used,
      created_at: new Date().toISOString(),
    };
  }).filter((authCode) => authCode.company_id);

  const { error: authCodeError } = await supabase.from('auth_codes').insert(authCodeInserts);
  if (authCodeError) {
    throw new Error(`Failed to insert auth codes: ${authCodeError.message}`);
  }

  console.log('Seed complete.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
