## Day 1 — 2026-05-06

**Hours worked:** 5

**What I did:** Set up the React + Vite project with TypeScript and Tailwind CSS. Added routing for Home, Audit, Results, and Share. Built a clean landing page scaffold with reusable UI components and finalized the folder structure.

**What I learned:** Tailwind v4 is not the right fit for this starter template, so I reverted to Tailwind v3 for a stable Vite setup. I also learned that the app should stay focused on layout and routing before any audit logic is added.

**Blockers / what I'm stuck on:** No blockers at the moment; most effort was in choosing the right tooling versions and keeping the setup consistent.

**Plan for tomorrow:** Begin the first real user flow: build the audit form and wire the input flow to a basic results page.

## Day 2 — 2026-05-07

**Hours worked:** 4

**What I did:** Built the full AI spend input flow. This includes a tool selector (card-based toggle UI), per-tool forms for plan, seats, and spend, plus global fields for team size and use case. Created the centralized pricing data in `src/data/pricing.ts` with realistic plans for all 8 tools. Added localStorage persistence so form state survives refresh — the implementation is intentionally thin, just save/load helpers with try/catch. Also wrote lightweight validation utils (no form library) that return error arrays, and wired validation feedback into the form UI.

The Results page now reads actual form data from router state and shows a real spend summary with per-tool breakdown. It falls back to an example report if you navigate there directly. The savings estimate is a 20% placeholder — real audit logic is Day 3 work.

**What I learned:** API-based tools (OpenAI API, Anthropic API) don't fit the same plan/seat model as consumer tools. Ended up branching the form UI so API tools just show a "monthly bill" input instead of plan + seats. This felt like the right trade-off between reusability and UX clarity. Also realized I need to be careful about when to show validation errors — only after the first submit attempt, not while typing.

**Blockers / what I'm stuck on:** The recommendation engine is the hard part. I have the data structure ready but need to figure out what "optimization" actually means in practice. Overlapping tools (Cursor + Copilot) is the obvious one, but plan downgrades and seat count rationalization are less clear. Going to sketch that out before writing code.

**Plan for tomorrow:** Build the audit analysis logic — overlap detection, plan optimization suggestions, and real savings estimates. Make the Results page actually useful.
