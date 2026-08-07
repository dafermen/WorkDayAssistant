# Junior Developer Guide

## Why this project exists

A technician needs a reliable answer to a deceptively simple question: when should the final task
be closed so the total workday does not exceed `07:29:45`? Performing the calculation manually is
slow and easy to get wrong, especially near the end of a shift.

## Why React and TypeScript

React separates the interface into reusable components. TypeScript catches many data-shape and
function-usage mistakes before the application runs. Strict mode is enabled because time-related
logic benefits from explicit types and early feedback.

Alternatives include plain JavaScript, Vue, or native Android development. React and Capacitor were
selected by the project requirements so one web codebase can later support Android and iOS.

## Why business logic will be separate

Time calculations will live in pure utility functions rather than UI components. Pure functions
are easier to test because the same input always gives the same output and no browser is required.

Common mistakes include mixing formatted time strings with numeric seconds, allowing invalid
minutes or seconds, and storing data directly from components.

## Why services isolate platform features

Storage, notifications, and alarms depend on browser or mobile APIs. Services create a boundary so
components do not need to know which platform implementation is active.

## Learning references

- React documentation: component composition and state.
- TypeScript handbook: strict type checking and narrowing.
- Vitest documentation: unit tests and coverage.
- Capacitor documentation: native project workflow.

Use the official documentation for the installed major versions because tool behavior evolves.
