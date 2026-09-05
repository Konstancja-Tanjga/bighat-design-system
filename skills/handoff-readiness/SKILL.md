---
name: handoff-readiness
description: >-
  Checks a branch before it becomes a pull request and writes the handoff note for its
  description. Runs ten gates over the diff and the running prototype - build, design system,
  requirements, click-through, states, accessibility, themes, widths, copy, closeout - and
  returns one verdict per gate with the evidence behind it. Make sure to use this skill whenever
  the user mentions handoff, "ready for PR", "before I open the PR", "is this handoff-safe",
  "check this prototype", "review before merge", or asks whether a prototype actually runs and
  clicks, or whether work built on a design system really uses it - even without the word
  handoff. The team writes Polish as often as English, so it triggers equally on "gotowe do PR",
  "sprawdz przed PR", "czy to jest handoff-safe", "sprawdz czy to zgodne z design systemem",
  "przejrzyj zanim otworzysz PR" and "czy prototyp dziala". Reports only: it never edits code,
  opens or merges a PR, or declares work done - asking to open or merge one is not this skill.
compatibility: >-
  Needs git, an authenticated gh, Node and a Chrome or Chromium binary. Without Chrome,
  gates 4, 7 and 8 report not checked rather than failing the run.
---

# Handoff readiness

## Overview

Work is handed over by describing what was checked and what it showed. This
skill runs the checks a build cannot make, and returns **one verdict per
gate** — never a summary. A summary hides the difference between "measured and
holding" and "nobody looked", and that difference is the whole value of a
handoff.

Four things stay with the person, because each is a commitment made in
someone's name:

- **It does not edit code.** A checker that also fixes is a judge in its own
  case, and the report is the thing being handed over. The one file it may
  write is `.claude/handoff.json` in step 1, and nothing else.
- **It does not open or merge the pull request.** Opening one claims the work
  is ready.
- **It does not declare anything done.** It reports what passed.
- **It does not file a proposal** to add something to a design system.

When a gate fails, name it, show the evidence and stop. Offer to fix it after
the report, as a separate question — not in the same breath.

## Bundled resources

Load these when the step says to, not before — the table is the index, the
files are the instructions.

| File | Read it | What it holds |
| --- | --- | --- |
| `references/gates.md` | Before step 4, every run | Each gate: what it asks, how to check it, what counts as evidence. Gates 2, 5, 6 and 10 check rules `agent/SKILL.md` states — that file is the source, this one is the proof |
| `references/config.md` | Step 1, when `.claude/handoff.json` is missing | The config's shape, field by field, and the three questions a repository cannot answer for itself |
| `references/note.md` | Step 6 | The handoff-note template and the two rules for writing it |
| `references/requests.md` | When the request is not a handoff | Spacing answered in scale steps, "the system cannot do this", and whether something should become a system component |
| `scripts/clickthrough.mjs` | Step 5 | Screenshots per route × theme × width, and the blank-page check |
| `tests/` | When changing this skill, never at run time | Trigger phrases and the seeded-defect fixture the skill is checked against |

## Requirements

- `git`, and `gh` authenticated, for the branch, the diff and the requirements.
- Node, for the click-through script.
- A Chrome or Chromium binary, for screenshots. Without one, gates 4, 7 and 8
  are `not checked` — which is a legitimate outcome to report, and not a
  reason to skip them silently.

## Instructions

### Step 1: Read the project's config

`.claude/handoff.json` in the repository says what the project is made of: the
design system package, the commands, the routes worth walking, the themes and
the widths. Read it first — a gate run against a guessed config reports
problems the project does not have.

If it is missing, `references/config.md` gives the shape and the three
questions a repository cannot answer for itself. Propose a config, ask, write
the file, and only then continue. It costs nothing on every run after this one.

### Step 2: Find the requirements

Requirements come from the linked pull request or issue, and nowhere else:

```bash
gh pr view --json number,title,body 2>/dev/null \
  || gh issue list --search "$(git branch --show-current)" --json number,title,body
```

Split the body into individual claims and keep them as a list; step 4 maps each
one to where it is satisfied.

If neither exists, requirements are `not checked`. Say so in one line and do
not reconstruct them from the diff — a diff asked to state its own
requirements will always meet them.

### Step 3: Take the diff as the subject

```bash
git diff "origin/$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name)...HEAD"
```

Every gate is about what this branch changed. A failure that predates the
branch is a line in **known gaps**, not a red gate on someone else's work —
and a gate that reports the repository's whole history is a gate nobody reads
twice.

### Step 4: Run the ten gates

In this order. `references/gates.md` defines each one: what it asks, how to
check it, and what counts as evidence. Read that file before running them
rather than working from the table alone — the table is an index, not the
instructions.

| # | Gate | The question |
| --- | --- | --- |
| 1 | Sanity | Does it build, typecheck, lint and test, and does the diff contain only what the branch claims? |
| 2 | Design system | Is every component from the system, every value a semantic token, and is anything local **named** as local? |
| 3 | Requirements | Is each stated requirement satisfied somewhere nameable, and which are not? |
| 4 | Click-through | Does the prototype run and respond — every route reachable, no dead control, no blank screen? |
| 5 | States | Does every surface that can be empty, slow or broken render that state? |
| 6 | Accessibility | Labels, visible focus, colour never alone, named landmarks, keyboard reach, no drag-only. |
| 7 | Themes | Does it hold in both themes, on pages that render no component as well as pages that do? |
| 8 | Widths | Does it hold at the container widths it will actually sit in? |
| 9 | Copy | Do labels and errors say what happened and what to do, in the product's voice? |
| 10 | Closeout | Is every local component, deferred requirement and known gap written down? |

### Step 5: Walk the running prototype

Gates 4, 7 and 8 need the application running, and they are the ones worth the
setup: the two most expensive bugs this skill exists to catch are both
invisible in the source and obvious in a screenshot.

```bash
node scripts/clickthrough.mjs        # path is relative to this skill's directory
```

The path above is relative to wherever this skill is installed — a personal
install resolves it under `~/.claude/skills/`, a copy vendored into a repository
under `skills/`. Resolve it against this file rather than hard-coding either.

The script starts nothing — run the config's dev command yourself first — then
visits every route in every theme at every width, writes one screenshot per
combination, and flags any page whose rendered area is effectively blank.

**Read the screenshots.** The exit code says the script ran; only the images
say the screen works. Then click the primary flow by hand and write one
sentence per flow: a control that does nothing, a link to a route that does
not exist, a modal that cannot be closed.

### Step 6: Write the report

Two parts, in this order, and nothing in either that the run did not produce.

**The verdict table** — one row per gate, with the evidence beside it. Every
`fail` and every `not checked` gets a line underneath saying what would close
it.

**The handoff note** — ready to paste into the pull request description.
`references/note.md` is the template: what changed, the verdicts, local
components, deferred requirements, known gaps, and where a reviewer should
look first.

### Step 7: Re-check what gets fixed

The report is a snapshot, and a branch does not stop moving when it is read.
When a `fail` is fixed — by you, after the separate question, or by the person
themselves — run **that gate again**, on its own, and record both verdicts:

> Gate 6 · accessibility — `fail` → `pass`. `ProcessBoard.tsx:34` now has a
> label; focus ring restored in `process-board.css:21`. Re-checked after the fix.

Two things make this worth the tokens. A fix aimed at one gate routinely breaks
another — a focus ring added in a stylesheet is a changed stylesheet, which is
gate 2's subject — so the re-check is where that surfaces. And a verdict that
moved is more useful to a reviewer than a verdict that was always green,
because it says what was wrong and what closed it.

Re-run only the gates whose subject the fix touched. A full second pass costs
what the first one cost, and this skill competes with nobody checking at all.

**Repeating a gate is not the same as strengthening it.** If a gate could not
see a defect the first time, it will not see it the fifth: running it again
measures variance, never blind spots. Three agreeing runs are one result
measured three times.

**Nothing here ends in "done".** However many times a gate is re-checked, the
skill still reports what passed. Opening the pull request stays with the person,
and a green re-check is evidence for that decision, never a substitute for it.

## Output format

Every gate returns exactly one of three words. There is no fourth.

| Verdict | Means |
| --- | --- |
| `pass` | Checked, with evidence attached. |
| `fail` | Checked, and it does not hold. Name the file and line. |
| `not checked` | Nobody looked, or the project has no way to look. **Never** report this as a pass. |

"Looks fine", "should be OK" and "probably" are not verdicts. Evidence is a
screenshot path, or a command with the last lines of its output — never an
adjective.

Close with the one sentence this skill is allowed to say about readiness:

> Ten gates: N pass, N fail, N not checked. Opening the pull request is yours.

## Error handling

Nothing here aborts the run. Every failure below has a verdict, because a gate
that cannot be run is a fact about the handoff and belongs in the note.

| What happened | What to do |
| --- | --- |
| `.claude/handoff.json` missing | Step 1: propose one from `package.json` and the router, ask the three questions in `references/config.md`, write it, continue. |
| `gh` not authenticated, or no linked issue or PR | Gate 3 is `not checked`, with the reason in one line. Never reconstruct requirements from the diff. |
| A command in the config is `null`, or the script is not in `package.json` | That gate is `not checked`. Do not substitute a command the project did not choose. |
| A command exists and fails | Gate 1 is `fail`, with the command and the last lines of its output. A failing build is the finding, not an obstacle to the finding. |
| No Chrome or Chromium | Gates 4, 7 and 8 are `not checked`. The script exits 3 and says so. |
| Nothing answering on `devUrl` | The script exits 4. Start the dev server and rerun — do not report the gate as passed from reading the source. |
| The click-through reports a blank page | Gate 4 is `fail`. Open the screenshot before writing anything about the cause. |
| No default branch, or a detached HEAD | Ask which branch this is being handed off against rather than guessing; every gate reads the diff. |
| A gate fails for something the branch did not touch | Not a red gate. One line under **known gaps**, naming it as pre-existing. |

## Best practices

**Report the gate you could not run.** `not checked` is the verdict that makes
the other two mean something. A skill that quietly drops a gate it could not
run is worse than no skill, because the note then claims coverage nobody has.

**A repeated check is not a second opinion.** Running a gate five times and
getting the same answer five times is one measurement, not five. It says the
gate is stable; it says nothing about whether the gate can see. The
click-through script reported "no blank pages" for a route that rendered
nothing, and would have reported it identically on every rerun — what caught
it was opening the screenshot, not running the script again.

**Name files and lines, not areas.** "Accessibility issues in the form" sends
the reader looking; `Input.tsx:42 — placeholder used as the label` does not.

**This skill checks; `frontend-design` designs.** They meet at two edges: gate
2 asks whether a local component is declared while `frontend-design` asks
whether it is any good, and gate 9 hands it the copy rules outright. When a gate
turns up something that needs designing rather than declaring, name that skill
and stop — a checker holding half a design vocabulary gives worse advice than
none.

**Check the system before believing it cannot do something.** Most "the design
system can't do this" is "I looked for the wrong component". Look for the
higher-level component first, then the inventory's "not for" column.

**A blank page is worth naming out loud.** It is invisible in the source and
in the tests — an animation left at `opacity: 0`, a story with no arguments,
data that never arrives — and it is the failure a screenshot catches for free.
