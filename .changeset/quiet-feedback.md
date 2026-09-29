---
'@bighat/ui': minor
---

**Status and state components drop their last 4.1 surfaces.**

- `Badge`: no coloured border - beside borderless glass chips a bordered pill
  read as a disabled chip. Status badges sit on their own fill, the neutral
  badge on `fill.hover`, all with a `border.hairline` edge so the shape holds
  where a status fill matches the surface (in dark).
- `Skeleton`: `fill.hover`, without the grey inset ring.
- `FileDropzone`: `fill.hover` inside its dashed `border.strong` edge, which
  stays because it identifies the drop target. Invalid is a critical edge on
  `status.critical.bg`, as on a field, instead of a 2px border that changed
  the box.
- `StateBlock`: the loading arc is `selection.mark` on a `fill.hover` track;
  the diagnostics block sits on `fill.hover`.
- `Divider`: the rule is `border.hairline` and the label is sentence case in
  `text.secondary`.

`Pagination`, `DatePicker` and `ScrollArea` needed no change: they are built
from Button, Select and Input, and a scroll thumb must hold 3:1. No prop was
removed or renamed.
