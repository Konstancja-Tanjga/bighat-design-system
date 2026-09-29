---
'@bighat/ui': minor
---

**Choice and value controls draw their state in `selection.mark`.** Checkbox,
RadioGroup, Switch, Slider and Progress drew "on", "checked" and "filled" in
`action.primary.bg`, the light primary green, which is about 1.9:1 on white -
for the very shape that says what state the control is in. They now use
`selection.mark`, held to 3:1, as Tabs and NavList already do. In dark it is
the same green as before. The primary Button stays light green: its text
identifies it.

- A checked `Checkbox` is `selection.mark` with a `text.inverse` mark; an
  unchecked one darkens its edge to `border.hover` on hover.
- A checked `RadioGroup` ring is `selection.mark`, and the dot no longer grows
  from 20px to 28px when checked and runs into its label.
- `Switch`: on is `selection.mark`; the thumb carries `elevation.control`; an
  off switch darkens its edge on hover.
- `Slider` and `Progress`: the filled part is `selection.mark` on a
  `fill.hover` track with no grey border.

Edges that must hold 3:1 - an unchecked box, an off track - keep their
`border.strong` line. New contrast pairs for the mark and thumb on
`selection.mark`, all passing. No prop was removed or renamed.
