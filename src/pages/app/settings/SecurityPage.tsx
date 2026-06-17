import { LogOut } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';

export function SecurityPage() {
  const mockSessions = [
    { id: '1', device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: '2 hours ago' },
    { id: '2', device: 'Safari on macOS', location: 'San Francisco, CA', lastActive: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Security</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Manage your account security settings</p>
      </div>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Two-factor authentication</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">
            Status: <span className="font-semibold text-success">Enabled</span>
          </p>
          <p className="mt-1 text-sm text-secondary dark:text-secondary/80">Method: Authenticator code</p>
        </div>
      </Card>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Active sessions</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Manage your active login sessions</p>
        </div>

        <div className="space-y-3">
          {mockSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between rounded-lg border border-border p-4 dark:border-navy-200/60">
              <div>
                <p className="font-semibold text-primary dark:text-white">{session.device}</p>
                <p className="text-xs text-secondary dark:text-secondary/80">{session.location} • {session.lastActive}</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="lg" className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-white">Change password</h3>
          <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Update your password regularly for security</p>
        </div>

        <div className="space-y-4">
          <Input label="Current password" type="password" placeholder="••••••••" />
          <Input label="New password" type="password" placeholder="••••••••" />
          <Input label="Confirm new password" type="password" placeholder="••••••••" />
          <Button>Update password</Button>
        </div>
      </Card>
    </div>
  );
}
