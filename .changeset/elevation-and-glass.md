---
'@bighat/ui': minor
---

**Elevation and glass: surfaces are drawn with height, not lines.**

Until 4.1 almost every surface was a white rectangle with a 1px grey border,
and elevation was three single-layer shadows that read as a smudge beside it. 4.2 replaces
the border with a real elevation scale and adds translucent materials for
anything that floats over content. See _Foundations / Elevation & materials_.

**New tokens**

- `elevation.flat` and `elevation.floating`, joining a rewritten `raised`,
  `overlay` and `modal`. Every step above `flat` is three layered shadows; in the dark
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
  wider. Every component on them picks this up, including Tooltip,
  SegmentedControl, Slider and the AppShell overlay panel.

**Components**

- `Card` defaults to `elevation="raised"` (was `flat`) and has no border. A
  flat card keeps a hairline. Hover lifts an interactive card to `floating`
  instead of darkening its border. Pass `elevation="flat"` to get closer to the
  4.1 look.
- `Dialog` is `material.thick` on a blurred 18% scrim, 32% in dark (was an opaque
  surface on a 55% scrim), with `radius.modal`.
- `Menu` and `Combobox` listboxes are `material.regular` with `radius.overlay`;
  a hovered or active item uses `fill.hover`.
- `Toast` is `material.regular` at `elevation.floating` (was `overlay`), with
  `radius.surface` - 20px, up from the 6px of `radius.control`. Its tone stripe
  is now an inset shadow that follows the rounded corner.
- `AppBar` is `material.chrome` with a hairline beneath it. The glass shows
  only where content scrolls under the bar; inside `AppShell` the header has its
  own row, so there it reads as a light tint.
- A dragged `Card` is less transparent (0.85, was 0.6), because the overlay
  shadow now carries the "lifted" signal the fade used to.
- Glass surfaces keep a transparent 1px border, so in forced-colours mode -
  which drops shadows - they still have an edge.

No prop was removed or renamed.

**Browser floor:** the Dialog scrim reads custom properties inside `::backdrop`,
which needs Chrome 122, Firefox 120 or Safari 17.4. Older engines show no scrim.
