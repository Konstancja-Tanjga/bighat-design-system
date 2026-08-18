---
'@bighatpoland/ui': major
---

`Button`: `variant="danger"` is removed.

Deprecated in 2.0, warned throughout 2.x, and now a TypeScript error. Use
`tone="critical"` — with any `variant`, which is the whole point of the split.

```diff
- <Button variant="danger">Delete workspace</Button>
+ <Button tone="critical">Delete workspace</Button>
```

If you are on 2.x the work is probably already done: every occurrence has been
printing a deprecation warning in development since you upgraded. `MIGRATION.md`
has the check and the path for anyone skipping straight from 1.x.
