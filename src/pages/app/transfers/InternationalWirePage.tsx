import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';

export function InternationalWirePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'amount' | 'review' | 'confirmation'>('details');

  const handleNext = () => {
    if (step === 'details') setStep('amount');
    else if (step === 'amount') setStep('review');
  };

  const handleConfirm = () => {
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">SWIFT transfer confirmed</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Your international wire has been submitted</p>
        </div>

        <Card padding="lg" className="space-y-6 bg-success/5 dark:bg-success/10">
          <div>
            <p className="text-sm text-secondary dark:text-secondary/80">SWIFT Reference (MT103)</p>
            <p className="mt-2 font-mono text-lg font-semibold text-primary dark:text-white">WGB2026061700147</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">You send</p>
              <p className="mt-1 font-mono text-base font-semibold text-primary dark:text-white">$50,000.00 USD</p>
            </div>
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">They receive</p>
              <p className="mt-1 font-mono text-base font-semibold text-primary dark:text-white">€46,500.00 EUR</p>
            </div>
          </div>

          <p className="text-xs text-secondary dark:text-secondary/80">International wire typically processes in 1-3 business days. You'll receive updates as the payment moves through the correspondent banking network.</p>
        </Card>

        <Button onClick={() => navigate('/app/overview')}>Back to overview</Button>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Review SWIFT transfer</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Please verify the details before sending</p>
        </div>

        <Card padding="lg" className="space-y-6">
          <div className="rounded-lg border border-border bg-muted p-4 dark:border-navy-200/60 dark:bg-navy-100">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-secondary dark:text-secondary/80 uppercase">You send</p>
                <p className="mt-1 font-mono text-lg font-semibold text-primary dark:text-white">$50,000.00</p>
              </div>
              <div>
                <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Exchange rate</p>
                <p className="mt-1 text-sm font-semibold text-primary dark:text-white">1 USD = 0.93 EUR</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted p-4 dark:border-navy-200/60 dark:bg-navy-100">
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">Wire fee</p>
              <p className="mt-1 text-base font-semibold text-primary dark:text-white">$35.00</p>
            </div>
          </div>

          <div className="rounded-lg border border-success/20 bg-success/5 p-4 dark:border-success/30 dark:bg-success/10">
            <div>
              <p className="text-xs text-secondary dark:text-secondary/80 uppercase">They receive (after fees & FX)</p>
              <p className="mt-1 font-mono text-2xl font-semibold text-success">€46,500.00</p>
            </div>
            <p className="mt-2 text-xs text-secondary dark:text-secondary/80">Rate locked for 10 minutes</p>
          </div>

          <div className="space-y-2 border-t border-border pt-4 dark:border-navy-200/60">
            <div className="flex justify-between text-sm">
              <span className="text-secondary dark:text-secondary/80">Recipient: Société Générale</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary dark:text-secondary/80">IBAN: FR1420041010050500013M02606</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep('amount')}>
            Back
          </Button>
          <Button onClick={handleConfirm}>Send transfer</Button>
        </div>
      </div>
    );
  }

  if (step === 'amount') {
    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-primary dark:text-white">Amount & currency</h2>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Step 2 of 3</p>
        </div>

        <Card padding="lg" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-primary dark:text-white">From currency</label>
              <select className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
                <option>USD (US Dollar)</option>
              </select>
            </div>
            <Input label="Amount to send" placeholder="50,000.00" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-primary dark:text-white">To currency</label>
              <select className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
                <option>EUR (Euro)</option>
                <option>GBP (British Pound)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-primary dark:text-white">They will receive</label>
              <div className="mt-2 rounded-lg bg-muted p-3 font-mono text-lg font-semibold text-primary dark:bg-navy-100 dark:text-white">
                €46,500.00
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted p-4 dark:border-navy-200/60 dark:bg-navy-100">
            <p className="text-xs text-secondary dark:text-secondary/80">Rate: 1 USD = 0.93 EUR — locked for 10 minutes</p>
            <p className="mt-2 text-xs text-secondary dark:text-secondary/80">Fee: $35.00</p>
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setStep('details')}>
              Back
            </Button>
            <Button onClick={handleNext}>Continue to review</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Send international SWIFT transfer</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Step 1 of 3 — Recipient & bank details</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <Input label="Recipient name" placeholder="Jean-Claude Dufour" />

        <div>
          <label className="text-sm font-semibold text-primary dark:text-white">Recipient country</label>
          <select className="mt-2 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
            <option>France</option>
            <option>Germany</option>
            <option>United Kingdom</option>
          </select>
        </div>

        <Input label="Recipient bank name" placeholder="Société Générale" />
        <Input label="SWIFT / BIC code" placeholder="SOGEFRPP" />
        <Input label="IBAN / Account number" placeholder="FR1420041010050500013M02606" />

        <Button onClick={handleNext}>Continue</Button>
      </Card>
    </div>
  );
}
