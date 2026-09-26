import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { UserProfile } from '../UserProfile/UserProfile';
import { AppBar } from './AppBar';

/**
 * The strip across the top of an application screen: the product on the
 * leading edge, the name of the current screen beside it, and the actions that
 * apply to the whole screen on the trailing edge. The decision it encodes is
 * that `title` names the screen, not the product, and is the page's `<h1>` by
 * default — so the one heading a screen-reader user jumps to first says where
 * they are.
 *
 * Scaffolded from packages/spec/components/app-bar.json.
 * Every arg and story name below comes from the contract; the prose does not.
 */
const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof AppBar>;

/** The common case: product, screen name, and the screen's actions with the primary one last. */
export const Default: Story = {
  args: {
    brand: <strong>Billing</strong>,
    title: 'Invoices',
    actions: (
      <>
        <Button variant="secondary">Export</Button>
        <Button>Create invoice</Button>
      </>
    ),
  },
};

/** When the screen has one search that covers everything on it. */
export const WithSearch: Story = {
  args: {
    brand: <strong>Records</strong>,
    title: 'Contracts',
    center: (
      <Input type="search" label="Search contracts" hideLabel placeholder="Search contracts" />
    ),
    actions: <Button>Upload contract</Button>,
  },
};

/** When the bar also carries the signed-in account, which belongs last in `actions`. */
export const WithAccount: Story = {
  args: {
    brand: <strong>Billing</strong>,
    title: 'Overdue invoices',
    actions: (
      <>
        <Button>Send reminders</Button>
        <UserProfile
          name="Ada Lovelace"
          secondary="Finance"
          items={[{ label: 'Profile' }, { label: 'Sign out', tone: 'critical' }]}
        />
      </>
    ),
  },
};

/** When the screen already has its own visible `<h1>` further down. */
export const WithoutHeading: Story = {
  args: {
    brand: <strong>Records</strong>,
    title: 'Supplier agreements',
    titleAsHeading: false,
    actions: <Button>Upload agreement</Button>,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The title renders as a `<p>` instead of an `<h1>`. It looks the same; it only stops competing with the heading the screen already has, so heading navigation lands on one `<h1>`, not two.',
      },
    },
  },
};
