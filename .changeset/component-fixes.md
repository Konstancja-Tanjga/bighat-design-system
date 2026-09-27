---
'@bighat/ui': patch
---

Three fixes found while documenting the components.

- `SidePanel` keeps focus on its toggle when it collapses or expands. It used
  to swap its root `<aside>` for a `<div>`, remounting and destroying the
  pressed button. It is now the same named landmark in both states, and a
  collapsed panel without `onToggle` no longer shows a toggle that does nothing.
- `BoardCard`'s move select gets its id from `useId`. Two cards with the same
  title no longer share an id, so each label points at its own select.
- A dragged interactive `Card` under the pointer shows the `overlay` shadow;
  hover's `floating` shadow used to win.
