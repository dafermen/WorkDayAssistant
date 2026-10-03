# Roadmap

## Phase 0 — Project initialization

Status: **DONE**

- React and strict TypeScript.
- Capacitor configuration and Android platform baseline.
- ESLint, Prettier, Vitest, and React Testing Library.
- Initial documentation and required folders.

## Phase 1 — Architecture

Status: **DONE**

Defined shared types, service contracts, dependency direction, data flow, testing boundaries, and
the planned hook, utility, service, and component modules.

## Phase 2 — Business logic

Status: **DONE**

Implement and test the time conversion, validation, remaining-time, closing-time, and alert-state
functions defined by `TASK-001` through `TASK-007`.

Completed: `TASK-001` — `convertTimeToSeconds()`.

Completed: `TASK-002` — `convertSecondsToTime()`.

Completed: `TASK-003` — normalize and validate `HH:mm:ss` input.

Completed: `TASK-004` — calculate remaining time and signal an exceeded workday.

Completed: `TASK-005` — calculate the closing time with midnight rollover metadata.

Completed: `TASK-006` — identify the inclusive final-minute warning window.

Completed: `TASK-007` — identify closing state at zero or below.

All planned Phase 2 tasks are complete.

## Phase 3 — UI

Status: **IN PROGRESS**

Build the input, countdown, result, alert, and theme components in small reusable tasks.

Completed: `TASK-020` — reusable accessible `TimeInput` component.

Completed: `TASK-021` — worked-time domain wrapper.

Completed: `TASK-022` — final-task start domain wrapper.

Completed: `TASK-024` — connect the calculator form, validation, results, and over-limit warning.

Completed: `TASK-025` — make the maximum workday editable with a `07:29:30` default.

Completed: `TASK-023` — accessible countdown presentation.

Completed: `TASK-026` — New York clock, selectable time zone, absolute countdown, and browser alarm.

Completed: `TASK-027` — numeric entry, current-time shortcut, one-step start, clear alarm state, and
quick actions.

Next task: persist the selected time zone and add native background notification scheduling.

## Phase 4 — Persistence

Status: **NOT STARTED**

Persist application data through a dedicated service.

## Phase 5 — Notifications

Status: **NOT STARTED**

Browser audible and visual alarms are complete. Capacitor local notifications and native background
behavior remain pending.

## Phase 6 — Testing

Status: **NOT STARTED**

Reach and maintain at least 90% automated test coverage.

## Phase 7 — Documentation

Status: **NOT STARTED**

Complete user, developer, testing, deployment, and maintenance documentation.
