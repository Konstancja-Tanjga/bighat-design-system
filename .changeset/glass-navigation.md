---
'@bighat/ui': minor
---

**Navigation joins the glass direction.**

- `NavList`, `NavRail` and `SidePanel`'s toggle hover with the translucent
  `fill.hover` instead of the opaque `action.secondary.bgHover`, so they work
  on glass.
- A `NavList` group label is sentence case in `text.secondary` at
  `weight.emphasis`, instead of tracked capitals in `text.muted`.
- The active `NavList` item is `selection.bg` and a heavier weight, without
  the 1px `selection.mark` ring, which competed with the primary action on the
  same screen. In forced colours, where the fill is dropped, it is outlined in
  `Highlight`.
- An active item keeps its fill under the pointer in `NavList` and `NavRail`;
  hover used to replace it.
- `SidePanel`'s footer rule is `border.hairline`.

No prop was removed or renamed.
