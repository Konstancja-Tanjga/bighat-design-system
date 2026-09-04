import type { Size, Variant } from '../../tokens/vocabulary';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * `variant` answers "how much visual weight", `tone` answers "how dangerous".
 *
 * They used to be one prop. `variant="danger"` was deprecated in 2.0, warned
 * for the whole of the 2.x line, and was removed in 3.0 — so it is now a type
 * error rather than a silent fallback. See MIGRATION.md.
 */
export type ButtonVariant = Variant;
export type ButtonTone = 'default' | 'critical';
export type ButtonSize = Size;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Renders a spinner, disables the button, and keeps the label readable. */
  loading?: boolean;
  /** Announced to screen readers while `loading`. */
  loadingLabel?: string;
  /** Decorative only — icons here are hidden from assistive tech. */
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    tone = 'default',
    size = 'md',
    loading = false,
    loadingLabel = 'Loading',
    iconStart,
    iconEnd,
    fullWidth = false,
    disabled,
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    'bh-button',
    'bh-focusable',
    `bh-button--${variant}`,
    `bh-button--${size}`,
    tone === 'critical' && 'bh-button--critical',
    fullWidth && 'bh-button--full',
    loading && 'bh-button--loading',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...rest}
      ref={ref}
      className={classes}
      // A loading button stays focusable so focus is not lost mid-interaction,
      // but `aria-disabled` plus the click guard below stop it from firing twice.
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        rest.onClick?.(event);
      }}
    >
      {loading ? (
        <>
          <span className="bh-button__spinner" aria-hidden="true" />
          <span className="bh-visually-hidden">{loadingLabel}</span>
        </>
      ) : (
        iconStart && (
          <span className="bh-button__icon" aria-hidden="true">
            {iconStart}
          </span>
        )
      )}
      <span className="bh-button__label">{children}</span>
      {iconEnd && !loading && (
        <span className="bh-button__icon" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </button>
  );
});
