---
'@bighatpoland/ui': major
---

`Button` splits `variant` into two axes: `variant` for visual weight
(`primary` | `secondary` | `ghost`) and `tone` for consequence (`default` |
`critical`).

`variant="danger"` still renders identically and warns once in development. It
is removed in 3.0. Migration, including a scripted rename, is in `MIGRATION.md`.

Why: `variant` conflated weight with consequence, so a quiet destructive action
— a delete inside a row of table actions — could only be expressed with an
inline colour override. Those overrides were the last raw hex values left in
consuming products.
