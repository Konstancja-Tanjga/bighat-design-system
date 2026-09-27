# @bighat/ui

## 4.4.0

### Minor Changes

- 3b9ab69: **Chips join the glass direction.** `FilterChip` and `RemovableChip` are the
  same capsule as a secondary `Button`: `material.regular` edged with
  `material.rim` and `elevation.control`, instead of a white pill with a grey
  `border.strong` border. A filter chip's hover tints the glass through an overlay
  that fades. Unlike the Button it does not lift, because chips come in rows and a
  row that rises under the pointer is motion for its own sake. A pressed chip
  keeps `selection.bg` and its `selection.mark` border and check. The remove
  button hovers with the translucent `fill.hover`. No prop was removed or renamed.

  **SegmentedControl** follows. The chosen segment is that same glass capsule,
  sitting in a well of the translucent `fill.hover` instead of a grey box with a
  `border.strong` edge, and the track is a capsule to match. An unchosen segment
  darkens its label on hover. In forced-colours mode, which drops the capsule's
  fill and shadow, the chosen segment is outlined in `Highlight`.

  **Composer**'s modes are drawn as the single-choice chips they are, the same
  glass capsule as `FilterChip`, with the active mode on `selection.bg` and a
  `selection.mark` border. Its submit button is a primary Button's capsule, with
  `elevation.control`, and gives way when pressed.

### Patch Changes

- 130d4f8: Three fixes found while documenting the components.

  - `SidePanel` keeps focus on its toggle when it collapses or expands. It used
    to swap its root `<aside>` for a `<div>`, remounting and destroying the
    pressed button. It is now the same named landmark in both states, and a
    collapsed panel without `onToggle` no longer shows a toggle that does nothing.
  - `BoardCard`'s move select gets its id from `useId`. Two cards with the same
    title no longer share an id, so each label points at its own select.
  - A dragged interactive `Card` under the pointer shows the `overlay` shadow;
    hover's `floating` shadow used to win.

## 4.3.5

### Patch Changes

- 205d16e: `Card`'s accent is a straight capsule bar beside the content instead of an edge
  stripe. Since 4.2's 20px corner the stripe bent with the curve and read as a
  crescent. The bar runs the height of the content, keeps its length on a short
  `snug` card, and an accented card now takes section padding on its leading side
  so the bar never crowds the text. In forced-colours mode, where the old inset
  shadow disappeared, the bar is drawn in the system text colour.

## 4.3.4

### Patch Changes

- Corrects the hover fades from 4.3.3. Keyboard highlights in `Menu` and
  `Combobox` are instant again: fading them tinted two items at once while
  arrowing. Where selection shares a fading rule, its indicator now fades with the
  fill instead of landing ahead of it — a selected tab's underline, a checked
  `IconPicker` tile's border, the active `NavList` item's edge and a selected
  `ListView` row's leading bar. `RemovableChip`'s remove button, the one pointer
  hover 4.3.3 missed, now fades too.

## 4.3.3

### Patch Changes

- 856717e: Hover fades in across the library instead of jumping. `Menu`'s trigger gets
  the same hover as a secondary `Button`: an overlay tint whose opacity fades and
  a lift that keeps the resting shadow layers. Every other hover and highlight
  that changed colour instantly now transitions over `duration.fast` —
  `Accordion`, `Board`, `Combobox`, `Composer`, `Dialog`, `IconPicker`, `List`,
  `ListView`, `Menu` items, `NavList`, `NavRail`, `SidePanel`, `Table`, `Tabs`,
  `Toast` and `UserProfile`. Reduced motion still turns all of it off.

## 4.3.2

### Patch Changes

- 5e778ac: The hover on a secondary `Button` fades in instead of jumping. The tint is an
  overlay whose opacity transitions, and the lifted shadow keeps the resting
  layers so the browser can interpolate between the two.

## 4.3.1

### Patch Changes

- c2c1281: A hovered secondary `Button` and `Menu` trigger now tint the glass with
  `fill.hover` and lift to `elevation.floating`. The thicker material used before
  was invisible on a white page, so hover showed no change at all. A pressed
  critical primary button stays red instead of turning green.

## 4.3.0

### Minor Changes

- 4bc5ab5: **Buttons join the glass direction.**

  - Every `Button` is a capsule (`radius.pill`) with a pressed state that gives
    way under the pointer (`scale(0.97)`).
  - `primary` gains `elevation.control`: a lit top edge and a short contact
    shadow, so it reads as pressable rather than as a flat patch of colour.
  - `secondary` is glass - `material.regular` edged with `material.rim` - instead
    of a white box with a grey border. Hover thickens the material.
  - `ghost` hovers with the translucent `fill.hover`, so it works on glass.
  - `Menu`'s trigger matches the secondary button.

  **New token:** `elevation.control`.

  **Changed value:** `radius.control` is 10px, up from 6px, so inputs, menu items
  and every other control sit beside pill buttons and 20px surfaces. Every
  component on this role picks it up.

  `secondary` no longer draws `action.secondary.border`; it keeps a transparent
  1px border for forced-colours mode. No prop was removed or renamed.

## 4.2.0

### Minor Changes

- 293a340: **Elevation and glass: surfaces are drawn with height, not lines.**

  Until 4.1 almost every surface was a white rectangle with a 1px grey border,
  and elevation was three single-layer shadows that read as a smudge beside it. 4.2 replaces
  the border with a real elevation scale and adds translucent materials for
  anything that floats over content. See _Foundations / Elevation & materials_.

  **New tokens**

  - `elevation.flat` and `elevation.floating`, joining a rewritten `raised`,
    `overlay` and `modal`. Every step above `flat` is three layered shadows; in the dark
    theme `raised` and `floating` add a top-edge highlight, because a shadow on a
    near-black page is invisible.
  - `material.{thin,regular,thick,chrome}.{bg,blur}`, `material.saturation` and
    `material.rim` - a translucent fill, a backdrop blur, and the lit inner edge
    that replaces a border on glass.
  - `border.hairline`, `fill.hover`, `scrim.bg`, `scrim.blur`,
    `radius.overlay` (16px) and `radius.modal` (26px).

  **Changed values - visible without a code change**

  - `radius.surface` is 20px, up from 10px. With no border to draw it, the corner
    is what gives a surface its shape; every component on this role picks it up.
  - `elevation.raised`, `elevation.overlay` and `elevation.modal` are layered and
    wider. Every component on them picks this up, including Tooltip,
    SegmentedControl, Slider and the AppShell overlay panel.

  **Components**

  - `Card` defaults to `elevation="raised"` (was `flat`) and has no border. A
    flat card keeps a hairline. Hover lifts an interactive card to `floating`
    instead of darkening its border. Pass `elevation="flat"` to get closer to the
    4.1 look.
  - `Dialog` is `material.thick` on a blurred 18% scrim, 32% in dark (was an opaque
    surface on a 55% scrim), with `radius.modal`.
  - `Menu` and `Combobox` listboxes are `material.regular` with `radius.overlay`;
    a hovered or active item uses `fill.hover`.
  - `Toast` is `material.regular` at `elevation.floating` (was `overlay`), with
    `radius.surface` - 20px, up from the 6px of `radius.control`. Its tone stripe
    is now an inset shadow that follows the rounded corner.
  - `AppBar` is `material.chrome` with a hairline beneath it. The glass shows
    only where content scrolls under the bar; inside `AppShell` the header has its
    own row, so there it reads as a light tint.
  - A dragged `Card` is less transparent (0.85, was 0.6), because the overlay
    shadow now carries the "lifted" signal the fade used to.
  - Glass surfaces keep a transparent 1px border, so in forced-colours mode -
    which drops shadows - they still have an edge.

  No prop was removed or renamed.

  **Browser floor:** the Dialog scrim reads custom properties inside `::backdrop`,
  which needs Chrome 122, Firefox 120 or Safari 17.4. Older engines show no scrim.

- 38d05d8: **Four new components, all of them gaps found by building something real:**
  `Textarea`, `FilterChip`, `RemovableChip` and `FileDropzone`.

  All four came out of the DocuManager prototype, which was built against 2.0.0
  under the rule that every control comes from the system. Six controls had to be
  hand-rolled there; three of those are now covered by `Tabs`,
  `SegmentedControl` and `Avatar`, and these are the remaining three. The
  evidence for each — what was reached for, what got hand-rolled, and what the
  hand-rolled version does worse — is in `DS-GAPS.md`.

  **`Textarea`** — `Input` is single-line by contract and `Composer` owns the
  Enter key, so the most ordinary control in any form had nowhere to go. It
  shares `.bh-field` with `Input`, `Select` and `Checkbox`, so a field cannot
  look like a field in one component and not another, and it wires
  `aria-describedby` in the same order — error first.

  It deliberately has **no `hideLabel`**, though `Input` has one. `Input`'s
  exists for a search field whose purpose is obvious from what surrounds it; a
  four-line box has no such context, and every hidden-label multi-line field
  found in the wild turned out to be a comment box labelled by a placeholder.

  **`FilterChip` and `RemovableChip`** — two components, not one with a
  `removable` prop. `Badge` was the thing people reached for and it refuses to be
  clickable, correctly: a badge states what something _is_, and a chip states
  what the reader _asked for_. The two chips stay separate because the
  difference between them is where the accessible name comes from — a filter chip
  is one control reporting `aria-pressed`, and a removable chip is a label with a
  button beside it whose name is "Remove tag Finance", not "Finance". A prop
  hiding that difference hides it in the accessibility tree.

  `FilterChip`'s pressed state is carried three ways — `aria-pressed`, a check
  mark that holds its box when off, and the `selection` tint. The tint alone
  would fail WCAG 1.4.1. `RemovableChip`'s remove button is 24 × 24 CSS pixels,
  the WCAG 2.5.8 minimum.

  **`FileDropzone`** — the system had no file control at all, and this is the gap
  with the most rope in it: the usual dropzone is a `<div onDrop>` that is not
  focusable, has no role, has no name, and cannot be operated without a pointer.

  This is a real `<input type="file">` stretched across the surface at zero
  opacity, the technique `SegmentedControl` already used for its radios. One tab
  stop that is a genuine control, the platform picker on Enter, and dropped files
  handled by the input itself — every drag handler in the component can be
  deleted and it still works, which is the test rule 9 asks for. The drag
  highlight uses the `selection` role added in 4.1.0: a file held over the
  surface is a destination.

  It does not render the files it chose. That belongs to the form around it,
  which is the only thing that knows what "too large" means in context.

  **Also:** the `selection` role added in 4.1.0 now has two more consumers, and
  four more contracts are complete — 10 of 45, up from 6 of 41.

## 4.1.0

### Minor Changes

- a537e38: **New semantic role: `selection`.** `selection.bg`, `selection.fg` and
  `selection.mark` name the row the reader picked, the destination they are on,
  the tile that is checked.

  Six components — `NavList`, `NavRail`, `ListView`, `Table`, `IconPicker` and
  `Composer` — said that with `status.info`, which is a role for a message the
  system is making rather than for the answer to a question the reader just
  asked. The two wanted the same shape, so one stood in for the other, and a
  selected row and an information banner came out the same colour.

  The mismatch surfaced when the primary action moved to green and six components
  kept a blue current state. Nothing had hard-coded blue; they were pointing at a
  role with no reason to follow the accent.

  Selection now follows it: a green tint, ordinary foreground text, and a leading
  bar in `selection.mark` that is held to 3:1 on its own so the indication
  survives greyscale and forced colours. Three contrast pairs were added with it.

  Consumers who referenced `--bh-status-info-*` to draw their own selected state
  should move to `--bh-selection-*`; `status.info` keeps its meaning and its
  values, and is still what an information message uses.

## 4.0.0

### Major Changes

- 6a1ed82: 4.0 — DTCG tokens, contracts, and eight gates.

  **Tokens are now DTCG.** The source moves from `src/tokens/*.ts` to
  `tokens/*.tokens.json` in the W3C Design Tokens format, and four artefacts are
  generated from it: `dist/tokens.css`, `.scss`, `.ts` and `.flat.json`. The
  committed copies are compared against the source by `tokens:check`, so a
  hand-edit fails the build rather than surviving to the next rebuild.

  **Components are described by contracts.** `spec/components/*.json` states each
  component's anatomy, keyboard intent and ARIA obligations against the WAI-ARIA
  APG pattern it claims. The test suite is generated from those contracts rather
  than written per component, and `components.json` is removed in favour of them.

  **Eight gates, six of them new.** `tokens:check`, `spec:validate`,
  `audit:drift`, `aria`, `docs:check`, `check:docs`, `lint`, `test`. Two write
  reports that ship with the library: `ARIA.md` records that of 41 components 8
  conform, 10 are partial and 14 fail — published rather than fixed quietly,
  because a conformance claim without the failures is marketing. `DRIFT-REPORT.md`
  records token drift, currently clean on all eight scales.

  **`check:docs` is red on 18 scaffolded files, deliberately.** An invisibly
  incomplete library is worse than a visibly incomplete one.

  **CSS moves out of the components.** Each component's stylesheet leaves
  `src/components/X/X.css` for `src/styles/components/X.css`, and components no
  longer import their own CSS. This is what lets a second framework binding reuse
  the stylesheets rather than reimplement them.

  ### Breaking
  - `tone="default"` → `tone="neutral"`
  - `StateBlock` `density` → `scope`
  - `--bh-font-family` → `--bh-font-family-sans`
  - `className` is now omitted on all 41 components, not 7
  - Prop types are exported for all 41 components

  `MIGRATION-4.0.md` carries the codemods. `DECISIONS-4.0.md` records the 52
  off-scale token values and the reasoning for each — the default answer was snap
  to the nearest role, and two of twelve cleared the bar for a new token.

  ### Package scope

  `@bighatpoland/ui` → `@bighat/ui`. The old scope was an account handle, and that
  account is now `Konstancja-Tanjga`; the package takes the name of the design
  system instead, which does not move. This also repairs the Pages links the
  account rename broke — GitHub redirects an old username for repository URLs but
  not for Pages, so every `bighatpoland.github.io` Storybook link was a 404.

## 3.2.0

### Minor Changes

- 4e01380: The library now covers a data screen without anyone reaching for a local table.

  **Table, in three responsive forms.** One component, not three: the columns, the
  sort and the states are identical in all of them, and only the narrow-width form
  differs. `responsive="scroll"` is the default and is exactly what the table did
  before this release.

  - `scroll` — keeps the grid and scrolls the container. Right for a wide table
    where the reader is comparing across columns and any collapse destroys the
    comparison.
  - `stack` — each row becomes term-and-value pairs through `DescriptionList`, so
    a value keeps its label. Right at six columns or fewer.
  - `priority` — columns declare `priority: 1 | 2 | 3`; 2s and 3s leave the grid
    and move into a per-row disclosure. Right for a wide table with one column
    that identifies the row.

  A table declares its form and the component never guesses, because which form is
  right depends on whether the reader is scanning for one row or comparing across
  many — a fact about the screen, not about the data.

  **The queries are `@container`, not `@media`.** A table does not care how wide
  the window is; it cares how wide it is. The same table sits in `main` at 1200px,
  in a `SidePanel` at 432px and inside a `Card` at 280px on one screen, and a
  viewport query gets two of those three wrong.

  **Also on Table:** `selection` with a tri-state select-all (partial resolves to
  _select the rest_, never to _clear_), `rowActions`, `stickyHeader`, `density`,
  `totals` rendered in `tfoot` so a sort cannot move them into the data, and
  `Column.numeric`, which aligns end _and_ sets `tabular-nums` — two things always
  wanted together and until now available one at a time.

  **Two new components.** `DescriptionList`, a real `<dl>` for a record read
  rather than a form filled — and the same component `Table` stacks through, so
  the two cannot drift. `Pagination`, controlled for the same reason sort is
  controlled, reporting a range and a total rather than a page count.

  **`AppShell` closes an admitted gap.** `Templates.mdx` has said since 3.0 that
  below 900px the rail and panels are hidden rather than squeezed, and that a
  production implementation would put them behind a toggle. It now can:
  `onNavToggle` / `onAsideToggle` bring them back as an overlay with a real
  dismiss button. Omit them and the behaviour is unchanged.

  **A third template, Records.** A filtered, sorted, paged table with a detail
  panel — the most common enterprise screen there is, and the one the library had
  no template for, which is why the gaps above went unnoticed. Five stories, with
  _empty_ split into **nothing exists** and **nothing matches**: the same zero
  rows, opposite meanings, and opposite actions. Offering the wrong one is worse
  than offering neither.

  **Two token additions, and a second CI gate.**

  - `breakpoint` — 480 / 900 / 1200, container widths. CSS cannot read a custom
    property inside a query, so the literals are duplicated in component
    stylesheets; `src/tokens/breakpoints.test.ts` walks every stylesheet, pulls
    every threshold out of every `@container` and `@media` query, and fails the
    build on any value the token layer does not declare. Built the same way
    `contrast.test.ts` is, for the same reason.
  - `--bh-text-size-*` and `--bh-text-leading-*` — type sizes by role, which is
    what makes `density` expressible at all.

  **A stated gap.** `Table.css` now reads its type sizes from tokens; thirty-five
  other stylesheets still hard-code theirs. Six of the values in use — 9, 10, 12,
  18, 22 and 24px — are not on the `fontSize` scale, so converting them all means
  either changing how those components look or adding six primitives, and both are
  larger decisions than a release about tables should make. Listed here rather than
  pretended away.

## 3.1.0

### Minor Changes

- 479c21d: Twenty-one components, so the library covers an application screen without
  anyone reaching for a local `<div>`.

  Form controls: `Checkbox`, `RadioGroup`, `Switch`, `SegmentedControl`,
  `Slider`, `Combobox`, `DatePicker`, `IconPicker`.

  Structure and actions: `Tabs`, `Accordion`, `Menu`, `Toolbar`, `Tooltip`,
  `Progress`, `Breadcrumbs`, `List`, `ListView`, `Avatar`, `UserProfile`,
  `StatusBar`, `Divider`, `ScrollArea`.

  The keyboard patterns that a `role` promises are implemented rather than
  asserted: roving tabindex in `Tabs` and `Toolbar`, `aria-activedescendant`
  plus type-ahead in `ListView` and `Combobox`, focus return in `Menu`. Where the
  platform already ships the behaviour — date entry, range dragging, scrollbars —
  the native element is styled rather than replaced. `Combobox` is the one place
  that bargain is refused, so it pays the full ARIA bill instead.

  Nothing existing changed: this release is additive, and `components.json`,
  `agent/SKILL.md` and the README tables list the new components alongside the
  old ones.

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
