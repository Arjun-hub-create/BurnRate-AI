import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuditInput, ToolId, ToolUsage } from '../types/audit';
import { TOOL_PRICING, getPricingById } from '../data/pricing';
import {
  saveAuditInput,
  loadAuditInput,
  saveSelectedTools,
  loadSelectedTools,
} from '../utils/storage';
import { validateAuditInput, getFieldError } from '../utils/validation';
import { ToolCard } from '../components/audit/ToolCard';
import { ToolForm } from '../components/audit/ToolForm';
import { GlobalFields } from '../components/audit/GlobalFields';
import { Button } from '../components/ui/Button';
import type { ValidationError } from '../types/audit';

const DEFAULT_INPUT: AuditInput = {
  teamSize: 1,
  useCase: 'mixed',
  tools: [],
};

function makeDefaultToolUsage(
  toolId: ToolId,
  pricing: ReturnType<typeof getPricingById>
): ToolUsage {
  const firstPlan = pricing?.plans[0];
  return {
    toolId,
    plan: firstPlan?.id ?? 'pro',
    seats: 1,
    monthlySpend: 0,
    notes: '',
  };
}

export function Audit() {
  const navigate = useNavigate();
  const [input, setInput] = useState<AuditInput>(DEFAULT_INPUT);
  const [selectedTools, setSelectedTools] = useState<ToolId[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedInput = loadAuditInput();
    const savedTools = loadSelectedTools();
    if (savedInput) setInput(savedInput);
    if (savedTools) setSelectedTools(savedTools);
  }, []);

  // Persist on every change
  useEffect(() => {
    saveAuditInput(input);
  }, [input]);

  useEffect(() => {
    saveSelectedTools(selectedTools);
  }, [selectedTools]);

  const toggleTool = useCallback(
    (toolId: string) => {
      const id = toolId as ToolId;
      if (selectedTools.includes(id)) {
        setSelectedTools((prev) => prev.filter((t) => t !== id));
        setInput((prev) => ({
          ...prev,
          tools: prev.tools.filter((t) => t.toolId !== id),
        }));
      } else {
        setSelectedTools((prev) => [...prev, id]);
        const pricing = getPricingById(id);
        setInput((prev) => ({
          ...prev,
          tools: [...prev.tools, makeDefaultToolUsage(id, pricing)],
        }));
      }
    },
    [selectedTools]
  );

  const updateToolUsage = useCallback((updated: ToolUsage) => {
    setInput((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.toolId === updated.toolId ? updated : t)),
    }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateAuditInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    navigate('/results', { state: { input } });
  };

  const toolsError = submitted ? getFieldError(errors, 'tools') : undefined;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          Step 1 of 1
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Audit your AI spend</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Select the tools your team uses and fill in your current costs. Your data is saved locally
          — nothing is sent anywhere.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-6">
          {/* Global fields */}
          <GlobalFields
            teamSize={input.teamSize}
            useCase={input.useCase}
            errors={submitted ? errors : []}
            onTeamSizeChange={(size) => setInput((prev) => ({ ...prev, teamSize: size }))}
            onUseCaseChange={(useCase) => setInput((prev) => ({ ...prev, useCase }))}
          />

          {/* Tool selection */}
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Which tools does your team use?
              </p>
              {selectedTools.length > 0 && (
                <span className="text-xs text-slate-400">{selectedTools.length} selected</span>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {TOOL_PRICING.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  selected={selectedTools.includes(tool.id)}
                  onToggle={toggleTool}
                />
              ))}
            </div>
            {toolsError && <p className="mt-2 text-xs text-red-500">{toolsError}</p>}
          </div>

          {/* Per-tool forms */}
          {selectedTools.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-900">Enter your costs</p>
              <div className="flex flex-col gap-4">
                {selectedTools.map((toolId) => {
                  const pricing = getPricingById(toolId);
                  const usage = input.tools.find((t) => t.toolId === toolId);
                  if (!pricing || !usage) return null;
                  return (
                    <ToolForm
                      key={toolId}
                      pricing={pricing}
                      usage={usage}
                      errors={submitted ? errors : []}
                      onChange={updateToolUsage}
                      onRemove={toggleTool}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-400">Your answers are stored in your browser only.</p>
            <Button type="submit" id="audit-submit">
              Run Audit →
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
}
