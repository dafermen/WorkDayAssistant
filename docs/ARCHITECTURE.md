# Architecture

## Status

Phase 1 architecture is **DONE**. The boundaries and public contracts in this document are the
baseline for later phases. Moving responsibilities or renaming these contracts requires an explicit
architecture task.

## Goals

- Keep time calculations deterministic and independent of React, browser APIs, and Capacitor.
- Keep UI components reusable and focused on rendering and user interaction.
- Isolate persistence, sound, and notifications behind services that can be replaced in tests.
- Preserve the same domain behavior on the web, Android, and future iOS builds.
- Make the data flow understandable to a first-year software engineering student.

## Non-goals for Phase 1

- No time calculation is implemented.
- No production hook, component, persistence adapter, alarm, or notification is implemented.
- No state-management library is introduced.
- No routing library is introduced because the current product has one page.

## Dependency direction

Dependencies flow inward toward pure types and utilities. Lower rows must not import from higher
rows.

| Layer        | May depend on                                    | Must not depend on                      |
| ------------ | ------------------------------------------------ | --------------------------------------- |
| `pages`      | components, hooks, types                         | platform APIs directly                  |
| `components` | types, styles                                    | services, Capacitor, localStorage       |
| `hooks`      | utilities, service contracts, types              | page implementations                    |
| `services`   | service contracts, types, browser/Capacitor APIs | React components                        |
| `utils`      | types                                            | React, services, browser/Capacitor APIs |
| `types`      | nothing                                          | runtime modules                         |

This direction prevents a platform integration from changing the calculation rules or forcing
components to know whether they run in a browser or native shell.

## Source modules

### `src/types`

Owns compile-time vocabulary shared across layers:

- `time.ts`: raw input, validated `HH:mm:ss` text, numeric duration, and time parts.
- `workday.ts`: user input, calculated output, validation issues, alerts, and persisted data.
- `services.ts`: persistence, notification, and audio service contracts.
- `index.ts`: the public type-only export surface.

`TimeText` confirms only the text shape at compile time. Runtime validation remains mandatory because
TypeScript cannot prove that minutes and seconds are within range.

### `src/utils`

Will contain pure functions. Each utility lives in its own file and receives all required data as
arguments. Utilities never read the clock, storage, DOM, or Capacitor directly.

The approved Phase 2 APIs are:

| Task       | Public API                                                                             | Responsibility                                              |
| ---------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `TASK-001` | `convertTimeToSeconds(value: TimeText): DurationSeconds`                               | Convert validated `HH:mm:ss` text to a numeric duration.    |
| `TASK-002` | `convertSecondsToTime(value: DurationSeconds): TimeText`                               | Format a non-negative duration as `HH:mm:ss`.               |
| `TASK-003` | `validateTime(value: RawTimeInput): TimeText \| null`                                  | Normalize external whitespace and reject invalid time text. |
| `TASK-004` | `calculateRemainingTime(worked: DurationSeconds): RemainingTimeResult`                 | Return remaining time or an explicit over-limit warning.    |
| `TASK-005` | `calculateClosingTime(start: TimeText, remaining: DurationSeconds): ClosingTimeResult` | Add time and expose midnight rollover.                      |
| `TASK-006` | `isOneMinuteRemaining(remaining: DurationSeconds): boolean`                            | Identify the one-minute alert state.                        |
| `TASK-007` | `isClosingTime(remaining: DurationSeconds): boolean`                                   | Identify the closing alert state.                           |

The maximum workday constant will be introduced with `TASK-004`, the first task that needs it. This
avoids adding unused production code during the architecture phase.

### `src/services`

Will contain adapters that implement the contracts in `src/types/services.ts`:

- `localStorageWorkdayService`: the only module allowed to access `localStorage`.
- `capacitorNotificationService`: schedules and cancels native local notifications.
- `webNotificationService`: supported browser notification behavior.
- `audioAlertService`: plays and stops audible alerts.

Hooks receive service interfaces instead of constructing platform implementations internally. This
supports test doubles and avoids importing Capacitor into web-independent code.

### `src/hooks`

Planned hooks and responsibilities:

- `useWorkdayCalculator`: owns raw form values, validation issues, and the derived calculation.
- `useCountdown`: turns an approved closing instant into changing remaining seconds.
- `useWorkdayPersistence`: loads and saves through `WorkdayStorageService`.
- `useWorkdayAlerts`: reacts to alert states and delegates to audio/notification services.

Hooks coordinate behavior; they do not duplicate time formulas that belong in utilities.

### `src/components`

Planned reusable presentation components:

- `TimeInput`: labelled `HH:mm:ss` input with accessible error text.
- `WorkedTimeInput` and `LastTaskTimeInput`: domain-labelled wrappers around `TimeInput`.
- `RemainingTimeCard` and `ClosingTimeCard`: result presentation.
- `Countdown`: live countdown presentation.
- `AlertBanner`: visual warning state.
- `DarkModeToggle`: theme control.

Components receive values and callbacks through props. They do not calculate workday values or call
storage and notification APIs.

### `src/pages`

`HomePage` composes the feature. It connects hooks to presentation components but does not contain
calculation formulas or platform-specific code.

## Data flow

1. The user enters raw `workedTime` and `lastTaskStartTime` text.
2. `useWorkdayCalculator` asks `validateTime` to narrow each value to `TimeText`.
3. Pure utilities convert values to seconds and calculate the remaining duration and closing time.
4. The hook exposes either validation issues or a `WorkdayCalculation` to the page.
5. Presentation components render the calculation without recomputing it.
6. Persistence receives only versioned `PersistedWorkdayData` through its service contract.
7. Countdown alert transitions are delegated to injected audio and notification services.

Derived values are not stored as the source of truth. They are recalculated from the two inputs so
saved data cannot become internally inconsistent.

## State strategy

React state and custom hooks are sufficient for the current single-page application. A global state
library would add concepts and dependencies without solving a current problem. This decision can be
reviewed only if later requirements introduce multiple independent pages or complex shared state.

## Error handling

- Raw user and persisted values are always treated as untrusted.
- Expected validation failures become `TimeValidationIssue` values shown near the relevant field.
- Unexpected service failures are caught at the coordinating hook boundary and surfaced without
  discarding valid user input.
- Notification permission denial disables notifications but must not block calculations or visual
  alerts.

## Testing strategy

- Utilities: table-driven unit tests for normal, boundary, and invalid values applicable to each
  contract.
- Hooks: render-hook tests with fake services and controlled time.
- Components: accessible behavior tests with React Testing Library.
- Services: contract-focused tests with browser APIs mocked at the service boundary.
- Integration: a small number of tests covering input-to-result and countdown alert flows.

The project-wide minimum remains 90% for statements, branches, functions, and lines.

## Resolved decisions

- `TASK-003`: surrounding whitespace is removed before validation. Internal whitespace is rejected.
  The function returns the normalized `TimeText` or `null` because a boolean type predicate cannot
  safely expose a transformed string.
- `TASK-004`: worked time above `07:29:45` returns `over-limit`, zero remaining seconds, and the
  number of excess seconds. This gives the UI an explicit warning state without a negative countdown.
- `TASK-005`: closing times wrap to a valid 24-hour clock and return `dayOffset`. The UI can show
  “next day” without inventing a calendar date that was never provided.
- `TASK-006`: the one-minute warning window is inclusive from 60 through 1 second. Zero belongs to
  the closing state; alert coordination must trigger sound only once when entering this window.

## Explicit decisions deferred to their tasks

The master requirements do not define the following behavior. The named task must resolve and
document the question before implementation; no current code assumes an answer.

There are no unresolved Phase 2 business-logic decisions.
