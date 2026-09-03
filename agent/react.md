# @bighat/ui — React idioms

Read [`SKILL.md`](./SKILL.md) first. Everything there is true here; this file
is only the React expression of it.

## Setup, once per application

```tsx
import '@bighat/ui';           // pulls in @bighat/css
import { ToastProvider } from '@bighat/ui';

<ToastProvider>
  <App />
</ToastProvider>
```

Nothing else. No theme provider — the theme is a `data-theme` attribute on
`<html>`, read by the token stylesheet.

## Rule 1 in React

```tsx
// Wrong — a primitive. Says what the colour is, not what it means.
<div style={{ color: color.neutral[600] }} />

// Wrong — a raw value. Invisible to every theme and every audit.
<div style={{ color: '#59636f' }} />

// Right — a role. Survives a rebrand, flips with the theme, is contrast-tested.
<div style={{ color: cssVar('text.muted') }} />
```

`cssVar` is typed against `TokenPath`, so a token that does not exist is a
compile error rather than a silently invalid custom property.

## Rule 3 in React

```tsx
{error ? (
  <StateBlock
    state="error"
    title="We could not load your invoices"
    description="The billing service did not respond. Your data has not changed."
    action={<Button size="sm" onClick={retry}>Try again</Button>}
    diagnostics={correlationId}
  />
) : loading ? (
  <StateBlock state="loading" title="Loading invoices" />
) : rows.length === 0 ? (
  <StateBlock state="empty" icon="📄" title="No invoices yet" description="…" />
) : (
  <Table … />
)}
```

Inside a `Table`, pass the same object to `state` instead.

## There is no `className`

Every component omits it. This is the load-bearing rule of the React API: an
escape hatch on a design system component is a design system with no rules,
because the first deadline turns it into a second styling layer nobody owns.

For a test hook use `data-testid`, which passes through on every leaf
component. For anything else, see rule 1.

## Leaf and composite

- **Leaf** — renders one targetable element. Extends that element's attributes
  (minus `className` and `style`), forwards a ref. `Button`, `Input`,
  `Checkbox`, `Select`, `Slider`, `DatePicker`, `Badge`, `Divider`, `Avatar`.
- **Composite** — renders a tree. Named props only, no ref. A ref to a
  composite is a ref to an implementation detail, and it is how consumers end
  up styling internals that then cannot change.

## Import the prop types, do not retype them

```tsx
import type { ButtonVariant, Tone } from '@bighat/ui';
```

All 41 components export theirs. A local copy of a union is a copy that will be
right until the system adds a value.

## Forms

React has no forms framework, so the library takes no position. Controls are
uncontrolled by default and accept the native `value`/`defaultValue` pair;
wire them to whatever the application uses.

The one thing not to do: reimplement the field wrapper. `label`, `description`
and `error` are props on every control, and they own the id namespace that ties
them together with `aria-describedby`. Rebuilding that outside the component
produces a field that looks right and announces nothing.
