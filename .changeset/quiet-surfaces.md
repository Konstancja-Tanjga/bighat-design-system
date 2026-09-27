---
'@bighat/ui': minor
---

**Surfaces stop drawing grey 1px boxes.** The last surfaces still in the 4.1
look now follow Card: height instead of a line, hairlines instead of rules,
translucent hovers, and sentence-case labels.

- `AppShell`: region rules are `border.hairline`; the header draws none of its
  own, since `AppBar` already draws one and the two stacked into 2px.
- `Board`: a column is a well of `fill.hover`; a card has `elevation.raised`
  and lifts to `elevation.floating` on hover; the move select takes
  `radius.field`. An over-limit column still colours its (transparent) border.
- `Table`: the wrapper is drawn with `elevation.raised`; cell rules are
  hairlines; column headings are sentence case at body size on the table's
  own surface instead of tracked capitals on a grey band; row hover is
  `fill.hover`. Stacked rows and their labels follow.
- `Accordion`: no box of its own, hairlines between items, `fill.hover` on the
  trigger.
- `ListView`: its scrolling region is drawn with `elevation.raised`; rows are
  separated by hairlines and hover with `fill.hover`.
- `DescriptionList`: terms are sentence case in `text.secondary`; rules are
  hairlines.
- `IconPicker`: the grid is a well of `fill.hover`; tiles hover with
  `fill.hover`.

Forced-colours mode keeps an edge on every surface that lost its visible
border: the border stays, transparent. No prop was removed or renamed.
