import type { ToolPricing } from '../../types/audit';
import { clsx } from '../../utils/classNames';

interface ToolCardProps {
  tool: ToolPricing;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ToolCard({ tool, selected, onToggle }: ToolCardProps) {
  return (
    <button
      type="button"
      id={`tool-card-${tool.id}`}
      onClick={() => onToggle(tool.id)}
      aria-pressed={selected}
      className={clsx(
        'w-full rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2',
        selected
          ? 'border-brand-500 bg-brand-50 shadow-sm'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{tool.name}</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">{tool.description}</p>
        </div>
        <span
          className={clsx(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition',
            selected ? 'border-brand-500 bg-brand-500 text-white' : 'border-slate-300 bg-white'
          )}
          aria-hidden="true"
        >
          {selected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </div>
    </button>
  );
}
