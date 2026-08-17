# Migration guide

## 1.x → 2.0 — `Button` splits `variant` into `variant` + `tone`

### What changed

`variant="danger"` is deprecated. Use `variant="primary" tone="critical"`.

```diff
- <Button variant="danger">Delete workspace</Button>
+ <Button variant="primary" tone="critical">Delete workspace</Button>
```

`variant` defaults to `primary`, so in practice:

```diff
- <Button variant="danger">Delete</Button>
+ <Button tone="critical">Delete</Button>
```

### Why this was worth a major version

`variant` was doing two jobs. Four of its five values described **visual
weight** — how loud is this button relative to everything else on screen. One
of them, `danger`, described **consequence** — what happens if you press it.

The prop worked right up until someone needed a destructive action that was not
the loudest thing on screen. A delete button inside a row of table actions
should be quiet _and_ destructive, and there was no way to say that. The
workarounds that appeared in product code were the tell:

```tsx
// Three different teams, three different workarounds, none of them theme-safe.
<Button variant="ghost" style={{ color: '#c02a2f' }}>Delete</Button>
<Button variant="secondary" className="destructive-override">Delete</Button>
<Button variant="danger" size="sm">Delete</Button>  // loud, and wrong
```

Splitting the axes makes all nine combinations expressible and removes the
inline overrides, which were also the only places in the codebase referencing a
raw hex value.

### What it costs

One codemod-able rename across every consumer, and a major version bump that
every team has to schedule. That is a real cost and it is the reason this was
not done as a "quick cleanup" — it was proposed, argued for, and accepted with
a deprecation window rather than shipped as a surprise.

### Deprecation timeline

| Version | Behaviour of `variant="danger"`                                           |
| ------- | ------------------------------------------------------------------------- |
| 2.0     | Works. Warns once in development. Renders identically to the replacement. |
| 2.x     | Unchanged.                                                                |
| 3.0     | Removed. TypeScript error.                                                |

The rendered output is byte-identical between the old and new form for the
whole of 2.x — there is a test asserting exactly that, so upgrading cannot
change how anything looks. That is the property that lets a team take 2.0 on a
Tuesday and do the rename whenever they get to it.

### Automated rename

`variant="danger"` has no other meaning in this codebase, so a scripted
replacement is safe:

```bash
# Preview
rg --files-with-matches 'variant="danger"' src

# Apply
rg --files-with-matches 'variant="danger"' src \
  | xargs sed -i '' 's/variant="danger"/variant="primary" tone="critical"/g'
```

Then run your type-check. Anything the script missed — a variant passed through
a variable, a spread prop — surfaces as a deprecation warning in the browser
console the first time that button renders in development.

### If you are blocked

Staying on 1.x is supported until 3.0 ships. What is _not_ supported is
suppressing the warning and skipping the rename: the removal in 3.0 is a
compile error, not a runtime fallback.
