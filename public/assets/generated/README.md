# Generated Assets

Future generated pixel icons, UI sprites, textures, hover-state art, and other non-photo assets should go here.

Keep filenames tied to stable content ids where possible, for example:

- `icon-practicing-interviews-voice-mode.png`
- `icon-promptathon.png`
- `texture-card-yellow-noise.png`

When assets are generated, add a short prompt/source note in this folder or in the relevant content record.

## Assets

- `lab-library-arcade-sprites-v1.png`
  - Generated with the built-in image generation tool on 2026-05-23.
  - Source retained at `/Users/parkerjones/.codex/generated_images/019e5434-2b1f-77f1-9c27-9e87c44e1de2/ig_06b6b71019f29e9d016a117773ebd08193a5925752235b56b2.png`.
  - Prompt summary: cohesive pixel-art arcade sticker sheet on a flat near-black background, 12 sprites in a 4x3 grid for Lab Library tracks, use cases, events, prompt activities, builder tools, code, flyers, and data.
- `icons/*.png`
  - Tight transparent crops extracted from `lab-library-arcade-sprites-v1.png` on 2026-05-23.
  - The connected near-black cell background was removed from each icon, then each file was cropped to the last visible pixel.
  - Used by `PixelIcon` so CSS can center and scale the actual artwork instead of centering dirty sprite-sheet cells.
- `use-case-icons-sheet-v1.png`
  - Generated with the built-in image generation tool on 2026-05-23.
  - Prompt summary: cohesive 4x3 pixel-art sprite sheet of unique student-life use-case icons on a flat yellow chroma-key background, with no yellow retained in the final icon crops.
- `use-case-icons/*.png`
  - Tight transparent crops extracted from `use-case-icons-sheet-v1.png`.
  - Used for the use-case list so each card has a distinct icon tied to its specific student workflow.
- `track-icons/*.png`
  - Generated with the built-in image generation tool on 2026-05-23.
  - Prompt summary: three clean pixel-art event-track icons on a flat chroma-key background, no text, no black backing box, no green in the subject, then chroma-key removed and centered on transparent square canvases.
  - Used by the tracks page and track modal so the cream printed-paper media wells center the actual object art instead of fighting older black-box sprites.
- `home-portal-icons-v2.png`
  - Generated with the built-in image generation tool on 2026-05-23.
  - Source retained at `/Users/parkerjones/.codex/generated_images/019e5826-a740-7361-813f-04d898d40c0a/ig_0144676696e50761016a128b614a34819681bd17208d720a86.png`.
  - Prompt summary: three simple arcade-inventory-style home icons on a flat green chroma-key background: a route token, a joystick controller, and an instant camera.
- `home-portal-first-icon-candidates-v1.png`
  - Generated with the built-in image generation tool on 2026-05-23.
  - Source retained at `/Users/parkerjones/.codex/generated_images/019e5826-a740-7361-813f-04d898d40c0a/ig_0144676696e50761016a128d42ee288196ac1c8c0c1d70f309.png`.
  - Prompt summary: three simpler general-purpose first-card icon candidates: an arcade portal, an activity cartridge, and a prize capsule.
- `home-icons/*.png`
  - Transparent square crops extracted from `home-portal-icons-v2.png`.
  - Used by the home portal cards so the first screen has distinct game-like section icons without yellow-heavy artwork. The first-card crop currently uses the portal from `home-portal-first-icon-candidates-v1.png`.
