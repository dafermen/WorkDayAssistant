# Deployment

## Web build

```bash
npm ci
npm run build
```

The production web output is written to `dist`.

## GitHub Pages

`.github/workflows/pages.yml` builds and deploys `dist` after every push to `main`. Vite uses
relative asset paths so the same build works at the project subpath and inside Capacitor.

Production URL: <https://dafermen.github.io/WorkDayAssistant/>

The repository's Pages source must be set to **GitHub Actions** once in repository settings. Runtime
deployments then use only GitHub's short-lived deployment token; no application secret or API key is
required.

## Test server

Public URL: <https://workdayassistant.innovalogic.tech/>.
Documentation: <https://workdayassistant.innovalogic.tech/docs/>.

This domain is served by Nginx on the existing authorized VPS. It is independent of the GitHub
Pages workflow. Publishing on Pages alone does not update this domain.

The application is static: publish only `dist/` under a new
`/opt/workdayassistant/releases/<release>/public` directory. Verify archive/file checksums,
preserve the previous release, and atomically replace `/opt/workdayassistant/current` with a
symlink to the new release. Do not copy `.env`, source dependencies, native signing files or
private data. Keep SSH credentials outside Git and preserve the existing Nginx/TLS configuration.

Before switching, run the release safeguards below plus `npm run format:check` and
`npm audit --omit=dev`. After switching, verify HTTPS, root assets, `/docs/`, and the calculator and
alarm workflows at desktop/mobile widths. Browser audio requires a user gesture and is not a
guarantee of delivery while the browser is suspended; see the native-notification backlog.

On 2026-10-03, source `7da88e1` (v0.2.0) passed those checks. Application release:
`/opt/workdayassistant/releases/20261003-v020-7da88e1`. Previous release:
`/opt/workdayassistant/releases/20261002`. Backup and delivery evidence:
`/var/backups/workdayassistant/20261003-v020-7da88e1`.

If post-deployment checks fail, atomically point `current` back to the recorded previous release,
verify the restored HTTPS application, and keep the failed artifacts and evidence for diagnosis.
Do not delete releases or replace another deployment that advanced in the meantime.

## Android preparation

```bash
npm run build
npm run cap:sync
npm run cap:android
```

Android packaging and signing will be specified in a later deployment task. A native build requires
a supported Java Development Kit, Android Studio, and the Android SDK.

## Release safeguards

- Run lint, tests, coverage, and the production build.
- Synchronize Capacitor after every web build used by a native release.
- Never commit signing secrets or machine-specific `android/local.properties`.

## GitHub milestone publication

Before pushing a milestone, verify the remote has no conflicting history, scan tracked files and Git
history for secret patterns, run the complete validation suite, update the README screenshot, and
create an annotated semantic-version tag.
