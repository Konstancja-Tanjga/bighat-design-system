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
| `Tab.figma.ts`              | Tabs / Tab          | `<Tab>` in `src/components/Tabs/Tabs.tsx`              |
| `TabList.figma.ts`          | Tabs / List         | `<Tabs>` and `<TabList>`, with the tabs inside         |
| `Tooltip.figma.ts`          | Tooltip             | `src/components/Tooltip/Tooltip.tsx`                   |
| `Toast.figma.ts`            | Toast               | the `toast.show()` call from `useToast`                |
| `Dialog.figma.ts`           | Dialog              | `src/components/Dialog/Dialog.tsx`                     |
| `Card.figma.ts`             | Card                | `src/components/Card/Card.tsx`                         |
| `Avatar.figma.ts`           | Avatar              | `src/components/Avatar/Avatar.tsx`                     |
| `AvatarGroup.figma.ts`      | Avatar / Group      | `AvatarGroup` in the same file                         |
| `UserProfile.figma.ts`      | UserProfile         | `src/components/UserProfile/UserProfile.tsx`           |
| `Breadcrumbs.figma.ts`      | Breadcrumbs         | `src/components/Breadcrumbs/Breadcrumbs.tsx`           |
| `Pagination.figma.ts`       | Pagination          | `src/components/Pagination/Pagination.tsx`             |
| `Progress.figma.ts`         | Progress            | `src/components/Progress/Progress.tsx`                 |
| `Skeleton.figma.ts`         | Skeleton            | `src/components/Skeleton/Skeleton.tsx`                 |
| `StateBlock.figma.ts`       | StateBlock          | `src/components/StateBlock/StateBlock.tsx`             |
| `AppBar.figma.ts`           | AppBar              | `src/components/AppBar/AppBar.tsx`                     |
| `NavRail.figma.ts`          | NavRail             | `src/components/NavRail/NavRail.tsx`                   |
| `NavRailItem.figma.ts`      | NavRail / Item      | one entry of `<NavRail items>`                         |
| `SidePanel.figma.ts`        | SidePanel           | `src/components/SidePanel/SidePanel.tsx`               |
| `Toolbar.figma.ts`          | Toolbar             | `src/components/Toolbar/Toolbar.tsx`                   |
| `StatusBar.figma.ts`        | StatusBar           | `src/components/StatusBar/StatusBar.tsx`               |
| `Table.figma.ts`            | Table               | `src/components/Table/Table.tsx`                       |

Pointer and keyboard states drawn in Figma — `hover`, `focus`, a menu's
`active` item — map to nothing: they are the browser's, not props. Data that
Figma does not hold, a Select's options or a Menu's items, is left to the
product as `options` and `items`.

The templates are outside `src/` on purpose: they import the `figma` runtime
that only exists inside Figma, so they are not part of the package, the type
check or the build.
