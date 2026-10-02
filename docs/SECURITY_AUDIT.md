# Security Audit

## Audit date

2026-10-01

## Release candidate

Development milestone `v0.1.0`.

## Completed checks

- Production dependency audit: zero known vulnerabilities.
- Development dependency audit after safe updates: three moderate advisories in the Capacitor CLI's
  transitive `xcode` → `uuid` dependency.
- Tracked-file secret-pattern scan: no detected API keys, access tokens, or private-key headers.
- Git-history secret-pattern scan: no detected API keys, access tokens, or private-key headers.
- Sensitive-filename scan: no tracked `.env`, private key, keystore, signing credential,
  `google-services.json`, or Android `local.properties` file.
- Formatting, ESLint, 67 tests, 100% measured coverage, and production build verified.

## Dependency updates

- Capacitor Android, Core, and CLI aligned on stable `8.5.2` patch releases.
- Vitest and coverage provider updated to stable `5.0.3` to resolve the reported mocker advisory.
- Compatible React, Vite, ESLint, testing, type-definition, and formatting updates applied and
  verified by the complete validation suite.
- Safe transitive updates removed the previously reported high-severity development advisories.

## Version policy

The final direct-dependency check reports only TypeScript `7.0.2` newer than the installed `6.0.3`.
That major-version migration is intentionally deferred because it is not required by a security fix
and should be evaluated separately with the compiler configuration and surrounding toolchain. All
other direct dependencies are current within the selected stable release lines.

## Accepted development-only advisory

The remaining `uuid` advisory is reachable only through the Capacitor CLI development toolchain and
is not included in the production web bundle. npm currently proposes `--force`, which would install
an incompatible Capacitor CLI version. That forced change was rejected to avoid destabilizing the
native project.

This acceptance must be revisited when Capacitor releases a compatible upstream fix. Dependabot is
configured to surface that update.

## Limitations

- This is a repository and dependency audit, not a penetration test.
- Native Android compilation was not performed because Java and the Android SDK are unavailable in
  the current command-line environment.
- GitHub branch protection and private vulnerability reporting require repository-side settings and
  should be enabled after publication.
