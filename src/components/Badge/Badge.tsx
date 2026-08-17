import type { ReactNode } from 'react';

import './Badge.css';

/**
 * The smallest component in the system and the one under the most contrast
 * pressure: small text, tinted background, five tones, two themes.
 *
 * There is deliberately no `color` prop. A status badge whose meaning lives in
 * its colour fails WCAG 1.4.1 for anyone who cannot see the difference, so the
 * label is required and the tone only reinforces it.
 */
export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

export type BadgeProps = {
  tone?: BadgeTone;
  /** Adds a filled dot. Decorative — the label still carries the meaning. */
  dot?: boolean;
  children: ReactNode;
};

export function Badge({ tone = 'neutral', dot = false, children }: BadgeProps) {
  return (
    <span className={`bh-badge bh-badge--${tone}`}>
      {dot && <span className="bh-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
