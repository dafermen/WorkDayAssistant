# Architecture

## Status

The detailed architecture is intentionally deferred to Phase 1. Phase 0 only establishes the
boundaries required by the master specification.

## Initial boundaries

- `src/components`: reusable presentation components.
- `src/hooks`: reusable React state and lifecycle logic.
- `src/pages`: page-level composition.
- `src/services`: browser and native integrations.
- `src/utils`: pure functions, including future time calculations.
- `src/types`: shared TypeScript types and interfaces.
- `src/assets`: bundled static assets.
- `src/styles`: global and shared styles.
- `tests`: cross-cutting test setup and application tests.

## Constraints

- Components must not access `localStorage` directly.
- Business logic should be pure and independent of React whenever possible.
- Public APIs and folders must not be renamed without an explicit task.
- Capacitor integrations belong behind service boundaries.

Architectural decisions and interfaces will be finalized by `PHASE1-001`.
