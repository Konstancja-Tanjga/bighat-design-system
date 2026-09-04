# The off-scale values: 52 decisions

`DRIFT-REPORT.md` frames these; this file decides them. Each is a judgement
about the design, not a mechanical fix, so each carries the reason — and each is
yours to overturn. `scripts/apply-decisions.mjs` implements exactly what is
below and nothing else.

The default answer is **snap to the nearest role**, and the bar for the other
answer is high: a new token has to name something the codebase is already
doing in more than one place for more than one reason. Two of the twelve
clear it.

---

## font-size — 25 sites

### `12px` ×15 → **snap to `textSize.body` (13px)**

The biggest single decision, and the one most likely to be argued.

12px sits between `dense` (11px) and `body` (13px), and it appears in Avatar,
Badge, Board ×2, Combobox, Composer, and nine others. That spread is the
argument for snapping rather than adding: fifteen sites across eleven
components with no shared purpose is not a role, it is fifteen independent
guesses that landed on the same number.

Adding `textSize.compact: 12px` would give the scale six sizes between 11 and
26px, three of them within 2px of each other. At that density the roles stop
being distinguishable and everyone reaches for the px value again.

**Cost:** those fifteen elements grow one pixel. Badge is the visible one —
check it against a table row before shipping.

### `18px` ×5 → **snap to `textSize.heading` (16px)**

Dialog, IconPicker, NavRail, SidePanel, Toast. All five are titles, and there
is already a role for a title. 18px was a per-component preference, which is
precisely what a scale is for eliminating.

### `10px` ×2 → **snap to `textSize.label` (11px)**

Avatar and NavRail. 10px is below the smallest size the system declares, and
at 10px this font stack renders numerals ambiguously at typical ERP zoom.

### `22px` ×2, `24px` ×1 → **snap to `textSize.display` (20px)**

Two templates and StateBlock. Templates are examples; an example that invents
a type size teaches the wrong lesson more effectively than the docs teach the
right one.

## font-weight — 4 sites

### `700` ×4 → **snap to `textWeight.heading` (600)**

NavList, AiChat ×2, KanbanBoard. At these sizes on these surfaces the
difference between 600 and 700 in a system font stack is a rendering artefact,
not a hierarchy a reader can use. The system has three weights and does not
need a fourth to say "more important than heading".

## spacing — 15 sites

### `6px` ×2 → **snap to `gap.snug` (8px)**

Board and Tabs. Both are gaps between siblings, and 8px is the declared step
for that.

### `3px`, `5px` ×1 each → **snap to `gap.hairline` (2px) / `gap.tight` (4px)**

Both in Checkbox, both inside the drawn checkmark geometry. Worth noting these
are *drawing* values rather than layout values — see the exemption below.

### `1px` ×2 → **exempt: a hairline border, not spacing**

Checkbox and KanbanBoard. `margin-top: 1px` correcting optical alignment
against a 1px border is not a spacing decision, and forcing it to 2px would
misalign the thing it exists to align.

**Added to the gate as a documented exemption**, not snapped: `1px` is legal
for optical correction where a `1px` border is involved. This is the one place
the drift report was wrong about what it found.

### `26px` ×1 → **24px, by fixing what it was compensating for**

Checkbox's hint indent. Reversed after review, and the review was right: the
first pass derived it as `control.indicator + gap.snug + gap.hairline` on the
theory that 26 = 16 + 8 + 2 and the 2 was a border.

It was not. There is no global `box-sizing` reset, so `.bh-checkbox__box` at
`width: 18px` with a 1px border on each side occupied **20px**. Plus the 8px
flex gap, the label's text started at **28px** — and the hint below it was
hand-set to 26px. The two were already 2px out of line, in the direction nobody
notices because the hint is smaller and greyer.

So deriving it canonised an error and made it look intentional. The fix is
upstream:

- `.bh-checkbox__box` and `.bh-checkbox__input` take `box-sizing: border-box`
  and `width/height: var(--bh-control-indicator)` — 16px including the border,
  matching each other so the hit area agrees with what is drawn
- the hint becomes `calc(var(--bh-control-indicator) + var(--bh-gap-snug))`,
  which is exactly 24px and is derived from the two things it aligns to
- the tick was tuned against an 18px box and would read as a thin diagonal in
  a 14px content area, so it is redrawn with equal legs
- the mixed-state bar's `left: 3px; right: 3px; top: 7px` becomes an
  `inset-inline` plus `top: 50%` and a translate. Those three literals encoded
  "centred in an 18px box" and would need recomputing every time the box moved

**The general lesson, and it cost two new gate rules:** a literal that encodes
a *relationship* is more dangerous than one that encodes a value. `left: 3px`
centring something is correct exactly once.

## border-radius — 1 site, and a blind spot

### `4px` → **new role: `radius.indicator` (3px)**

The checkbox box corner. 4px was never on the radius scale at all —
`radius.control` (6px) reads as too round on a 16px box, and 1px is not a
design decision worth a new primitive, so the role points at `radius.sm`.

This one is the reason the gate grew: **a 4px corner radius and an 18px box
width survived all six original rules.** They covered the properties where
drift is obvious — type, spacing, motion, layering — and missed the ones where
a literal encodes a relationship.

Two rules added: `border-radius`, and the inset properties
(`inset` / `top` / `right` / `bottom` / `left`).

## inset — 4 sites

All in NavRail's active indicator and notification dot.

`left: -6px` → `calc(-1 * var(--bh-gap-snug))`, the same call as the Select
arrow. `top: -2px` and `right: -4px` → negated `gap.hairline` and `gap.tight`.
`border-radius: 0 3px 3px 0` → two `radius.indicator` corners; a four-value
shorthand is four independent corners, and the auditor was reporting it as one
unmappable literal until it learned to split them.

`width` and `height` stay ungated, deliberately. A control's own dimensions and
a decorative dot's size are not on a spacing scale, and gating them would flag
every icon in the library to catch the occasional 18px.

### `32px` ×1 → **new role: `padding.gutter` (32px)**

Select, and one of the two additions that clears the bar. `padding-right: 32px`
is the space a native select's dropdown arrow needs, and the same measurement
recurs in Combobox and DatePicker as a hardcoded value the report did not flag
because those use `calc()`. Three components, one purpose: that is a role.

### `48px` ×2 → **new role: `padding.hero` (48px)**

StateBlock and Switch. Also clears the bar, but only just — and the honest
reading is that these are two different things wearing one number. Named
`padding.hero` for the StateBlock case; the Switch use is a track width, which
belongs in a control scale and is left as a `DS-GAPS.md` entry rather than
forced into a padding role.

### `-8px`, `-2px`, `-4px`, `-6px`, `-1px` → **`calc(-1 * var(…))`**

Already handled by `codemod-tokens.mjs` for the four that matched a token.
`-6px` in Select snaps to `-8px` first, then negates.

## duration — 2 sites

### `200ms` ×1 → **snap to `duration.normal` (220ms)**

Progress width transition. 20ms is below the threshold anyone perceives.

### `1.4s` ×1 → **`duration.sweep` (1400ms)**

Same value, written in a different unit. This is the drift the gate exists to
catch, and the only reason it survived to 3.2.0 is that a search for `1400ms`
does not find `1.4s`.

## easing — 11 sites

### `ease` ×7 → **`easing.standard`**

`ease` is `cubic-bezier(0.25, 0.1, 0.25, 1)`, which is not the same curve as
`easing.standard` — it accelerates more slowly in and decelerates more sharply
out. The change is perceptible side by side and invisible otherwise, and having
one declared curve is worth more than preserving a browser default nobody
chose.

### `linear` ×7 → **`easing.loop`**

All seven are on loops — spinners, skeleton sweeps, indeterminate progress.
`easing.loop` *is* linear; this is a naming change, not a curve change.

### `ease-in` ×2 → **`easing.exit`**

Progress and Skeleton. Both are the fade-out half of a loop.

---

## Five new tokens, and what they cost

`padding.gutter` (32px), `padding.hero` (48px), `control.indicator` (16px),
`control.track` (48px), `radius.indicator` (3px). Each names something the
codebase was already doing in more than one place. Everything else snaps.

That ratio is the useful number: **51 of 56 off-scale values were not missing
roles, they were drift.** The scale was right; nothing was checking that anyone
used it.

The five that were real roles all have the same shape — a *control's own
geometry*, which the original scale had no vocabulary for at all. `control.*`
held three heights and nothing else, so a checkbox's box size, a switch's track
and a select's arrow gutter each got hand-set. That was the actual gap, and it
took running the gate to see it.

## One new exemption

`1px` for optical correction alongside a `1px` border. Documented in the gate
with the reason, so the next person to hit it finds the answer instead of
adding a second exemption.
