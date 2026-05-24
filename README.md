# Lab Library

Retro-arcade prototype for Parker's ChatGPT Lab / student-community work. The app is a small host-facing archive where campus organizers can choose an event mission, browse student workflows, and inspect field reports from real events.

## Current App

Primary routes:

- `/` - Lab Arcade home menu.
- `/missions` - event missions. `Show & Tell` and `Prompt-A-Thon` open modal/detail states; `Builder Lab` is visible but locked.
- `/workflows` - student workflows with route-backed modal details for clickable examples.
- `/reports` - real event reports with photo-led modal details for clickable reports.

Direct detail routes are also supported:

- `/missions/[id]`
- `/workflows/[id]`
- `/reports/[id]`

Legacy aliases redirect to the current route names:

- `/tracks` -> `/missions`
- `/use-cases` -> `/workflows`
- `/events` -> `/reports`

## Development

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:3000` by default.

Verification before deploy:

```bash
npm run verify
```

`npm run verify` runs lint, TypeScript, and a production build.

## Content And Assets

- `content/tracks.json` - mission cards and mission starter-kit data.
- `content/use-cases.json` - workflow cards and workflow detail data.
- `content/events.json` - report cards, photo galleries, and event detail data.
- `public/assets/events/` - real event photos referenced by `content/events.json`.
- `public/assets/generated/` - generated pixel icons and hover sprite sheets used by the interface.

Generated asset notes live in [public/assets/generated/README.md](public/assets/generated/README.md).

## Deployment Notes

- Build target: standard Next.js App Router app.
- Required command: `npm run build`.
- Start command after build: `npm run start`.
- Keep `next.config.mjs` in place; it disables the powered-by header and development indicators.
- No server-side secrets or environment variables are required for the prototype.

## Project Docs

- [docs/architecture.md](docs/architecture.md) - current app structure and data flow.
- [docs/brand-system.md](docs/brand-system.md) - visual and interaction guardrails.
- [docs/development-loop.md](docs/development-loop.md) - QA and deployment checklist.
- [app/ROUTES.md](app/ROUTES.md) - route map.
