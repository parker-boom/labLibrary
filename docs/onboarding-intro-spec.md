# First-Launch Lab Arcade Intro

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
LAB ARCADE

Welcome, host.

Explore the arcade and find inspiration for your next event.

CHOOSE YOUR ADVENTURE:

Start A New Mission

Level Up Your AI Skills

Explore the Archive

Enter the Arcade >
```

## Home Screen Copy

After the first-launch intro, the home screen should use the same three record names and the same compact descriptions:

```text
Start A New Mission
Choose your event path

Level Up Your AI Skills
Upgrade with student examples

Explore the Archive
Uncover notes from past hosts
```

Do not add a home subtitle for now. The home screen should feel like a choice screen, not a second onboarding explanation.

## Behavior

- Show the intro only on first launch for a visitor.
- Store dismissal locally with the `lab-library-intro-seen` cookie; the client also mirrors the value to `localStorage` for backward compatibility.
- The primary action is `Enter the Arcade >`.
- After dismissal, show the normal home menu with the three records.
- Avoid blocking direct route visits like `/use-cases`, `/events`, or `/tracks`; the intro belongs to the homepage entry path.

## Design Notes

- Keep the intro contained in both height and width, closer to a compact modal than the full-screen detail panels.
- Preserve the current Lab Library arcade language: black grid background, warm yellow panel, cream inset areas, heavy condensed headings, strong black borders, and small pixel icons.
- Make the three record rows visually distinct but not huge cards. They are menu choices, not a full page of explanations.
- The copy should state what is inside each record type and leave some exploratory ambiguity. Do not explain the whole product purpose on every card.
- The button should feel retro and game-like, inspired by a PLAY/start button, but the text must stay readable.
