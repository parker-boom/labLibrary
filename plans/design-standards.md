# Design Standards

## Vibe

Retro arcade portal for campus AI event ideas.

The product should feel like a custom interactive archive machine: black room, yellow panels, chunky type, pixel sprites, real event photos, physical cards, and satisfying transitions.

## Brand

Name: Lab Library

Core line: Ideas for campus AI events

Tone:

- playful
- useful
- sharp
- student-native
- not corporate
- not childish

## Visual Direction

Use the screenshots in `../docs/design/screenshots/` as strong references for fidelity, composition, and polish. They are not pixel-perfect requirements. The implementation may change layout details if it better serves the product, but the final result should match or exceed the screenshots' level of design intention.

Use:

- deep black background
- warm Lab yellow cards
- warm white type
- near-black text on yellow cards
- subtle pixel texture
- one coherent pixel icon/sprite per section or card
- real photos as proof for events
- chunky display headings
- clean mono or mono-adjacent small UI text

Avoid:

- generic SaaS/dashboard styling
- template-feeling cards
- corporate resource hub tone
- random category chips
- rainbow clutter
- bulky 3D icon packs
- fake-pixel body copy
- overexplaining the UI in visible text

## Asset Direction

Use real event photos where provided. Otherwise assume a generated pixel icon/sprite is needed.

Generated assets should be:

- simple
- readable at card size
- coherent as a family
- lightly colorful but not noisy
- arcade/pixel inspired, not generic emoji

Generated assets should not overpower the yellow/black system. The product is colorful in accents, not in the entire palette.

## Flexibility

The agent may bend lower-level details by about 10-15% to achieve the high-level product goal. It should push back against awkward specs by improving them in code, then flagging the decision.

Do not bend:

- featured vs non-featured clickability
- real event photo usage
- three main sections
- Show & Tell and Prompt-A-Thon active, Builder Lab inactive
- host-facing purpose
