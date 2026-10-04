// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=43-10
// source=src/components/Breadcrumbs/Breadcrumbs.tsx
// component=Breadcrumbs
import figma from 'figma';

// The trail is data; the last item has no href because it is the current page.
export default {
  example: figma.code`<Breadcrumbs
  items={[
    { label: 'Billing', href: '/billing' },
    { label: 'Invoices', href: '/billing/invoices' },
    { label: 'INV-2043' },
  ]}
/>`,
  imports: ['import { Breadcrumbs } from "@bighat/ui"'],
  id: 'breadcrumbs',
  metadata: { nestable: true },
};
