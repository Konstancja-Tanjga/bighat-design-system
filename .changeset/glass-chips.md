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

**SegmentedControl** follows. The chosen segment is that same glass capsule,
sitting in a well of the translucent `fill.hover` instead of a grey box with a
`border.strong` edge, and the track is a capsule to match. An unchosen segment
darkens its label on hover. In forced-colours mode, which drops the capsule's
fill and shadow, the chosen segment is outlined in `Highlight`.

**Composer**'s modes are drawn as the single-choice chips they are, the same
glass capsule as `FilterChip`, with the active mode on `selection.bg` and a
`selection.mark` border. Its submit button is a primary Button's capsule, with
`elevation.control`, and gives way when pressed.
