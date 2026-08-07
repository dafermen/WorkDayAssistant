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

### Verified

- ESLint, formatting, unit tests, 90% coverage thresholds, production build, and Capacitor sync.

### Known issues

- The Capacitor CLI currently includes a development-only transitive dependency with a moderate
  npm advisory. Production dependencies report zero vulnerabilities, and npm offers only a forced
  breaking-version change, so no unsafe automatic fix was applied.
