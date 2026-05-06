import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Section } from '../components/ui/Section';
import { features } from '../data/features';

export function Home() {
  return (
    <main>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                Spend smarter
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Stop Overpaying for AI Tools
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Instantly audit your AI stack and uncover hidden savings across ChatGPT, Claude,
                Cursor, Copilot, and more.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/audit">
                  <Button>Audit My AI Spend</Button>
                </Link>
                <Link to="/results">
                  <Button variant="secondary">See Example Report</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft">
              <div className="flex h-full flex-col justify-between gap-5 rounded-[1.75rem] bg-white p-8">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">
                    Audit preview
                  </p>
                  <p className="mt-4 text-lg font-semibold text-slate-900">AI spend summary</p>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-100 p-5">
                    <p className="text-sm text-slate-500">Total monthly AI spend</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">$3,720</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-100 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Top tool</p>
                      <p className="mt-2 font-semibold text-slate-900">ChatGPT Plus</p>
                    </div>
                    <div className="rounded-3xl bg-slate-100 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Savings opportunity
                      </p>
                      <p className="mt-2 font-semibold text-slate-900">$840</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Section
            title="What BurnRate AI helps teams do"
            subtitle="A practical place to start with your AI subscription review."
          >
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </Section>
          <Section title="How it works" subtitle="Three simple steps to a clearer AI budget.">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-3xl">1</p>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Enter your stack</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Add the tools, plans, and spend your team is currently paying for.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-3xl">2</p>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Analyze spending</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The app surfaces the biggest waste and overlapping subscriptions.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-3xl">3</p>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">Get recommendations</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  See a simple plan for cheaper alternatives and tighter spend.
                </p>
              </div>
            </div>
          </Section>
          <footer className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600">
            <p>
              BurnRate AI is a starting point for engineering and finance teams who want to keep AI
              subscriptions lean without changing core workflows.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
