# Lab Library Prototype

Local polished prototype for the ChatGPT Lab Library: a retro-arcade host inspiration system for campus AI events.

This folder is intentionally scaffolded before implementation. It contains content, assets, architecture notes, route placeholders, and build standards for the implementation agent to follow.

## Product Shape

The prototype has three main doors:

- `/tracks` - event formats hosts can choose from.
- `/use-cases` - student workflows that can become demos or activities.
- `/events` - real past Lab events that future hosts can borrow from.

Featured use cases and events are clickable and route-backed. Non-featured cards appear in the grid/gallery but do not open modals yet. `Show & Tell` and `Prompt-A-Thon` have full track content. `Builder Lab` is visible but inactive for v1.

## Recommended Stack

- Next.js with the App Router
- React
- TypeScript
- Framer Motion / Motion for spatial transitions, route-backed modals, hover energy, and shared layout movement
- CSS variables plus a small theme system for brand tokens
- Optional React Three Fiber only if a later pass needs true depth, not for the first implementation pass

This is not a game engine project. It should feel game-like through motion, physicality, spatial card behavior, subtle sound, and strong visual rules.

## Content And Assets

- `content/use-cases.json` - all use-case card and modal data.
- `content/events.json` - all event card and modal data.
- `content/tracks.json` - event-track card and modal data.
- `public/assets/events/featured/` - ordered real photo galleries for featured events.
- `public/assets/events/cards/` - one real photo per non-featured event.
- `public/assets/generated/` - future generated pixel icons, UI sprites, textures, and concept assets.

Use real photos only where event photos are specified. For everything else, assume the interface wants coherent generated pixel-icon sprites: recognizable, simple, lightly colorful, and consistent with the Lab Library arcade system. Generated assets belong under `public/assets/generated/` with prompt/source notes and filenames tied to stable content ids.

## Route Targets

- `/`
- `/use-cases`
- `/use-cases/[id]`
- `/events`
- `/events/[id]`
- `/tracks`
- `/tracks/[id]`

The detail routes should feel like physical modal transitions from their parent cards. A direct visit to a detail URL should render the same detail state cleanly.

## Setup Notes For The Implementation Agent

When implementation begins, initialize the Next.js app in this folder and preserve this content/docs structure. Commit after meaningful milestones: scaffold, data wiring, homepage/routes, modals/transitions, responsive polish, and visual QA fixes.

The build is not complete until hover states, card selection, modal open/close, route transitions, keyboard/focus behavior, and responsive layouts all feel intentional.

Read `AGENTS.md` and the files under `plans/` before starting implementation.
