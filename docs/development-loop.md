# Development Loop

## Local Work

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

Run the full deploy-readiness check before handoff:

```bash
npm run verify
```

That command runs:

- `npm run lint`
- `npm run check`
- `npm run build`

The legacy shell wrapper also delegates to the same command:

```bash
./scripts/run-all.sh
```

## Browser QA

For changes that can affect rendering, routing, assets, or interactions, inspect these surfaces:

- `/` with the `lab-library-intro-seen` cookie cleared.
- `/` with the `lab-library-intro-seen` cookie set to `true`.
- `/missions`
- `/missions#show-and-tell`
- `/workflows`
- `/workflows#practicing-interviews-voice-mode`
- `/reports`
- `/reports#promptathon-uc-davis`

For route compatibility, also spot-check:

- `/tracks`
- `/use-cases`
- `/events`
- one direct detail route such as `/missions/show-and-tell`

## Deploy Checklist

- Working tree is clean before starting, or unrelated user changes are left untouched.
- No stale scaffold/planning docs remain in the deployable tree.
- First-launch intro appears only on the homepage and only until dismissed.
- All referenced images exist under `public/assets/`.
- No unused generated source sheets are shipped in `public/assets/generated/`.
- `npm run verify` passes.
- Browser QA passes on the affected desktop routes.
- Commit message describes the cleanup or deploy-readiness change.
- Push the branch after the final commit when Parker asks for deploy prep.
