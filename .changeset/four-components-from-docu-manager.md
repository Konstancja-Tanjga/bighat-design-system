---
'@bighat/ui': minor
---

**Four new components, all of them gaps found by building something real:**
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
