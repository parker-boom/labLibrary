# Architecture

## Purpose

Build a local polished prototype, not a production deployment. Deployment should be easy later, but the first priority is a high-quality local experience that Parker can inspect, revise, and use to coordinate future work.

## Application Structure

Recommended implementation structure:

```text
lab-library/
  app/
    page.tsx
    use-cases/
      page.tsx
      [id]/page.tsx
    events/
      page.tsx
      [id]/page.tsx
    tracks/
      page.tsx
      [id]/page.tsx
  components/
    cards/
    modals/
    motion/
    layout/
  content/
    use-cases.json
    events.json
    tracks.json
  lib/
    content.ts
    routes.ts
  public/
    assets/
      events/
      generated/
  scripts/
    run-all.sh
  styles/
    brand.css
```

The current `app/` folder only contains route placeholders. The implementation agent should replace those with real Next.js files.

## Routing

Use route-backed detail states:

- `/use-cases/[id]` opens a use-case detail experience.
- `/events/[id]` opens an event detail experience.
- `/tracks/[id]` opens a track detail experience.

Featured items should link to their detail route. Non-featured use cases and events should render as inert cards for v1. Inactive tracks render as visible cards without a modal.

## Motion Standard

Motion is part of the product, not afterthought polish.

Expected interaction behavior:

- Cards should respond to hover/focus with depth, light, scale, or slight tilt.
- Opening a featured item should feel spatial: selected card advances or expands into a near-fullscreen detail layer.
- Closing should return the user to the original browsing surface without losing orientation.
- Route transitions should avoid hard cuts unless the user has reduced motion enabled.
- The design may use perspective, transform, spring motion, scanline overlays, and subtle background particles.

Use Framer Motion / Motion first. Add WebGL only if a later pass proves it materially improves the experience. The agent has 10-15% implementation wiggle room when lower-level details block the high-level goal.

## Content Rules

Content is local JSON for now. Keep all ids stable. If a title changes, the id should usually remain unchanged unless the underlying concept changes.

Every event has one real photo. Featured events have ordered galleries. Every use case has an icon prompt, but generated icon assets are not required before implementation starts.
