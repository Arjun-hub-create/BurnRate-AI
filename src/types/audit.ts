export type UseCaseType = 'coding' | 'writing' | 'research' | 'data-analysis' | 'mixed';

export type PlanType = 'free' | 'pro' | 'team' | 'enterprise' | 'api' | 'custom';

export type ToolId =
  | 'chatgpt'
  | 'claude'
  | 'cursor'
  | 'copilot'
  | 'gemini'
  | 'openai-api'
  | 'anthropic-api'
  | 'windsurf';

export interface ToolPricing {
  id: ToolId;
  name: string;
  description: string;
  plans: PlanOption[];
}

export interface PlanOption {
  id: PlanType;
  label: string;
  pricePerSeat: number; // monthly, per seat/user
  notes?: string;
}

export interface ToolUsage {
  toolId: ToolId;
  plan: PlanType;
  seats: number;
  monthlySpend: number; // what they actually pay, not the calculated estimate
  notes: string;
}

export interface AuditInput {
  teamSize: number;
  useCase: UseCaseType;
  tools: ToolUsage[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface AuditFormState {
  input: AuditInput;
  selectedTools: ToolId[];
  errors: ValidationError[];
}
