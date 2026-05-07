import type { ToolPricing } from '../types/audit';

export const TOOL_PRICING: ToolPricing[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: "OpenAI's consumer chat product",
    plans: [
      { id: 'free', label: 'Free', pricePerSeat: 0 },
      { id: 'pro', label: 'Plus ($20/mo)', pricePerSeat: 20 },
      { id: 'team', label: 'Team ($25/seat)', pricePerSeat: 25, notes: 'Min 2 seats' },
      { id: 'enterprise', label: 'Enterprise', pricePerSeat: 0, notes: 'Custom pricing' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    description: "Anthropic's assistant — strong for long docs and analysis",
    plans: [
      { id: 'free', label: 'Free', pricePerSeat: 0 },
      { id: 'pro', label: 'Pro ($20/mo)', pricePerSeat: 20 },
      { id: 'team', label: 'Team ($25/seat)', pricePerSeat: 25 },
      { id: 'enterprise', label: 'Enterprise', pricePerSeat: 0, notes: 'Custom pricing' },
    ],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-native code editor built on VS Code',
    plans: [
      { id: 'free', label: 'Hobby (Free)', pricePerSeat: 0, notes: '2,000 completions/mo' },
      { id: 'pro', label: 'Pro ($20/mo)', pricePerSeat: 20, notes: 'Unlimited completions' },
      { id: 'team', label: 'Business ($40/seat)', pricePerSeat: 40 },
    ],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: "GitHub's AI pair programmer, integrated into most editors",
    plans: [
      { id: 'free', label: 'Free (limited)', pricePerSeat: 0 },
      { id: 'pro', label: 'Individual ($10/mo)', pricePerSeat: 10 },
      { id: 'team', label: 'Business ($19/seat)', pricePerSeat: 19 },
      { id: 'enterprise', label: 'Enterprise ($39/seat)', pricePerSeat: 39 },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: "Google's AI assistant with deep Workspace integration",
    plans: [
      { id: 'free', label: 'Free', pricePerSeat: 0 },
      { id: 'pro', label: 'Advanced ($19.99/mo)', pricePerSeat: 19.99 },
      {
        id: 'team',
        label: 'Business ($24/seat)',
        pricePerSeat: 24,
        notes: 'Google Workspace add-on',
      },
    ],
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    description: 'Direct API access to GPT-4o, o1, and other models',
    plans: [
      {
        id: 'api',
        label: 'Pay-as-you-go',
        pricePerSeat: 0,
        notes: 'Enter your monthly bill directly',
      },
      {
        id: 'pro',
        label: 'Prepaid credits',
        pricePerSeat: 0,
        notes: 'Enter your monthly bill directly',
      },
    ],
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    description: 'Direct API access to Claude models',
    plans: [
      {
        id: 'api',
        label: 'Pay-as-you-go',
        pricePerSeat: 0,
        notes: 'Enter your monthly bill directly',
      },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: "Codeium's agentic AI IDE — newer Cursor alternative",
    plans: [
      { id: 'free', label: 'Free', pricePerSeat: 0, notes: 'Limited fast requests' },
      { id: 'pro', label: 'Pro ($15/mo)', pricePerSeat: 15 },
      { id: 'team', label: 'Teams ($30/seat)', pricePerSeat: 30 },
    ],
  },
];

export function getPricingById(id: string): ToolPricing | undefined {
  return TOOL_PRICING.find((t) => t.id === id);
}
