---
'@bighat/ui': patch
---

Corrects the hover fades from 4.3.3. Keyboard highlights in `Menu` and
`Combobox` are instant again: fading them tinted two items at once while
arrowing. Where selection shares a fading rule, its indicator now fades with the
fill instead of landing ahead of it — a selected tab's underline, a checked
`IconPicker` tile's border, the active `NavList` item's edge and a selected
`ListView` row's leading bar. `RemovableChip`'s remove button, the one pointer
hover 4.3.3 missed, now fades too.
