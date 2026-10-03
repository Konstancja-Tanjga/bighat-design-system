# Code Connect

What Dev Mode shows when someone inspects a component from the Big Hat Figma
library: the `<Button>` a developer would write, not CSS read off the canvas.

One parserless template (`*.figma.ts`) per Figma component set. Each maps the
Figma properties to the component's real props and leaves out the defaults, so
a primary, medium button reads `<Button>Save</Button>`. `hover` is a pointer
state, not a prop, and maps to nothing.

| template | Figma component set | code |
| --- | --- | --- |
| `Button.figma.ts` | Button | `src/components/Button/Button.tsx` |
| `ButtonCritical.figma.ts` | Button / Critical | the same, with `tone="critical"` |

The templates are outside `src/` on purpose: they import the `figma` runtime
that only exists inside Figma, so they are not part of the package, the type
check or the build.
