import { type InputHTMLAttributes, type ReactNode } from 'react';
import '../Input/Input.css';
import './Slider.css';
/**
 * A native `<input type="range">`, restyled rather than rebuilt.
 *
 * The platform already ships arrow keys, Home and End, Page Up and Page Down,
 * touch handling and the correct `slider` role. A custom div with a draggable
 * thumb ships none of that and is the single most reliable way to make a value
 * unreachable without a mouse.
 *
 * `aria-valuetext` is exposed as `formatValue` because "24" tells a screen
 * reader user nothing when the unit is "24 hours" or "24 zł".
 */
export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'type' | 'value' | 'defaultValue' | 'onChange'> & {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    description?: ReactNode;
    /** Turns the raw number into something a person would say out loud. */
    formatValue?: (value: number) => string;
    /** Hides the numeric readout next to the label. */
    hideValue?: boolean;
    id?: string;
};
export declare const Slider: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "type" | "value" | "onChange" | "defaultValue"> & {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    description?: ReactNode;
    /** Turns the raw number into something a person would say out loud. */
    formatValue?: (value: number) => string;
    /** Hides the numeric readout next to the label. */
    hideValue?: boolean;
    id?: string;
} & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Slider.d.ts.map