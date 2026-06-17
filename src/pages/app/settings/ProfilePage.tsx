import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Profile</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Manage your company details and contact information</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Company information</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">These details are associated with your Westgate account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-primary dark:text-white">Company name</label>
            <p className="mt-2 rounded-lg bg-muted p-3 text-sm text-secondary dark:bg-navy-100 dark:text-secondary/80">Acme Corporation</p>
          </div>

          <Input label="Display name" value="Acme Treasury Team" />
          <Input label="Primary contact email" type="email" value="treasury@acme.com" />
          <Input label="Phone" type="tel" value="+1 (415) 555-1234" />

          <div>
            <label className="text-sm font-semibold text-primary dark:text-white">EIN</label>
            <p className="mt-2 rounded-lg bg-muted p-3 text-sm font-mono text-secondary dark:bg-navy-100 dark:text-secondary/80">••••••••••••3847</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-primary dark:text-white">Account opened</label>
            <p className="mt-2 rounded-lg bg-muted p-3 text-sm text-secondary dark:bg-navy-100 dark:text-secondary/80">January 15, 2026</p>
          </div>
        </div>

        <Button>Save changes</Button>
      </Card>
    </div>
  );
}
