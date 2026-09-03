import type { ProgressTone } from '../../tokens/vocabulary';

import type { Size } from '../../tokens/vocabulary';

import { useId } from 'react';

/**
 * How far along something is.
 *
 * Two honest states, and the component refuses to blur them: a determinate bar
 * reports a real percentage, an indeterminate one admits it does not know. A
 * fake bar that crawls to 90% and waits is a lie the user learns to distrust.
 *
 * The percentage is rendered as text as well as width, because a bar alone is
 * a colour-and-length cue and neither survives WCAG 1.4.1 on its own.
 */
export type ProgressProps = {
  /** What is progressing. Required — "Loading" is not a label, it is a state. */
  label: string;
  /** Omit for the indeterminate state. */
  value?: number;
  max?: number;
  /** Hides the label visually. The bar still has an accessible name. */
  hideLabel?: boolean;
  /** Shown at the end of the label row, e.g. "12 of 40 files". */
  valueText?: string;
  tone?: ProgressTone;
  size?: Extract<Size, 'sm' | 'md'>;
};

export function Progress({
  label,
  value,
  max = 100,
  hideLabel = false,
  valueText,
  tone = 'neutral',
  size = 'md',
}: ProgressProps) {
  const labelId = useId();
  const indeterminate = value === undefined;
  const percent = indeterminate ? 0 : Math.max(0, Math.min(100, (value / max) * 100));
  const text = valueText ?? (indeterminate ? undefined : `${Math.round(percent)}%`);

  return (
    <div className="bh-progress">
      <div className={`bh-progress__row${hideLabel ? ' bh-visually-hidden' : ''}`}>
        <span className="bh-progress__label" id={labelId}>
          {label}
        </span>
        {text && <span className="bh-progress__value">{text}</span>}
      </div>

      <div
        className={`bh-progress__track bh-progress__track--${size}`}
        role="progressbar"
        aria-labelledby={labelId}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuetext={indeterminate ? undefined : text}
      >
        <div
          className={`bh-progress__fill bh-progress__fill--${tone}${
            indeterminate ? ' bh-progress__fill--indeterminate' : ''
          }`}
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
