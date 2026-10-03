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
