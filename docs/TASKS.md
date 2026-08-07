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

**Status:** NOT STARTED
