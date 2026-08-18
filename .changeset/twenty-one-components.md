---
'@bighatpoland/ui': minor
---

Twenty-one components, so the library covers an application screen without
anyone reaching for a local `<div>`.

Form controls: `Checkbox`, `RadioGroup`, `Switch`, `SegmentedControl`,
`Slider`, `Combobox`, `DatePicker`, `IconPicker`.

Structure and actions: `Tabs`, `Accordion`, `Menu`, `Toolbar`, `Tooltip`,
`Progress`, `Breadcrumbs`, `List`, `ListView`, `Avatar`, `UserProfile`,
`StatusBar`, `Divider`, `ScrollArea`.

The keyboard patterns that a `role` promises are implemented rather than
asserted: roving tabindex in `Tabs` and `Toolbar`, `aria-activedescendant`
plus type-ahead in `ListView` and `Combobox`, focus return in `Menu`. Where the
platform already ships the behaviour — date entry, range dragging, scrollbars —
the native element is styled rather than replaced.
