import { Accordion } from '../../components/ui/Accordion';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const faqs = [
  { title: 'How long does account opening take?', content: 'New corporate accounts in this demo environment are typically set up within 3-5 business days for onboarding simulation purposes.' },
  { title: 'What are your FX fees?', content: 'FX fees are illustrative in this demo; actual fees would depend on account type and transaction profile.' },
  { title: 'When are wire cutoff times?', content: 'Domestic wires can be initiated same-day when entered before the simulated treasury cutoff, with international SWIFT initiation available same-day as well.' },
  { title: 'How do I enable 2FA?', content: 'Two-factor authentication is configured in the security settings and uses the generated auth codes from the admin tool for demo access.' },
  { title: 'What are the international transfer limits?', content: 'Transfer limits are simulated for the demo and can be viewed in the app settings; real limits would vary by underwriting.' },
  { title: 'When are statements available?', content: 'Statements and documents are available for download from the statements page once transactions are posted.' },
];

export function ResourcesPage() {
  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="bg-navy px-6 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight">How can we help?</h1>
          <div className="mt-8 max-w-2xl rounded-xl bg-muted p-6 text-primary dark:bg-navy-50 dark:text-white">
            <Input label="Search help articles" placeholder="Search articles, workflows, or concepts" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {['Getting started', 'Payments & transfers', 'Security & fraud', 'Statements & tax docs', 'API & integrations', 'Fees & pricing'].map((category) => (
            <Card key={category} className="space-y-3">
              <h2 className="text-xl font-semibold text-primary dark:text-white">{category}</h2>
              <p className="text-sm leading-7 text-secondary dark:text-secondary/80">Essential information and guidance for treasury teams operating the platform.</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10" id="faqs">
        <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Frequently asked questions</h2>
        <div className="mt-8">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10" id="security">
        <div className="rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
          <h2 className="text-3xl font-semibold tracking-tight text-primary dark:text-white">Security center</h2>
          <p className="mt-4 text-base leading-8 text-secondary dark:text-secondary/80">Secure account access, multi-factor authentication, and admin controls are all part of the trust architecture in the Westgate platform.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-navy px-8 py-12 text-white dark:bg-navy-100">
          <h2 className="text-3xl font-semibold tracking-tight">Still need help?</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">Contact support through the form or reach out to your relationship manager for assistance.</p>
          <div className="mt-8">
            <Button size="lg">Contact support</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
