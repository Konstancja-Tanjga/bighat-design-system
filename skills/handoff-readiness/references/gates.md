# The ten gates

Each gate says what it asks, how to check it, and what counts as evidence.
Where a project's config names a command, run that command rather than
guessing one.

**Where the rules come from.** Gates 2, 5, 6 and 10 check rules the design
system already states in `agent/SKILL.md` — primitives, the scale, `StateBlock`,
labels, focus, colour, drag, and naming a local component as local. That file is
the source; this one is how the rules are checked and what counts as proof. When
the two disagree, `agent/SKILL.md` wins and this file is out of date.

## Contents

1. Sanity · 2. Design system · 3. Requirements · 4. Click-through · 5. States
· 6. Accessibility · 7. Themes · 8. Widths · 9. Copy · 10. Closeout

---

## 1. Sanity

**Asks:** does it build, and does the diff contain only what the branch claims?

Run whatever the repository has, in this order, and stop reporting a gate as
passed the moment one of them is missing rather than green:

```bash
npm run check 2>/dev/null; npm run lint 2>/dev/null
npm test 2>/dev/null; npm run build
```

Then read the diff for the things a build cannot see:

- Files changed that have nothing to do with the branch's subject. A lockfile
  rewritten by an unrelated `npm install`, a formatter run over a whole file,
  a stray editor artefact. Say which, and let the person decide.
- Debug leftovers: `console.log`, `debugger`, `.only(`, `xit(`, commented-out
  blocks of the code being replaced.
- A `TODO` or `FIXME` added by this branch. One added deliberately is fine and
  belongs in the note under known gaps; one added absent-mindedly is a gate.
- Secrets: anything shaped like a token, key or password in a changed file.
- The lockfile. If it changed, was a dependency added or was the whole tree
  re-resolved? A tree re-resolved on one platform can drop the optional
  packages another platform needs, and the failure lands on CI, not here.

**Evidence:** the command and the last lines of its output; for the diff
checks, `file:line`.

---

## 2. Design system

**Asks:** is this built out of the system, or beside it?

- Every component imported from the system package named in the config. A
  hand-rolled button, dialog, tab strip or table is a `fail` with the file and
  the system component it should have been.
- Every colour, space, radius, duration, weight and z-index from a semantic
  token. Search changed stylesheets and inline styles for hex, `rgb(`, `px`
  values off the scale, and for primitive-layer token names.
- **Check the system before believing it cannot do something.** Look for the
  higher-level component first, then the inventory's "not for" column. Most
  "the system can't do this" is "I looked for the wrong component".
- Anything genuinely local must be **named as local** in the code and in the
  handoff note. A lookalike that ships unlabelled is the failure this gate
  exists to catch: it will be copied, and then it will be maintained by nobody.
- If no semantic role fits a colour, that is a missing role in the system, not
  a licence to reach into the primitives. Report it as a proposal to draft,
  which is a human step.

**Where this gate stops.** It asks whether a local component is *declared*,
never whether it is well designed. Whether the thing is any good — its
typography, its restraint, whether it reads as a templated default — is the
`frontend-design` skill's question, and it is asked while the thing is being
built, not while it is being handed over. If a local component turns out to need
design work, say so and name that skill; do not review it here with half its
vocabulary.

**Evidence:** the import list from the diff, and `file:line` for each literal
or local component.

---

## 3. Requirements

**Asks:** which stated requirements are satisfied, and which are not?

Requirements come from the linked pull request or issue and nowhere else. Read
them with `gh`, split the body into individual claims, and map each one to
where it is satisfied — a file, a component, a route.

Three outcomes per requirement, and the third is the one that earns its place:

- **Met** — with the place it is met.
- **Not met** — with what is missing.
- **Changed** — the branch does something the requirement did not ask for, or
  interprets it in a way the author may not have meant. Say so plainly; a
  silently reinterpreted requirement is the most expensive thing on this list,
  because it passes review.

If there is no linked issue or PR body, the gate is `not checked`. Do not
reconstruct requirements from the diff — that asks the work to grade itself.

**Evidence:** the issue or PR number, and one `file:line` per requirement.

---

## 4. Click-through

**Asks:** does it run, and does it respond?

Start the application with the config's dev command, then walk it:

```bash
node ~/.claude/skills/handoff-readiness/scripts/clickthrough.mjs
```

The script reads `.claude/handoff.json`, visits every route in every theme at
every width, writes a screenshot per combination, and reports any page whose
rendered area is effectively blank. Read the screenshots — that is the gate,
not the exit code.

Then, for the paths a script cannot walk: click the primary flow by hand and
say what happened. A control that does nothing, a link to a route that does
not exist, a form that cannot be submitted, a modal that cannot be closed.

**Evidence:** screenshot paths, and one sentence per flow walked.

A blank page that renders as blank is worth naming out loud, because it is
invisible in the source and in the tests: an animation left at `opacity: 0`, a
story with no arguments, a component whose data never arrives.

---

## 5. States

**Asks:** does every surface that can be empty, slow or broken render that
state?

For each list, table, panel and form the branch touches: empty, loading,
error, disabled, and long content. Empty deserves two answers told apart —
nothing yet, and nothing matched — because they need different words and
different actions.

Nothing automates this. Open each state, or say `not checked` for the ones you
could not reach.

**What no gate can reach**, and therefore has to be walked by hand:

- **The wrong empty state.** "No invoices yet" wants onboarding; "no invoices
  match these filters" wants a way out of the filter. A single empty state
  serving both is a fail, not a pass.
- **`Skeleton` used for a wait whose shape is unknown.** It promises a layout
  that never arrives, which is worse than a spinner.
- **A template copied in with its error story deleted.** That story was the part
  that was hard, and it is the first thing dropped under time pressure.

**Evidence:** a screenshot per state, or the story that renders it.

---

## 6. Accessibility

**Asks:** can it be used without a mouse, without colour, and without sight?

- Every field has a label that is a label, not a placeholder.
- Focus is visible everywhere, and `outline: none` appears nowhere without a
  replacement.
- Colour is never the only carrier of state. A selected row, a current
  destination, an error field: each needs a second cue that survives
  greyscale.
- Every landmark, panel and rail has a name, and two of the same kind have two
  different names.
- Everything reachable by pointer is reachable by keyboard, in an order that
  matches the page.
- No drag-only interaction without a pointer-free equivalent.
- Contrast: where the project has a contrast gate, run it. Where it does not,
  measure the pairs the branch introduced.

**What no gate can reach:**

- **A name that names nothing.** `ariaLabel="Panel"` passes any check that
  counts labels. Three unnamed complementary regions are one region to landmark
  navigation, which is the same as none.
- **A card that can only be moved by dragging** (WCAG 2.5.1). The keyboard path
  has to exist and has to be findable, not merely present in the code.
- **Font sizes set inline.** The system exports no typography tokens yet, so
  this is a known gap rather than a breach — but scattered sizes are how a gap
  becomes permanent. Keep them in one place and say so in the note.

**Evidence:** the rule, and `file:line` or a screenshot.

---

## 7. Themes

**Asks:** does it hold in both themes?

Every route in the config, in each theme. The trap worth knowing: a theme
applied by a component decorator only reaches pages that render a component.
A page of prose and tables can sit in the light theme while the switch says
dark, and no test will notice.

**Evidence:** paired screenshots, light and dark, per route.

---

## 8. Widths

**Asks:** does it hold where it will actually sit?

The same component lives in a panel, in a card and in the full width of a
page, sometimes on one screen. Check the widths in the config — narrow, panel,
full — and look for text that clips, a table that pushes the page sideways,
and a control that leaves the viewport.

**Evidence:** a screenshot per width, and the width in pixels.

---

## 9. Copy

**Asks:** do the words work?

The rules for product copy are `Foundations → Content & UX copy` in this system,
and the `frontend-design` skill applies them while the screen is being written.
Read them there rather than here: a rule restated in a checking file is a second
copy to drift from the first, and the handoff is not where a voice gets decided.

Two checks are this gate's own, because they are about the handover rather than
about the writing:

- **An error says what went wrong and what to do about it.** "Something went
  wrong" hands the reader nothing, and hands the reviewer nothing either.
- **A control's label and its result agree.** "Publish" followed by "Saved" is
  two names for one action, and the second is the one support gets asked about.

**Evidence:** the string and its location.

---

## 10. Closeout

**Asks:** is what a reviewer needs to know written down?

- Every local component named as local, in the code and in the note.
- Every deferred requirement listed, with why.
- Every known gap listed, including the ones this run reported as
  `not checked`.
- The one place a reviewer should look first.

This gate is the handoff note itself. If the note is missing a section, the
gate fails.

An unlabelled lookalike is the failure this catches: a component that reads as
a system component, is not one, and says so nowhere. The second occurrence in a
different screen is the evidence that it should become one — the first is a
local component. See `requests.md` for what to do with that judgement, and note
that drafting the proposal is where this skill stops.
