// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=66-453
// source=src/components/AppShell/AppShell.tsx
// component=AppShell
import figma from 'figma';
const instance = figma.selectedInstance;

const aside = instance.getEnum('panes', {
  sidebar: '',
  'sidebar + aside': figma.code`
  aside={<SidePanel title="Filters">{filters}</SidePanel>}`,
});

export default {
  example: figma.code`<AppShell
  header={
    <>
      <SkipLink />
      <AppBar brand={brand} actions={actions} />
    </>
  }
  rail={<NavRail ariaLabel="Product areas" items={areas} activeId={area} onSelect={setArea} />}
  sidebar={sidebar}${aside}
>
  {page}
</AppShell>`,
  imports: ['import { AppBar, AppShell, NavRail, SidePanel, SkipLink } from "@bighat/ui"'],
  id: 'app-shell',
  metadata: { nestable: false },
};
