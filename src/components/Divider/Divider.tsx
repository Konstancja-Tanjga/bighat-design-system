import type { ReactNode } from 'react';

/**
 * A line between things.
 *
 * With no label it is decoration, so it is `aria-hidden` and a screen reader
 * skips it — a separator announced between every row of a list is noise. With
 * a label it becomes a real `role="separator"` carrying that name, because at
 * that point it is dividing the page into named regions.
 */
export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  /** Text in the middle of the rule. Makes the separator meaningful. */
  children?: ReactNode;
  /** Extra breathing room above and below. */
  spacing?: 'none' | 'snug' | 'loose';
};

export function Divider({ orientation = 'horizontal', children, spacing = 'snug' }: DividerProps) {
  const classes = `bh-divider bh-divider--${orientation} bh-divider--${spacing}`;

  if (children && orientation === 'horizontal') {
    return (
      <div className={`${classes} bh-divider--labelled`} role="separator">
        <span className="bh-divider__label">{children}</span>
      </div>
    );
  }

  return (
    <div
      className={classes}
      role={orientation === 'vertical' ? 'separator' : undefined}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      aria-hidden={orientation === 'horizontal' ? true : undefined}
    />
  );
}
