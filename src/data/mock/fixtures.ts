export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export type MockCompany = {
  name: string;
  contact: string;
  status: 'active' | 'restricted';
  currencies: string[];
};

export type MockCard = {
  companyName: string;
  holderName: string;
  type: 'physical' | 'virtual';
  last4: string;
  status: 'active' | 'frozen';
  expiry: string;
};

export type MockNotification = {
  companyName: string;
  type: 'info' | 'warning' | 'danger';
  title: string;
  body: string;
  read: boolean;
};

export type MockAuthCode = {
  companyName: string;
  code: string;
  expiresAt: string;
  used: boolean;
};

export const FEATURED_CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'GHS', name: 'Ghana Cedi', symbol: '₵' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
];

export const USD_TO_X_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 151.32,
  CAD: 1.36,
  AUD: 1.49,
  CHF: 0.91,
  CNY: 7.22,
  HKD: 7.83,
  SGD: 1.33,
  MXN: 17.85,
  BRL: 5.20,
  INR: 83.15,
  AED: 3.67,
  SEK: 10.40,
  NOK: 11.15,
  DKK: 6.89,
  NZD: 1.61,
  ZAR: 18.96,
  KRW: 1320.5,
  PLN: 3.92,
  TRY: 31.7,
  RUB: 91.2,
  CZK: 23.1,
  HUF: 377.1,
  MYR: 4.70,
  THB: 35.2,
  IDR: 15685,
  PHP: 56.8,
  ILS: 3.57,
  SAR: 3.75,
  KWD: 0.31,
  QAR: 3.65,
  EGP: 30.1,
  COP: 4050,
  CLP: 860,
  PEN: 3.77,
  ARS: 810,
  NGN: 1625,
  PKR: 284,
  BHD: 0.38,
  OMR: 0.39,
  KES: 156.8,
  GHS: 15.4,
  RON: 4.31,
  HRK: 7.12,
  BGN: 1.80,
  VND: 24165,
  TWD: 31.1,
  UAH: 36.6,
  BDT: 106.9,
};

export const MOCK_COMPANIES: MockCompany[] = [
  { name: 'Brightline Manufacturing Co.', contact: 'J. Alvarez', status: 'active', currencies: ['USD', 'EUR', 'CAD'] },
  { name: 'Harlow & Voss Logistics', contact: 'P. Okafor', status: 'active', currencies: ['USD', 'GBP', 'JPY'] },
  { name: 'Meridian Retail Group', contact: 'S. Tanaka', status: 'active', currencies: ['USD', 'EUR', 'AUD', 'SGD'] },
  { name: 'Ironwood Industrial Supply', contact: 'D. Reyes', status: 'restricted', currencies: ['USD'] },
  { name: 'Castellan Biotech', contact: 'M. Chen', status: 'active', currencies: ['USD', 'EUR', 'CHF'] },
  { name: 'Nordpoint Energy Partners', contact: 'K. Larsen', status: 'active', currencies: ['USD', 'CAD', 'GBP'] },
];

export const MOCK_CARDS: MockCard[] = [
  { companyName: 'Brightline Manufacturing Co.', holderName: 'J. Alvarez', type: 'physical', last4: '4123', status: 'active', expiry: '12/26' },
  { companyName: 'Harlow & Voss Logistics', holderName: 'P. Okafor', type: 'virtual', last4: '8851', status: 'active', expiry: '09/27' },
  { companyName: 'Meridian Retail Group', holderName: 'S. Tanaka', type: 'physical', last4: '3190', status: 'active', expiry: '03/28' },
  { companyName: 'Ironwood Industrial Supply', holderName: 'D. Reyes', type: 'virtual', last4: '7714', status: 'frozen', expiry: '01/27' },
  { companyName: 'Castellan Biotech', holderName: 'M. Chen', type: 'physical', last4: '2548', status: 'active', expiry: '11/26' },
  { companyName: 'Nordpoint Energy Partners', holderName: 'K. Larsen', type: 'virtual', last4: '6037', status: 'active', expiry: '08/27' },
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  { companyName: 'Brightline Manufacturing Co.', type: 'info', title: 'Wire initiated', body: 'A same-day domestic wire was initiated for supplier payments.', read: false },
  { companyName: 'Harlow & Voss Logistics', type: 'warning', title: 'Pending approval', body: 'A high-value payroll run is awaiting approval.', read: false },
  { companyName: 'Meridian Retail Group', type: 'info', title: 'New FX rate available', body: 'EUR/USD rates were updated for live FX settlement.', read: true },
  { companyName: 'Ironwood Industrial Supply', type: 'danger', title: 'Frozen card', body: 'A virtual card has been frozen after unusual international activity.', read: false },
  { companyName: 'Castellan Biotech', type: 'info', title: 'Statement ready', body: 'Your latest monthly operating account statement is available.', read: true },
  { companyName: 'Nordpoint Energy Partners', type: 'warning', title: 'Approvals required', body: 'Two transfers require secondary authorization before settlement.', read: false },
];

export const MOCK_AUTH_CODES: MockAuthCode[] = [
  { companyName: 'Brightline Manufacturing Co.', code: '304812', expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), used: false },
  { companyName: 'Harlow & Voss Logistics', code: '918204', expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), used: false },
];

export const PLATFORM_STATS = {
  activeCompanies: 184,
  totalSimulatedAUM_USD: 2_840_000_000,
  transactionsProcessed30d: 12_406,
  avgSwiftInitiationMinutes: 6,
  pendingApprovals: 7,
};

export const FRAUD_ALERT_TEMPLATES = [
  { id: 'login-location', label: 'Unusual login location', body: 'We noticed a sign-in to your account from a new location. If this wasn\'t you, secure your account immediately.' },
  { id: 'large-transfer', label: 'Large transfer flagged', body: 'A transfer exceeding your typical activity pattern was flagged for review.' },
  { id: 'card-international', label: 'Card used internationally', body: 'A card on your account was just used for an international transaction.' },
];
