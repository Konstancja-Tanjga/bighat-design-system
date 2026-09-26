---
'@bighat/ui': patch
---

Hover fades in across the library instead of jumping. `Menu`'s trigger gets
the same hover as a secondary `Button`: an overlay tint whose opacity fades and
a lift that keeps the resting shadow layers. Every other hover and highlight
that changed colour instantly now transitions over `duration.fast` —
`Accordion`, `Board`, `Combobox`, `Composer`, `Dialog`, `IconPicker`, `List`,
`ListView`, `Menu` items, `NavList`, `NavRail`, `SidePanel`, `Table`, `Tabs`,
`Toast` and `UserProfile`. Reduced motion still turns all of it off.
