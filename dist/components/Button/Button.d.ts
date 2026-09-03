import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';
/**
 * `variant` answers "how much visual weight", `tone` answers "how dangerous".
 *
 * They used to be one prop. `variant="danger"` was deprecated in 2.0, warned
 * for the whole of the 2.x line, and was removed in 3.0 — so it is now a type
 * error rather than a silent fallback. See MIGRATION.md.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonTone = 'default' | 'critical';
export type ButtonSize = 'sm' | 'md' | 'lg';
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
export declare const Button: import("react").ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
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
} & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map