---
'@bighat/ui': major
---

Rename the package scope from `@bighatpoland/ui` to `@bighat/ui`.

The old scope was an account handle, and that account has since been renamed to
`Konstancja-Tanjga`. Rather than track the handle, the package now carries the
name of the design system itself — which has always been Big Hat — so a future
account rename cannot invalidate it again.

The rename also repairs what the account change broke. GitHub redirects an old
username for repository URLs but not for Pages, so every
`bighatpoland.github.io` Storybook link was returning 404; those now point at
`konstancja-tanjga.github.io`. The `github:` install target moves to the current
owner as well: the old username is unclaimed, and a redirect through a name
anyone can register is not a dependency worth keeping.

Consumers must update their imports:

```diff
-import { Button } from '@bighatpoland/ui';
-import '@bighatpoland/ui/styles.css';
+import { Button } from '@bighat/ui';
+import '@bighat/ui/styles.css';
```

No component, token, or prop changed in this release.
