/**
 * Layer 1 — primitives.
 *
 * Raw values with no meaning attached. A primitive says "this is the colour
 * #3563e9", never "this is what a primary button looks like".
 *
 * Components must not import from this file. The lint rule in
 * `eslint.config.js` enforces that; the reason is in `docs/architecture.mdx`.
 */
export declare const color: {
    readonly neutral: {
        readonly 0: "#ffffff";
        readonly 50: "#f7f8f9";
        readonly 100: "#eef0f2";
        readonly 200: "#dfe3e7";
        readonly 300: "#c5ccd3";
        readonly 400: "#9aa4af";
        readonly 500: "#6b7683";
        readonly 600: "#59636f";
        readonly 700: "#39414a";
        readonly 800: "#252b32";
        readonly 900: "#14181c";
    };
    readonly blue: {
        readonly 50: "#eef4ff";
        readonly 100: "#dbe6ff";
        readonly 200: "#bcd0ff";
        readonly 300: "#8fb0ff";
        readonly 400: "#5b87fb";
        readonly 500: "#3563e9";
        readonly 600: "#2148c9";
        readonly 700: "#1a39a1";
        readonly 800: "#17307f";
        readonly 900: "#152a66";
    };
    readonly red: {
        readonly 50: "#fef2f2";
        readonly 100: "#fee2e2";
        readonly 200: "#fecaca";
        readonly 300: "#fca5a5";
        readonly 400: "#f87171";
        readonly 500: "#d93a3f";
        readonly 600: "#c02a2f";
        readonly 700: "#a31f24";
        readonly 800: "#851d21";
        readonly 900: "#6f1c1f";
    };
    readonly amber: {
        readonly 50: "#fffbeb";
        readonly 100: "#fef3c7";
        readonly 200: "#fde68a";
        readonly 300: "#fcd34d";
        readonly 400: "#fbbf24";
        readonly 500: "#b26a02";
        readonly 600: "#95580a";
        readonly 700: "#7c4a10";
        readonly 800: "#653d10";
        readonly 900: "#523211";
    };
    readonly green: {
        readonly 50: "#ecfdf5";
        readonly 100: "#d1fae5";
        readonly 200: "#a7f3d0";
        readonly 300: "#6ee7b7";
        readonly 400: "#34d399";
        readonly 500: "#0a7f55";
        readonly 600: "#0a6b48";
        readonly 700: "#0a573b";
        readonly 800: "#0b4732";
        readonly 900: "#0a3a29";
    };
};
/** 4px base. Components may only use steps from this scale. */
export declare const space: {
    readonly 0: "0";
    readonly 1: "4px";
    readonly 2: "8px";
    readonly 3: "12px";
    readonly 4: "16px";
    readonly 5: "20px";
    readonly 6: "24px";
    readonly 8: "32px";
    readonly 10: "40px";
    readonly 12: "48px";
    readonly 16: "64px";
};
export declare const radius: {
    readonly none: "0";
    readonly sm: "3px";
    readonly md: "6px";
    readonly lg: "10px";
    /** A sheet or a viewer, where the corner is part of the form. */
    readonly xl: "20px";
    readonly full: "9999px";
};
export declare const fontSize: {
    readonly xs: "11px";
    readonly sm: "13px";
    readonly md: "14px";
    readonly lg: "16px";
    readonly xl: "20px";
    readonly '2xl': "26px";
};
export declare const fontWeight: {
    readonly regular: "400";
    readonly medium: "500";
    readonly semibold: "600";
};
export declare const lineHeight: {
    readonly tight: "1.25";
    readonly normal: "1.5";
};
export declare const shadow: {
    readonly sm: "0 1px 2px rgba(20, 24, 28, 0.08)";
    readonly md: "0 4px 12px rgba(20, 24, 28, 0.12)";
    readonly lg: "0 12px 32px rgba(20, 24, 28, 0.18)";
};
/**
 * Container widths, not viewport widths.
 *
 * A component responds to the space it was given: the same table sits in
 * `main` at 1200px, in a `SidePanel` at 432px and inside a `Card` at 280px,
 * on one screen. A viewport query gets two of those three wrong, so these
 * feed `@container` queries.
 *
 * CSS cannot read a custom property inside a container or media query, so
 * these values appear twice — here, and as literals in component CSS.
 * `breakpoints.test.ts` reads the stylesheets and fails the build if the
 * two ever disagree.
 */
export declare const breakpoint: {
    /** Below this a table stops being a grid. */
    readonly sm: "480px";
    /** Below this a shell hides its rail and panels. */
    readonly md: "900px";
    readonly lg: "1200px";
};
export declare const duration: {
    readonly instant: "80ms";
    readonly fast: "140ms";
    readonly normal: "220ms";
};
//# sourceMappingURL=primitives.d.ts.map