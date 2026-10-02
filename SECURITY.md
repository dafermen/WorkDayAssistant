# Security Policy

## Supported versions

The latest tagged development milestone is the only supported version while the application remains
under active development.

| Version        | Supported |
| -------------- | --------- |
| `0.1.x`        | Yes       |
| Older versions | No        |

## Reporting a vulnerability

Do not disclose suspected vulnerabilities, credentials, tokens, or private user data in a public
issue. Use GitHub's private vulnerability reporting feature in the repository **Security** tab. If
that feature is unavailable, contact the repository owner privately through their GitHub profile.

Include the affected version, reproduction steps, expected impact, and any suggested mitigation.
Please allow reasonable time for investigation before public disclosure.

## Secrets

The application does not currently require API keys. Never commit `.env` files, private keys,
keystores, signing credentials, `google-services.json`, or Android machine-specific configuration.
The repository ignore rules cover these common secret-bearing files.

If a secret is committed, remove it from use immediately and rotate or revoke it. Removing a value
from a later commit does not remove it from Git history.

## Dependency policy

- Production dependencies must pass `npm audit --omit=dev` before release.
- Development-only advisories are documented and reviewed before publication.
- Forced dependency changes are not applied when they would introduce an incompatible downgrade.
- Dependabot monitors npm and GitHub Actions dependencies.
