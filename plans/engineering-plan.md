# Engineering Plan

## Stack

Recommended default:

- Next.js App Router
- React
- TypeScript
- Framer Motion / Motion
- CSS variables and a small brand/theme file

The agent may choose adjacent tooling if it can explain why it better supports the target quality. Do not choose a heavier architecture unless it earns its keep.

## Routes

Required routes:

- `/`
- `/use-cases`
- `/use-cases/[id]`
- `/events`
- `/events/[id]`
- `/tracks`
- `/tracks/[id]`

## Data

Use local JSON:

- `content/use-cases.json`
- `content/events.json`
- `content/tracks.json`

Do not hardcode content directly into components except for tiny labels that are truly part of component chrome.

## Components

Suggested components:

- `HomePortal`
- `ArcadeCard`
- `UseCaseCard`
- `EventCard`
- `TrackCard`
- `UseCaseDetail`
- `EventDetail`
- `TrackDetail`
- `PhotoCarousel`
- `PixelIcon`
- `SpatialModalShell`
- `SoundToggle`
- `HostRemixTray`
- `AttractMode`

## Phase 1 Commits

Commit after:

1. project initialization
2. content loaders and route setup
3. base pages and cards
4. detail routes
5. motion/spatial interaction pass
6. generated icon/sprite pass
7. responsive/accessibility pass
8. visual QA fixes

## Phase 2 Commits

Commit separately after:

1. Host Remix Tray
2. Attract Mode and optional sound
3. final polish/QA

## Scripts

The implementation agent should make these real once the app exists:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run check`

The scaffold includes `scripts/run-all.sh` as a placeholder for the agent to wire up after package scripts exist.
