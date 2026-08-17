import { useId, useRef, useState, type ReactNode } from 'react';

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
export type ComposerMode = { id: string; label: string; icon?: ReactNode };

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

export function Composer({
  label,
  placeholder = 'Ask anything',
  value,
  onValueChange,
  onSubmit,
  modes,
  activeMode,
  onModeChange,
  tools,
  submitLabel = 'Ask',
  busy = false,
  disabled = false,
  hint,
  maxRows = 8,
}: ComposerProps) {
  const id = useId();
  const [internal, setInternal] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const controlled = value !== undefined;
  const text = controlled ? value : internal;

  const setText = (next: string) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed || busy || disabled) return;
    onSubmit?.(trimmed);
    if (!controlled) setInternal('');
  };

  return (
    <form
      className="bh-composer"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <label className="bh-visually-hidden" htmlFor={id}>
        {label}
      </label>

      <div className="bh-composer__field">
        <textarea
          ref={textareaRef}
          id={id}
          className="bh-composer__input bh-focusable"
          rows={1}
          style={{ maxHeight: `${maxRows * 22}px` }}
          placeholder={placeholder}
          value={text}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => {
            setText(event.target.value);
            const el = event.target;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
          }}
          onKeyDown={(event) => {
            // Shift+Enter for a newline is the convention users arrive with.
            // Enter alone submitting is only safe because the form submits by
            // ordinary means too.
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              submit();
            }
          }}
        />

        <div className="bh-composer__tools">
          {tools}
          <button
            type="submit"
            className="bh-composer__submit bh-focusable"
            disabled={disabled || !text.trim()}
            aria-disabled={busy || undefined}
          >
            {submitLabel}
          </button>
        </div>
      </div>

      {modes && modes.length > 0 && (
        <fieldset className="bh-composer__modes">
          <legend className="bh-visually-hidden">Response mode</legend>
          {modes.map((mode) => (
            <label
              key={mode.id}
              className={`bh-composer__mode${activeMode === mode.id ? ' bh-composer__mode--active' : ''}`}
            >
              <input
                type="radio"
                name={`${id}-mode`}
                className="bh-visually-hidden"
                checked={activeMode === mode.id}
                onChange={() => onModeChange?.(mode.id)}
              />
              {mode.icon && (
                <span className="bh-composer__mode-icon" aria-hidden="true">
                  {mode.icon}
                </span>
              )}
              {mode.label}
            </label>
          ))}
        </fieldset>
      )}

      {hint && (
        <p className="bh-composer__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
    </form>
  );
}
