# Interaction And Motion Spec

## Goal

The site should feel physically interactive, like an arcade archive rather than a static website.

Motion must support clarity. It should make the user feel where they are, what they selected, and how to get back.

## Required Interaction Feel

- Cards feel alive on hover/focus.
- Featured cards feel more magnetic than inert cards.
- Non-featured cards still have subtle life, but do not imply they open.
- Clicking a featured item should feel spatial: the card advances, expands, or transitions into a near-fullscreen panel.
- Closing should feel like returning the panel to the grid/gallery.
- Route-backed direct loads should still look intentional.
- Detail views should feel like arcade screens, cartridges, or case files, not generic modals.

## Motion Stack

Recommended:

- Framer Motion / Motion for shared layout, page transitions, modal entry/exit, spring physics.
- CSS transforms and perspective for hover tilt, depth, press states, and card layers.
- CSS or canvas for scanlines, subtle particles, or ambient arcade effects.
- Optional React Three Fiber only if it materially improves quality after the core site works.

## Sound

Add tasteful optional UI sound as a Phase 2 delight if the core experience is stable.

Rules:

- muted or easy to disable
- subtle, not arcade-noisy
- no blocking autoplay problem
- reduced-motion / accessibility preferences respected where relevant

## Reduced Motion

Support reduced motion with simpler fades and no aggressive spatial movement. Reduced motion should remain polished, not broken.

## Iteration Requirement

The agent must inspect the site in a browser and iterate. A first draft is not acceptable as final. The target is the fifth-draft feeling: composition, timing, copy, spacing, and responsiveness have been revisited after seeing the real thing.
