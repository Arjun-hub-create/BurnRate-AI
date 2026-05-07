import type { AuditInput, ToolUsage, ValidationError } from '../types/audit';

export function validateToolUsage(tool: ToolUsage): ValidationError[] {
  const errors: ValidationError[] = [];

  if (tool.monthlySpend < 0) {
    errors.push({
      field: `${tool.toolId}.monthlySpend`,
      message: 'Monthly spend cannot be negative.',
    });
  }

  if (!Number.isFinite(tool.monthlySpend)) {
    errors.push({
      field: `${tool.toolId}.monthlySpend`,
      message: 'Enter a valid spend amount.',
    });
  }

  if (tool.seats < 1 || !Number.isInteger(tool.seats)) {
    errors.push({
      field: `${tool.toolId}.seats`,
      message: 'Seats must be a whole number of at least 1.',
    });
  }

  return errors;
}

export function validateAuditInput(input: AuditInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (input.teamSize < 1 || !Number.isInteger(input.teamSize)) {
    errors.push({
      field: 'teamSize',
      message: 'Team size must be at least 1.',
    });
  }

  if (!input.useCase) {
    errors.push({ field: 'useCase', message: 'Select a primary use case.' });
  }

  if (input.tools.length === 0) {
    errors.push({ field: 'tools', message: 'Add at least one AI tool.' });
  }

  for (const tool of input.tools) {
    errors.push(...validateToolUsage(tool));
  }

  return errors;
}

export function getFieldError(errors: ValidationError[], field: string): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}
