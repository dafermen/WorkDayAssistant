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
