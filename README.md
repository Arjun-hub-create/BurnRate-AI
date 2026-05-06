# BurnRate AI

BurnRate AI is a lightweight audit tool for startup and engineering teams to spot overspending in AI subscriptions. The current prototype focuses on layout, discovery, and a clean SaaS landing experience while leaving the audit engine for later iterations.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- ESLint + Prettier

## Quick start

```bash
npm install
npm run dev
```

Build locally:

```bash
npm run build
```

## Project structure

- `src/components/` — reusable UI components
- `src/pages/` — page-level views
- `src/styles/` — global styling and Tailwind imports
- `src/lib/` — route definitions and app wiring
- `src/data/` — static page content
- `src/types/` — shared TypeScript types
- `src/utils/` — small helpers
- `src/tests/` — test scaffolding

## Screenshots

The app is intended to launch with a clean landing page, a navigation bar, and placeholder audit pages.

## Decisions

- Chose Vite + React for a fast front-end MVP with a modern developer experience.
- Kept dependencies minimal and avoided backend complexity for Day 1.
- Tailwind offers consistent spacing and quick SaaS-safe styling without large custom CSS.
- Routing is ready now so the audit flow can be built incrementally.
