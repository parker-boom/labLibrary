# Product Spec

## Product

Lab Library is a local polished prototype for a host-facing ChatGPT Lab archive. It is an internal-first proof of concept for fall campus hosts.

It is not a generic student tip library. It is not a corporate resource hub. It is not Cohort 4 made prettier.

It is a playful arcade archive where a student host can pick a format, steal a workflow, borrow proof from past events, and leave with the confidence to run something.

## Primary User

The primary user is a student host preparing campus programming about ChatGPT and AI. They are smart, busy, and may not yet know what kind of event to run. They need useful inspiration quickly.

Secondary users are Parker and the OpenAI team, using the prototype to understand what a future host resource could feel like.

## Core Feeling

The user should feel:

- "This is real."
- "This is fun to poke around."
- "I understand what I can run."
- "I can steal this and make it work on my campus."

## Main Flows

### Flow 1: Use Case

The user enters `/use-cases`, browses a grid of student workflows, and clicks a featured use case. Non-featured cards stay visible but inert for v1.

The detail route should feel like the selected card moves forward into a near-fullscreen arcade panel. It shows:

- title
- student attribution and school
- reconstructed chat
- process steps
- event remix

The user should leave thinking: "I can demo this or turn it into a room activity."

### Flow 2: Event

The user enters `/events`, browses a photo-led gallery, and clicks a featured event. Non-featured events stay visible but inert for v1.

The detail route should feel like opening a case file or arcade event cartridge. It shows:

- event title
- host/location
- photo carousel
- audience and attendees
- event playbook
- reflection

The user should leave thinking: "Someone already ran a version of this; I can borrow the shape."

### Flow 3: Prompt-A-Thon Track

The user enters `/tracks` and chooses `Prompt-A-Thon`. `Show & Tell` is also active. `Builder Lab` is visible but inactive for v1.

The detail route should feel like a starter pack for a game mode. It shows:

- best for
- timed run of show
- linked use cases
- related events

The user should leave thinking: "I have a format, examples to plug in, and proof it can work."

## Two-Phase Build

Phase 1 is the core prototype: all main routes, content, visual composition, physical interactions, route-backed details, responsive behavior, and QA.

Phase 2 happens only after Phase 1 feels good. Add:

1. Core improvement: a `Host Remix Tray`, a lightweight saved tray where users can add one track, one use case, and one event, then view a simple generated host plan summary.
2. Extra delight: `Attract Mode`, an idle/ambient arcade mode with subtle animated background, cycling highlights, optional sound, and a "press start" return into the library.

Flag Phase 1 and Phase 2 work clearly in commits and final summary.
