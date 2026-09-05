# @bighat/ui

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
