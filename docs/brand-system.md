# Brand System

## Brand Idea

Lab Library is a retro arcade archive for campus AI event ideas. The home screen currently presents it as `Lab Arcade`, while the project/product name remains Lab Library.

## Core Feeling

- Playful, but not childish.
- Useful and host-facing, not decorative.
- Student-native, not corporate.
- Physical and responsive, not flat.
- Simple enough to understand quickly.

## Visual Tokens

The live tokens are defined in `app/globals.css`:

```css
:root {
  --black: #050505;
  --yellow: #d8b914;
  --cream: #f7f3e8;
  --cream-2: #e5ddc9;
  --ink: #11100a;
}
```

## Type Direction

- Display headings use the condensed arcade stack in `--display`.
- UI text uses `--ui`.
- Micro labels and card subtitles use `--mono`.
- Long reading surfaces should stay clean and readable, not fake-pixel.

## Interaction Direction

- Cards should feel tactile on hover/focus/press.
- Modal and route transitions should be quick, restrained, and spatial.
- Home hover sprite loops should run on hover only.
- Ambient movement should be subtle enough that the approved layout remains the focus.
- Sound must stay optional and browser-safe.
- Reduced-motion users should get simpler motion, not broken states.

## Asset Direction

- Event/report imagery uses real photos.
- Icons and sprites use coherent generated pixel-style assets.
- Generated deployable assets live in `public/assets/generated/`.
- Prompt/source notes live in `public/assets/generated/README.md`.

## Avoid

- Generic SaaS/dashboard styling.
- Corporate resource-hub language.
- Decorative clutter or random UI chrome.
- Gimmicky particle/confetti systems.
- Layout, route, or content changes during cleanup passes.
