# WorkDay Assistant

[![CI](https://github.com/dafermen/WorkDayAssistant/actions/workflows/ci.yml/badge.svg)](https://github.com/dafermen/WorkDayAssistant/actions/workflows/ci.yml)

WorkDay Assistant is an Android-first React and TypeScript application that helps a ServiceNow
technician determine when the final task should be closed without exceeding a maximum workday of
`07:29:45`.

> Development milestone `v0.1.0`: the complete business-logic layer and the first reusable UI inputs
> are stable and tested. The end-to-end calculator interface is still under active development.

## Current application

![Current WorkDay Assistant development build](./docs/images/current-app.png)

The image above is captured from the actual local production build for this milestone. It will be
updated as the calculator, countdown, alerts, persistence, and notifications are connected.

## Implemented

- Strict `HH:mm:ss` validation with external-whitespace normalization.
- Time-to-seconds and seconds-to-time conversions.
- Remaining-time calculation against `07:29:45`.
- Explicit over-limit warning data instead of negative countdowns.
- Recommended closing time with next-day rollover metadata.
- Final-minute and closing-state predicates.
- Accessible reusable time inputs for worked time and final-task start time.
- Capacitor Android project and web-to-native synchronization.
- Automated formatting, lint, tests, coverage, build, and GitHub CI.

## Quality baseline

- 67 automated tests.
- 100% measured coverage for the currently implemented modules.
- Zero known production dependency vulnerabilities.
- Secret-pattern and sensitive-filename checks completed before the initial GitHub publication.
- Dependabot configured for npm and GitHub Actions updates.

See [Security](./SECURITY.md) and the [security audit](./docs/SECURITY_AUDIT.md) for the remaining
development-tool advisory and the validation scope.

## Requirements

- Node.js 24 or a compatible version supported by the locked dependencies.
- npm 11 or later.
- Java Development Kit and Android Studio only for native Android compilation.

## Local development

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite.

## Validation

```bash
npm run format:check
npm run lint
npm run test:coverage
npm run build
```

## Android synchronization

```bash
npm run build
npm run cap:sync
```

Opening and compiling the native Android project additionally requires Java, Android Studio, and the
Android SDK.

## Documentation

- [Project scope](./docs/PROJECT.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Roadmap](./docs/ROADMAP.md)
- [Tasks](./docs/TASKS.md)
- [Current status](./docs/STATUS.md)
- [Testing](./docs/TESTING.md)
- [Capacitor](./docs/CAPACITOR.md)
- [Deployment](./docs/DEPLOYMENT.md)
- [GitHub workflow](./docs/GITHUB_WORKFLOW.md)
- [Session handoff](./docs/SESSION_HANDOFF.md)

## Repository

<https://github.com/dafermen/WorkDayAssistant>

## DOC-STD-20261002 — Documentation navigation

Use the [documentation map](docs/README.md) for authoritative sources, reading paths and project-specific maintenance rules.
