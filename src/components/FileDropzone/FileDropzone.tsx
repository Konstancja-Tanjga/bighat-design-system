import { useId, useState, type DragEvent, type ReactNode } from 'react';

/**
 * Choosing files to upload.
 *
 * The system had no file input of any kind, and this is the gap with the most
 * rope in it. The usual dropzone is a `<div onDrop>` with a click handler: it
 * is not in the tab order, it has no role, it has no name, and it cannot be
 * operated without a pointer. It also cannot be operated by a pointer user who
 * does not know that the region is clickable, because nothing says so.
 *
 * So this is a real `<input type="file">`, and the drop target is the input —
 * stretched across the surface at zero opacity, the way `SegmentedControl`
 * lays its radios over their labels. Three things fall out of that, and they
 * are the whole argument for building it this way:
 *
 *   - **One tab stop, and it is a control.** The browser announces "file
 *     upload button" and the platform file picker opens on Enter or Space. No
 *     `tabIndex`, no `role="button"`, no synthetic `.click()`.
 *   - **Drag and drop is native.** A file input accepts dropped files by
 *     itself; the only thing React handles is the highlight while a file is
 *     over the surface. Delete every drag handler here and the component still
 *     works, which is the test rule 9 asks for and a `<div onDrop>` fails.
 *   - **The name comes from a `<label>`.** Not `aria-label`, so it is visible,
 *     and it is a voice-control target.
 *
 * What it does not do is show the files. The list of what has been chosen — with
 * sizes, errors, and a way to remove one — belongs to the form around it, which
 * knows what "too large" means here. An oversized file is a `StateBlock` in
 * that form, not a toast: the reader has to take the file back out.
 */
export type FileDropzoneProps = {
  /** Names the field. Visible, required, and the input's accessible name. */
  label: string;
  /** Persistent helper text — the place for accepted types and size limits. */
  description?: ReactNode;
  /** Presence of this string is what puts the field into the invalid state. */
  error?: string;
  /** The prompt on the surface. Decorative: the label is the accessible name. */
  prompt?: string;
  /** Mirrors the native attribute — `.pdf,image/*`. A hint, never a guarantee. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  onFiles: (files: File[]) => void;
};

export function FileDropzone({
  label,
  description,
  error,
  prompt = 'Drop files here, or choose from your device',
  accept,
  multiple = false,
  disabled = false,
  required = false,
  name,
  onFiles,
}: FileDropzoneProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const [over, setOver] = useState(false);

  // Error first, as everywhere else in the system.
  const describedBy = [error ? errorId : null, description ? descriptionId : null]
    .filter(Boolean)
    .join(' ');

  /**
   * `dragover` has to be cancelled or the browser navigates to the file instead
   * of offering it to the page. `dragleave` fires when the pointer crosses onto
   * a child, so the highlight is cleared on the surface only.
   */
  function allow(event: DragEvent<HTMLElement>) {
    if (disabled) return;
    event.preventDefault();
    setOver(true);
  }

  return (
    <div className="bh-field">
      <label className="bh-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="bh-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {description && (
        <p className="bh-field__description" id={descriptionId}>
          {description}
        </p>
      )}

      <div
        className={`bh-dropzone${over ? ' bh-dropzone--over' : ''}${
          error ? ' bh-dropzone--invalid' : ''
        }${disabled ? ' bh-dropzone--disabled' : ''}`}
        onDragEnter={allow}
        onDragOver={allow}
        onDragLeave={() => setOver(false)}
        onDrop={() => setOver(false)}
      >
        <input
          id={inputId}
          className="bh-dropzone__input"
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          required={required}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => {
            onFiles([...(event.target.files ?? [])]);
            // Without this, choosing the same file twice fires no change event
            // and the second attempt looks like a broken control.
            event.target.value = '';
          }}
        />

        {/* Hidden from assistive technology: the <label> above is the name, and
            the browser already announces the control's own affordance. This is
            the sighted-pointer half of the same message. */}
        <span className="bh-dropzone__prompt" aria-hidden="true">
          {prompt}
        </span>
      </div>

      {error && (
        <p className="bh-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
