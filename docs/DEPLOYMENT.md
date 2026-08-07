# Deployment

## Web build

```bash
npm ci
npm run build
```

The production web output is written to `dist`.

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
