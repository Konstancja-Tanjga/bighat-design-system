// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=32-3940
// source=src/components/AppShell/AppShell.tsx
// component=AppShell
import figma from 'figma';
const instance = figma.selectedInstance;

// The Skip link toggle only shows its focused look; in code the link is always there.
const aside = instance.getEnum('Aside', {
  false: '',
  true: figma.code`
  aside={<SidePanel ariaLabel="Filters" title="Filters">{filters}</SidePanel>}`,
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
