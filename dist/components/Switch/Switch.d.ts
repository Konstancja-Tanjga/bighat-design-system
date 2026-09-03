import { type ReactNode } from 'react';
import '../Input/Input.css';
import './Switch.css';
/**
 * A switch takes effect immediately. A checkbox is submitted with a form.
 * That is the whole distinction, and it is the one that decides which of the
 * two a screen is allowed to use.
 *
 * Implemented as a `<button role="switch">` rather than a styled checkbox,
 * because `role="switch"` is what makes the state announce as "on"/"off"
 * instead of "checked", and because a control with no form value has no
 * business being an input.
 */
export type SwitchProps = {
    /** Visible label. Required — an unlabelled switch names nothing it toggles. */
    label: ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    description?: ReactNode;
    disabled?: boolean;
    /** Label before the switch instead of after it. */
    labelPosition?: 'start' | 'end';
};
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map