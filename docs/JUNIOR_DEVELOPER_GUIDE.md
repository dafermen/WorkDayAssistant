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

## Converting `HH:mm:ss` to seconds

`convertTimeToSeconds()` changes three time segments into one scalar value:

`hours × 3600 + minutes × 60 + seconds`

This representation exists because addition and subtraction are safer in one unit. Keeping three
separate fields would require every later calculation to repeat carry and borrow rules.

The function assumes its `TimeText` argument has already passed runtime validation. Mixing
validation into this task would duplicate the responsibility assigned to `validateTime()` and make
each utility harder to test independently.

An alternative is JavaScript's `Date`, but a worked duration is not a calendar date and time-zone or
daylight-saving behavior would introduce irrelevant complexity. Another alternative is storing
milliseconds; seconds are the smallest required precision, so milliseconds would not add value.

Common mistakes include using `60` seconds per hour, concatenating numeric text instead of converting
it, or accepting raw input without validation at the UI boundary.

## Formatting seconds as `HH:mm:ss`

`convertSecondsToTime()` reverses the scalar representation by using integer division and
remainders. Hours use division by 3,600. Minutes use the remainder after complete hours, and seconds
use the remainder after complete minutes.

Every segment is padded to two characters in one utility. Centralizing this rule prevents one card
from displaying `7:9:5` while another displays the required `07:09:05`.

The function does not use `Date` because it formats a duration rather than a calendar instant. A
date-based approach could introduce time-zone behavior and would hide the simple arithmetic that the
business rule actually needs.

The input contract is a non-negative whole number of seconds. Validation of arbitrary external
numbers belongs at the boundary that receives them; business utilities will produce whole seconds.
Common mistakes include forgetting the remainder after calculating hours, padding the entire string
instead of each segment, or rounding minutes before seconds are extracted.

## Normalizing and validating time text

`validateTime()` first applies `trim()` so harmless spaces, tabs, or line breaks around a pasted
value do not cause an error. It then requires exactly two digits for each segment, a 24-hour value
from `00` through `23`, and minutes and seconds from `00` through `59`.

The function returns the normalized `TimeText`, not merely `true`. A boolean could confirm that the
trimmed copy is valid while leaving the caller with the original string that still contains spaces.
Returning the accepted value keeps the runtime data consistent with the TypeScript type.

Internal spaces are rejected because removing characters inside the value could hide a typing error.
Common mistakes include using a pattern that accepts `99:99:99`, validating before trimming, or
casting raw user input to `TimeText` without a runtime check.

## Calculating remaining work time

`calculateRemainingTime()` compares worked seconds with the shared maximum of 26,985 seconds
(`07:29:45`). A value within the limit returns the subtraction result. A value over the limit returns
zero remaining seconds and a separate `exceededBySeconds` value.

The result uses `status: 'within-limit' | 'over-limit'`. This is called a discriminated union. It
forces callers to recognize the warning case instead of treating every number as an ordinary
countdown.

An alternative is returning a negative duration, but negative countdowns are confusing and require
every component to rediscover why the number is below zero. Another alternative is throwing an
exception; exceeding a work limit is an expected business state, not an unexpected software failure.

Common mistakes include duplicating `07:29:45` in several modules, treating the exact limit as
exceeded, or discarding how far over the limit the user is.

## Calculating a closing time across midnight

`calculateClosingTime()` converts the start clock time to seconds, adds the remaining duration, and
uses division and remainder by 86,400 seconds. The remainder becomes a valid 24-hour clock value;
the quotient becomes `dayOffset`.

This design avoids returning `25:15:00`, which is a duration rather than a clock time. It also avoids
creating a date because the inputs contain no calendar date. The UI can safely show “next day” when
`dayOffset` is one.

Common mistakes include losing the rollover information after applying modulo, creating dates in the
device time zone for simple arithmetic, or assuming every result belongs to the same day.

## Detecting the final-minute window

`isOneMinuteRemaining()` returns true for every whole-second value from 60 through 1. A repeating
timer may skip the exact value 60 because browsers and mobile devices can delay callbacks. Checking
the entire window makes the business state reliable despite that timing behavior.

Zero is excluded because it represents closing time. Negative values are also excluded defensively.
The future alert hook must remember whether it has already played the warning so a true predicate on
multiple timer ticks does not repeat the sound every second.

## Detecting closing time

`isClosingTime()` returns true at zero and for negative remaining values. A timer does not guarantee
that it will run at precisely the closing instant, especially while a phone suspends an application.
Accepting negative values ensures the closing alert still appears when execution resumes late.

This predicate intentionally does not play sounds or display UI. It describes domain state; later
hooks and components decide how to react to that state. Common mistakes include checking only strict
equality with zero or combining the final-minute and closing states into overlapping conditions.

## Building a reusable controlled time input

`TimeInput` receives its value and change callback from a parent. This is called a controlled
component: the parent remains the source of truth, while the input owns only presentation and DOM
events.

The label uses `htmlFor` with the input ID, and format/error text is connected through
`aria-describedby`. This lets assistive technology announce the same context visible on screen.
`aria-invalid` communicates the error state without relying on color alone.

Validation is deliberately outside the component. Combining `validateTime()` with the input markup
would make validation timing difficult to change and would prevent the component from being reused
for both domain fields. Common mistakes include using placeholder text as the only label, hiding the
format hint when an error appears, or storing a second copy of the value inside the component.

## Adding domain meaning without duplicating an input

`WorkedTimeInput` is a thin wrapper: it fixes the ID and visible label, then forwards the remaining
props to `TimeInput`. Its prop type is derived with TypeScript's `Omit`, so callers cannot replace the
domain label and future shared props remain synchronized automatically.

An alternative is copying all input markup into a second component. That creates two places to fix
accessibility or styling defects. Another alternative is configuring the label at every call site,
which makes inconsistent wording more likely. The wrapper provides consistent domain language while
retaining the tested shared implementation.
