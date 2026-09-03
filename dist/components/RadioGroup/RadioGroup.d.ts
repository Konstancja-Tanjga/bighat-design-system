import { type ReactNode } from 'react';
import '../Input/Input.css';
import './RadioGroup.css';
/**
 * Radios only exist in groups, so the group is the component and the single
 * radio is not exported.
 *
 * That forces the two things a lone `<Radio>` always loses: a `<fieldset>` with
 * a `<legend>`, which is how a screen reader tells the user what the choice is
 * about, and one shared `name`, which is what makes arrow keys move between the
 * options instead of tabbing through every one of them.
 */
export type RadioOption = {
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
};
export type RadioGroupProps = {
    /** The question. Rendered as the fieldset's legend. */
    legend: string;
    options: RadioOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    description?: ReactNode;
    error?: string;
    required?: boolean;
    /** Horizontal only for two or three short options. */
    orientation?: 'vertical' | 'horizontal';
};
export declare function RadioGroup({ legend, options, value, defaultValue, onChange, name, description, error, required, orientation, }: RadioGroupProps): import("react").JSX.Element;
//# sourceMappingURL=RadioGroup.d.ts.map