# Project

## Purpose

WorkDay Assistant helps a ServiceNow technician determine the exact time to close the last task of
the day while respecting a maximum workday of `07:29:45`.

## Inputs

- Worked time in `HH:mm:ss`.
- Start time of the final task in `HH:mm:ss`.

## Planned outputs

- Remaining time.
- Recommended closing time.
- Countdown.
- Visual and audible alerts.
- Local notifications.
- Persistent local data.

## Technology baseline

- React and TypeScript with strict compiler checks.
- Vite for development and production builds.
- Vitest and React Testing Library for automated tests.
- Capacitor with Android as the first native target.

## Scope of Phase 0

Phase 0 creates a working application shell and configures the development toolchain. It does not
implement business calculations, persistence, alerts, or notifications.

## Current phase status

- Phase 0 — Initialization: **DONE**.
- Phase 1 — Architecture: **DONE**.
- Phase 2 — Business logic: **DONE** (`TASK-001` through `TASK-007`).
- Phase 3 — UI: **IN PROGRESS** (`TASK-020` complete).

The approved architecture separates pure calculations, React coordination, presentation, and
platform services. The next task is `TASK-021`, which creates the domain-labelled worked-time field.
