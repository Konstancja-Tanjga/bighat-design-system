---
'@bighat/ui': minor
---

`Button` takes `tone="neutral"`, like every other tone axis. The 4.0 rename
missed Button: its own type still said `'default' | 'critical'`, so
`tone="neutral"` was a type error there while the docs, the contract and
Menu and Progress all used it. `tone="default"` keeps working and warns once
in development; for Button it is removed in 6.0, not 5.0, because there was
never a release in which the replacement worked.
