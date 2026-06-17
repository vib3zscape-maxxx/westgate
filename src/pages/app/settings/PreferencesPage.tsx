import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export function PreferencesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Preferences</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Customize your account preferences and notifications</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Display currency</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Select your default display currency for account balances</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-primary dark:text-white">Default currency</label>
          <select className="mt-3 w-full rounded-lg border border-border bg-white px-4 py-2 text-sm text-primary dark:border-navy-200/60 dark:bg-navy-100 dark:text-white">
            <option>USD (US Dollar)</option>
            <option>EUR (Euro)</option>
            <option>GBP (British Pound)</option>
          </select>
        </div>
      </Card>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Notification preferences</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Choose how you'd like to be notified</p>
        </div>

        <div className="space-y-4">
          {[
            { id: 'large-txn', label: 'Large transactions', desc: 'Transactions over $50,000' },
            { id: 'device-login', label: 'New device login', desc: 'When you sign in from a new device' },
            { id: 'fraud-alert', label: 'Fraud alerts', desc: 'Suspicious activity detected' },
            { id: 'statement-ready', label: 'Statement ready', desc: 'Your monthly statement is ready' },
          ].map((pref) => (
            <label key={pref.id} className="flex items-center gap-4 rounded-lg border border-border p-4 dark:border-navy-200/60">
              <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
              <div>
                <p className="font-semibold text-primary dark:text-white">{pref.label}</p>
                <p className="text-xs text-secondary dark:text-secondary/80">{pref.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </Card>

      <Button>Save preferences</Button>
    </div>
  );
}
