import type { ReactNode } from 'react';
import './Board.css';
/**
 * Columns of cards — a kanban board, a pipeline, a review queue.
 *
 * The reason this is a system component rather than a layout each product
 * rebuilds: **the keyboard equivalent for dragging**. Drag and drop is a
 * pointer gesture with no keyboard analogue, and WCAG 2.1 requires that any
 * single-pointer path-based gesture has a simple alternative (2.5.1 / 2.5.7).
 * Boards built without one are unusable for anyone on a keyboard, a switch, or
 * voice control — and that gap is invisible to every automated check.
 *
 * `BoardCard` therefore takes `onMove`, and the board renders a live region so
 * a move is announced rather than silently happening somewhere off screen.
 */
export type BoardProps = {
    children: ReactNode;
    /** Names the region. A board is a landmark's worth of content. */
    ariaLabel: string;
    /**
     * Announced after a keyboard move. The board owns the live region so a card
     * that has just moved — and lost its old position — is still described.
     */
    announcement?: string;
};
export declare function Board({ children, ariaLabel, announcement }: BoardProps): import("react").JSX.Element;
export type BoardColumnProps = {
    title: string;
    /** Shown next to the title and folded into the accessible name. */
    count: number;
    /** Work-in-progress limit. Exceeding it is surfaced, never enforced. */
    limit?: number;
    /** A column-level action — "add", "filter". */
    action?: ReactNode;
    /** Optional: a column with `count` of zero renders `empty` instead. */
    children?: ReactNode;
    /** Rendered in place of the cards when the column is empty. */
    empty?: ReactNode;
};
export declare function BoardColumn({ title, count, limit, action, children, empty }: BoardColumnProps): import("react").JSX.Element;
export type BoardCardProps = {
    children: ReactNode;
    /** Where this card can go. Rendered as an explicit, keyboard-usable menu. */
    moveTargets?: Array<{
        id: string;
        label: string;
    }>;
    onMove?: (targetId: string) => void;
    onOpen?: () => void;
    /** Names the card for assistive technology and for the move control. */
    title: string;
};
export declare function BoardCard({ children, moveTargets, onMove, onOpen, title }: BoardCardProps): import("react").JSX.Element;
//# sourceMappingURL=Board.d.ts.map