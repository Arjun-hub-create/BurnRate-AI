import type { ToolUsage, ToolPricing } from '../../types/audit';
import { getFieldError } from '../../utils/validation';
import type { ValidationError } from '../../types/audit';

interface ToolFormProps {
  pricing: ToolPricing;
  usage: ToolUsage;
  errors: ValidationError[];
  onChange: (updated: ToolUsage) => void;
  onRemove: (toolId: string) => void;
}

export function ToolForm({ pricing, usage, errors, onChange, onRemove }: ToolFormProps) {
  const spendError = getFieldError(errors, `${usage.toolId}.monthlySpend`);
  const seatsError = getFieldError(errors, `${usage.toolId}.seats`);

  const isApiTool = pricing.plans.every((p) => p.id === 'api');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{pricing.name}</p>
        <button
          type="button"
          onClick={() => onRemove(usage.toolId)}
          className="text-xs text-slate-400 transition hover:text-slate-700"
          aria-label={`Remove ${pricing.name}`}
        >
          Remove
        </button>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Plan */}
        {!isApiTool && (
          <div>
            <label
              htmlFor={`${usage.toolId}-plan`}
              className="block text-xs font-medium text-slate-600"
            >
              Plan
            </label>
            <select
              id={`${usage.toolId}-plan`}
              value={usage.plan}
              onChange={(e) => onChange({ ...usage, plan: e.target.value as ToolUsage['plan'] })}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              {pricing.plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Seats */}
        {!isApiTool && (
          <div>
            <label
              htmlFor={`${usage.toolId}-seats`}
              className="block text-xs font-medium text-slate-600"
            >
              Seats / Users
            </label>
            <input
              id={`${usage.toolId}-seats`}
              type="number"
              min={1}
              step={1}
              value={usage.seats || ''}
              onChange={(e) => onChange({ ...usage, seats: parseInt(e.target.value, 10) || 0 })}
              placeholder="e.g. 5"
              className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
                seatsError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-brand-400'
              }`}
            />
            {seatsError && <p className="mt-1 text-xs text-red-500">{seatsError}</p>}
          </div>
        )}

        {/* Monthly spend */}
        <div className={isApiTool ? 'sm:col-span-2' : ''}>
          <label
            htmlFor={`${usage.toolId}-spend`}
            className="block text-xs font-medium text-slate-600"
          >
            {isApiTool ? 'Monthly API bill ($)' : 'Actual monthly spend ($)'}
          </label>
          <div className="relative mt-1.5">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-400">
              $
            </span>
            <input
              id={`${usage.toolId}-spend`}
              type="number"
              min={0}
              step={0.01}
              value={usage.monthlySpend || ''}
              onChange={(e) =>
                onChange({
                  ...usage,
                  monthlySpend: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              className={`w-full rounded-lg border py-2 pl-7 pr-3 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
                spendError
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
                  : 'border-slate-200 focus:border-brand-500 focus:ring-brand-400'
              }`}
            />
          </div>
          {spendError && <p className="mt-1 text-xs text-red-500">{spendError}</p>}
          {isApiTool && (
            <p className="mt-1 text-xs text-slate-400">Enter what you actually paid last month.</p>
          )}
        </div>

        {/* Notes — optional, spans full width */}
        <div className="sm:col-span-2">
          <label
            htmlFor={`${usage.toolId}-notes`}
            className="block text-xs font-medium text-slate-600"
          >
            Notes <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id={`${usage.toolId}-notes`}
            type="text"
            value={usage.notes}
            onChange={(e) => onChange({ ...usage, notes: e.target.value })}
            placeholder="e.g. used mainly for code review, heavy GPT-4o usage"
            className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
        </div>
      </div>
    </div>
  );
}
