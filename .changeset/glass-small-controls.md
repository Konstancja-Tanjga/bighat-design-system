---
'@bighat/ui': minor
---

**Small controls join the glass direction.**

- `Dialog`'s and `Toast`'s close buttons are round (`radius.pill`) and hover
  with `fill.hover` instead of the opaque `action.secondary.bgHover`.
- `Tabs`: the selected tab's indicator is `selection.mark` instead of
  `action.primary.bg`. It is the state cue, so it is held to 3:1, and the light
  primary green is about 1.9:1 on a white page. The list's rule is
  `border.hairline`, a hovered tab fills with `fill.hover` rounded at the top,
  and the count badge sits on `fill.hover`.
- `UserProfile` hovers with `fill.hover`.
- `Avatar` is a disc of the `fill.hover` tint on `surface.base` instead of
  `surface.sunken` ringed with `border.subtle`; it stays opaque so overlapping
  avatars in a group hide each other's initials.

New contrast pairs for text on `fill.hover` over `surface.base`, all passing.
No prop was removed or renamed.
