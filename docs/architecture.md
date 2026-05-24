# Architecture

## Purpose

Lab Library is a polished local-first Next.js prototype for campus AI event inspiration. It is deployable as a standard App Router app, but its product value is the arcade archive experience: quick section choice, tactile cards, route-backed modal details, real event proof, generated pixel assets, optional sound, and accessible motion.

## Stack

- Next.js App Router
- React
- TypeScript
- Framer Motion for route/card/modal transitions
- CSS variables in `app/globals.css`
- Local JSON data in `content/`

## Current Structure

```text
app/
  page.tsx
  missions/
  workflows/
  reports/
  tracks/       legacy redirect
  use-cases/    legacy redirect
  events/       legacy redirect
components/
  *Browser.tsx  grid pages plus hash-backed modals
  *Card.tsx     browsing cards
  *Detail.tsx   direct detail routes
  MotionCard.tsx
  RouteStage.tsx
  SoundToggle.tsx
content/
  tracks.json
  use-cases.json
  events.json
lib/
  content.ts
  sections.ts
  sprites.ts
  text.ts
  useModalLifecycle.ts
  usePrefersReducedMotion.ts
public/assets/
  events/
  generated/
```

## Routing Model

The public route names are:

- `/missions`
- `/workflows`
- `/reports`

Each section supports direct detail pages at `/missions/[id]`, `/workflows/[id]`, and `/reports/[id]`.

The browsing pages use hash-backed modal states such as `/missions#show-and-tell`. This keeps the approved grid/modal experience fast while preserving direct route URLs for deploy previews, metadata, and future sharing.

Legacy aliases redirect:

- `/tracks` -> `/missions`
- `/use-cases` -> `/workflows`
- `/events` -> `/reports`

## Data Flow

`lib/content.ts` loads the three JSON files and exposes typed arrays plus lookup helpers. Components should read from those helpers instead of duplicating data.

Generated sprite mappings live in `lib/sprites.ts`. Section metadata for the home page lives in `lib/sections.ts`.

## Interaction Model

- The homepage includes a first-launch intro. `app/layout.tsx` reads the `lab-library-intro-seen` cookie and renders `html[data-lab-intro="seen"]` for returning visitors, preventing an intro flash before the home menu.
- `MotionCard` centralizes card hover, press, link/button behavior, and sound triggers.
- `RouteStage` handles the restrained page transition between routes.
- `useModalLifecycle` centralizes modal scroll locking and Escape-to-close behavior.
- `SoundToggle` controls browser-safe generated audio. Audio is opt-in and stored in local storage.
- CSS media queries and `usePrefersReducedMotion` preserve reduced-motion fallbacks.
