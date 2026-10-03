# GitHub Workflow

## Repository

<https://github.com/dafermen/WorkDayAssistant>

## Branches

Create a short-lived branch for one task. Suggested format: `task/phase0-001-initialize`.

## Commits

Use Conventional Commits and keep one logical change per commit. Examples:

- `chore: initialize React and TypeScript project`
- `chore: configure Capacitor Android platform`
- `docs: record phase zero completion`

## Pull requests

- Keep pull requests small and tied to one task.
- Include acceptance criteria and test evidence.
- Update `STATUS.md`, `CHANGELOG.md`, and `SESSION_HANDOFF.md`.
- Do not merge while required checks are failing.

## Repository protection recommendation

Require the `validate` CI job before merging to `main`. Enable branch protection, private
vulnerability reporting, secret scanning when available, and Dependabot security updates.

## Continuous integration

`.github/workflows/ci.yml` installs the lockfile with Node.js 24 and runs formatting, ESLint,
coverage tests, and the production build for pushes and pull requests targeting `main`.

The workflow uses read-only repository permissions. No application secrets are required.

`pages.yml` separately receives only `contents: read`, `pages: write`, and `id-token: write`. A push
to `main` builds the verified static application and publishes it to GitHub Pages.

## Dependency maintenance

Dependabot checks npm packages and GitHub Actions weekly. Security fixes should remain small,
preserve the lockfile, and pass the complete CI workflow before merging.
