import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function NotificationsPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'fraud_alert',
      title: 'Unusual activity detected',
      body: 'A transfer of $250,000 to a new international recipient was initiated. Please verify this was authorized.',
      timestamp: '2 hours ago',
      icon: AlertCircle,
    },
    {
      id: '2',
      type: 'info',
      title: 'Statement ready',
      body: 'Your May 2026 account statement is now available for download.',
      timestamp: '1 day ago',
      icon: CheckCircle,
    },
    {
      id: '3',
      type: 'info',
      title: 'Large transaction',
      body: 'A transfer of $500,000 USD to XYZ Corp was completed.',
      timestamp: '3 days ago',
      icon: Info,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Notifications</h2>
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notif) => {
          const IconComponent = notif.icon;
          const isFraudAlert = notif.type === 'fraud_alert';

          return (
            <div
              key={notif.id}
              className={`rounded-xl border p-6 transition ${
                isFraudAlert
                  ? 'border-danger/20 bg-danger/5 dark:border-danger/30 dark:bg-danger/10'
                  : 'border-border bg-white dark:border-navy-200/60 dark:bg-navy-50'
              }`}
            >
              <div className="flex gap-4">
                <div className={`flex-shrink-0 ${isFraudAlert ? 'text-danger' : 'text-info'}`}>
                  <IconComponent size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-primary dark:text-white">{notif.title}</h3>
                      <p className="mt-1 text-sm text-secondary dark:text-secondary/80">{notif.body}</p>
                    </div>
                    {isFraudAlert && <Badge tone="danger">Action recommended</Badge>}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-secondary dark:text-secondary/80">{notif.timestamp}</p>
                    {isFraudAlert && (
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          This was me
                        </Button>
                        <Button variant="danger" size="sm">
                          This wasn't me
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
