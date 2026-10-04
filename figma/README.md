# Code Connect

What Dev Mode shows when someone inspects a component from the Big Hat Figma
library: the `<Button>` a developer would write, not CSS read off the canvas.

One parserless template (`*.figma.ts`) per Figma component set. Each maps the
Figma properties to the component's real props and leaves out the defaults, so
a primary, medium button reads `<Button>Save</Button>`. `hover` is a pointer
state, not a prop, and maps to nothing.

| template                    | Figma component set | code                                                            |
| --------------------------- | ------------------- | --------------------------------------------------------------- |
| `Button.figma.ts`           | Button              | `src/components/Button/Button.tsx`                              |
| `ButtonCritical.figma.ts`   | Button / Critical   | the same, with `tone="critical"`                                |
| `Badge.figma.ts`            | Badge               | `src/components/Badge/Badge.tsx`                                |
| `Input.figma.ts`            | Input               | `src/components/Input/Input.tsx`                                |
| `Checkbox.figma.ts`         | Checkbox            | `src/components/Checkbox/Checkbox.tsx`                          |
| `FilterChip.figma.ts`       | FilterChip          | `src/components/FilterChip/FilterChip.tsx`                      |
| `RemovableChip.figma.ts`    | RemovableChip       | `src/components/RemovableChip/RemovableChip.tsx`                |
| `Select.figma.ts`           | Select              | `src/components/Select/Select.tsx`                              |
| `MenuTrigger.figma.ts`      | Menu / Trigger      | `src/components/Menu/Menu.tsx`, the `<Menu>` itself             |
| `MenuItem.figma.ts`         | Menu / Item         | one entry of `<Menu items>`, as the object you pass             |
| `Textarea.figma.ts`         | Textarea            | `src/components/Textarea/Textarea.tsx`                          |
| `Switch.figma.ts`           | Switch              | `src/components/Switch/Switch.tsx`                              |
| `RadioGroup.figma.ts`       | RadioGroup          | `src/components/RadioGroup/RadioGroup.tsx`                      |
| `SegmentedControl.figma.ts` | SegmentedControl    | `src/components/SegmentedControl/SegmentedControl.tsx`          |
| `Tab.figma.ts`              | Tabs / Tab          | `<Tab>` in `src/components/Tabs/Tabs.tsx`                       |
| `TabList.figma.ts`          | Tabs / List         | `<Tabs>` and `<TabList>`, with the tabs inside                  |
| `Tooltip.figma.ts`          | Tooltip             | `src/components/Tooltip/Tooltip.tsx`                            |
| `Toast.figma.ts`            | Toast               | the `toast.show()` call from `useToast`                         |
| `Dialog.figma.ts`           | Dialog              | `src/components/Dialog/Dialog.tsx`                              |
| `Card.figma.ts`             | Card                | `src/components/Card/Card.tsx`                                  |
| `Avatar.figma.ts`           | Avatar              | `src/components/Avatar/Avatar.tsx`                              |
| `AvatarGroup.figma.ts`      | Avatar / Group      | `AvatarGroup` in the same file                                  |
| `UserProfile.figma.ts`      | UserProfile         | `src/components/UserProfile/UserProfile.tsx`                    |
| `Breadcrumbs.figma.ts`      | Breadcrumbs         | `src/components/Breadcrumbs/Breadcrumbs.tsx`                    |
| `Pagination.figma.ts`       | Pagination          | `src/components/Pagination/Pagination.tsx`                      |
| `Progress.figma.ts`         | Progress            | `src/components/Progress/Progress.tsx`                          |
| `Skeleton.figma.ts`         | Skeleton            | `src/components/Skeleton/Skeleton.tsx`                          |
| `StateBlock.figma.ts`       | StateBlock          | `src/components/StateBlock/StateBlock.tsx`                      |
| `AppBar.figma.ts`           | AppBar              | `src/components/AppBar/AppBar.tsx`                              |
| `NavRail.figma.ts`          | NavRail             | `src/components/NavRail/NavRail.tsx`                            |
| `NavRailItem.figma.ts`      | NavRail / Item      | one entry of `<NavRail items>`                                  |
| `SidePanel.figma.ts`        | SidePanel           | `src/components/SidePanel/SidePanel.tsx`                        |
| `Toolbar.figma.ts`          | Toolbar             | `src/components/Toolbar/Toolbar.tsx`                            |
| `StatusBar.figma.ts`        | StatusBar           | `src/components/StatusBar/StatusBar.tsx`                        |
| `Table.figma.ts`            | Table               | `src/components/Table/Table.tsx`                                |
| `Accordion.figma.ts`        | Accordion           | `src/components/Accordion/Accordion.tsx`, with the items inside |
| `AccordionItem.figma.ts`    | Accordion / Item    | `<AccordionItem>` in the same file                              |
| `Divider.figma.ts`          | Divider             | `src/components/Divider/Divider.tsx`                            |
| `List.figma.ts`             | List                | `src/components/List/List.tsx`, with the items inside           |
| `ListItem.figma.ts`         | List / Item         | `<ListItem>` in the same file                                   |
| `DescriptionList.figma.ts`  | DescriptionList     | `src/components/DescriptionList/DescriptionList.tsx`            |
| `NavList.figma.ts`          | NavList             | `<NavGroup>`, `<NavList>` and `<NavItem>`                       |
| `NavItem.figma.ts`          | NavList / Item      | `<NavItem>` in `src/components/NavList/NavList.tsx`             |
| `ListView.figma.ts`         | ListView            | `src/components/ListView/ListView.tsx`                          |
| `ListViewRow.figma.ts`      | ListView / Row      | one entry of `<ListView items>`                                 |
| `Slider.figma.ts`           | Slider              | `src/components/Slider/Slider.tsx`                              |
| `Combobox.figma.ts`         | Combobox            | `src/components/Combobox/Combobox.tsx`                          |
| `ComboboxOption.figma.ts`   | Combobox / Option   | one entry of `<Combobox options>`                               |
| `DatePicker.figma.ts`       | DatePicker          | `src/components/DatePicker/DatePicker.tsx`                      |
| `DateRangePicker.figma.ts`  | DateRangePicker     | `<DateRangePicker>` in the same file                            |
| `FileDropzone.figma.ts`     | FileDropzone        | `src/components/FileDropzone/FileDropzone.tsx`                  |
| `IconPicker.figma.ts`       | IconPicker          | `src/components/IconPicker/IconPicker.tsx`                      |
| `ScrollArea.figma.ts`       | ScrollArea          | `src/components/ScrollArea/ScrollArea.tsx`                      |
| `Composer.figma.ts`         | Composer            | `src/components/Composer/Composer.tsx`                          |
| `Board.figma.ts`            | Board               | `src/components/Board/Board.tsx`, columns and cards inside      |
| `BoardColumn.figma.ts`      | Board / Column      | `<BoardColumn>` in the same file                                |
| `BoardCard.figma.ts`        | Board / Card        | `<BoardCard>` in the same file                                  |
| `Article.figma.ts`          | Article             | `src/components/Article/Article.tsx`                            |
| `AppShell.figma.ts`         | AppShell            | `src/components/AppShell/AppShell.tsx`, with its slots          |

Pointer and keyboard states drawn in Figma — `hover`, `focus`, a menu's
`active` item — map to nothing: they are the browser's, not props. Data that
Figma does not hold, a Select's options or a Menu's items, is left to the
product as `options` and `items`.

Three drawn parts have no template of their own, because in code they are
data inside their parent, not components: `IconPicker / Tile` (one of
`icons`), `Composer / Mode` (one of `modes`) and `Article / Contents item`
(one of `toc`). Dev Mode shows them through the parent's snippet.

The templates are outside `src/` on purpose: they import the `figma` runtime
that only exists inside Figma, so they are not part of the package, the type
check or the build.

## Page headers

Every component page in the library opens with a header: the name, its layer
and where it is implemented, its purpose, what it is not for, and links to its
Storybook page and its contract. The header is drawn from the contracts in
`spec/components`, never typed in Figma:

```bash
npm run figma:headers   # writes figma/headers.json from the contracts
```

Then ask the Figma agent to redraw the headers from that file. The script fails
when a contract has no page, so a new component cannot reach the library
without one. Guidance that is tested and rendered live — do and don't,
keyboard, ARIA — stays in Storybook, linked from the header, not copied.
