# GitHub Workflow

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

After the remote repository exists, require successful lint, test, and build checks before merging
to the default branch.
