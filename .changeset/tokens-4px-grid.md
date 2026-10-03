---
'@bighat/ui': minor
---

Radius and the two smallest type sizes move onto the 4px grid, matching the
Figma library. Every corner gets a little rounder: `radius.sm` 3 → 4, `md`
6 → 8, `lg` 10 → 12, `lgPlus` 12 → 16, `xl` 16 → 20, `2xl` 20 → 24, `3xl`
26 → 32, so `radius.control` is now 12px, `radius.surface` 24px and
`radius.modal` 32px. `radius.field` stays at 12px by moving to `radius.lg`,
the control's corner: 16px read as a pill on a 36px field.

Text gets a step smaller at the label end: `fontSize.sm` 13 → 12
(`textSize.body`) and `fontSize.xs` 11 → 10 (`textSize.label`).
`textSize.dense` moves to `fontSize.sm` (12px), so table cells and dense lists
keep figures legible. Nothing to change in product code; check dense screens,
where labels are now 10px.
