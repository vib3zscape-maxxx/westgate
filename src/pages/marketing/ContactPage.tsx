import { Input } from '../../components/ui/Input';
import { Dropdown } from '../../components/ui/Dropdown';
import { Button } from '../../components/ui/Button';
import { useState } from 'react';

const topics = [
  { label: 'General inquiry', value: 'general' },
  { label: 'Treasury sales', value: 'sales' },
  { label: 'Support', value: 'support' },
  { label: 'Press', value: 'press' },
];

export function ContactPage() {
  const [topic, setTopic] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-16 bg-light text-primary dark:bg-navy dark:text-white">
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <h1 className="text-4xl font-semibold tracking-tight text-primary dark:text-white">Contact Westgate</h1>
            <p className="mt-4 text-base leading-8 text-secondary dark:text-secondary/80">Tell us how we can help, and our team will follow up promptly in this demo environment.</p>
            {submitted ? (
              <div className="mt-8 rounded-xl bg-accent/10 p-6 text-sm text-primary">
                Thank you. Your message has been received in this demonstration environment.
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-8 space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Input label="Name" placeholder="Your name" />
                  <Input label="Company" placeholder="Company name" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <Input label="Email" placeholder="name@company.com" type="email" />
                  <Input label="Phone" placeholder="(555) 123-4567" type="tel" />
                </div>
                <Dropdown label="Topic" value={topic} items={topics} onChange={setTopic} />
                <label className="block text-sm font-medium text-primary dark:text-white">
                  Message
                  <textarea className="mt-2 h-32 w-full rounded-md border border-border bg-muted p-3 text-sm text-primary focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </label>
                <Button type="submit" size="lg">Submit inquiry</Button>
              </form>
            )}
          </div>
          <div className="space-y-6 rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <div>
              <p className="text-sm font-semibold text-secondary dark:text-secondary/80">Sales inquiries</p>
              <p className="mt-2 text-base text-primary dark:text-white">sales@westgatebank.demo</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary dark:text-secondary/80">Support</p>
              <p className="mt-2 text-base text-primary dark:text-white">support@westgatebank.demo</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary dark:text-secondary/80">Address</p>
              <p className="mt-2 text-base text-primary dark:text-white">500 S. Tryon St, Charlotte, NC</p>
              <p className="mt-1 text-sm text-secondary dark:text-secondary/80">Mon–Fri, 8am–6pm ET</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
