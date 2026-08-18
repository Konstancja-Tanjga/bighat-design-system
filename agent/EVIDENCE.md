# Does the skill file actually change what an agent writes?

A claim like "our design system is agent-readable" is worth nothing without a
comparison, so this was set up as an experiment rather than an assertion.

It has now been run. **The result did not match the hypothesis**, which is why
this document is worth reading.

## Protocol

Same model, same repository, same prompt. The only variable was whether
`agent/SKILL.md` and `components.json` were present.

**Prompt, identical in both runs:**

> Build an invoices list screen for this app. It shows invoice number, customer,
> status and amount. Handle the case where there are no invoices, the case where
> they are still loading, and the case where the request failed.

**Run A — control.** A full copy of the repository with the `agent/` directory
**deleted**, so the skill file and the machine-readable inventory were physically
unavailable. Everything else was there: component source, token source, README.

**Run B — treatment.** An identical copy, plus an instruction to read
`agent/SKILL.md` first and follow it.

Both were told to write exactly one file and to change nothing else.

Outputs are committed verbatim, so every number below is checkable:

- [`evidence/run-a-no-skill.tsx`](./evidence/run-a-no-skill.tsx)
- [`evidence/run-b-with-skill.tsx`](./evidence/run-b-with-skill.tsx)

## What the experiment was testing

Four failures, each invisible to the type-checker and to a passing build — which
is why the rules live in prose in the first place.

| #   | Predicted failure                           | Run A          | Run B          |
| --- | ------------------------------------------- | -------------- | -------------- |
| 1   | Raw colour values                           | **0**          | **0**          |
| 2   | Off-scale spacing                           | 0              | 0              |
| 3   | Bespoke empty state instead of `StateBlock` | did not happen | did not happen |
| 4   | Error state not announced                   | did not happen | did not happen |

**None of the four occurred, in either run.** The hypothesis, as originally
written, was wrong.

Run A went further than predicted. Unprompted, it distinguished the two empty
states — _"you have no invoices yet"_ wants an onboarding action, _"nothing
matches your filters"_ wants a way back out — and wrote a comment explaining why.
It added a polite live region for the result count that neither the prompt nor
any rule asked for.

## Why the control did so well

The rules are not only in `SKILL.md`. They are also in:

- **The component source.** Every component carries a comment explaining the
  decision behind it — why `Badge` has no `color` prop, why `empty` gets no live
  region. An agent reading `StateBlock.tsx` to learn its props reads the
  reasoning on the way past.
- **The API shape.** `Badge` requires a label. `Input` requires `label`. `Table`
  takes a `state` prop typed as `StateBlockProps`. Several rules are not rules at
  all — they are the only way the types compile.
- **The README**, which states the four decisions in the first screen.

A system whose reasoning is written down where the code is read does not need a
separate document to be followed. That is a better outcome than the one this
experiment set out to demonstrate.

## What the skill file did change

The difference was real, but it was **scope and structure**, not rule compliance.

|                                                  | Run A — no skill               | Run B — with skill |
| ------------------------------------------------ | ------------------------------ | ------------------ |
| Lines                                            | 368                            | 432                |
| System components used                           | 12                             | 16                 |
| Semantic token references                        | 6                              | 13                 |
| `AppShell` / `AppBar` / `SidePanel` / `SkipLink` | none                           | all four           |
| Loading state                                    | `StateBlock`                   | `SkeletonGroup`    |
| Raw values left in inline styles                 | `fontSize: 20`, `fontSize: 13` | none               |

**Run A built a component. Run B built a screen.**

Without the skill file the agent produced a table with a toolbar — correct, but
landmark-less: no `<header>`, no named `<nav>`, no `<main>`. That is the failure
mode the shell exists to prevent, and it is invisible to every automated check,
because a page of unlabelled `<div>`s passes lint, types and axe.

With the skill file it produced the full landmark structure, including a skip
link. Rule 9 of `SKILL.md` says exactly that, and it is the rule least likely to
be inferred from reading component source — because it is about **what to
assemble**, not about how any single component behaves.

The loading state is the second difference and it follows the same pattern. Rule
11 says skeletons only where the shape is known; a table's shape is known, so
`SkeletonGroup` is the more precise answer. Run A used a spinner-style
`StateBlock`, which is defensible and slightly worse. Nothing in the component
source would have told it otherwise.

## The finding neither run avoided

Both left raw font sizes in inline styles, because **the system exports no
typography tokens as CSS variables.** `fontSize` and `fontWeight` exist in
`primitives.ts` and never reach the semantic layer.

That is a gap in the system, not a failure of either agent — and it is the
second time an outside consumer has found something the authors could not see.
It is now a candidate for the next minor version.

## Honest limits

- **n = 1 per arm.** One model, one prompt, one screen. This is a demonstration,
  not a study, and a second run could differ.
- The treatment arm was _told_ to read the skill file. An agent that has to
  discover it would behave differently, which is an argument for keeping the
  rules in the source as well.
- The task was deliberately ordinary. A harder screen — one with a drag
  interaction, or a component the system lacks — would probably separate the arms
  much further, since those are exactly the cases where the source offers no
  guidance.

## What this changed about the system

The experiment was set up to prove the skill file was necessary. It showed
something more useful: **the rules that survive without it are the ones written
into the code, and the rules that need it are the architectural ones.**

So the skill file earns its place for a narrower reason than expected — it
carries the decisions that live between components rather than inside them. That
is now what it leads with.
