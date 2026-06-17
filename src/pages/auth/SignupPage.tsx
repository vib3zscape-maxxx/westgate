import { FormEvent, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10 text-primary dark:text-white">
      <div className="rounded-xl border border-border bg-white p-10 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
        <h1 className="text-4xl font-semibold tracking-tight">Open a corporate account</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-secondary dark:text-secondary/80">
          Complete this demo request form and a Westgate representative will follow up in the demonstration environment.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-xl bg-accent/10 p-6 text-primary">
            Thank you. Your request has been submitted in this demonstration environment.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <Input label="Company name" placeholder="Company name" />
            <Input label="Email" type="email" placeholder="name@company.com" />
            <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
            <Input label="Primary contact" placeholder="Contact name" />
            <Button type="submit" size="lg">
              Request account
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
