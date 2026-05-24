# Lab Library Agent Instructions

Work only inside this repository unless Parker explicitly says otherwise. The current design is approved, so default to maintenance, deploy readiness, and carefully scoped improvements rather than redesign.

## Product Standard

Lab Library should feel like a complete custom arcade archive experience: useful, tactile, fast, readable, playful, and intentionally built. Preserve the existing routes, content structure, and visual identity unless Parker asks for a product change.

## Read First

For repo-local work, start with:

- `README.md`
- `docs/architecture.md`
- `docs/brand-system.md`
- `docs/development-loop.md`
- `app/ROUTES.md`
- `content/*.json`

Do not depend on parent-folder context for normal repo tasks.

## Implementation Rules

- Keep content in `content/*.json` unless the text is component chrome.
- Keep generated non-photo assets in `public/assets/generated/` and document them in `public/assets/generated/README.md`.
- Use real event photos from `public/assets/events/` for event/report imagery.
- Maintain keyboard and reduced-motion behavior when changing interactions.
- Run `npm run verify` before final deploy-ready handoff.

## Do Not

- Redesign the approved interface during cleanup work.
- Change route names, ordering, card hierarchy, or visual layout without an explicit request.
- Remove legacy redirects unless Parker confirms they are no longer needed.
- Leave stale planning docs or unused generated source sheets in the deployable app.
- Finish a frontend change without browser QA on the affected routes.
