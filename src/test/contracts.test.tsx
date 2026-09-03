import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { runAnatomySuite, runKeyboardSuite, type Harness } from './suites';

import * as bh from '../index';

/**
 * One story-shaped example per implemented component, and nothing else in this
 * file. The assertions all come from the contracts — see
 * src/test/suites.ts for what is asserted and why.
 *
 * The examples are minimal on purpose: this suite checks the DOM contract and
 * the keyboard contract, not the component's own behaviour, which is what each
 * component's own test file is for. A rich example here would make a failure
 * ambiguous between "parity broke" and "this example is wrong".
 */
const examples: Record<string, () => React.ReactElement> = {
  Button: () => <bh.Button>Save changes</bh.Button>,
  Checkbox: () => <bh.Checkbox label="Email me about billing changes" />,
  StateBlock: () => <bh.StateBlock state="empty" title="No invoices yet" />,
  Dialog: () => (
    <bh.Dialog open title="Rename workspace" onClose={() => {}}>
      <input aria-label="Workspace name" />
    </bh.Dialog>
  ),
};

const harness: Harness = {
  framework: 'react',
  async mount(name) {
    const example = examples[name];
    if (!example) throw new Error(`No React example for ${name}. Add one above.`);

    const { container, unmount } = render(example());
    const root = (container.firstElementChild ?? container) as HTMLElement;
    const target =
      root.matches('button, input, select, textarea, a[href], dialog')
        ? root
        : (root.querySelector<HTMLElement>(
            'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? root);

    return { root, target, cleanup: unmount };
  },
  async press(element, key) {
    await userEvent.type(element, `{${key}}`);
  },
};

runAnatomySuite(harness);
runKeyboardSuite(harness);
