import { useLocation, Link } from 'react-router-dom';
import type { AuditInput } from '../types/audit';
import { Button } from '../components/ui/Button';

interface LocationState {
  input?: AuditInput;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Results() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const input = state?.input;

  const totalSpend = input ? input.tools.reduce((sum, t) => sum + t.monthlySpend, 0) : null;

  // Rough placeholder estimate: assume ~20% savings opportunity
  const savingsEstimate = totalSpend !== null ? Math.round(totalSpend * 0.2) : null;

  // If reached directly without form data, show generic placeholder
  if (!input || totalSpend === null) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Example Report
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Your audit results</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            No audit data found.{' '}
            <Link
              to="/audit"
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              Run an audit first
            </Link>{' '}
            to see your personalized results.
          </p>
          <ExampleSummary />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-10">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Audit complete
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Your AI spend summary</h1>
        <p className="mt-2 text-sm text-slate-500">
          Based on {input.tools.length} tool{input.tools.length !== 1 ? 's' : ''} across a{' '}
          {input.teamSize}-person team focused on {input.useCase}.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Monthly AI spend"
          value={formatCurrency(totalSpend)}
          note="What you told us you pay"
        />
        <SummaryCard
          label="Annualised"
          value={formatCurrency(totalSpend * 12)}
          note="Projected yearly cost"
        />
        <SummaryCard
          label="Est. savings opportunity"
          value={formatCurrency(savingsEstimate ?? 0)}
          note="Rough 20% placeholder — full analysis coming Day 3"
          highlight
        />
      </div>

      {/* Per-tool breakdown */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-slate-900">Tool breakdown</p>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {input.tools.map((tool, i) => (
            <div
              key={tool.toolId}
              className={`flex items-center justify-between px-5 py-3 ${
                i !== input.tools.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div>
                <p className="text-sm font-medium capitalize text-slate-900">
                  {tool.toolId.replace(/-/g, ' ')}
                </p>
                {tool.seats > 0 && (
                  <p className="text-xs text-slate-400">
                    {tool.seats} seat{tool.seats !== 1 ? 's' : ''} · {tool.plan} plan
                  </p>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-900">
                {formatCurrency(tool.monthlySpend)}
                <span className="font-normal text-slate-400">/mo</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder recommendations */}
      <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-5">
        <p className="text-sm font-semibold text-brand-800">💡 Recommendations — coming Day 3</p>
        <p className="mt-1 text-sm leading-6 text-brand-700">
          Full optimization logic is being built next. For now, a few general things worth
          reviewing: overlapping code tools (e.g. Cursor + Copilot), ChatGPT Plus vs Team seat
          counts, and whether API usage is being monitored against a budget cap.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/audit">
          <Button variant="secondary">Edit audit</Button>
        </Link>
        <Link to="/share">
          <Button>Share report</Button>
        </Link>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Savings estimate is a rough placeholder. Full audit logic ships in the next iteration.
      </p>
    </main>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  note: string;
  highlight?: boolean;
}

function SummaryCard({ label, value, note, highlight }: SummaryCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'
      }`}
    >
      <p className={`text-xs font-medium ${highlight ? 'text-brand-600' : 'text-slate-500'}`}>
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold ${highlight ? 'text-brand-700' : 'text-slate-900'}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </div>
  );
}

function ExampleSummary() {
  return (
    <div className="mt-8">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Example output
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Monthly AI spend" value="$3,720" note="Across 6 tools" />
        <SummaryCard label="Annualised" value="$44,640" note="Projected yearly cost" />
        <SummaryCard
          label="Est. savings opportunity"
          value="$840"
          note="Based on plan overlap analysis"
          highlight
        />
      </div>
    </div>
  );
}
