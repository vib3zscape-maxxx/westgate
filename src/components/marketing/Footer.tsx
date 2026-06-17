import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-light text-primary dark:bg-navy dark:text-white">
      <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary dark:text-white">Company</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary/80">
              <Link to="/about" className="block hover:text-accent">About</Link>
              <Link to="/contact" className="block hover:text-accent">Contact</Link>
              <Link to="/about#careers" className="block hover:text-accent">Careers</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary dark:text-white">Solutions</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary/80">
              <Link to="/business" className="block hover:text-accent">Business banking</Link>
              <Link to="/loans" className="block hover:text-accent">Loans & trade finance</Link>
              <Link to="/treasury" className="block hover:text-accent">Treasury & yield</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary dark:text-white">Resources</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary/80">
              <Link to="/resources#security" className="block hover:text-accent">Security center</Link>
              <Link to="/resources#faqs" className="block hover:text-accent">FAQs</Link>
              <Link to="/resources" className="block hover:text-accent">Help center</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary dark:text-white">Legal</p>
            <div className="space-y-2 text-sm text-secondary dark:text-secondary/80">
              <Link to="/legal/terms" className="block hover:text-accent">Terms of Service</Link>
              <Link to="/legal/privacy" className="block hover:text-accent">Privacy Policy</Link>
              <Link to="/legal/disclosures" className="block hover:text-accent">Regulatory disclosures</Link>
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-secondary dark:text-secondary/80">
          <div className="flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
            <p>Chartered 1998 · Member FDIC · Federal Reserve Member Bank · Audited annually</p>
            <p>Routing No. 071000890</p>
          </div>
          <p className="border-t border-border pt-6">© 2026 Westgate Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
