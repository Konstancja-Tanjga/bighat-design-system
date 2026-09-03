import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/**
 * Ephemeral messages.
 *
 * The accessibility trap here is that a toast is inserted into the DOM after
 * the page has loaded, and a live region only announces changes to a region
 * that already existed. So the container is rendered empty and permanently by
 * the provider, and toasts are added into it — not the other way round.
 *
 * Two regions, not one: `polite` for confirmations and `assertive` for errors.
 * Putting an error into a polite region means the user can navigate away
 * before ever hearing that their save failed.
 */
export type ToastTone = 'info' | 'success' | 'warning' | 'critical';

export type Toast = {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
  /** Milliseconds. `null` keeps it until dismissed — required for errors. */
  duration?: number | null;
};

type ToastInput = Omit<Toast, 'id'>;

type ToastContextValue = {
  notify: (toast: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>.');
  }
  return context;
}

/** Errors never auto-dismiss: the user may not have been looking. */
const defaultDuration = (tone: ToastTone) => (tone === 'critical' ? null : 5000);

export function ToastProvider({
  children,
  max = 3,
}: {
  children: ReactNode;
  /** Older toasts are dropped past this count. A stack of nine is noise. */
  max?: number;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (input: ToastInput) => {
      counter.current += 1;
      const id = `bh-toast-${counter.current}`;
      const duration = input.duration === undefined ? defaultDuration(input.tone) : input.duration;

      setToasts((current) => [...current, { ...input, id }].slice(-max));

      if (duration !== null) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss, max],
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  const render = (tone: 'polite' | 'assertive') => (
    <ol
      className="bh-toast-region"
      aria-live={tone}
      // `role="alert"` implies assertive; using the region for both means the
      // container exists from first paint, which is what makes it announce.
      aria-relevant="additions"
      data-tone={tone}
    >
      {toasts
        .filter((toast) =>
          tone === 'assertive' ? toast.tone === 'critical' : toast.tone !== 'critical',
        )
        .map((toast) => (
          <li key={toast.id} className={`bh-toast bh-toast--${toast.tone}`}>
            <div className="bh-toast__content">
              <p className="bh-toast__title">{toast.title}</p>
              {toast.description && <p className="bh-toast__description">{toast.description}</p>}
            </div>
            <button
              type="button"
              className="bh-toast__close bh-focusable"
              onClick={() => dismiss(toast.id)}
              aria-label={`Dismiss: ${toast.title}`}
            >
              <span aria-hidden="true">×</span>
            </button>
          </li>
        ))}
    </ol>
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="bh-toast-viewport">
        {render('polite')}
        {render('assertive')}
      </div>
    </ToastContext.Provider>
  );
}
