import './Pagination.css';
/**
 * Paging over a set that is too large to render.
 *
 * Controlled, for the same reason `Table`'s sort is controlled: the day the
 * data outgrows one response the paging moves to the server, and a component
 * that owned the page number locally has to be rewritten. Owning it from the
 * start means the same component serves both.
 *
 * It reports a range and a total rather than a page count, because "showing
 * 21–40 of 312" is a fact about the data and "page 2 of 16" is a fact about
 * the component.
 */
export type PaginationProps = {
    /** Zero-based, so it indexes the data without arithmetic at the call site. */
    page: number;
    pageSize: number;
    /** Rows in the whole set, not on this page. `undefined` while unknown. */
    total?: number;
    onPageChange: (page: number) => void;
    /** Omit to hide the page-size control entirely. */
    pageSizeOptions?: number[];
    onPageSizeChange?: (pageSize: number) => void;
    /** What is being counted: "invoices", "documents". Used in the summary. */
    unit?: string;
    /** Disables both controls while a request is in flight. */
    busy?: boolean;
};
export declare function Pagination({ page, pageSize, total, onPageChange, pageSizeOptions, onPageSizeChange, unit, busy, }: PaginationProps): import("react").JSX.Element;
//# sourceMappingURL=Pagination.d.ts.map