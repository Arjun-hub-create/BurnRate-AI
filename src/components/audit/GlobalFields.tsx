import type { UseCaseType } from '../../types/audit';
import type { ValidationError } from '../../types/audit';
import { getFieldError } from '../../utils/validation';

interface GlobalFieldsProps {
  teamSize: number;
  useCase: UseCaseType;
  errors: ValidationError[];
  onTeamSizeChange: (size: number) => void;
  onUseCaseChange: (useCase: UseCaseType) => void;
}

const USE_CASE_OPTIONS: { value: UseCaseType; label: string }[] = [
  { value: 'coding', label: 'Coding' },
  { value: 'writing', label: 'Writing' },
  { value: 'research', label: 'Research' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'mixed', label: 'Mixed / All of the above' },
];

export function GlobalFields({
  teamSize,
  useCase,
  errors,
  onTeamSizeChange,
  onUseCaseChange,
}: GlobalFieldsProps) {
  const teamSizeError = getFieldError(errors, 'teamSize');
  const useCaseError = getFieldError(errors, 'useCase');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Team Details</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="team-size" className="block text-xs font-medium text-slate-600">
            Team size
          </label>
          <input
            id="team-size"
            type="number"
            min={1}
            step={1}
            value={teamSize || ''}
            onChange={(e) => onTeamSizeChange(parseInt(e.target.value, 10) || 0)}
            placeholder="e.g. 8"
            className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
              teamSizeError
                ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
                : 'border-slate-200 focus:border-brand-500 focus:ring-brand-400'
            }`}
          />
          {teamSizeError && <p className="mt-1 text-xs text-red-500">{teamSizeError}</p>}
        </div>
        <div>
          <label htmlFor="use-case" className="block text-xs font-medium text-slate-600">
            Primary use case
          </label>
          <select
            id="use-case"
            value={useCase}
            onChange={(e) => onUseCaseChange(e.target.value as UseCaseType)}
            className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
              useCaseError
                ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
                : 'border-slate-200 focus:border-brand-500 focus:ring-brand-400'
            }`}
          >
            {USE_CASE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {useCaseError && <p className="mt-1 text-xs text-red-500">{useCaseError}</p>}
        </div>
      </div>
    </div>
  );
}
