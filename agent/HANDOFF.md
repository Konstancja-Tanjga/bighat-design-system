# Prototype to handoff

A prototype built on `@bighat/ui` is handed over by describing the outcome
you want checked. Nobody needs to remember a rule number or a script name — this
file maps the request to what it runs and what it returns.

Read `SKILL.md` first; everything below assumes its rules.

## The requests

### "Review the UX quality of this prototype."

Run the automated sweep — `npm run verify`: lint, formatting, token sync, 134
tests including the 58 contrast assertions across both themes. Then walk the
checks a script cannot make (below). Return **one verdict per rule**, not a
summary: a summary hides the difference between "measured and holding" and
"nobody looked".

### "Is this handoff-safe?"

All three gates plus the closeout, reported as separate verdicts:

- **Token-legal** — no primitive imports and no raw hex in product code, every
  gap/padding/margin from the scale.
- **Usable** — every field labelled, no `outline: none`, colour never the only
  cue, every panel and rail named, a pointer-free equivalent for every drag.
- **State-complete** — every surface that can be empty, slow or broken renders a
  `StateBlock`, and the two empty cases are told apart.
- **Closeout** — every local component is named as local, in the code and in the
  handover note. A lookalike that ships unlabelled is the failure this catches.

### "The spacing on this screen looks off."

Answer in scale steps — `tight` / `snug` / `normal` / `loose`, and
`padding-inline` / `block` / `section` — and in the relations between them. Never
answer in pixels: a pixel answer is a value that will drift the moment the scale
moves. If the relation is right and it still looks wrong, say that the scale may
be missing a step and propose the step.

### "bighat cannot do what I need here."

Check whether that is true before accepting it:

1. Look for the higher-level component first (`Table`'s `state` prop, `AppShell`'s
   regions) rather than composing one from smaller parts.
2. Check `components.json`, including the "not for" column.
3. Check the named gaps: `Textarea`, `Chip`, `FileDropzone`, `Pagination`,
   `Tree`, `Stepper`.

If it is true, build it locally in semantic tokens and **say out loud that it is
local**. Never widen a system component to cover one screen. If no semantic role
fits a colour, stop and propose a role — do not reach into the primitives.

### "Should this become a bighat component?"

Weigh it honestly, including the case against — most things should stay in the
product, because a system component is a maintenance commitment forever. Draft
the proposal: what it is for, what it is **not** for, what breaks if it is
refused. Then hand the draft over. Filing is a human step.

The second occurrence, in a different screen, is the evidence. The first is a
local component.

## Reading a result

| Verdict             | Means                                                                                          | Fixed by             |
| ------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| **PASS**            | Measured, and it holds                                                                         | —                    |
| **FAIL**            | Measured, and it breaches. Report the pair, the theme, the required ratio and the observed one | A change to the code |
| **NOT ENFORCEABLE** | No gate can reach it                                                                           | Somebody looking     |

**Not enforceable is not a soft pass.** It blocks a handoff exactly as a failure
does. A rule nobody checked is never reported as holding — that is the whole
reason these results are worth reading.

What no gate can reach, and therefore must be walked by hand:

- `ariaLabel="Panel"` names nothing. Three unnamed complementary regions are one
  region to landmark navigation.
- The wrong empty state: "no invoices yet" wants onboarding, "no invoices match
  these filters" wants a way out of the filter.
- A board card that can only be moved by dragging (WCAG 2.5.1).
- `Skeleton` used for a wait whose shape is unknown — it promises a layout that
  never arrives.
- A template copied in with its error story deleted. That was the part that was
  hard.
- Font sizes set inline. The system exports **no typography tokens** yet; this is
  a known gap, so keep sizes in one place rather than scattered.

## Two steps that end at a desk

Filing a proposal, and declaring a prototype done, are commitments on someone's
behalf. Draft both; file neither.
