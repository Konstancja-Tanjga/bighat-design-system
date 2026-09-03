import './Progress.css';
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
    tone?: 'default' | 'success' | 'critical';
    size?: 'sm' | 'md';
};
export declare function Progress({ label, value, max, hideLabel, valueText, tone, size, }: ProgressProps): import("react").JSX.Element;
//# sourceMappingURL=Progress.d.ts.map