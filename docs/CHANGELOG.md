# Changelog

## 2026-10-03 — TASK-027 streamlined daily workflow and web deployment

Added automatic `HH:mm:ss` separators for numeric input, four-digit minute entry, **Usar hora
actual**, one-step **Calcular e iniciar**, an explicit inactive/active/ringing alarm card, alarm test,
cancel, and new-workday actions. Clarified the meaning of every field. Added GitHub Pages production
deployment, relative Vite assets, a real updated screenshot, and version `0.2.0`. The suite now has
122 passing tests across 21 files with every coverage category above 95%.

## 2026-10-03 — TASK-023 and TASK-026 zoned countdown (local)

Added the accessible countdown component, live New York clock, selectable IANA time zones, exact
zoned target conversion, absolute countdown resynchronization, and a repeating Web Audio closing
alarm with explicit stop control. Editing inputs or changing zones cancels stale countdown state.
Added daylight-saving, background-resume, audio-service, component, hook, utility, and application
tests; the suite now has 102 passing tests across 19 files with every coverage category above 94%.
Updated the real application screenshot and mobile-browser limitation documentation. This work is
local and has not been published to GitHub.

## 2026-10-03 — TASK-025 editable maximum workday (local)

Changed the default maximum workday from `07:29:45` to `07:29:30` and exposed it as a third editable
`HH:mm:ss` input. Remaining-time calculations and over-limit warnings now use the validated value
visible in the form. Added the reusable maximum-workday wrapper and expanded integration, component,
conversion, validation, and utility tests. Formatting, ESLint, 79 tests with 100% coverage,
production build, responsive visual review, and Capacitor synchronization pass. This work remains
local and has not been published to GitHub.

## 2026-10-03 — TASK-024 functional calculator (local)

Connected the two required time inputs to `useWorkdayCalculator` and the existing pure utilities.
The application now validates submitted values, displays remaining time and recommended closing
time, identifies next-day rollover, clears stale results after edits, and warns when `07:29:45` is
exceeded. Updated the real application screenshot and usage documentation. Formatting, ESLint, 72
tests with 100% coverage, production build, and Capacitor synchronization pass. This work remains
local and has not been published to GitHub.

## 2026-10-03 — Documentation navigation (local)

Added an allowlisted static documentation reader and Home link. InnovaLogic colors, search, outline, previous/next, copy and image enlargement; generated during root build/dev. Lint, 67 tests and production build pass; desktop/mobile reader verification passes. See [reader maintenance](../documentation-web/README.md). No deployment or Android synchronization was performed for this update.

All notable project changes are documented in this file.

## [Unreleased]

### Added

- React and strict TypeScript application shell.
- Vite development and production build configuration.
- ESLint and Prettier configuration.
- Vitest, jsdom, React Testing Library, and an initial application test.
- Capacitor configuration for the Android-first application.
- Generated Capacitor Android platform and synchronized web assets.
- Reproducible npm dependency lockfile.
- Required source directories and initial project documentation.
- Phase 1 dependency rules, module responsibilities, state flow, and testing boundaries.
- Shared time, workday, validation, persistence, notification, and audio service type contracts.
- Detailed Phase 2 task definitions and approved pure utility APIs.
- Pure `convertTimeToSeconds()` utility with a public utility export.
- Table-driven unit tests covering zero, second, minute, hour, maximum-workday, and end-of-day
  boundaries.
- Pure `convertSecondsToTime()` utility with centralized segment padding and public export.
- Table-driven formatting tests covering second, minute, hour, maximum-workday, and end-of-day
  boundaries.
- `validateTime()` now removes surrounding whitespace and returns normalized `HH:mm:ss` text or
  `null`.
- Validation tests for empty, malformed, internally spaced, and out-of-range values.
- Maximum-workday constants and `calculateRemainingTime()` with explicit within-limit and over-limit
  result states.
- Remaining-time tests for zero, partial, exact-limit, and exceeded workdays.
- `calculateClosingTime()` with wrapped 24-hour output and a separate day offset.
- Closing-time tests for arithmetic carry and same-day/midnight rollover cases.
- `isOneMinuteRemaining()` for the inclusive final-minute warning window.
- Boundary tests above, inside, and after the final-minute window.
- `isClosingTime()` with zero-or-less semantics for delayed countdown ticks.
- Phase 2 business logic completed with all seven planned utilities.
- Reusable controlled `TimeInput` with accessible label, format guidance, errors, and disabled state.
- Component behavior tests covering value, changes, error relationships, and disabled behavior.
- `WorkedTimeInput` domain wrapper reusing the shared time-input contract and markup.
- Wrapper tests covering its fixed label and forwarded value, change, error, and disabled props.
- `LastTaskTimeInput` domain wrapper reusing the shared input contract and accessible markup.
- Wrapper tests covering its fixed label and forwarded controlled states.
- GitHub Actions CI, Dependabot configuration, security policy, security audit, and updated README.
- Real screenshot of the current application milestone for GitHub documentation.

### Verified

- ESLint, formatting, unit tests, 90% coverage thresholds, production build, and Capacitor sync.
- Secret-pattern scans for tracked files and local Git history before initial GitHub publication.
- Initial `main` publication to GitHub completed without rewriting remote history.

### Changed

- Compatible dependency updates applied, including Capacitor `8.5.2`, Vitest `5.0.3`, React
  `19.3.0`, and Vite `8.3.2`; the TypeScript 7 major migration is documented for separate review.
- Development screen updated to identify the stable `v0.1.0` Phase 3 baseline.

### Known issues

- The Capacitor CLI currently includes a development-only transitive dependency with a moderate
  npm advisory. Production dependencies report zero vulnerabilities, and npm offers only a forced
  breaking-version change, so no unsafe automatic fix was applied.

### Architecture decisions

- Raw input remains in the UI/hook boundary until runtime validation narrows it to `TimeText`.
- Time calculations remain pure and depend only on shared types.
- Components cannot call persistence, browser, or Capacitor APIs directly.
- React hooks coordinate injected service contracts so integrations can be replaced in tests.
- Surrounding whitespace is normalized at the time-validation boundary; internal whitespace remains
  invalid so typing mistakes are not silently repaired.
- Over-limit worked time produces an explicit warning state, zero remaining time, and the excess
  duration; negative countdowns are never exposed.
- Midnight rollover is represented with `dayOffset`; no calendar date is fabricated from time-only
  input.
- The final-minute warning is active from 60 through 1 second; zero is reserved for closing state.
- Closing state remains active for negative values after delayed or suspended timer updates.

## DOC-STD-20261002

Documentation navigation and canonical sources updated; no product task or release gate is accepted by this change.
