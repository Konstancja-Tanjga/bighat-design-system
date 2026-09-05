---
'@bighat/ui': minor
---

**New semantic role: `selection`.** `selection.bg`, `selection.fg` and
`selection.mark` name the row the reader picked, the destination they are on,
the tile that is checked.

Six components — `NavList`, `NavRail`, `ListView`, `Table`, `IconPicker` and
`Composer` — said that with `status.info`, which is a role for a message the
system is making rather than for the answer to a question the reader just
asked. The two wanted the same shape, so one stood in for the other, and a
selected row and an information banner came out the same colour.

The mismatch surfaced when the primary action moved to green and six components
kept a blue current state. Nothing had hard-coded blue; they were pointing at a
role with no reason to follow the accent.

Selection now follows it: a green tint, ordinary foreground text, and a leading
bar in `selection.mark` that is held to 3:1 on its own so the indication
survives greyscale and forced colours. Three contrast pairs were added with it.

Consumers who referenced `--bh-status-info-*` to draw their own selected state
should move to `--bh-selection-*`; `status.info` keeps its meaning and its
values, and is still what an information message uses.
