---
'@bighat/ui': minor
---

**A new look for Avatar, Badge, Accordion, Article, NavRail and NavList.**

- `Avatar` gives each person a colour from their name: `tone="auto"`, the
  default, picks one of four new avatar hues - violet, teal, plum, olive -
  none of them a status colour, each held to 4.5:1 in both themes. The same
  name always gets the same colour; `avatarTone()` is exported. `tone="neutral"`
  keeps the grey disc. New tokens: `avatar.{violet,teal,plum,olive}.{bg,fg}`.
- `Badge` is a tag (`radius.tag`, 6px), not a capsule, so it is not mistaken
  for a chip or a button.
- `Accordion` gains `variant="inset"`, a grouped accordion on its own raised
  surface; its chevron sits in a round well that fills on hover.
- `Article`'s title is the new `textSize.title` (26px).
- `NavRail` draws its state on a capsule around the icon, with the caption
  below; **`showLabels` now defaults to `true`**, so a rail is 76px wide
  unless it passes `showLabels={false}`.
- `NavList`'s active item is the new neutral `fill.selected` with its
  `selection.mark` bar, so green is left for the primary action.

New tokens: `radius.tag`, `textSize.title`, `fill.selected`, and the avatar
hues. No prop was removed or renamed.
