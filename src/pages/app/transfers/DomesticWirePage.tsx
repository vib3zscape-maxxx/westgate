import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';

export function DomesticWirePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'review' | 'confirmation'>('form');

  const handleSubmit = () => {
    setStep('review');
  };

  const handleConfirm = () => {
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Transfer confirmed</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Your domestic wire has been submitted</p>
        </div>

        <Card padding="lg" className="space-y-6 bg-success/5 dark:bg-success/10">
          <div>
            <p className="text-sm text-secondary dark:text-secondary/80">Confirmation number</p>
            <p className="mt-2 font-mono text-lg font-semibold text-primary dark:text-white">DW20260617001247</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Amount</p>
              <p className="mt-1 font-mono text-base font-semibold text-primary dark:text-white">$25,000.00</p>
            </div>
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Status</p>
              <p className="mt-1 text-base font-semibold text-success">Initiated</p>
            </div>
          </div>

          <p className="text-xs text-secondary dark:text-secondary/80">The wire typically processes within 1-2 business days. You'll receive an update once it's completed.</p>
        </Card>

        <Button onClick={() => navigate('/app/overview')}>Back to overview</Button>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Review transfer</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Please verify the details before sending</p>
        </div>

        <Card padding="lg" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">From account</p>
              <p className="mt-2 font-semibold text-primary dark:text-white">USD Checking</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Recipient</p>
              <p className="mt-2 font-semibold text-primary dark:text-white">Acme Vendor LLC</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Routing number</p>
              <p className="mt-2 font-mono text-primary dark:text-white">021000021</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Account number</p>
              <p className="mt-2 font-mono text-primary dark:text-white">••••••••8945</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Amount</p>
              <p className="mt-2 font-mono text-2xl font-semibold text-primary dark:text-white">$25,000.00</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-secondary dark:text-secondary/80 uppercase">Memo</p>
              <p className="mt-2 text-primary dark:text-white">Invoice #INV-2026-001234</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep('form')}>
            Back
          </Button>
          <Button onClick={handleConfirm}>Confirm transfer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Send domestic wire</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Transfer funds to a US domestic account</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-primary dark:text-white">From account</label>
            <select className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
              <option>USD Checking</option>
              <option>USD Savings</option>
            </select>
          </div>
        </div>

        <Input label="Recipient name" placeholder="Acme Vendor LLC" />

        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Routing number" placeholder="021000021" />
          <Input label="Account number" placeholder="••••••••8945" />
        </div>

        <Input label="Amount" placeholder="25,000.00" />
        <Input label="Memo (optional)" placeholder="Invoice #INV-2026-001234" />

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="timing" value="today" defaultChecked />
            <span className="text-sm text-secondary dark:text-secondary/80">Send today</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="timing" value="schedule" />
            <span className="text-sm text-secondary dark:text-secondary/80">Schedule for a later date</span>
          </label>
        </div>

        <Button onClick={handleSubmit}>Review transfer</Button>
      </Card>
    </div>
  );
}
