import type { MenuItemTone } from '../../tokens/vocabulary';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/**
 * A list of actions behind a trigger.
 *
 * A menu is for *doing*: rename, duplicate, delete. A list of destinations is
 * navigation and wants links; a list of values is a Select. Using `role="menu"`
 * for either tells a screen reader user to expect commands they will not find.
 *
 * The parts the platform does not give us and that get skipped most often:
 * focus moves into the menu on open and back to the trigger on close, arrows
 * wrap, Escape closes, and a click outside closes without swallowing that
 * click's own target.
 */
export type MenuItem = {
  label: ReactNode;
  onSelect?: () => void;
  /** Renders the item in the critical tone. Still needs a clear label. */
  tone?: MenuItemTone;
  /** @deprecated Use `tone="neutral"`. Removed in 5.0. */
  toneLegacy?: never;
  disabled?: boolean;
  /** Keyboard shortcut shown on the trailing edge. Display only. */
  shortcut?: string;
};

export type MenuProps = {
  /** The trigger's visible label. */
  label: ReactNode;
  items: MenuItem[];
  /** Which edge the menu aligns to. */
  align?: 'start' | 'end';
  /** Replaces the default trigger button, e.g. an icon button or an avatar. */
  renderTrigger?: (props: {
    ref: React.Ref<HTMLButtonElement>;
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
    'aria-controls': string;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    className: string;
  }) => ReactNode;
};

export function Menu({ label, items, align = 'start', renderTrigger }: MenuProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter((i) => i >= 0);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      // No returnFocus: the user is already on their way somewhere else.
      setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const node =
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')[activeIndex];
    node?.focus();
  }, [open, activeIndex]);

  const openAt = (position: 'first' | 'last') => {
    setActiveIndex(position === 'first' ? (enabled[0] ?? 0) : (enabled[enabled.length - 1] ?? 0));
    setOpen(true);
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAt('first');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAt('last');
    }
  };

  const triggerProps = {
    ref: triggerRef,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': open,
    'aria-controls': menuId,
    onClick: () => (open ? close() : openAt('first')),
    onKeyDown: onTriggerKeyDown,
    className: 'bh-menu__trigger bh-focusable',
  };

  const move = (delta: number) => {
    const position = enabled.indexOf(activeIndex);
    const next = enabled[(position + delta + enabled.length) % enabled.length];
    if (next !== undefined) setActiveIndex(next);
  };

  return (
    <div className="bh-menu">
      {renderTrigger ? (
        renderTrigger(triggerProps)
      ) : (
        <button type="button" {...triggerProps}>
          {label}
          <span className="bh-menu__caret" aria-hidden="true" />
        </button>
      )}

      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={typeof label === 'string' ? label : undefined}
        hidden={!open}
        className={`bh-menu__list bh-menu__list--${align}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            close();
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            move(1);
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            move(-1);
          } else if (event.key === 'Home') {
            event.preventDefault();
            setActiveIndex(enabled[0] ?? 0);
          } else if (event.key === 'End') {
            event.preventDefault();
            setActiveIndex(enabled[enabled.length - 1] ?? 0);
          } else if (event.key === 'Tab') {
            // Tab leaves the menu entirely rather than cycling inside it.
            setOpen(false);
          }
        }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            role="menuitem"
            tabIndex={-1}
            disabled={item.disabled}
            className={`bh-menu__item${item.tone === 'critical' ? ' bh-menu__item--critical' : ''}`}
            onClick={() => {
              item.onSelect?.();
              close();
            }}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <kbd className="bh-menu__shortcut" aria-hidden="true">
                {item.shortcut}
              </kbd>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
