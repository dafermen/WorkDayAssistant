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
