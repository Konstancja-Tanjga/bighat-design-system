import { type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.css';
/**
 * A text field is the component where accessibility is most often faked: a
 * styled `<div>` label, an error message floating unconnected below, and a red
 * border doing all the communicating.
 *
 * This one wires `aria-describedby` and `aria-invalid` from the same props
 * that render the visible text, so the two cannot drift apart.
 */
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> & {
    label: string;
    /** Hides the label visually but keeps it for assistive tech. Use sparingly. */
    hideLabel?: boolean;
    /** Persistent helper text. Shown above the error, never replaced by it. */
    description?: ReactNode;
    /** Presence of this string is what puts the field into the invalid state. */
    error?: string;
    id?: string;
};
export declare const Input: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id"> & {
    label: string;
    /** Hides the label visually but keeps it for assistive tech. Use sparingly. */
    hideLabel?: boolean;
    /** Persistent helper text. Shown above the error, never replaced by it. */
    description?: ReactNode;
    /** Presence of this string is what puts the field into the invalid state. */
    error?: string;
    id?: string;
} & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map