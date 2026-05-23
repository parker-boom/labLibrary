# QA And Acceptance

## Core Acceptance

The core build is not done until:

- The app runs locally.
- All required routes exist.
- Home clearly presents the three doors.
- `/use-cases` renders all use cases.
- Only featured use cases open detail routes.
- `/events` renders all events with real photos.
- Only featured events open detail routes.
- `/tracks` renders Show & Tell, Prompt-A-Thon, and Builder Lab.
- Show & Tell and Prompt-A-Thon open detail routes.
- Builder Lab is visible but inactive.
- Route-backed detail states work on direct load and from navigation.
- Generated pixel icons/sprites exist where useful and are coherent as a family.
- Motion makes the interface feel spatial and physical.
- Desktop is polished.
- Mobile is simplified but good.
- Copy is readable and aligned with the host-facing purpose.
- No obvious text overflow, broken images, or dead links.
- Reduced-motion users have a clean fallback.

## Phase 2 Acceptance

The final build is not done until the Phase 2 additions are also complete:

- Host Remix Tray lets users add/select a track, use case, and event, then view a simple host plan summary.
- Attract Mode creates an ambient arcade-library layer without harming usability.
- Optional sound is tasteful and easy to mute.
- Phase 2 enhancements are clearly separated in commits and final notes.

## Browser Review

The agent must open the app in a browser and inspect:

- home
- use-case grid
- featured use-case detail
- event gallery
- featured event detail
- tracks page
- Prompt-A-Thon detail
- simplified mobile view

The agent should take screenshots or use browser inspection notes to guide iteration.

## Final Report

Final report should include:

- what was built
- what changed from the original plan and why
- commits made
- known limitations
- screenshots or visual QA notes
- whether Phase 1 and Phase 2 are both complete
