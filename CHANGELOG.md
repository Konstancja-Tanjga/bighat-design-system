# @bighatpoland/ui

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
