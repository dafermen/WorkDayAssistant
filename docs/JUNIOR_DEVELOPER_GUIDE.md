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

## How the application layers fit together

The application uses one-way dependency rules. Pages compose components and hooks. Hooks coordinate
pure utilities and service contracts. Utilities depend only on types. Services are the only modules
that know about browser or Capacitor APIs.

This structure exists so a change to Android notifications cannot accidentally change the workday
calculation. It also lets a test replace storage or audio with a small fake implementation.

An alternative is to place calculations and `localStorage` calls directly in a React component.
That may feel faster for a tiny prototype, but the component becomes difficult to test and reuse.
Another alternative is a global state library. It is unnecessary while the product has one page and
a small, local state graph.

Common architecture mistakes include:

- importing Capacitor from a presentation component;
- keeping both inputs and calculated outputs as independent sources of truth;
- trusting a saved string because TypeScript says a field is `TimeText`;
- duplicating a time formula inside both a hook and a component;
- introducing an abstraction without a current boundary or testing need.

When adding a module, first identify its layer in `ARCHITECTURE.md`. If its imports point upward in
the dependency table, move the behavior to the correct boundary before adding more code.
