import type { ReactNode } from 'react';
export declare function Guidance({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function Do({ children, reason }: {
    children: ReactNode;
    reason: ReactNode;
}): import("react").JSX.Element;
export declare function Dont({ children, reason }: {
    children: ReactNode;
    reason: ReactNode;
}): import("react").JSX.Element;
/**
 * A named usability heuristic, so guidance points at a published principle
 * instead of at the author's taste. Ten heuristics, Jakob Nielsen, 1994 —
 * still the most widely shared vocabulary in the industry, which is exactly
 * what makes them useful in a review argument.
 */
export declare function Heuristic({ name, children }: {
    name: string;
    children?: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=Guidance.d.ts.map