import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

import './Tooltip.css';

/**
 * A short label for a control that has none — an icon button, a truncated cell.
 *
 * Deliberately narrow, because WCAG 1.4.13 puts three obligations on
 * hover-triggered content and each one rules something out:
 *
 * - dismissible: Escape closes it without moving the pointer
 * - hoverable: the pointer can travel into it, so it does not vanish mid-read
 * - persistent: it stays until focus or hover leaves, never on a timer
 *
 * It follows that a tooltip cannot hold a link, a button, or anything the user
 * has to reach. If it does, it is a popover, and that is a different component.
 */
export type TooltipProps = {
  /** Plain text. Interactive content belongs in a popover. */
  content: ReactNode;
  /** A single focusable element — a button, a link, an input. */
  children: ReactElement<{
    'aria-describedby'?: string;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
  }>;
  placement?: 'top' | 'bottom';
  /** Delay before showing on hover. Focus always shows immediately. */
  delay?: number;
};

export function Tooltip({ content, children, placement = 'top', delay = 200 }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(() => cancel, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const show = (immediate = false) => {
    cancel();
    if (immediate || delay === 0) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    cancel();
    setOpen(false);
  };

  const trigger = cloneElement(children, {
    // The tooltip describes the control; it never replaces its name. An icon
    // button still needs its own accessible name for voice control users, who
    // speak the visible label and never see the tooltip at all.
    'aria-describedby': open ? id : undefined,
    onFocus: (event: React.FocusEvent) => {
      children.props.onFocus?.(event);
      show(true);
    },
    onBlur: (event: React.FocusEvent) => {
      children.props.onBlur?.(event);
      hide();
    },
  });

  return (
    <span
      className="bh-tooltip-anchor"
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      // Pointer travel into the bubble keeps it open: the wrapper covers both.
    >
      {trigger}
      <span role="tooltip" id={id} className={`bh-tooltip bh-tooltip--${placement}`} hidden={!open}>
        {content}
      </span>
    </span>
  );
}
