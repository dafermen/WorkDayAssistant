# WorkDayAssistant — Documentation map and maintenance

## DOC-STD-20261002 — Canonical sources

Documentation standard v1.0 · reviewed 2026-10-02. Primary language: English.

Android-first React/TypeScript workday assistant with web preview.

Version `0.2.0` includes the calculator, zoned clock, countdown, streamlined numeric input, and
browser alarm. Persistence and native background notifications remain unfinished. GitHub Pages,
Android synchronization, and native device acceptance remain separate release states.

| Need            | Authoritative source                                        |
| --------------- | ----------------------------------------------------------- |
| Presentation    | [README.md](../README.md)                                   |
| Current state   | [docs/STATUS.md](STATUS.md)                                 |
| Architecture    | [docs/ARCHITECTURE.md](ARCHITECTURE.md)                     |
| Testing         | [docs/TESTING.md](TESTING.md)                               |
| Deployment      | [docs/DEPLOYMENT.md](DEPLOYMENT.md)                         |
| Development     | [docs/JUNIOR_DEVELOPER_GUIDE.md](JUNIOR_DEVELOPER_GUIDE.md) |
| Security        | [SECURITY.md](../SECURITY.md)                               |
| Mobile          | [docs/CAPACITOR.md](CAPACITOR.md)                           |
| Tasks           | [docs/TASKS.md](TASKS.md)                                   |
| Session handoff | [docs/SESSION_HANDOFF.md](SESSION_HANDOFF.md)               |
| History         | [docs/CHANGELOG.md](CHANGELOG.md)                           |

Start with the presentation and current state, then read the user guide to try the product, development/architecture to contribute, or deployment/operations to maintain it. The existing detailed index remains valid.

### Evidence and updates

Keep current state, change history and decisions separate. Existing dated test results remain historical evidence. Adding this map does not rerun every documented command or complete pending product acceptance. Record actual checks, their environment and unresolved limits before publication.

Update the source guide whenever commands, configuration, behavior, permissions or deployment change. Keep existing links and portal routes stable. Use real screenshots with synthetic data; never publish env values, access keys, user data or operational logs. A local commit, a remote commit and a deployed artifact are separate states.

## Web reading

[Build and maintain the documentation reader](../documentation-web/README.md).
