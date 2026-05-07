# Tests

This document is a placeholder for the testing strategy.

## Current state

- No test runner is installed yet.
- Test folder exists for future unit and integration coverage.

## Validation utilities (Day 2)

Added `src/utils/validation.ts` with pure functions:

- `validateToolUsage()` — checks spend >= 0, seats >= 1
- `validateAuditInput()` — checks team size, use case, tool list, and delegates to per-tool validation
- `getFieldError()` — lookup helper for displaying errors by field name

These are plain functions that return `ValidationError[]` — no side effects, easy to unit test when a test runner is added.

## Future plan

- Add Vitest and write unit tests for validation utils (highest ROI first test).
- Add focused component tests for the audit flow.
- Validate route navigation and page rendering.
- Keep tests lightweight and maintainable.
