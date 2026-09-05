import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

/**
 * jsdom implements <dialog> as an element but not as a dialog: showModal and
 * close are simply absent, so mounting Dialog throws before a single assertion
 * runs. Choosing the native element is the whole design decision behind this
 * component — focus trapping, inertness and Escape come from the platform — so
 * the answer is to give the test environment the two methods it is missing,
 * not to stop using the element that provides them.
 */
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & {
    showModal?: () => void;
    show?: () => void;
    close?: (returnValue?: string) => void;
  };

  if (!proto.showModal) {
    proto.showModal = function showModal(this: HTMLDialogElement) {
      this.open = true;
      // showModal() also moves focus into the dialog and holds it there.
      releases.get(this)?.();
      releases.set(this, containFocus(this));
      this.querySelector<HTMLElement>(focusable)?.focus();
    };
  }
  if (!proto.show) {
    proto.show = function show(this: HTMLDialogElement) {
      this.open = true;
    };
  }
  /**
   * The other half of the same gap. jsdom gives a `<dialog>` no top layer, so
   * nothing contains Tab inside an open modal and Shift+Tab from the first
   * control walks straight out to <body> — which is precisely the failure the
   * keyboard suite exists to catch, reported against a component where the
   * browser does the right thing. The trap below is the platform's rule, not
   * the component's: wrap at both ends of the focusable set, and never on a
   * dialog that is not modal.
   */
  const focusable =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
    'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const containFocus = (dialog: HTMLDialogElement) => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !dialog.open) return;

      const stops = [...dialog.querySelectorAll<HTMLElement>(focusable)];
      if (stops.length === 0) {
        event.preventDefault();
        return;
      }

      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      const outside = !dialog.contains(active);

      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeydown, true);
    return () => document.removeEventListener('keydown', onKeydown, true);
  };

  const releases = new WeakMap<HTMLDialogElement, () => void>();

  if (!proto.close) {
    proto.close = function close(this: HTMLDialogElement, returnValue?: string) {
      this.open = false;
      releases.get(this)?.();
      releases.delete(this);
      if (returnValue !== undefined) this.returnValue = returnValue;
      this.dispatchEvent(new Event('close'));
    };
  }
}
