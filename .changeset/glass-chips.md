---
'@bighat/ui': minor
---

**Chips join the glass direction.** `FilterChip` and `RemovableChip` are the
same capsule as a secondary `Button`: `material.regular` edged with
`material.rim` and `elevation.control`, instead of a white pill with a grey
`border.strong` border. A filter chip's hover tints the glass through an overlay
that fades. Unlike the Button it does not lift, because chips come in rows and a
row that rises under the pointer is motion for its own sake. A pressed chip
keeps `selection.bg` and its `selection.mark` border and check. The remove
button hovers with the translucent `fill.hover`. No prop was removed or renamed.
