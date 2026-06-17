import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CurrencyTag } from '../ui/CurrencyTag';
import { Dropdown } from '../ui/Dropdown';
import { Input } from '../ui/Input';
import { StatTile } from '../ui/StatTile';
import { Table } from '../ui/Table';

const dropdownItems = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
];

export function ComponentPreview() {
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="space-y-8 py-10">
      <div className="grid gap-4 md:grid-cols-2">
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost action</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Badge tone="success">Completed</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="danger">Declined</Badge>
        <Badge tone="info">Info</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-secondary">Card example</p>
          <p className="text-base text-primary">This is a reusable card component.</p>
        </Card>
        <Card interactive>
          <p className="text-sm text-secondary">Interactive card</p>
          <p className="text-base text-primary">Hover changes shadow, not scale.</p>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Dropdown label="Currency" value={currency} items={dropdownItems} onChange={setCurrency} />
        <Input label="Account name" helperText="Enter a company account name." />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <StatTile label="Available liquidity" value="$23,400,000" delta="+8.7%" />
        <StatTile label="Completed transfers" value="132" />
      </div>
      <Table
        headers={['Account', 'Balance', 'Status']}
        rows={[
          ['Operating USD', '$12,300,000', 'Active'],
          ['Euro reserve', '€4,120,000', 'Active'],
          ['Payroll fund', '$2,150,000', 'Pending'],
        ]}
      />
      <div className="flex flex-wrap gap-2">
        <CurrencyTag code="USD" />
        <CurrencyTag code="EUR" />
        <CurrencyTag code="JPY" />
      </div>
    </div>
  );
}
