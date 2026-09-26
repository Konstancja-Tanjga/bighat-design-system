---
'@bighat/ui': minor
---

**Elevation and glass: surfaces are drawn with height, not lines.**

Until 4.1 every surface was a white rectangle with a 1px grey border, and
elevation was one 8%-opacity shadow most components never used. 4.2 replaces
the border with a real elevation scale and adds translucent materials for
anything that floats over content. See _Foundations / Elevation & materials_.

**New tokens**

- `elevation.flat` and `elevation.floating`, joining a rewritten `raised`,
  `overlay` and `modal`. Every step is two or three layered shadows; in the dark
  theme `raised` and `floating` add a top-edge highlight, because a shadow on a
  near-black page is invisible.
- `material.{thin,regular,thick,chrome}.{bg,blur}`, `material.saturation` and
  `material.rim` - a translucent fill, a backdrop blur, and the lit inner edge
  that replaces a border on glass.
- `border.hairline`, `fill.hover`, `scrim.bg`, `scrim.blur`,
  `radius.overlay` (16px) and `radius.modal` (26px).

**Changed values - visible without a code change**

- `radius.surface` is 20px, up from 10px. With no border to draw it, the corner
  is what gives a surface its shape; every component on this role picks it up.
- `elevation.raised`, `elevation.overlay` and `elevation.modal` are layered and
  noticeably softer and wider.

**Components**

- `Card` defaults to `elevation="raised"` (was `flat`) and has no border. A
  flat card keeps a hairline. Hover lifts an interactive card to `floating`
  instead of darkening its border. Pass `elevation="flat"` to get closer to the
  4.1 look.
- `Dialog` is `material.thick` on a blurred 18% scrim (was an opaque surface on
  a 55% scrim), with `radius.modal`.
- `Menu` and `Combobox` listboxes are `material.regular` with `radius.overlay`;
  a hovered or active item uses `fill.hover`.
- `Toast` is `material.regular` with `radius.surface`; its tone stripe is now an
  inset shadow that follows the rounded corner.
- `AppBar` is `material.chrome` with a hairline beneath it.

No prop was removed or renamed.
