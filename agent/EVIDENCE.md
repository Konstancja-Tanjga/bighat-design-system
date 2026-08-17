# Does the skill file actually change what an agent writes?

A claim like "our design system is agent-readable" is worth nothing without a
comparison, so this is set up as a repeatable experiment rather than an
assertion.

## Protocol

Same model, same repository, same prompt. The only variable is whether
`agent/SKILL.md` and `components.json` are in context.

**Prompt (identical in both runs):**

> Build an invoices list screen for this app. It shows invoice number,
> customer, status and amount. Handle the case where there are no invoices,
> the case where they are still loading, and the case where the request failed.

**Run A — control.** Fresh session. The agent may read `src/` but is not given
the skill file.

**Run B — treatment.** Fresh session. `agent/SKILL.md` is loaded before the
prompt, as a Claude Code skill or an equivalent instruction file.

Record for each run: the generated file, `git diff --stat`, and a screenshot in
both themes.

## What the experiment is testing

Four specific failures, each of which is invisible to the type-checker and to
a passing build — which is exactly why the rules live in prose:

| #   | Failure                 | How to spot it in the diff                                      |
| --- | ----------------------- | --------------------------------------------------------------- |
| 1   | Raw colour values       | `grep -E '#[0-9a-fA-F]{3,6}'` in the generated file             |
| 2   | Off-scale spacing       | `grep -E 'padding: 1[0-9]px\|margin: 1[0-9]px'`                 |
| 3   | Bespoke empty state     | A hand-written "No invoices found" node instead of `StateBlock` |
| 4   | Unannounced error state | An error rendered without `role="alert"` or a live region       |

Failures 1 and 2 break theming: a hardcoded `#6b7683` stays grey on a dark
background. Failures 3 and 4 break accessibility: a screen reader user is never
told the request failed.

## Results

> **Status: not yet run.** The protocol above is the deliverable so far. Run it,
> paste both outputs and the two screenshots here, and replace this block.
>
> Do not summarise the runs — paste them. The reason this section is convincing
> at all is that a reader can check it against the prompt above.

| Check                             | Run A (no skill) | Run B (skill) |
| --------------------------------- | ---------------- | ------------- |
| Raw hex values in output          |                  |               |
| Off-scale spacing values          |                  |               |
| Uses `StateBlock`                 |                  |               |
| Error announced to assistive tech |                  |               |
| Renders correctly in dark theme   |                  |               |

## Why this matters beyond a demo

Every design system already has a document explaining its rules, and every
design system is already violated daily by people who did not read it. The
interesting shift is not that an agent can read the rules — it is that the rules
finally have to be written precisely enough to be followed literally.

Writing `agent/SKILL.md` surfaced two places where this system's rules were
genuinely ambiguous to a _human_ reader as well: when a local component is
acceptable instead of a system one, and whether `Badge` may be used for counts.
Both are now stated. The agent was, in effect, the first reviewer who admitted
to not understanding.
