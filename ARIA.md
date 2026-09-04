# ARIA conformance — React

`@bighat/ui`, audited against the WAI-ARIA Authoring Practices.

**41 implemented components.** 8 conform, 10 partial, 14 fail. 0 source-level errors, 3 warnings.

This is not an axe run. axe checks a rendered tree and finds what is wrong in it; this checks the contract against the pattern it claims, and finds what was never built — a required keyboard interaction that nobody implemented leaves no rendered evidence for axe to catch.

## Pattern conformance

| component | APG pattern | status | missing |
| --- | --- | --- | --- |
| Avatar | `group` | partial | WCAG: 1.3.1 |
| Board | `select (native)` | **fail** | labelling not specified · WCAG: 1.3.1, 3.3.2, 4.1.2 |
| Breadcrumbs | `navigation` | partial | WCAG: 1.3.1, 2.4.1 |
| Button | `button` | pass | — |
| Checkbox | `checkbox` | pass | — |
| Combobox | `combobox` | **fail** | labelling not specified · WCAG: 1.3.1, 2.1.1, 2.4.3, 4.1.2 · optional keys: Home, End, Alt+ArrowDown |
| Composer | `textbox` | **fail** | labelling not specified · WCAG: 1.3.1, 3.3.2, 4.1.2 |
| Dialog | `dialog` | pass | — |
| Divider | `separator` | partial | WCAG: 1.3.1 |
| IconPicker | `status` | partial | WCAG: 4.1.3 |
| Input | `textbox` | pass | — |
| List | `list` | partial | WCAG: 1.3.1 |
| ListView | `listbox` | **fail** | labelling not specified · WCAG: 1.3.1, 2.1.1, 4.1.2 |
| Menu | `menu` | **fail** | labelling not specified · WCAG: 2.1.1, 2.1.2, 2.4.3, 4.1.2 |
| NavList | `list` | partial | WCAG: 1.3.1 |
| NavRail | `button` | **fail** | keys: Enter, Space · labelling not specified · WCAG: 2.1.1, 2.4.7, 4.1.2 |
| Pagination | `navigation` | partial | WCAG: 1.3.1, 2.4.1 |
| Progress | `progressbar` | **fail** | labelling not specified · WCAG: 1.3.1, 4.1.2 |
| RadioGroup | `radio` | **fail** | labelling not specified · WCAG: 1.3.1, 2.1.1, 2.4.3, 4.1.2 |
| ScrollArea | `group` | partial | WCAG: 1.3.1 |
| SegmentedControl | `radio` | **fail** | labelling not specified · WCAG: 1.3.1, 2.1.1, 2.4.3, 4.1.2 |
| Select | `select (native)` | pass | — |
| SidePanel | `button` | **fail** | keys: Enter, Space · labelling not specified · WCAG: 2.1.1, 2.4.7, 4.1.2 |
| Skeleton | `status` | partial | WCAG: 4.1.3 |
| Slider | `slider` | **fail** | keys: ArrowLeft, ArrowRight, Home, End · labelling not specified · WCAG: 1.3.1, 2.1.1, 2.4.7, 4.1.2 · optional keys: PageUp, PageDown, ArrowUp, ArrowDown |
| StateBlock | `status` | pass | — |
| Switch | `switch` | **fail** | keys: Space · labelling not specified · WCAG: 1.3.1, 2.1.1, 4.1.2 · optional keys: Enter |
| Table | `table` | pass | — |
| Tabs | `tablist` | **fail** | keys: Arrow keys · labelling not specified · WCAG: 1.3.1, 2.1.1, 2.4.3, 4.1.2 |
| Toast | `alert` | pass | — |
| Toolbar | `toolbar` | **fail** | labelling not specified · WCAG: 2.1.1, 2.4.3 |
| Tooltip | `tooltip` | partial | WCAG: 2.1.1 |

### Pattern notes

- **Board** (`select (native)`) — Native <select>. Keyboard interaction, the popup and expanded state are the platform’s; the component is responsible for the accessible name and the error association only.
- **Checkbox** (`checkbox`) — A tri-state checkbox sets aria-checked="mixed" — and indeterminate is a DOM property, not an attribute.
- **Composer** (`textbox`) — A placeholder is not a name (WCAG 2.5.3 needs the visible label to match).
- **Dialog** (`dialog`) — aria-modal is implicit on a native <dialog> opened with showModal(). Focus must return to the opener.
- **Input** (`textbox`) — A placeholder is not a name (WCAG 2.5.3 needs the visible label to match).
- **Progress** (`progressbar`) — Indeterminate omits aria-valuenow entirely rather than setting it to 0.
- **RadioGroup** (`radio`) — One tab stop for the whole group: roving tabindex or a native radio group.
- **SegmentedControl** (`radio`) — One tab stop for the whole group: roving tabindex or a native radio group.
- **Select** (`select (native)`) — Native <select>. Keyboard interaction, the popup and expanded state are the platform’s; the component is responsible for the accessible name and the error association only.
- **Table** (`table`) — A table with interactive cells is a grid, and a grid has arrow-key navigation.
- **Tabs** (`tablist`) — Each tab needs aria-selected and aria-controls; each panel needs aria-labelledby.
- **Toolbar** (`toolbar`) — One tab stop for the whole toolbar.
- **Tooltip** (`tooltip`) — WCAG 1.4.13: dismissable, hoverable, persistent. A tooltip that vanishes on pointer-out fails it.

## Source-level findings — React-specific

| component | file | severity | finding |
| --- | --- | --- | --- |
| Combobox | `components/Combobox/Combobox.tsx` | warning | a placeholder with no visible label nearby. Worth confirming by hand — the regex sees 400 characters. |
| Composer | `components/Composer/Composer.tsx` | warning | a placeholder with no visible label nearby. Worth confirming by hand — the regex sees 400 characters. |
| IconPicker | `components/IconPicker/IconPicker.tsx` | warning | a placeholder with no visible label nearby. Worth confirming by hand — the regex sees 400 characters. |

## No APG pattern matched

Either the component genuinely has no pattern — a layout frame, a decorative element — or its recorded role is not one the APG defines, which is itself a finding.

- **Accordion** — `region`
- **AppBar** — `TODO`
- **AppShell** — `banner (in a landmark context) (implicit, from <header>)`
- **Badge** — `TODO`
- **Card** — `TODO`
- **DatePicker** — `TODO`
- **DescriptionList** — `varies — see announcements`
- **StatusBar** — `contentinfo`
- **UserProfile** — `TODO`

## What this audit cannot tell you

- **Colour contrast.** Gated separately, in `packages/tokens`: 26 declared pairs across two themes, asserted in CI.
- **Whether the keyboard behaviour is *correct*.** It checks that a key is handled and documented, not that pressing it does the right thing. That is what the shared suites in `packages/spec/src/suites.ts` are for, and they run against both libraries from one file.
- **Screen reader output.** No static audit substitutes for NVDA, JAWS and VoiceOver. The announcement policies in each contract are testable claims, and nobody has tested them.
- **Reflow and zoom.** WCAG 1.4.10 at 400%. The container-query architecture should make this pass, which is a hypothesis rather than a result.
