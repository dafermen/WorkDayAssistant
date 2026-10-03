# Project

## Purpose

WorkDay Assistant helps a ServiceNow technician determine the exact time to close the last task of
the day while respecting an editable maximum workday that defaults to `07:29:30`.

## Inputs

- Maximum workday in `HH:mm:ss`, defaulting to `07:29:30`.
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
- Phase 3 — UI: **IN PROGRESS** (`TASK-020` through `TASK-022`, `TASK-024`, and `TASK-025`
  complete, plus `TASK-023`, `TASK-026`, and `TASK-027`).

The current development state provides an editable maximum-workday input, the two calculation
inputs, validation, remaining time, recommended closing time, midnight rollover messaging, an
over-limit warning, a New York clock, selectable time zones, an absolute countdown, and a browser
audio alarm. The approved architecture continues to separate pure calculations, React coordination,
presentation, and platform services. Numeric entry, current-time insertion, one-step start, alarm
confirmation, and quick actions are complete. Persistence and native background notifications remain
pending.

## Published milestone

`v0.2.0` is the stable browser milestone with the complete calculator, countdown, streamlined entry,
and alarm workflow. Native background notifications and signed Android distribution remain pending.
