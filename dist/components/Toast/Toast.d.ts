import { type ReactNode } from 'react';
import './Toast.css';
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
export declare function useToast(): ToastContextValue;
export declare function ToastProvider({ children, max, }: {
    children: ReactNode;
    /** Older toasts are dropped past this count. A stack of nine is noise. */
    max?: number;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=Toast.d.ts.map