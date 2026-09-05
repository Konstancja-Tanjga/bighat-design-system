# The tripwire branch

The skill is a checker, so the test that matters is whether it finds a defect
somebody planted. Everything else — triggering, wording, run time — is
secondary to this.

The branch is `handoff-tripwire` in the portfolio repository, built from `main`
and **kept local on purpose**: it is deliberately bad code, and nothing about
it needs to be on a public remote. Run the skill against it after every change
to the skill, and before trusting a run on real work.

It builds and typechecks clean by design. The findings should be the seeded
defects, not compiler noise.

## What is planted, and where

| # | Gate | Seeded defect | Expected finding |
| --- | --- | --- | --- |
| 1a | Sanity | `console.log('here')` in `ProcessBoard.tsx` | Named with `file:line` |
| 1b | Sanity | `src/system/Text.tsx` requoted end to end, nothing to do with the branch | Called out as churn outside the branch's subject |
| 2a | Design system | A hand-rolled `<button className="btn">` beside an imported `Button`, a raw `<input>`, and `background: #f2f4f7` in `process-board.css` | All three named, with the system component that should have been used |
| 2b | Design system | `StageChip` — a genuinely local component with nothing declaring it local | Named under closeout as an undeclared local component |
| 3 | Requirements | Issue #8 asks for four things; requirement 4, PNG export, is not built | The unmet one by name, and the three met ones with a location each |
| 4 | Click-through | `/board` returns `null` unless `?ready=1` | Gate 4 `fail`, with the screenshot path |
| 5 | States | The stage list has no empty state; filter to nothing and it vanishes | Named, with the surface that has no empty state |
| 6 | Accessibility | The raw input is labelled only by `placeholder`; `.btn:focus` sets `outline: none` with no replacement | Both named with `file:line` |

Seven gates, eight rows. Two gaps are deliberate and worth knowing:

**Gate 7 has no fixture.** `handoff.json` configures one theme, so there is no
dark for a page to be light in. Seed this the day a dark theme exists.

**Gate 6a could not use the system's `Input`.** It requires a `label` prop and
TypeScript refuses to omit it — the design system doing its job. The defect had
to become a raw `<input>`, which is what bypassing the requirement actually
looks like in real code, and which now doubles as a gate 2 finding.

## Expected shape of the report

Not the exact words — the shape:

- Ten rows, one per gate. Gates 1, 2, 3, 4, 5 and 6 `fail`. Gate 7 `not checked`
  with the one-theme reason. Gates 8, 9 and 10 depend on what else the fixture
  carries.
- Every `fail` row carries a `file:line` or a screenshot path. **A fail with no
  evidence is itself a failure of the run.**
- No gate reported as `pass` without evidence beside it.
- Nothing edited. `git status` on the fixture is clean after the run.
- The note lists `StageChip` and the unmet PNG-export requirement.

## What the first run found, and what fixed it

The fixture earned itself on its first run: **`clickthrough.mjs` missed defect
4.**

`/board` rendered nothing and the script reported `ok`. `inkFraction()` sampled
the whole PNG against a 0.005 threshold, but the masthead and footer render on
every route and clear that by themselves, so an empty content area never tripped
it. The screenshot showed the blank page plainly; the script did not.

That is the failure `success-criteria.md` names as the most dangerous — not a
missed defect but a **pass with no evidence**, reading as coverage.

**Fixed.** The script now measures the route's own content: it takes `<main>`
where one exists, and otherwise strips `<header>`, `<footer>` and `<nav>` before
counting the text that remains. Below `minContentChars` — 80 by default, and
settable per project — the route is reported empty. Re-run against the fixture:

```
Board preview (fixture): renders 0 characters of its own content
  — the route is empty inside the page chrome (/board)
```

Gate 4 catches it now. The screenshots still have to be read, because a page can
be wrong in ways no character count reaches — but "blank" is no longer one of
them.

**The lesson outlives the bug.** A gate can be green because it holds, or green
because it cannot see. Nothing in the run distinguishes those two, which is why
the fixture exists and why a `pass` is only worth the evidence beside it.

## The two failures worth watching for

**A missed defect** — the skill ran the gate and did not see it. Add the case to
this table with what it should have said, then fix the gate in
`references/gates.md`. Every miss in real use becomes a row here.

**A pass with no evidence.** More dangerous than a miss, because it is
invisible: the report reads as coverage and is a claim. Audit for it directly —
read the pass rows, not just the fail rows. The click-through bug above is
exactly this, and it was invisible until a branch with a known answer existed.

## Regressions found by this fixture

Every miss on a real run becomes a row here, with the date and what changed.
This is the list that turns a fixture into an evaluation suite without anyone
sitting down to build one.

| Date | What was missed | Why | Fix |
| --- | --- | --- | --- |
| 2026-09-05 | Gate 4: the empty `/board` route was reported `ok` on the first run | The blank check read the whole viewport, and a site with a header and a footer is never blank — the route rendered nothing between them and the pixels said otherwise | `clickthrough.mjs` now also measures the route's own content: the text inside `<main>`, or inside the body with the chrome removed. 0 characters on `/board`, and the gate fails |

## Running it

```bash
git switch handoff-tripwire
cd site && npm run dev          # the script starts nothing
# then, in a session:
#   "Is this handoff-safe?"
```

Compare against the table. Ten minutes, and it is the only test that answers
the question the skill exists to answer.
