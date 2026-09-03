import { type InputHTMLAttributes, type ReactNode } from 'react';
import '../Input/Input.css';
import './Checkbox.css';
/**
 * A native `<input type="checkbox">` with the box visually replaced.
 *
 * The input itself is never removed from the DOM and never `display: none` —
 * it stays under the drawn box, so it keeps form participation, the platform's
 * own keyboard handling, and the state a screen reader reads. Everything
 * visible is a sibling that reacts to `:checked` and `:focus-visible`.
 *
 * `indeterminate` is a DOM property, not an attribute, so it is set in an
 * effect rather than rendered — the mistake that makes tri-state trees announce
 * the wrong thing.
 */
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'type'> & {
    label: ReactNode;
    description?: ReactNode;
    error?: string;
    /** Mixed state: some children checked. Visual only until the user clicks. */
    indeterminate?: boolean;
    id?: string;
};
export declare const Checkbox: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "type"> & {
    label: ReactNode;
    description?: ReactNode;
    error?: string;
    /** Mixed state: some children checked. Visual only until the user clicks. */
    indeterminate?: boolean;
    id?: string;
} & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Checkbox.d.ts.map