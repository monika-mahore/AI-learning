# AI-learning — Vibe Coding Onboarding

React + Vite onboarding app with Tailwind, Framer Motion, and Supabase logging for designer onboarding steps.

## Setup
```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

## Supabase
- Client: `src/supabaseClient.js` (uses the provided project URL and publishable key).
- Table: `progress_tracker` with columns `id`, `designer_name`, `current_step`, `is_stuck`, `updated_at`.
- Writes on “Start My Journey” and each “Next” action.

## Commands
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run lint` – lint

## Notes
- If you rotate Supabase keys or URL, update `src/supabaseClient.js`.
- Ensure `id` accepts client-generated UUIDs (or set a default) and that the columns above exist.
