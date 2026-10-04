# Gaps

What the library does not cover, found by building something real against it
rather than by reviewing it. Each entry says what was reached for, what got
hand-rolled instead, and what the hand-rolled version does worse — because that
last part is the only argument for adding a component.

The rule this file exists to serve: a component earns its place when a product
would otherwise build a worse version of it, not when the library looks
incomplete without it.

> Kept in the repository rather than an issue tracker so that the evidence sits
> next to the code it is about, and so an agent reading `agent/SKILL.md` can
> find out what is _not_ here before inventing it locally.

---

## Found while building the portfolio gallery

Source: `konstancja-tanjga/portfolio-site` — a full-screen viewer for 43
watercolours, with paging and a thumbnail strip. Everything below was written
by hand in that project because the library had no answer.

### 1. No media viewer — `MediaViewer`

**Reached for:** `Dialog`. **Correct instinct, wrong fit.** `Dialog` is built on
the native `<dialog>` element and gets four things right that a hand-rolled
overlay does not: focus is trapped, the rest of the page is `inert`, Escape is
cancellable, and the top layer means no `z-index` arms race. All four are
exactly what a viewer needs.

But `Dialog` is shaped for a decision — `title`, `description`, `footer` of
buttons, three sizes. A viewer has no title bar, no footer, and its content must
fill the sheet rather than sit in padded prose.

**What got hand-rolled:** a `div` with `role="dialog"` and `aria-modal`.

**What it does worse:**

|             | `Dialog` (native) | The hand-rolled version                            |
| ----------- | ----------------- | -------------------------------------------------- |
| Focus trap  | yes               | **no** — Tab escapes to the page behind            |
| Page inert  | yes               | **no** — a screen reader can wander out            |
| Top layer   | yes               | `z-index: 200` and hope                            |
| Scroll lock | n/a               | manual `body.style.overflow`, lost on unmount race |

The focus-trap gap is the serious one: `aria-modal="true"` _tells_ assistive
technology the rest of the page is unavailable while leaving it perfectly
reachable. That is worse than not claiming it.

**Proposal:** a `MediaViewer` built on the same `<dialog>` foundation, with the
chrome a viewer needs instead of the chrome a decision needs.

### 2. No pager — `usePager`

**What got hand-rolled:** index state with wrap-around, `←/→/↑/↓/Home/End`,
pointer-based swipe with a horizontal-intent test, and neighbour prefetching.

Written **twice** in one project (the work-wall lightbox and the watercolour
gallery), differently each time.

**What it does worse:** nothing yet — it works. The argument here is not quality
but duplication: it is 60 lines of index arithmetic and event wiring that every
product with a media set will write again, and the second copy in the same
project already drifted from the first.

**Proposal:** a headless `usePager({ length, index, onIndex, loop })` returning
handlers. No markup, because the markup is what differs between a gallery, a
carousel and a stepper.

### 3. No thumbnail strip — `Filmstrip`

**Reached for:** `Tabs` for the keyboard model, `ScrollArea` for the scrolling.

`Tabs` has exactly the right roving-tabindex behaviour — one stop in the tab
order, arrows to move, Home and End to the ends — but it is bound to panels, and
a filmstrip has one panel that every thumbnail points at. `ScrollArea` is the
right scroller and was simply forgotten.

**What got hand-rolled:** a flex row of buttons with `role="tab"`, in a bare
`overflow-x: auto` div.

**What it does worse:**

- **Not keyboard-scrollable.** This is exactly the bug `ScrollArea`'s doc
  comment describes: Chrome and Safari only make an overflowing container
  focusable if it has `tabindex`, so a mouse-free user cannot scroll it. The
  library already solved this and the product did not use it.
- **43 tab stops.** Every thumbnail is in the tab order. `Tabs` would have made
  it one.
- **`role="tab"` without a `tabpanel`** is a promise to assistive technology
  that is not kept.

**Proposal:** `Filmstrip` — a single-select horizontal list of images, roving
tabindex from `Tabs`, scrolling from `ScrollArea`, active item scrolled to
centre.

### 4. No aspect-locked media frame — `Frame`

**What got hand-rolled:** twice, in two shapes. A 4:3 mount with the painting
centred whole inside it, and a set of small screens laid across a wall.

**Why it matters more than it sounds:** the decision inside it is
`contain`-versus-`cover`, and it is a content decision every time. Cropping a
watercolour to fill a tile loses the composition; cropping a screenshot to fill
a tile loses the point of the screenshot. A grid of mixed aspect ratios looks
unordered without a frame, and looks cropped with the wrong one.

**Proposal:** `Frame` — a ratio, a fit, and an optional mount colour. Small,
and it is the piece both the grid and the viewer stage need.

### 5. Token gaps

| Gap                          | Now                                   | Needed for                                                                                                      |
| ---------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `radius` stops at `lg: 10px` | 0 / 3 / 6 / 10 / full                 | A sheet or viewer wants 20–24px. The portfolio hard-codes `24px` and `12px`.                                    |
| No material                  | —                                     | A translucent, blurred overlay surface. Hard-coded `rgb(20 23 26 / 0.92)` plus `backdrop-filter`.               |
| No overlay scrim             | —                                     | Hard-coded `rgb(8 10 12 / 0.72)` in two places.                                                                 |
| Dark-on-media colours        | Semantic colours assume a page ground | Chrome sitting on top of an image is neither theme; the portfolio hard-codes six `rgb(255 255 255 / …)` values. |

The last one is the interesting one. The system's semantic colours are defined
against `surface.*`, and a control floating over a photograph has no surface —
it sits on whatever the image happens to be. That is a real hole in the token
model, not just a missing value, and the contrast test cannot cover it because
there is no known background to test against.

---

## Found while building DocuManager

Source: `Konstancja-Tanjga/Docu-Manager` — a document management prototype
(dashboard, library, upload, versioning, audit trail) built against 2.0.0 with
the rule that every control comes from the system. Six things had to be
hand-rolled. Three of them were `Tabs`, `SegmentedControl` and `Avatar`, which
3.2.0 and 4.0 have since added. The other three are below, and all three are
now in the library — the entries are kept because the argument is the useful
part, not the outcome.

### 6. No multi-line text field — `Textarea`

**Reached for:** `Input`, then `Composer`. Both refuse, and both are right to.
`Input` is single-line by contract. `Composer` owns the Enter key — it submits —
and its `notFor` list already said "ordinary multi-line form fields".

**What got hand-rolled:** a `<textarea>` with a copy of `Input`'s label,
description and error markup, and a copy of its `aria-describedby` wiring.

**What it does worse:** nothing, on the day it was written. That is the point.
It was a _correct_ 60-line copy of a field wrapper that already existed, which
means the next product writes a fourth one and gets the describedby order
wrong — error before description is not obvious, and nothing fails when it is
backwards. The most ordinary control in any form had nowhere to go.

**Closed by** `Textarea` in 4.2.0, sharing `.bh-field` with `Input`, `Select`
and `Checkbox`. It deliberately has no `hideLabel`: a single-line field can
borrow its name from context, a four-line box cannot.

### 7. No chip — `FilterChip` and `RemovableChip`

**Reached for:** `Badge`. It refuses — `notFor` says "anything clickable" — and
that refusal is correct: a badge states what something _is_, and pressing a fact
is meaningless.

**What got hand-rolled:** two components, because one could not do it. A filter
chip is a toggle reporting `aria-pressed`; a tag chip is a label with a remove
button beside it whose name is not the chip's text.

**What it does worse:**

|                    | The system had | The hand-rolled version                                   |
| ------------------ | -------------- | --------------------------------------------------------- |
| Pressed state      | —              | tint only — a WCAG 1.4.1 failure until the mark was added |
| Remove button name | —              | got this right; every other product surveyed ships `×`    |
| Target size        | —              | glyph-sized, under the WCAG 2.5.8 minimum of 24px         |

The remove-button name is the interesting one. The hand-rolled version was
careful and got it right, so nothing was broken — but "careful" is not a
guarantee, and a row of eight chips announced as eight identical "Remove"
buttons is the default outcome of building this yourself.

**Closed by** `FilterChip` and `RemovableChip` in 4.2.0, kept as two components
rather than one with a `removable` prop. The difference between them is where
the accessible name comes from, and a prop hiding that difference hides it in
the accessibility tree.

### 8. No file input of any kind — `FileDropzone`

**Reached for:** nothing. There was no file control in the system at all.

**What got hand-rolled:** a real `<input type="file">` with a `Button` calling
`input.click()`, plus drag handlers on the wrapper — the careful version of a
pattern that is usually a `<div onDrop>`.

**What it does worse:**

|                     | `<input type="file">` alone | The usual `<div onDrop>` | The hand-rolled version               |
| ------------------- | --------------------------- | ------------------------ | ------------------------------------- |
| In the tab order    | yes                         | **no**                   | yes                                   |
| Has a role and name | yes                         | **no**                   | yes                                   |
| Keyboard-operable   | yes                         | **no**                   | yes                                   |
| Tab stops           | one                         | zero                     | **two** — a hidden input and a button |
| Drop handling       | native                      | hand-written             | hand-written                          |

This is the gap with the most rope in it, and the hand-rolled version avoided
almost all of it. What it could not avoid was the shape: a visually hidden input
_plus_ a trigger button is two tab stops for one control, one of them invisible.

**Closed by** `FileDropzone` in 4.2.0, which stretches the real input across the
surface at zero opacity — the technique `SegmentedControl` already used for its
radios. One tab stop, native picker on Enter, and dropped files handled by the
input itself: every drag handler can be deleted and the component still works,
which is the test rule 9 asks for.

## Found while matching the Article template to World of Raptors

Source: `world-of-raptors` — a course whose lessons are the Article template
under the product's own theme. The theme re-points the semantic roles, which
the system supports; two things it needed have no role at all.

### 9. No scene surface — a dark, image-like panel and the text on it

**Reached for:** `surface.inverse` and `text.inverse`. **Wrong fit:** inverse
is a flat swap of the page colours, and in dark mode it turns light. The
product's next-lesson card is a sky gradient that stays dark in both themes,
with light text, a gold label and a gold pill.

**What got hand-rolled:** five custom properties in the template
(`--tpl-scene`, `--tpl-scene-shade`, `--tpl-scene-text`, `--tpl-scene-ink`,
`--tpl-highlight`), declared once in the theme block.

**What it does worse:** the contrast gate cannot see them. The text on the
gradient holds 4.5:1 only because a shade is laid under its leading edge; a
change to either stop is unchecked.

### 10. No fluid display sizes

**Reached for:** `textSize.display` and `textSize.title`. **Wrong fit:** both
are fixed. A reading product scales its title and section headings with the
viewport; the template writes four `clamp()` values by hand, which the drift
audit skips.

---

## Standing gaps, not yet argued for

Named so an agent stops looking rather than quietly widening something adjacent.
None of these has been reached for in a real build yet, so none has an argument:

- **`DataGrid`** — virtualised rows, column resize, frozen panes. Refused in
  3.2.0 on purpose: a different component with a windowing dependency, and this
  library has no runtime dependencies at all.
- **`Tree`** — a file or dossier hierarchy. `NavList` is flat by design.
- **Charts.** Deliberately out of scope; bind a chart library to the tokens
  instead.

---

## Closed

| Gap                               | Closed by                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------- |
| No responsive table               | `Table` `responsive` — 3.2.0                                                 |
| No term/value list                | `DescriptionList` — 3.2.0                                                    |
| No paging control                 | `Pagination` — 3.2.0                                                         |
| No multi-line text field          | `Textarea` — 4.2.0                                                           |
| No chip, filter or removable      | `FilterChip` + `RemovableChip` — 4.2.0                                       |
| No file input of any kind         | `FileDropzone` — 4.2.0                                                       |
| Shell panels vanished below 900px | `AppShell` `onNavToggle` — 3.2.0                                             |
| No breakpoint tokens              | `breakpoint` + `breakpoints.test.ts` — 3.2.0                                 |
| Type sizes not tokenised          | `--bh-text-size-*` — 3.2.0, partially: 35 stylesheets still hard-code theirs |
