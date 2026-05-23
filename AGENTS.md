# Lab Library Agent Instructions

You are implementing the Lab Library: a local polished interactive prototype for Parker's ChatGPT Lab / student-community work.

This is not a normal "make the routes work" web task. The goal is for Parker to open the prototype and feel that it is a complete custom arcade archive experience: useful, tactile, fast, readable, playful, and surprisingly well-considered.

## Operating Standard

Build working code, but do not stop at working code. Iterate until the design feels good.

The details in this folder are the starting specification. Treat them as roughly 80-90% accurate. Follow them closely, but use judgment when a lower-level detail blocks the higher-level goal. You have about 10-15% wiggle room to simplify, improve, or add an obvious missing piece when it improves the experience.

## Read First

Before coding, read:

- `../context.md`
- `../workflow.md`
- `README.md`
- `docs/architecture.md`
- `docs/brand-system.md`
- `docs/development-loop.md`
- `plans/product-spec.md`
- `plans/design-standards.md`
- `plans/interaction-motion-spec.md`
- `plans/engineering-plan.md`
- `plans/qa-acceptance.md`
- `content/*.json`

## Sub-Agents

Use sub-agents when they can materially improve quality:

- implementation review
- design critique
- motion/interactions critique
- visual QA
- accessibility/responsive QA
- generated asset production
- copy polish

Keep sub-agent tasks narrow. Ask them for specific outputs and integrate their findings yourself. Do not let sub-agents become separate product owners.

## Assets

Use real photos where event photos are specified. For icons, sprites, interface details, textures, and arcade elements, generate coherent pixel-style assets when they improve the product. Generated assets should be simple, recognizable, not too colorful, and visually consistent with the whole system.

Place generated assets in `public/assets/generated/`. Regenerate assets that are not good enough. Keep prompt/source notes so future passes can revise them.

## Iteration

Work in rounds:

1. Plan and architecture.
2. Skeleton and data wiring.
3. Static visual composition.
4. Browser review.
5. Motion and spatial transitions.
6. Browser review.
7. Copy/readability pass.
8. Responsive and accessibility pass.
9. Core improvement feature.
10. Extra delight feature.
11. Final QA and summary.

Commit after meaningful milestones. The final result should include both the core prototype and the post-core extra work.

## Do Not

- Ship a generic yellow-card website.
- Treat screenshots as pixel-perfect requirements.
- Ignore screenshots as mere moodboards.
- Overcomplicate before the main flows work.
- Generate assets before the flows and composition have a reason for them.
- Hardcode content that belongs in `content/*.json`.
- Finish without opening the app in a browser and inspecting the flows.
