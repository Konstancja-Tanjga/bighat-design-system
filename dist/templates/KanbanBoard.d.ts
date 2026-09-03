import './KanbanBoard.css';
export type KanbanTemplateProps = {
    state?: 'ready' | 'loading' | 'error';
    /** Demonstrates the work-in-progress limit being exceeded. */
    overLimit?: boolean;
};
export declare function KanbanTemplate({ state, overLimit }: KanbanTemplateProps): import("react").JSX.Element;
//# sourceMappingURL=KanbanBoard.d.ts.map