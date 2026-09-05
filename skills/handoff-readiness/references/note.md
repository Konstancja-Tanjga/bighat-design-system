# The handoff note

The deliverable. Written for a reviewer who has not seen the branch, and pasted
into the pull request description. Keep it to what the reviewer needs to
decide; the evidence lives in the run, not in the note.

```markdown
## What changed

Two or three sentences: the subject of the branch and the decision behind it.
Not a list of files — the diff already lists the files.

## Verdicts

| Gate | Verdict | Evidence |
| --- | --- | --- |
| Sanity | pass | `npm run build` clean, diff is 6 files, all in `src/system` |
| Design system | pass | 4 components imported from `@bighat/ui`, no literals |
| Requirements | fail | 3 of 4 from #42; the fourth is below |
| Click-through | pass | 12 screenshots in `.handoff/shots`, no blank page |
| States | not checked | no story renders the error state |
| Accessibility | pass | labels, focus, keyboard order walked |
| Themes | pass | both themes, 6 routes |
| Widths | pass | 430 / 900 / 1400 |
| Copy | pass | 5 new strings |
| Closeout | pass | this note |

## Local components

Anything not from the design system, named, with why it is not a system
component yet. Write "none" when there are none — an empty section reads as an
omission.

## Not met, and deferred

- **#42, "export as CSV"** — not built. It needs an endpoint that does not
  exist yet; raised in the issue.

## Known gaps

- The error state has no story, so gate 5 could not check it.
- Contrast was measured on the four pairs this branch introduced, not on the
  whole palette.

## Look here first

The one file or screen where the interesting decision is, and the question the
reviewer should hold while reading it.
```

## Two rules for writing it

**Nothing in the note that the run did not produce.** A verdict without
evidence behind it is a claim, and this note exists so that the reviewer does
not have to take claims.

**Known gaps includes everything reported as `not checked`.** A gate nobody
could run is a gap in the handoff, not a detail of the tooling.
