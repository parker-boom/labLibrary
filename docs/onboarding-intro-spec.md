# First-Launch Lab Archive Intro

## Purpose

The first-launch intro is the player's first touchpoint before the normal home selection screen. It should appear only once for a new visitor, then let the home screen behave like the regular choice menu.

The intro is not a product tour. It is a light in-world welcome: clear enough for a new host to understand what the archive contains, but themed enough that it feels like starting a small game.

## Reference Mockup

Use this image as the visual reference:

- `docs/design/lab-archive-onboarding-intro-v1.png`

The mockup's structure is the target: black grid backdrop, contained yellow archive panel, large condensed title, short welcome copy, three compact record rows, and a retro beveled start button.

The exact source-of-truth text below supersedes any slightly older copy visible inside the generated image.

## First-Launch Copy

```text
LAB ARCHIVE

Welcome new host!

Lab alumni have stored records from the field to help you get started.

CHOOSE YOUR FIRST RECORD:

Event Missions
Event playbooks and run plans.

Use-Case Vault
Student workflows, prompts, and examples.

Field Reports
Records from real Lab events.

Enter the Archive >
```

## Home Screen Copy

After the first-launch intro, the home screen should use the same three record names and the same compact descriptions:

```text
Event Missions
Event playbooks and run plans.

Use-Case Vault
Student workflows, prompts, and examples.

Field Reports
Records from real Lab events.
```

Do not add a home subtitle for now. The home screen should feel like a choice screen, not a second onboarding explanation.

## Behavior

- Show the intro only on first launch for a visitor.
- Store dismissal locally, for example in `localStorage`.
- The primary action is `Enter the Archive >`.
- After dismissal, show the normal home menu with the three records.
- Avoid blocking direct route visits like `/use-cases`, `/events`, or `/tracks`; the intro belongs to the homepage entry path.

## Design Notes

- Keep the intro contained in both height and width, closer to a compact modal than the full-screen detail panels.
- Preserve the current Lab Library arcade language: black grid background, warm yellow panel, cream inset areas, heavy condensed headings, strong black borders, and small pixel icons.
- Make the three record rows visually distinct but not huge cards. They are menu choices, not a full page of explanations.
- The copy should state what is inside each record type and leave some exploratory ambiguity. Do not explain the whole product purpose on every card.
- The button should feel retro and game-like, inspired by a PLAY/start button, but the text must stay readable.
