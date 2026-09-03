import { type ReactNode, type SelectHTMLAttributes } from 'react';
import '../Input/Input.css';
import './Select.css';
/**
 * A native `<select>` in a system that otherwise builds its own controls.
 *
 * This is the deliberate omission. A custom listbox is roughly 400 lines of
 * roving tabindex, typeahead, virtualisation and mobile fallbacks, and the
 * native element already gives us the platform picker on touch devices, form
 * autofill, and correct behaviour in every assistive technology we do not own
 * a licence to test against.
 *
 * When a product genuinely needs multi-select with search, that is a different
 * component with a different name — not a prop on this one.
 */
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'id'> & {
    label: string;
    options: SelectOption[];
    /** Rendered as a disabled first option, not as a real selectable value. */
    placeholder?: string;
    description?: ReactNode;
    error?: string;
    id?: string;
};
export declare const Select: import("react").ForwardRefExoticComponent<Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "id"> & {
    label: string;
    options: SelectOption[];
    /** Rendered as a disabled first option, not as a real selectable value. */
    placeholder?: string;
    description?: ReactNode;
    error?: string;
    id?: string;
} & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map