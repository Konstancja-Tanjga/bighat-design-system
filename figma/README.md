# Code Connect

What Dev Mode shows when someone inspects a component from the Big Hat Figma
library: the `<Button>` a developer would write, not CSS read off the canvas.

One parserless template (`*.figma.ts`) per Figma component set. Each maps the
Figma properties to the component's real props and leaves out the defaults, so
a primary, medium button reads `<Button>Save</Button>`. `hover` is a pointer
state, not a prop, and maps to nothing.

| template                    | Figma component set | code                                                   |
| --------------------------- | ------------------- | ------------------------------------------------------ |
| `Button.figma.ts`           | Button              | `src/components/Button/Button.tsx`                     |
| `ButtonCritical.figma.ts`   | Button / Critical   | the same, with `tone="critical"`                       |
| `Badge.figma.ts`            | Badge               | `src/components/Badge/Badge.tsx`                       |
| `Input.figma.ts`            | Input               | `src/components/Input/Input.tsx`                       |
| `Checkbox.figma.ts`         | Checkbox            | `src/components/Checkbox/Checkbox.tsx`                 |
| `FilterChip.figma.ts`       | FilterChip          | `src/components/FilterChip/FilterChip.tsx`             |
| `RemovableChip.figma.ts`    | RemovableChip       | `src/components/RemovableChip/RemovableChip.tsx`       |
| `Select.figma.ts`           | Select              | `src/components/Select/Select.tsx`                     |
| `MenuTrigger.figma.ts`      | Menu / Trigger      | `src/components/Menu/Menu.tsx`, the `<Menu>` itself    |
| `MenuItem.figma.ts`         | Menu / Item         | one entry of `<Menu items>`, as the object you pass    |
| `Textarea.figma.ts`         | Textarea            | `src/components/Textarea/Textarea.tsx`                 |
| `Switch.figma.ts`           | Switch              | `src/components/Switch/Switch.tsx`                     |
| `RadioGroup.figma.ts`       | RadioGroup          | `src/components/RadioGroup/RadioGroup.tsx`             |
| `SegmentedControl.figma.ts` | SegmentedControl    | `src/components/SegmentedControl/SegmentedControl.tsx` |

Pointer and keyboard states drawn in Figma — `hover`, `focus`, a menu's
`active` item — map to nothing: they are the browser's, not props. Data that
Figma does not hold, a Select's options or a Menu's items, is left to the
product as `options` and `items`.

The templates are outside `src/` on purpose: they import the `figma` runtime
that only exists inside Figma, so they are not part of the package, the type
check or the build.
