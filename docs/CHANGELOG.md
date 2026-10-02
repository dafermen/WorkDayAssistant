# Changelog

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

### Verified

- ESLint, formatting, unit tests, 90% coverage thresholds, production build, and Capacitor sync.

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
