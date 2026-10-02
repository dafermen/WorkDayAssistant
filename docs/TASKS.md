# Tasks

## PHASE0-001 — Initialize the web toolchain

**Objective:** Create a runnable React and strict TypeScript project.

**Files to modify:** Root configuration, `src`, `tests`, and initial documentation.

**Dependencies:** Node.js and npm.

**Estimated time:** 60–90 minutes.

**Acceptance criteria:** Development, lint, test, format-check, and production build commands are
configured; the application shell renders; strict TypeScript is enabled.

**Definition of Done:** Dependencies install, tests pass, lint passes, formatting passes, and the
web build succeeds.

**Documentation to update:** All Phase 0 documents.

**Status:** DONE

## PHASE0-002 — Configure Capacitor and Android

**Objective:** Prepare the application for an Android-first Capacitor workflow.

**Files to modify:** `capacitor.config.ts`, `package.json`, generated `android` platform, and
Capacitor documentation.

**Dependencies:** Completed web build; Java and Android Studio for native compilation.

**Estimated time:** 30–60 minutes.

**Acceptance criteria:** Capacitor uses `dist`, the Android platform exists, and web assets can be
synchronized.

**Definition of Done:** Capacitor sync completes. Native compilation is separately gated by the
local Android toolchain.

**Documentation to update:** `CAPACITOR.md`, `DEPLOYMENT.md`, `STATUS.md`, `CHANGELOG.md`, and
`SESSION_HANDOFF.md`.

**Status:** DONE

## PHASE1-001 — Define application architecture

**Objective:** Specify the types, interfaces, modules, data flow, service boundaries, hooks, and
component responsibilities before business logic begins.

**Files to modify:** `docs/ARCHITECTURE.md`, `docs/TASKS.md`, and only the minimal type or interface
files approved by the task.

**Dependencies:** Phase 0 complete.

**Estimated time:** 60–120 minutes.

**Acceptance criteria:** Responsibilities and dependency directions are explicit, testable, and
consistent with the master specification.

**Definition of Done:** Architecture documentation is approved and the next implementation task is
unambiguous.

**Documentation to update:** `ARCHITECTURE.md`, `STATUS.md`, `CHANGELOG.md`, and
`SESSION_HANDOFF.md`.

**Status:** DONE

## TASK-001 — Create `convertTimeToSeconds()`

**Objective:** Convert validated `HH:mm:ss` text into total seconds using a pure function.

**Description:** Implement the first approved utility API:
`convertTimeToSeconds(value: TimeText): DurationSeconds`. Invalid text is outside this task because
runtime validation belongs to `TASK-003`.

**Files to modify:** `src/utils/convertTimeToSeconds.ts`, its unit test, the utility export, and
required session documentation.

**Dependencies:** `PHASE1-001` and the `TimeText`/`DurationSeconds` contracts.

**Estimated time:** 30–60 minutes.

**Acceptance criteria:** Correctly converts at least `00:00:00`, `00:00:01`, `01:00:00`,
`07:29:45`, and `23:59:59`; contains no React, browser, storage, clock, or Capacitor dependency; tests
explain boundary cases.

**Definition of Done:** Implementation, unit tests, and WHY-focused comments are complete; lint,
format, tests, coverage, and production build pass.

**Documentation to update:** `CHANGELOG.md`, `STATUS.md`, `SESSION_HANDOFF.md`,
`JUNIOR_DEVELOPER_GUIDE.md`, and `TESTING.md`.

**Status:** DONE

## TASK-002 — Create `convertSecondsToTime()`

**Objective:** Convert a non-negative whole-second duration into `HH:mm:ss`.

**Files to modify:** One utility module, its unit test, utility exports, and required documentation.

**Dependencies:** `TASK-001` architecture contracts.

**Estimated time:** 30–60 minutes.

**Acceptance criteria:** Formats zero, component boundaries, and the maximum workday value with
two-digit segments.

**Definition of Done:** Tests, WHY-focused comments, documentation, and all checks pass.

**Documentation to update:** Standard session documentation and testing guide.

**Status:** DONE

## TASK-003 — Create `validateTime()`

**Objective:** Normalize surrounding whitespace and narrow raw input to valid `TimeText` at runtime.

**Files to modify:** One utility module, its unit test, utility exports, and required documentation.

**Dependencies:** Time type contracts and the approved policy to remove surrounding whitespace.

**Estimated time:** 45–75 minutes.

**Acceptance criteria:** Returns normalized `TimeText` or `null`; covers required, structural, and
range validation including hour, minute, and second boundaries; rejects internal whitespace.

**Definition of Done:** Deferred validation decision is documented; tests and all checks pass.

**Documentation to update:** Architecture decision, standard session documentation, junior guide,
and testing guide.

**Status:** DONE

## TASK-004 — Create `calculateRemainingTime()`

**Objective:** Calculate the remaining duration against the maximum workday of `07:29:45`.

**Files to modify:** Maximum-workday constant, one utility module, its unit test, exports, and
required documentation.

**Dependencies:** `TASK-001`, `TASK-002`, and the approved explicit-warning behavior.

**Estimated time:** 45–75 minutes.

**Acceptance criteria:** Covers zero worked time, partial time, exact maximum, and over-limit
behavior; over-limit results contain zero remaining time and the excess duration for the warning.

**Definition of Done:** Deferred over-limit decision is documented; tests and all checks pass.

**Documentation to update:** Architecture decision and standard session documentation.

**Status:** DONE

## TASK-005 — Create `calculateClosingTime()`

**Objective:** Add the remaining duration to the final-task start clock time.

**Files to modify:** One utility module, its unit test, exports, and required documentation.

**Dependencies:** `TASK-001`, `TASK-002`, and the approved `dayOffset` rollover behavior.

**Estimated time:** 45–75 minutes.

**Acceptance criteria:** Covers second/minute/hour carry; returns a wrapped clock time and day offset
when the result crosses midnight.

**Definition of Done:** Deferred rollover decision is documented; tests and all checks pass.

**Documentation to update:** Architecture decision and standard session documentation.

**Status:** DONE

## TASK-006 — Create `isOneMinuteRemaining()`

**Objective:** Identify the approved one-minute visual and audible alert window.

**Files to modify:** One utility module, its unit test, exports, and required documentation.

**Dependencies:** The approved inclusive 1–60 second alert window.

**Estimated time:** 30–45 minutes.

**Acceptance criteria:** Returns true from 60 through 1 second and false above 60, at zero, and for
defensive negative values.

**Definition of Done:** Deferred alert-window decision is documented; tests and all checks pass.

**Documentation to update:** Architecture decision and standard session documentation.

**Status:** DONE

## TASK-007 — Create `isClosingTime()`

**Objective:** Identify when the countdown has reached its closing state.

**Files to modify:** One utility module, its unit test, exports, and required documentation.

**Dependencies:** Remaining-time representation established by prior Phase 2 tasks.

**Estimated time:** 30–45 minutes.

**Acceptance criteria:** Covers positive, zero, and defensive negative remaining values.

**Definition of Done:** Tests, WHY-focused comments, documentation, and all checks pass.

**Documentation to update:** Standard session documentation and testing guide.

**Status:** DONE

## TASK-020 — Create reusable `TimeInput`

**Objective:** Create the shared accessible `HH:mm:ss` input used by worked time and final-task start
time fields.

**Description:** Build a controlled presentation component that receives its label, value, change
callback, and optional error through props. It must not calculate time or call services.

**Files to modify:** `src/components/TimeInput.tsx`, its component test, component exports, shared
styles limited to this component, and required session documentation.

**Dependencies:** Completed Phase 2 validation contract and the Phase 1 component boundaries.

**Estimated time:** 45–75 minutes.

**Acceptance criteria:** Accessible label/input association; `HH:mm:ss` guidance; controlled value;
change callback; accessible error relationship; reusable labels; no direct storage, notification, or
calculation dependency.

**Definition of Done:** Behavior tests, WHY-focused comments where needed, documentation, formatting,
lint, coverage, and production build all pass.

**Documentation to update:** `CHANGELOG.md`, `STATUS.md`, `SESSION_HANDOFF.md`,
`JUNIOR_DEVELOPER_GUIDE.md`, and `TESTING.md`.

**Status:** DONE

## TASK-021 — Create `WorkedTimeInput`

**Objective:** Create the domain-labelled worked-time field using the shared `TimeInput` component.

**Description:** Add a thin reusable wrapper that fixes the correct label and forwards value,
change, error, and disabled props without adding business calculations.

**Files to modify:** One component module, its behavior test, component exports, and required session
documentation.

**Dependencies:** `TASK-020`.

**Estimated time:** 30–45 minutes.

**Acceptance criteria:** Renders the worked-time label and forwards controlled input behavior,
errors, and disabled state to `TimeInput` without duplicating markup or validation.

**Definition of Done:** Tests, documentation, formatting, lint, coverage, and build all pass.

**Documentation to update:** Standard session documentation and testing guide.

**Status:** DONE

## TASK-022 — Create `LastTaskTimeInput`

**Objective:** Create the domain-labelled final-task start field using the shared `TimeInput`.

**Description:** Add a thin reusable wrapper that fixes the correct label and forwards value,
change, error, and disabled props without adding business calculations.

**Files to modify:** One component module, its behavior test, component exports, and required session
documentation.

**Dependencies:** `TASK-020`.

**Estimated time:** 30–45 minutes.

**Acceptance criteria:** Renders the final-task start label and forwards controlled input behavior,
errors, and disabled state without duplicating the shared input markup or validation.

**Definition of Done:** Tests, documentation, formatting, lint, coverage, and build all pass.

**Documentation to update:** Standard session documentation and testing guide.

**Status:** DONE

## TASK-023 — Create `Countdown`

**Objective:** Present the live remaining duration as an accessible `HH:mm:ss` display.

**Description:** Build a reusable presentation component that receives formatted time and an alert
state through props. It must not own a timer, calculate remaining time, or trigger notifications.

**Files to modify:** One component module, its behavior test, component exports, component-limited
styles, and required session documentation.

**Dependencies:** Completed Phase 2 formatting and alert-state contracts.

**Estimated time:** 45–75 minutes.

**Acceptance criteria:** Exposes a clear countdown label and value, announces updates appropriately,
supports normal/final-minute/closing visual states, and contains no timer or service dependency.

**Definition of Done:** Tests, documentation, formatting, lint, coverage, and build all pass.

**Documentation to update:** Standard session documentation and testing guide.

**Status:** NOT STARTED

## RELEASE-001 — Publish stable GitHub baseline

**Objective:** Safely publish the verified `v0.1.0` development milestone to GitHub.

**Description:** Audit dependencies and secrets, align stable tool versions, add repository security
and CI configuration, update GitHub documentation with a real screenshot, and push without rewriting
remote history.

**Files to modify:** Dependency manifests, GitHub configuration, root security/readme files, current
milestone screen/test, screenshot, and required project documentation.

**Dependencies:** Phase 2 complete and a compatible empty GitHub repository.

**Estimated time:** 60–120 minutes.

**Acceptance criteria:** Production audit clean; residual development advisories documented; secret
scans clean; format, lint, tests, coverage, build, and Capacitor sync pass; screenshot is generated
from the real build; CI and Dependabot configured; remote push and tag succeed.

**Definition of Done:** `main` and annotated `v0.1.0` tag exist remotely with a clean local worktree.

**Documentation to update:** README, security policy/audit, GitHub workflow, changelog, status, and
session handoff.

**Status:** IN PROGRESS
