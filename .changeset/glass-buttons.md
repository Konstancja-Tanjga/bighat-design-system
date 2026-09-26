---
'@bighat/ui': minor
---

**Buttons join the glass direction.**

- Every `Button` is a capsule (`radius.pill`) with a pressed state that gives
  way under the pointer (`scale(0.97)`).
- `primary` gains `elevation.control`: a lit top edge and a short contact
  shadow, so it reads as pressable rather than as a flat patch of colour.
- `secondary` is glass - `material.regular` edged with `material.rim` - instead
  of a white box with a grey border. Hover thickens the material.
- `ghost` hovers with the translucent `fill.hover`, so it works on glass.
- `Menu`'s trigger matches the secondary button.

**New token:** `elevation.control`.

**Changed value:** `radius.control` is 10px, up from 6px, so inputs, menu items
and every other control sit beside pill buttons and 20px surfaces. Every
component on this role picks it up.

`secondary` no longer draws `action.secondary.border`; it keeps a transparent
1px border for forced-colours mode. No prop was removed or renamed.
