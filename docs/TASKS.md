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
`07:29:30`, and `23:59:59`; contains no React, browser, storage, clock, or Capacitor dependency; tests
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

**Objective:** Calculate the remaining duration against the provided maximum workday, defaulting to
`07:29:30`.

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

**Status:** DONE

## TASK-024 — Connect calculator inputs and results

**Objective:** Let the user enter both required values and receive the workday calculation in the
main application screen.

**Description:** Coordinate the existing accessible inputs and pure utilities through
`useWorkdayCalculator`. Validate on explicit form submission, render remaining time and recommended
closing time, identify midnight rollover, clear stale output after edits, and present an explicit
warning when worked time exceeds the entered maximum.

**Files to modify:** Calculator hook and exports, reusable result/warning components, input labels,
`HomePage`, related styles and tests, real application screenshot, and required documentation.

**Dependencies:** Completed Phase 2 utilities and `TASK-020` through `TASK-022`.

**Estimated time:** 90–120 minutes.

**Acceptance criteria:** Both values can be entered as `HH:mm:ss`; missing or malformed values show
accessible errors; a valid submission displays remaining and closing time; rollover is explicit;
over-limit work shows the excess without a negative countdown or misleading recommendation; edits
clear stale output.

**Definition of Done:** Formatting, ESLint, tests, 90% coverage gate, production build, visual
review, and Capacitor synchronization pass; required project documentation is updated.

**Documentation to update:** README, architecture, project, roadmap, tasks, testing, junior guide,
changelog, status, and session handoff.

**Status:** DONE

## TASK-025 — Make maximum workday editable

**Objective:** Allow the user to adjust the maximum workday while providing `07:29:30` as the
initial value.

**Description:** Add a reusable maximum-workday input, validate it with the other form values, pass
its numeric duration to `calculateRemainingTime`, clear stale output after edits, and include the
selected maximum in exceeded-limit messaging.

**Files to modify:** Workday types/constants and remaining-time utility, calculator hook, reusable
input and alert components, `HomePage`, styles, related tests, current screenshot, and required
documentation.

**Dependencies:** `TASK-024` and the completed Phase 2 utilities.

**Estimated time:** 60–90 minutes.

**Acceptance criteria:** The maximum field starts at `07:29:30`; the user can replace it with another
valid `HH:mm:ss` value; calculation and warning output use the edited value; invalid maximum values
show accessible feedback; editing the maximum clears stale output.

**Definition of Done:** Formatting, ESLint, tests, 90% coverage gate, production build, responsive
visual review, and Capacitor synchronization pass; required documentation is updated.

**Status:** DONE

## TASK-026 — Add zoned clock, absolute countdown, and browser alarm

**Objective:** Let the user monitor the real remaining time to the recommended closing instant.

**Description:** Show the current time in `America/New_York` by default, allow a curated IANA time
zone selection, resolve the calculated wall-clock closing time to an absolute timestamp, and update
the countdown from `Date.now()`. Resynchronize after visibility, focus, and page-show events. Prime a
Web Audio alarm from the start-button gesture and repeat it at zero until the user stops it.

**Acceptance criteria:** Daylight-saving and next-day targets are resolved in the selected zone;
background timer suspension cannot accumulate drift; editing inputs or changing zones cancels a
stale countdown; final-minute and closing states are accessible; unsupported audio never blocks the
visual countdown.

**Definition of Done:** Formatting, ESLint, tests, 90% coverage gate, production build, responsive
visual review, real screenshot, and Capacitor synchronization pass; required documentation updated.

**Status:** DONE

## TASK-027 — Streamline entry and alarm controls

**Objective:** Reduce daily input effort and make alarm state unmistakable.

**Description:** Format numeric time input automatically, complete four digits with zero seconds,
offer the selected zone's current time for the final task, combine calculation and countdown start,
show explicit alarm status, add test/cancel/reset actions, and explain each value at the point of
entry.

**Acceptance criteria:** Users never need to type colons; `1430` becomes `14:30:00`; current time is
inserted from the visible zoned clock; one submit calculates and starts; alarm state and scheduled
time are visible; quick actions have accessible names; stale calculations are cleared safely.

**Definition of Done:** Formatting, ESLint, 122 tests, 90% coverage gate, production build,
desktop/mobile visual review, real screenshot, Capacitor synchronization, GitHub publication, and
GitHub Pages workflow.

**Status:** DONE

## TASK-028 — Add bilingual UI and align calculator fields

**Objective:** Make the complete daily workflow available in English and Spanish while correcting
the vertical alignment of the final-task field.

**Description:** Add a typed localization layer with English as the initial language, expose an
accessible language selector, localize the clock and all calculator states, and share the desktop
form's internal grid rows so wrapped content cannot push one input below the others.

**Acceptance criteria:** The application opens in English; the selector changes all visible and
accessible UI text to Spanish; dates and time-zone names follow the selected locale; values remain
unchanged while switching; the three desktop inputs align; the stacked mobile layout remains
readable; tests cover the default and alternate languages.

**Definition of Done:** Formatting, ESLint, tests, 90% coverage gate, production build,
desktop/mobile visual review, updated real screenshot, and required documentation pass.

**Status:** DONE

## TASK-029 — Optimize the primary workflow for phones

**Objective:** Make the complete calculator comfortable and reliable to operate on a narrow phone
screen, its main usage environment.

**Description:** Add viewport cutout support, safe-area-aware shell spacing, horizontal-overflow
protection, touch-friendly control heights, iPhone-safe input text sizing, full-width mobile actions,
and compact single-column spacing. Preserve the aligned desktop layout and all bilingual behavior.

**Acceptance criteria:** The complete initial workflow is readable in one column at 500 pixels;
selectors, inputs, and actions are easy to touch; typing does not trigger iPhone form zoom; device
notches and home indicators do not cover content; no horizontal page scroll is introduced.

**Definition of Done:** Formatting, ESLint, 123 tests, the 90% coverage gate, production build,
real mobile screenshot, responsive visual review, Capacitor synchronization, and required
documentation pass.

**Status:** DONE

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

**Status:** DONE
