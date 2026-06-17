import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

export function PayrollPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'upload' | 'review' | 'confirmation'>('review');

  const mockPayees = [
    { id: '1', name: 'Alice Johnson', account: '••••••••1234', amount: 5000 },
    { id: '2', name: 'Bob Smith', account: '••••••••5678', amount: 4500 },
    { id: '3', name: 'Carol Wilson', account: '••••••••9012', amount: 5250 },
    { id: '4', name: 'David Lee', account: '••••••••3456', amount: 4800 },
  ];

  const total = mockPayees.reduce((sum, p) => sum + p.amount, 0);

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Payroll run submitted</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Your payroll has been submitted for approval</p>
        </div>

        <Card padding="lg" className="space-y-6 bg-warning/5 dark:bg-warning/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary dark:text-secondary/80">Status</p>
              <p className="mt-2 font-semibold text-warning">Pending approval</p>
            </div>
            <Badge tone="warning">Awaiting review</Badge>
          </div>

          <div>
            <p className="text-sm text-secondary dark:text-secondary/80">Reference number</p>
            <p className="mt-2 font-mono text-lg font-semibold text-primary dark:text-white">PR20260617001847</p>
          </div>

          <div className="rounded-lg border border-border bg-muted p-4 dark:border-navy-200/60 dark:bg-navy-100">
            <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Typical turnaround</p>
            <p className="mt-2 text-sm text-primary dark:text-white">Under 2 hours for standard payroll runs. Complex runs may take longer.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Total payees</p>
              <p className="mt-1 font-mono text-lg font-semibold text-primary dark:text-white">{mockPayees.length}</p>
            </div>
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Total amount</p>
              <p className="mt-1 font-mono text-lg font-semibold text-primary dark:text-white">${total.toLocaleString()}.00</p>
            </div>
          </div>
        </Card>

        <Button onClick={() => navigate('/app/overview')}>Back to overview</Button>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Review payroll run</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Please verify all payees and amounts before submission</p>
        </div>

        <Card padding="lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border dark:border-navy-200/60">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-primary dark:text-white">Payee</th>
                  <th className="px-4 py-3 text-left font-semibold text-primary dark:text-white">Account</th>
                  <th className="px-4 py-3 text-right font-semibold text-primary dark:text-white">Amount</th>
                  <th className="px-4 py-3 text-center font-semibold text-primary dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border dark:divide-navy-200/60">
                {mockPayees.map((payee) => (
                  <tr key={payee.id} className="hover:bg-muted/30 dark:hover:bg-navy-100/30">
                    <td className="px-4 py-3 font-semibold text-primary dark:text-white">{payee.name}</td>
                    <td className="px-4 py-3 font-mono text-secondary dark:text-secondary/80">{payee.account}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-primary dark:text-white">${payee.amount.toLocaleString()}.00</td>
                    <td className="px-4 py-3 text-center">
                      <button className="text-secondary hover:text-danger dark:text-secondary/80 dark:hover:text-danger">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted font-semibold dark:bg-navy-100">
                  <td colSpan={2} className="px-4 py-3 text-primary dark:text-white">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-primary dark:text-white">${total.toLocaleString()}.00</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card padding="lg" className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-primary dark:text-white">Funding account</p>
            <select className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
              <option>USD Checking (Acme Corp)</option>
            </select>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep('upload')}>
            Back
          </Button>
          <Button onClick={() => setStep('confirmation')}>
            Submit payroll run for approval
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Submit payroll run</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Send payments to multiple recipients at once</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center dark:border-navy-200/60">
          <p className="text-sm text-secondary dark:text-secondary/80">
            Upload a CSV file or add payees manually below
          </p>
          <Button variant="secondary" size="sm" className="mt-4">
            Choose file
          </Button>
        </div>

        <div className="text-center text-sm text-secondary dark:text-secondary/80">— or —</div>

        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <Input label="Payee name" placeholder="Name" className="flex-1" />
            <Input label="Account" placeholder="••••••••1234" className="flex-1" />
            <Input label="Amount" placeholder="5,000.00" className="flex-1" />
            <Button size="sm">
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <Button className="w-full" onClick={() => setStep('review')}>
          Continue with demo data
        </Button>
      </Card>
    </div>
  );
}
