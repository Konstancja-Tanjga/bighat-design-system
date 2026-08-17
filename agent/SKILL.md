---
name: bighat-ui
description: Build UI with @bighatpoland/ui. Load this before writing any component, screen, or style that will use this design system — it encodes the rules the library cannot enforce at the type level.
---

# Building with @bighatpoland/ui

A design system's rules live in three places: the types, the linter, and the
heads of the four people who wrote it. This file is an attempt to move the
third category somewhere an agent can read it.

Everything below is a rule that a correct-looking, type-checking, lint-passing
piece of code can still break.

## 1. Never use a primitive token in product code

`@bighatpoland/ui` exports two layers. Only one of them is an API.

```tsx
// Wrong — a primitive. It says what the colour is, not what it means.
<div style={{ color: color.neutral[600] }} />

// Wrong — a raw value. Invisible to every theme and every audit.
<div style={{ color: '#59636f' }} />

// Right — a role. Survives a rebrand, flips with the theme, is contrast-tested.
<div style={{ color: cssVar('text.muted') }} />
// or, in CSS:
color: var(--bh-text-muted);
```

If no semantic token fits what you are building, that is a signal the system is
missing a role — not a licence to reach one layer down. Say so and stop.

## 2. Spacing comes from the scale or not at all

Every gap, padding and margin must be a token: `var(--bh-gap-tight | snug |
normal | loose)` or `var(--bh-padding-inline | block | section)`.

`padding: 13px` is always wrong, including when it looks better. The scale is
4px-based; a value off the scale is a value that will drift.

## 3. Empty, loading and error are `StateBlock` — always

Do not write a bespoke "No results found" div. Do not render `null` while
loading. Do not put an error into a `<p style={{ color: 'red' }}>`.

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

Inside a `Table`, pass the same object to the `state` prop instead — the table
renders it across every column for you.

**"Empty" is two different screens.** First use ("you have no invoices yet")
needs an onboarding action. Filtered-to-nothing ("no invoices match these
filters") needs a way out of the filter. Writing one and using it for both is
the single most common mistake with this component.

## 4. Colour is never the only carrier of meaning

`Badge` has no `color` prop and requires a label, on purpose. If you find
yourself rendering a coloured dot with no text, add the text.

Same rule for form errors: the red border is the redundant cue, the message is
the real one. `Input` handles this if you pass `error`; do not style a border
yourself.

## 5. Do not remove focus outlines

Add `className="bh-focusable"` to any custom interactive element so it inherits
the system's ring. Never write `outline: none` — not even with a replacement,
because the replacement will not have been contrast-tested.

## 6. Labels are required, placeholders are not labels

`Input` and `Select` both take a required `label`. To hide it visually use
`hideLabel`, which keeps it for assistive technology. A placeholder disappears
on the first keystroke and is the first casualty of autofill.

## 7. Prefer composition over new props

Before adding a prop to a component in this system, check whether the need is
really a new component. `Button` will not grow a `variant="link"`; that is an
anchor. `Select` will not grow `searchable`; that is a Combobox, and it does
not exist yet.

If a screen genuinely needs something the system lacks, build it locally in the
product with semantic tokens, and say plainly that it is a local component.
Silently widening a system component is how systems rot.

## 8. Setup, once per application

```tsx
import '@bighatpoland/ui/styles.css';
import { ToastProvider } from '@bighatpoland/ui';

export function App({ children }) {
  return (
    <div className="bh-root">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
```

Dark theme is `document.documentElement.setAttribute('data-theme', 'dark')`.
Users who never touch a toggle get `prefers-color-scheme` automatically.

## 9. Deprecations in flight

- `Button variant="danger"` → `variant="primary" tone="critical"`.
  Still works, warns in development, removed in 3.0. See `MIGRATION.md`.
  Never write new code with it.

## Component inventory

Machine-readable in `components.json`. Human-readable in the Storybook at
<https://bighatpoland.github.io/bighat-design-system/>.

| Component    | Use it for                          | Do not use it for                    |
| ------------ | ----------------------------------- | ------------------------------------ |
| `Button`     | An action the user takes            | Navigation — use an anchor           |
| `Input`      | Single-line text entry              | Anything with its own keyboard model |
| `Select`     | Choosing one of a short, known list | Search, multi-select, async options  |
| `Dialog`     | A decision that must block the page | Non-blocking feedback — use `Toast`  |
| `Toast`      | Confirming something happened       | Errors the user must act on in place |
| `Table`      | Comparable rows of structured data  | Layout                               |
| `Badge`      | Short status on an object           | Counts on their own, buttons         |
| `StateBlock` | Empty, loading and error surfaces   | The happy path                       |
