# Routes

## Primary Routes

- `/` - home menu.
- `/missions` - event mission cards.
- `/workflows` - student workflow cards.
- `/reports` - field report cards.

## Hash-Backed Modal Routes

- `/missions#show-and-tell`
- `/missions#prompt-a-thon`
- `/workflows#[workflow-id]`
- `/reports#[report-id]`

Hashes open the approved modal/detail layer on top of each browsing surface.

## Direct Detail Routes

- `/missions/[id]`
- `/workflows/[id]`
- `/reports/[id]`

Direct routes render standalone detail pages for deploy previews, metadata, and future sharing.

## Legacy Redirects

- `/tracks` -> `/missions`
- `/tracks/[id]` -> `/missions/[id]`
- `/use-cases` -> `/workflows`
- `/use-cases/[id]` -> `/workflows/[id]`
- `/events` -> `/reports`
- `/events/[id]` -> `/reports/[id]`
