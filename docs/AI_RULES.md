# AI Rules

1. Work only within the current phase, activity, and task.
2. Do not redesign the architecture, move folders, or rename public APIs without an explicit task.
3. Do not modify files unrelated to the current task.
4. Keep tasks small enough for approximately 30–120 minutes of focused work.
5. Add unit tests and documentation to every business-logic task.
6. Explain why a non-obvious decision exists; do not merely restate what the code does.
7. If a requirement is ambiguous, stop and record the question instead of guessing.
8. At the end of every session, run the build and tests and update:
   - `CHANGELOG.md`
   - `STATUS.md`
   - `SESSION_HANDOFF.md`
9. React components must never access `localStorage` directly.
10. Use Conventional Commits and keep each commit to one logical change.
