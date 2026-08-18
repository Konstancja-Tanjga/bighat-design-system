# @bighatpoland/ui

## 3.1.0

### Minor Changes

- 479c21d: Twenty-one components, so the library covers an application screen without
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

## Unreleased

### Minor Changes

- Twenty-one components, so a whole application screen can be built without
  anyone reaching for a local `<div>`.

  Form controls: `Checkbox`, `RadioGroup`, `Switch`, `SegmentedControl`,
  `Slider`, `Combobox`, `DatePicker`, `IconPicker`.

  Structure and actions: `Tabs`, `Accordion`, `Menu`, `Toolbar`, `Tooltip`,
  `Progress`, `Breadcrumbs`, `List`, `ListView`, `Avatar`, `UserProfile`,
  `StatusBar`, `Divider`, `ScrollArea`.

  The keyboard model a `role` promises is implemented rather than asserted:
  roving tabindex in `Tabs` and `Toolbar`, `aria-activedescendant` plus
  type-ahead in `ListView` and `Combobox`, focus return to the trigger in
  `Menu`. Where the platform already ships the behaviour — date entry, range
  dragging, scrollbars — the native element is styled instead of replaced, and
  `Combobox` is the one place that bargain is refused, so it pays the full ARIA
  bill.

  Nothing existing changed: this release is additive, and `components.json`,
  `agent/SKILL.md` and the README tables list the new components alongside the
  old ones.

## 3.0.0

### Major Changes

- 9291ad8: `Button`: `variant="danger"` is removed.

  Deprecated in 2.0, warned throughout 2.x, and now a TypeScript error. Use
  `tone="critical"` — with any `variant`, which is the whole point of the split.

  ```diff
  - <Button variant="danger">Delete workspace</Button>
  + <Button tone="critical">Delete workspace</Button>
  ```

  If you are on 2.x the work is probably already done: every occurrence has been
  printing a deprecation warning in development since you upgraded. `MIGRATION.md`
  has the check and the path for anyone skipping straight from 1.x.

## 2.0.0

### Major Changes

- 38d3a53: `Button` splits `variant` into two axes: `variant` for visual weight
  (`primary` | `secondary` | `ghost`) and `tone` for consequence (`default` |
  `critical`).

  `variant="danger"` still renders identically and warns once in development,
  and is removed in 3.0. Migration, including a scripted rename, is in `MIGRATION.md`.

  Why: `variant` conflated weight with consequence, so a quiet destructive action
  — a delete inside a row of table actions — could only be expressed with an
  inline colour override. Those overrides were the last raw hex values left in
  consuming products.
