---
'@bighat/ui': patch
---

Hover fades in instead of jumping. `Menu`'s trigger gets the same hover as a
secondary `Button`: an overlay tint whose opacity fades and a lift that keeps
the resting shadow layers. These pointer hovers now transition over
`duration.fast`: `Accordion`, `Board`, `Composer`, `Dialog`, `IconPicker`,
`List`, `ListView`, `NavList`, `NavRail`, `RemovableChip`'s remove button,
`SidePanel`, `Table`, `Tabs`, `Toast` and `UserProfile`. Where the same
property carries selection — a selected tab's underline, a checked icon's
border, the active nav item's edge, a selected row's leading bar — it fades
with the fill instead of landing ahead of it.

Keyboard highlights in `Menu` and `Combobox` stay instant, so arrowing never
shows two items tinted at once. Reduced motion still turns all of it off.
