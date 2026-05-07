import type { AuditInput, ToolId } from '../types/audit';

const STORAGE_KEY = 'burnrate_audit_input';
const SELECTED_TOOLS_KEY = 'burnrate_selected_tools';

export function saveAuditInput(input: AuditInput): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  } catch {
    // localStorage can fail in private browsing or when storage is full
    console.warn('Failed to persist audit input to localStorage');
  }
}

export function loadAuditInput(): AuditInput | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuditInput;
  } catch {
    return null;
  }
}

export function saveSelectedTools(tools: ToolId[]): void {
  try {
    localStorage.setItem(SELECTED_TOOLS_KEY, JSON.stringify(tools));
  } catch {
    console.warn('Failed to persist selected tools to localStorage');
  }
}

export function loadSelectedTools(): ToolId[] | null {
  try {
    const raw = localStorage.getItem(SELECTED_TOOLS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ToolId[];
  } catch {
    return null;
  }
}

export function clearAuditStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SELECTED_TOOLS_KEY);
}
