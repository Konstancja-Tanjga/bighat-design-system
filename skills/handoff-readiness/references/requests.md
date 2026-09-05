# The other requests

Absorbed from `agent/HANDOFF.md`, which this skill replaced. Not every question
asked in the same breath as a handoff is a handoff, and answering these three
badly is how a review turns into a rebuild.

## Contents

- "The spacing on this screen looks off"
- "bighat cannot do what I need here"
- "Should this become a bighat component?"

---

## "The spacing on this screen looks off"

Answer in scale steps — `tight` / `snug` / `normal` / `loose`, and
`padding-inline` / `block` / `section` — and in the relations between them.

**Never answer in pixels.** A pixel answer is a value that will drift the moment
the scale moves, and it teaches the person asking to think in a unit the system
does not have.

If the relations are right and it still looks wrong, say so plainly: the scale
may be missing a step. Propose the step rather than working around its absence.

## "bighat cannot do what I need here"

Check whether that is true before accepting it. Most of the time it is not, and
the cost of believing it is a local component that did not need to exist.

1. Look for the **higher-level component** first — `Table`'s `state` prop,
   `AppShell`'s regions — rather than composing one from smaller parts.
2. Check `components.json`, including the **"not for"** column.
3. Check the named gaps: `Textarea`, `Chip`, `FileDropzone`, `Pagination`,
   `Tree`, `Stepper`.

If it is true, build it locally in semantic tokens and **say out loud that it is
local** — that is gate 10, and an unlabelled lookalike is the failure it exists
to catch.

Never widen a system component to cover one screen. If no semantic role fits a
colour, stop and propose a role; do not reach into the primitives.

## "Should this become a bighat component?"

Weigh it honestly, **including the case against**. Most things should stay in
the product: a system component is a maintenance commitment forever, paid by
everyone who consumes it.

The evidence is the **second occurrence, in a different screen**. The first is a
local component.

Draft the proposal — what it is for, what it is **not** for, what breaks if it
is refused — and hand the draft over. Filing is a human step, and this skill
does not take it. That is the same line it holds at the pull request.
