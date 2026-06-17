import { motion } from '../../lib/motion';
import { Button } from '../ui/Button';
import { HeroDashboardMockup } from './HeroDashboardMockup';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:200px_200px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,124,63,0.18),_transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.04),_transparent_18%)]" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[55%_45%] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="max-w-2xl">
              <p className="text-base font-semibold uppercase tracking-[0.24em] text-accent/80">Westgate Bank</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-6xl">
                Treasury infrastructure for companies that move at scale.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-200">
                Westgate Bank gives finance teams a single command center for accounts, payments, and yield — across 50+ currencies, with same-day domestic wires and same-day SWIFT initiation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Open a corporate account</Button>
              <button className="text-sm font-semibold text-white/85 underline-offset-4 hover:text-accent hover:underline">
                Talk to treasury sales
              </button>
            </div>

            <p className="text-sm text-slate-300">
              Member FDIC · Chartered 1998 · $0 minimum balance to open
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-x-6 -inset-y-6 rounded-xl bg-accent/10 blur-3xl" />
            <div className="relative">
              <HeroDashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
