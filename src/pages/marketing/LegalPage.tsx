import { useParams } from 'react-router-dom';

const legalPages: Record<string, { title: string; sections: { heading: string; copy: string }[] }> = {
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Account eligibility', copy: 'Eligibility for account access and use of the demo service is limited to authorized users and illustrative purposes only.' },
      { heading: 'Fees and charges', copy: 'Fees presented in this demo do not reflect actual pricing and are for sample interface display only.' },
      { heading: 'Use of services', copy: 'The services and account features shown are simulated for demonstration and are not a legally binding offering.' },
      { heading: 'Limitation of liability', copy: 'Westgate Bank is not responsible for decisions made in reliance on this demo content; this is a demonstration environment only.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Data collection', copy: 'This demo does not collect real personal information and is intended for interface review only.' },
      { heading: 'Use of information', copy: 'Any information entered in the demo environment is not used for actual account operations.' },
      { heading: 'Security', copy: 'Security references in this demo are illustrative and not tied to production systems.' },
      { heading: 'Third-party services', copy: 'No real third-party integrations are active in this demonstration environment.' },
    ],
  },
  disclosures: {
    title: 'Regulatory Disclosures',
    sections: [
      { heading: 'Fictitious regulatory notice', copy: 'The content on this page is a placeholder for demonstration purposes and does not constitute real regulatory disclosures.' },
      { heading: 'Product availability', copy: 'Products and services shown are illustrative and not available as real commercial banking products.' },
      { heading: 'Demo environment', copy: 'This environment is a demonstration only and does not process real funds or maintain real accounts.' },
      { heading: 'No offer', copy: 'This page does not represent an offer to lend or open real accounts.' },
    ],
  },
};

export function LegalPage() {
  const { page } = useParams();
  const legal = page ? legalPages[page] : legalPages.terms;

  if (!legal) {
    return <div className="p-10">Legal page not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-10 text-primary dark:text-white">
      <h1 className="text-4xl font-semibold tracking-tight">{legal.title}</h1>
      <p className="mt-3 text-sm text-secondary dark:text-secondary/80">Last updated June 2026</p>
      <div className="mt-10 space-y-10">
        {legal.sections.map((section) => (
          <div key={section.heading} className="space-y-3 rounded-xl border border-border bg-white p-8 shadow-card dark:border-navy-200/60 dark:bg-navy-50">
            <h2 className="text-2xl font-semibold text-primary dark:text-white">{section.heading}</h2>
            <p className="text-base leading-8 text-secondary dark:text-secondary/80">{section.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
