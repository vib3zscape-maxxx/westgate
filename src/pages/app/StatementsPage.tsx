import { Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function StatementsPage() {
  const mockStatements = [
    { id: '1', period: 'May 2026', account: 'USD Checking', type: 'Statement' },
    { id: '2', period: 'April 2026', account: 'USD Checking', type: 'Statement' },
    { id: '3', period: 'March 2026', account: 'EUR Account', type: 'Statement' },
    { id: '4', period: 'May 2026', account: 'USD Checking', type: 'Tax document' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary dark:text-white">Statements & Documents</h2>
        <p className="mt-2 text-sm text-secondary dark:text-secondary/80">Download account statements and tax documents</p>
      </div>

      <Card padding="lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border dark:border-navy-200/60">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-primary dark:text-white">Period</th>
                <th className="px-4 py-3 text-left font-semibold text-primary dark:text-white">Account / Currency</th>
                <th className="px-4 py-3 text-left font-semibold text-primary dark:text-white">Type</th>
                <th className="px-4 py-3 text-right font-semibold text-primary dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-navy-200/60">
              {mockStatements.map((stmt) => (
                <tr key={stmt.id} className="hover:bg-muted/30 dark:hover:bg-navy-100/30">
                  <td className="px-4 py-3 text-secondary dark:text-secondary/80">{stmt.period}</td>
                  <td className="px-4 py-3 text-secondary dark:text-secondary/80">{stmt.account}</td>
                  <td className="px-4 py-3 text-secondary dark:text-secondary/80">{stmt.type}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Demo environment — download disabled"
                      className="opacity-50 cursor-not-allowed"
                    >
                      <Download size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-secondary dark:text-secondary/80">
        Demo environment — PDF downloads disabled. In production, real statements would be generated here.
      </p>
    </div>
  );
}
