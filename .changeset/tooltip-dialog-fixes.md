---
'@bighat/ui': patch
---

`Tooltip` uses the tag corner (`radius.tag`) instead of the control's, so a
one-line tooltip stays a label and does not turn into a pill on the 4px grid.
`Dialog`'s footer wraps instead of overflowing: in a small dialog, two buttons
that name their outcome can be wider than the panel.
