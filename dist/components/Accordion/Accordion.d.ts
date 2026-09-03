import { type ReactNode } from 'react';
import './Accordion.css';
export type AccordionProps = {
    /** Several panels open at once. Off by default — one topic at a time. */
    multiple?: boolean;
    /** Ids of items open on first render. */
    defaultOpen?: string[];
    /**
     * Where the accordion sits in the document outline. Getting this wrong
     * breaks heading navigation as surely as skipping a level in prose.
     */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    children: ReactNode;
};
export declare function Accordion({ multiple, defaultOpen, headingLevel, children, }: AccordionProps): import("react").JSX.Element;
export type AccordionItemProps = {
    /** Stable identity for the open/closed state. */
    id?: string;
    title: ReactNode;
    /** Short count or status shown next to the title. Never the only cue. */
    meta?: ReactNode;
    children: ReactNode;
};
export declare function AccordionItem({ id, title, meta, children }: AccordionItemProps): import("react").JSX.Element;
//# sourceMappingURL=Accordion.d.ts.map