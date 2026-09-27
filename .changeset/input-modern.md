---
'@bighat/ui': minor
---

**Fields get a modern outline.** `Input`, `Select`, `Textarea`, `Combobox` and
`DatePicker` share one set of edge and state rules:

- a 12px corner on the new `radius.field`, one step rounder than
  `radius.control`, so a field sits with the pill buttons beside it;
- `elevation.control` under the field, as under a button;
- hover darkens the edge to the new `border.hover` instead of changing the
  fill;
- on focus the edge joins the `bh-focusable` ring in `border.focus`;
- invalid is a 1px `status.critical.fg` edge with a `status.critical.bg` tint,
  and the error line gains an icon. The 2px border it replaces changed the box
  size and needed a padding correction.

The edge stays a 1px `border.strong` line held to 3:1, because a field has no
text of its own to identify it. **New tokens:** `radius.field`, `border.hover`.

**The contrast gate is back.** 4.0 deleted `contrast.test.ts` and nothing
replaced it, so the declared pairs were documented as a build gate and checked
by nobody. Every pair now runs in both themes, including new ones for text on
`status.critical.bg` and `border.hover`.
