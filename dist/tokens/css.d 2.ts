import { type SemanticColors } from './semantic';
export declare function toCssVariables(theme: SemanticColors): Array<[string, string]>;
/**
 * Reference a semantic token from component CSS or inline styles.
 * `cssVar('text.muted')` → `var(--bh-text-muted)`.
 */
export declare function cssVar(path: string): string;
/** The full stylesheet: light on `:root`, dark under an explicit attribute
 *  and under `prefers-color-scheme` for users who never touched a toggle. */
export declare function renderStylesheet(): string;
//# sourceMappingURL=css.d.ts.map