import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import './Button.css';

/**
 * `variant` answers "how much visual weight", `tone` answers "how dangerous".
 * They used to be one prop, which is why `danger` is still accepted below —
 * see MIGRATION.md for why that was a mistake worth a major version.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonTone = 'default' | 'critical';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: ButtonVariant | 'danger';
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

let warnedAboutDanger = false;

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
  const resolvedVariant: ButtonVariant = variant === 'danger' ? 'primary' : variant;
  const resolvedTone: ButtonTone = variant === 'danger' ? 'critical' : tone;

  if (variant === 'danger') {
    if (import.meta.env?.DEV && !warnedAboutDanger) {
      warnedAboutDanger = true;
      console.warn(
        '[@bighatpoland/ui] Button variant="danger" is deprecated and will be removed in 3.0. ' +
          'Use variant="primary" tone="critical". See MIGRATION.md.',
      );
    }
  }

  const classes = [
    'bh-button',
    'bh-focusable',
    `bh-button--${resolvedVariant}`,
    `bh-button--${size}`,
    resolvedTone === 'critical' && 'bh-button--critical',
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
