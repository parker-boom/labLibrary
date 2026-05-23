# Development Loop

## Role Of This Folder

This folder gives implementation agents enough structure to build without inventing the product from scratch.

Before coding, the agent should read:

1. `../context.md`
2. `../workflow.md`
3. `README.md`
4. `docs/architecture.md`
5. `docs/brand-system.md`
6. `content/*.json`
7. `plans/*.md`

## Checkpoints

Commit after these milestones:

1. Project initialization and dependency setup.
2. Data loading and route wiring.
3. Homepage and base browsing pages.
4. Featured detail routes and modal transitions.
5. Responsive pass.
6. Visual QA fixes.
7. Core improvement feature.
8. Extra delight feature.

## Acceptance Criteria

The implementation is not done until:

- All route targets exist.
- Featured use cases open detail views; non-featured use cases do not.
- Featured events open detail views; non-featured events do not.
- Show & Tell and Prompt-A-Thon open detail views; Builder Lab is visible but inactive.
- Every event card renders a real photo.
- Motion gives the interface a physical, spatial feel.
- The app works on desktop and mobile widths.
- Reduced-motion users still get a usable experience.
- Sound is tasteful, optional to mute, and never blocks the experience.
- Text does not overflow cards or buttons.
- Content comes from the JSON files, not hardcoded one-off component text.
- The core feature and extra delight feature are implemented after the core prototype is polished.
