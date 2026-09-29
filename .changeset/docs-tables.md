---
'@bighat/ui': patch
---

`NavList` sets its own font family (`fontFamily.sans`), so it no longer renders
in the browser's serif default outside a `bh-root` or `AppShell`. The docs site
also parses GitHub-flavoured tables now: every "When to use it" and props table
rendered as a paragraph of pipes and dashes.
