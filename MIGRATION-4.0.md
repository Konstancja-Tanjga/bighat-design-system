# Migrating to 4.0

Five breaking changes, all of them renames, all of them with a bridge that
resolves for the whole 4.x line. Nothing is removed until 5.0.

If you upgrade and change nothing, you get deprecation warnings in development
and identical rendering in production. The work below can be done one component
at a time.

## 1. `tone="default"` → `tone="neutral"`

Affects `Button` and `Progress` — the only two components whose tone scale
started somewhere other than `neutral`, and they disagreed with each other
about which values existed.

```diff
- <Button tone="default">Save</Button>
+ <Button tone="neutral">Save</Button>
```

`neutral` is the default value, so the common case is deleting the prop.

## 2. `StateBlock density` → `scope`

`density` meant `comfortable | compact` in `Table` and `DescriptionList` — row
spacing — and `inline | section | page` in `StateBlock`. Two unrelated concepts
under one name; the odd one out moved.

```diff
- <StateBlock state="empty" title="No invoices yet" density="page" />
+ <StateBlock state="empty" title="No invoices yet" scope="page" />
```

`density` still works and warns once in development.

## 3. `--bh-font-family` → `--bh-font-family-sans`

The font family was hardcoded in the stylesheet renderer before 4.0, which made
it the one value in the system no consumer could theme. It is now a token, and
tokens in that group carry their role in the name.

`--bh-font-family` is declared as an alias in `tokens.css` and resolves to the
new name. Nothing breaks; it is removed in 5.0.

## 4. Prop types are now exported for all 41 components

3.2.0 exported named prop types for two. If you wrote your own copy of a union
because you could not import it, you can now delete it:

```diff
- type ButtonVariant = 'primary' | 'secondary' | 'ghost';
+ import type { ButtonVariant } from '@bighat/ui';
```

Not breaking, but it is the change most likely to delete code.

## 5. `className` is omitted on all 41 components, not 7

3.2.0 omitted `className` on the seven components that extended their native
element's attributes. The other 34 never accepted it in the first place — they
had no passthrough at all — so this is only a break if you were passing
`className` to one of those seven.

```diff
- <Button className="my-save-button">Save</Button>
+ <Button variant="primary">Save</Button>
```

If the class was carrying styling the component cannot express, that is a gap:
open an issue and it goes in `DS-GAPS.md`. If it was carrying a test hook, use
`data-testid`, which is passed through on every leaf component.

Leaf components — `Button`, `Input`, `Checkbox`, `Select`, `Slider`,
`DatePicker`, `Badge`, `Divider`, `Avatar`, `UserProfile` — now accept their
native element's full attribute set and forward a ref. Composite components
accept named props only, and no longer accept a ref: a ref to a composite is a
ref to an implementation detail, and it is how consumers end up styling
internals that then cannot change.

## Not breaking, worth knowing

**Twenty-three new tokens.** `duration.*`, `easing.*`, `layer.*`,
`textWeight.*`, `fontFamily.sans`, `textSize.heading`, `textSize.display`,
`gap.hairline`, `padding.page`. No existing token changed value.

**Storybook titles changed in fourteen places** to match export names. If you
deep-link to Storybook pages, the URLs moved: `Components/Function Bar` is now
`Components/Toolbar`, `Data/Pagination` is now `Components/Pagination`. The
full list is in `packages/ui-react/scripts/rename-stories.mjs`.

**The token source is now DTCG 2025.10 JSON.** If you were importing from
`@bighat/ui/tokens`, `cssVar()` and the type exports are unchanged;
`primitives.ts` and `semantic.ts` are now generated files and should not be
imported directly.

## Angular consumers

`@bighat/ui-angular` 1.0 is a first release, so there is nothing to
migrate from. Two things to know if you are coming from the React library:

- Form controls implement `FormValueControl` / `FormCheckboxControl`, not
  `ControlValueAccessor`. They still drop into existing reactive and
  template-driven forms — the interop runs both ways — so you do not have to
  migrate your forms to adopt the library.
- `Button` is an attribute directive: `<button bhButton variant="primary">`,
  not `<bh-button>`. Your element stays yours, so `type`, `form`, `formaction`
  and `[routerLink]` all still work without a pass-through prop.
