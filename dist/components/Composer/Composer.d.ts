import { type ReactNode } from 'react';
import './Composer.css';
/**
 * The prompt input.
 *
 * The component an AI product lives or dies by, and the one most often built
 * as a styled `<div contenteditable>` — which loses the label, the form
 * semantics, autocomplete, and undo.
 *
 * Three decisions worth defending:
 *
 * 1. **It is a `<textarea>` in a `<form>`.** Enter submits, Shift+Enter adds a
 *    line — but the form also submits the ordinary way, so voice control and
 *    switch access work without knowing about the key handler.
 * 2. **The label is required.** Placeholder text disappears at the first
 *    keystroke, and the field is often the only control on the screen.
 * 3. **Modes are radios, not buttons.** "Ask / Plan first / Make a chart" is a
 *    single choice with a current value, so it is a radio group. Rendering it
 *    as buttons loses the current value for anyone who cannot see the fill.
 */
export type ComposerMode = {
    id: string;
    label: string;
    icon?: ReactNode;
};
export type ComposerProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    /** Optional single-choice modes rendered under the field. */
    modes?: ComposerMode[];
    activeMode?: string;
    onModeChange?: (id: string) => void;
    /** Attach, dictate — anything acting on the draft. Icon buttons need labels. */
    tools?: ReactNode;
    submitLabel?: string;
    /** Blocks submit and announces that a response is on its way. */
    busy?: boolean;
    disabled?: boolean;
    /** Shown under the field. The place for a governance or accuracy notice. */
    hint?: ReactNode;
    maxRows?: number;
};
export declare function Composer({ label, placeholder, value, onValueChange, onSubmit, modes, activeMode, onModeChange, tools, submitLabel, busy, disabled, hint, maxRows, }: ComposerProps): import("react").JSX.Element;
//# sourceMappingURL=Composer.d.ts.map