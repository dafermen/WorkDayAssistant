# Testing

## Test stack

- Vitest for the test runner.
- jsdom for browser-like tests.
- React Testing Library for behavior-oriented component tests.
- V8 coverage with a minimum threshold of 90% for lines, statements, functions, and branches.

## Commands

```bash
npm test
npm run test:watch
npm run test:coverage
```

GitHub Actions also runs formatting, lint, coverage, and production build checks on `main` and pull
requests.

## Testing principles

- Test public behavior rather than internal implementation details.
- Give every Phase 2 business-logic task focused unit tests, including invalid inputs and boundary
  conditions.
- Avoid timing-dependent tests when a deterministic clock can be injected.
- A task is not complete if its tests fail or required coverage drops below 90%.

## Phase 0 baseline

The initial application test passes and the currently exercised application modules report 100%
coverage. Coverage must be reassessed as each production module is added.

## TASK-001 coverage

`convertTimeToSeconds()` uses a table-driven test so every case exercises the same public behavior
without duplicated test code. The cases cover zero, the smallest second, a complete minute, a
complete hour, the maximum workday, and the largest valid clock value.

Invalid text is intentionally excluded because `TASK-003` owns runtime validation. Tests should not
force one task to implement another task's responsibility.

## TASK-002 coverage

`convertSecondsToTime()` has table-driven cases immediately before and at minute and hour changes,
plus the maximum workday and `23:59:59`. Testing both sides of a boundary catches remainder mistakes
that a single typical value would miss.

Negative and fractional values are excluded because the public contract accepts a non-negative
whole-second duration. The boundary producing a `DurationSeconds` value is responsible for honoring
that precondition.

## TASK-003 coverage

`validateTime()` tests exact boundary values and normalization of spaces, tabs, and line breaks.
Invalid cases distinguish missing values, malformed structure, internal whitespace, extra content,
and out-of-range hour, minute, and second segments.

Returning the expected normalized text is asserted directly. This verifies both validation and the
user-approved cleanup behavior rather than checking only a boolean result.

## TASK-004 coverage

`calculateRemainingTime()` tests zero and partial workdays, one second before the limit, the exact
limit, one second above it, and a larger excess. The assertions compare the complete discriminated
result so both the warning status and its numeric details are verified.

The exact limit remains `within-limit` with zero seconds remaining. This boundary distinguishes a
completed valid workday from an exceeded one.

## TASK-005 coverage

`calculateClosingTime()` tests no remaining time, ordinary addition, carries between units, the
maximum remaining duration, and multiple midnight boundaries. Every assertion checks both the
wrapped clock text and `dayOffset` so rollover information cannot be lost silently.

## TASK-006 coverage

`isOneMinuteRemaining()` tests 61, 60, 59, 1, 0, and -1 seconds. These values cover both sides of
each boundary and confirm that final-minute and closing states never overlap.

## TASK-007 coverage

`isClosingTime()` tests ordinary positive values, zero, and a defensive negative value. The tests
confirm that a timer delayed past zero remains in closing state.

## Phase 2 result

All seven business-logic utilities are covered by boundary-focused unit tests. The project-wide
coverage gate remains at 90%; the current measured result is 100%.

## TASK-020 coverage

`TimeInput` behavior tests query the field by its accessible label, verify the controlled value and
change callback, confirm that both hint and error contribute to its accessible description, and
cover the disabled state. Tests avoid relying on private component structure.

## TASK-021 coverage

`WorkedTimeInput` tests its fixed accessible label and verifies that value, change callbacks, errors,
and disabled state reach the shared control. These tests focus on the wrapper contract instead of
repeating every `TimeInput` implementation test.

## TASK-022 coverage

`LastTaskTimeInput` mirrors the wrapper-contract tests for the final-task start label. The tests
confirm controlled value and callback forwarding plus accessible error and disabled states without
duplicating the shared component's complete test suite.
