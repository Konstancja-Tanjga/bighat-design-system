/**
 * Layer 2 — semantic tokens.
 *
 * Every token here names a *role*, never an appearance. `text.muted` survives
 * a rebrand; `text.grey500` does not. This is the only colour API a component
 * is allowed to touch.
 *
 * Adding a token that renders text or a control boundary means adding a line
 * to `contrastPairs` below. That list is not documentation — `contrast.test.ts`
 * iterates it and fails the build, so an undeclared pair is a review comment,
 * not a production bug.
 */
export type ThemeName = 'light' | 'dark';
export type SemanticColors = {
    surface: {
        base: string;
        sunken: string;
        raised: string;
        overlay: string;
        inverse: string;
    };
    text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
        onAccent: string;
        link: string;
    };
    border: {
        /** Decorative only — dividers, table rules. Not held to 3:1 by design. */
        subtle: string;
        /** Boundary of an interactive control. Held to 3:1. */
        strong: string;
        focus: string;
    };
    action: {
        primary: {
            bg: string;
            bgHover: string;
            bgActive: string;
            fg: string;
        };
        secondary: {
            bg: string;
            bgHover: string;
            fg: string;
            border: string;
        };
        critical: {
            bg: string;
            bgHover: string;
            fg: string;
        };
    };
    status: {
        info: {
            bg: string;
            fg: string;
            border: string;
        };
        success: {
            bg: string;
            fg: string;
            border: string;
        };
        warning: {
            bg: string;
            fg: string;
            border: string;
        };
        critical: {
            bg: string;
            fg: string;
            border: string;
        };
    };
    /**
     * Chrome that floats over media — a close button on a photograph, a caption
     * over a still, a page indicator on a slide.
     *
     * This is the one group not defined against a `surface`, and it is the
     * exception that proves the rule rather than breaking it. Everything else
     * here is a foreground on a known background, which is what lets
     * `contrast.test.ts` check the pair. A glyph sitting on an image has no
     * known background: the image is whatever the author uploaded, and no test
     * can say anything about it.
     *
     * So the rule is not a value, it is a constraint:
     *
     *   **Chrome over media brings its own background.**
     *
     * A control here is never a translucent foreground alone. It carries `bg`
     * with it — opaque enough to be the background in its own right — and then
     * the pair `fg` on `bg` is knowable again and is tested below like any
     * other. `scrim` is the same idea applied to a whole surface rather than
     * one control.
     *
     * The values do not change between themes. A photograph is not lighter in
     * light mode, so chrome over it must not be either.
     */
    onMedia: {
        /** Text and glyphs, on `onMedia.bg`. Never straight on the image. */
        fg: string;
        /** The control's own background. Opaque enough to be tested against. */
        bg: string;
        /** Hover and active, so the control is not the only thing that moves. */
        bgHover: string;
        /** A hairline, for a control that needs an edge against a light image. */
        border: string;
    };
    /** A full-surface dim, for the ground behind an overlay. */
    scrim: string;
    /** A translucent, blurred surface — a sheet over a page or an image. */
    material: string;
};
export declare const themes: Record<ThemeName, SemanticColors>;
/** Non-colour semantics. Same idea: a role, not a measurement. */
export declare const size: {
    readonly control: {
        readonly sm: "28px";
        readonly md: "36px";
        readonly lg: "44px";
    };
    /**
     * Type sizes by role, so a component can switch density without every
     * stylesheet hard-coding px. `body` is the default reading size in a
     * dense application; `dense` is the same role one step tighter.
     */
    readonly textSize: {
        readonly caption: "14px";
        readonly body: "13px";
        readonly dense: "11px";
        readonly label: "11px";
    };
    readonly textLeading: {
        readonly tight: "1.25";
        readonly normal: "1.5";
    };
    /** Emitted for documentation and JS; queries use the literals. */
    readonly breakpoint: {
        readonly sm: "480px";
        readonly md: "900px";
        readonly lg: "1200px";
    };
    readonly gap: {
        readonly tight: "4px";
        readonly snug: "8px";
        readonly normal: "12px";
        readonly loose: "16px";
    };
    readonly padding: {
        readonly inline: "12px";
        readonly block: "8px";
        readonly section: "24px";
    };
    readonly radius: {
        readonly control: "6px";
        readonly surface: "10px";
        readonly pill: "9999px";
    };
    readonly elevation: {
        readonly raised: "0 1px 2px rgba(20, 24, 28, 0.08)";
        readonly overlay: "0 4px 12px rgba(20, 24, 28, 0.12)";
        readonly modal: "0 12px 32px rgba(20, 24, 28, 0.18)";
    };
};
/**
 * Every foreground/background relationship the system promises to keep legible.
 *
 * `requirement` maps to the WCAG rule that actually applies, which is not
 * always 4.5:1 — a focus ring is non-text (3:1), a heading may be large text.
 * Getting this distinction wrong in either direction is a real failure: too
 * lax ships unreadable UI, too strict forces a washed-out palette nobody wants.
 */
export type ContrastPair = {
    name: string;
    fg: (t: SemanticColors) => string;
    bg: (t: SemanticColors) => string;
    requirement: 'bodyText' | 'largeText' | 'nonText';
};
export declare const contrastPairs: ContrastPair[];
//# sourceMappingURL=semantic.d.ts.map