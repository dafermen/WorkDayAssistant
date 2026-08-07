# Capacitor

## Configuration

- App ID: `com.workdayassistant.app`
- App name: `WorkDay Assistant`
- Web output directory: `dist`
- First native target: Android

## Workflow

```bash
npm run build
npm run cap:sync
npm run cap:android
```

The web application must be built before synchronization because Capacitor copies the contents of
`dist` into the native project.

Phase 0 successfully generated the Android project and completed synchronization.

## Environment requirements

Native Android compilation requires a supported Java Development Kit, Android Studio, and Android
SDK. Java is not currently available in the command-line environment, so Phase 0 verifies the web
build and Capacitor synchronization but not native compilation.

## Platform boundaries

Future local-notification and alarm code must be accessed through services. React components must
not call Capacitor plugins directly unless a later architecture task explicitly changes this rule.
