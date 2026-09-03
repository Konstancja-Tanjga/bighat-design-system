/**
 * The four axes a component is allowed to vary along, and nothing else.
 *
 * 3.2.0 had `tone` carrying three different unions (Badge and Toast took five
 * values, Button and Menu took two, Progress took a third set), `size` declared
 * inline in three components and as a named type in two, and `density` meaning
 * `comfortable | compact` in Table but `inline | section | page` in StateBlock.
 * None of that was wrong in any single file. It was wrong across files, which
 * is the only place a design system can be wrong.
 *
 * The rule, in one line each:
 *
 *   variant   how much visual weight this carries
 *   tone      what it means, or what happens if you press it
 *   size      the control's own dimension
 *   density   how much room the container gives its contents
 *
 * A component narrows an axis with `Extract`, never by declaring a fresh union.
 * That way `Extract<Tone, 'critical'>` is provably a subset of the system's
 * tone scale, and adding a sixth tone is one edit rather than a search.
 *
 * A fifth axis does not get added because a component needs one. It gets added
 * when three do, with the argument written in DS-GAPS.md.
 */

/**
 * What a thing means. Maps 1:1 onto the `status.*` and `action.*` token groups,
 * which is the test for whether a value belongs here: if it cannot be rendered
 * from the token layer, it is not a tone.
 */
export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'critical';

/**
 * How much visual weight. Independent of `tone` on purpose — `variant="danger"`
 * conflated the two, was deprecated in 2.0 and removed in 3.0, and the pair of
 * axes is the shape that replaced it.
 */
export type Variant = 'primary' | 'secondary' | 'ghost';

/** Control dimension. Resolves to `control.sm | md | lg` in the token layer. */
export type Size = 'sm' | 'md' | 'lg';

/** How much room a container gives its rows. Not a size: the control inside keeps its own. */
export type Density = 'comfortable' | 'compact';

/**
 * How much of the viewport a block of content occupies. This is what StateBlock
 * called `density` in 3.x, and renaming it is the only breaking change in the
 * vocabulary that is not a widening.
 */
export type Scope = 'inline' | 'section' | 'page';

/* ── per-component narrowings ─────────────────────────────────────────────────
 *
 * Declared here rather than in each component file, so that the whole surface
 * of the system's variance is readable in one screen — and so that a reviewer
 * can see that Menu and Button agree about what `critical` means.
 */

/** Button: neutral is the default action, critical destroys something. */
export type ButtonTone = Extract<Tone, 'neutral' | 'critical'>;
export type ButtonVariant = Variant;
export type ButtonSize = Size;

/** Badge and Toast carry the full scale: their whole job is to say which. */
export type BadgeTone = Tone;
export type ToastTone = Extract<Tone, 'info' | 'success' | 'warning' | 'critical'>;

/** Menu items destroy or they do not. */
export type MenuItemTone = Extract<Tone, 'neutral' | 'critical'>;

/** Progress: success on completion, critical on failure. */
export type ProgressTone = Extract<Tone, 'neutral' | 'success' | 'critical'>;
export type ProgressSize = Extract<Size, 'sm' | 'md'>;

export type SegmentedControlSize = Extract<Size, 'sm' | 'md'>;
export type DialogSize = Size;
export type AvatarSize = Size;

export type TableDensity = Density;
export type DescriptionListDensity = Density;
export type StateBlockScope = Scope;

/* ── native attribute policy ─────────────────────────────────────────────────
 *
 * 3.2.0 had 7 of 41 components extending their native element's attributes and
 * forwarding a ref; the other 34 were closed, so `<Badge>` could not take an
 * `id`, a `data-testid`, or an `aria-describedby`. That was not a decision, it
 * was 34 omissions, and consumers hit it one component at a time.
 *
 * The policy:
 *
 *   Leaf   renders exactly one element the consumer can reasonably target.
 *          Extends that element's attributes via `LeafProps`, omits `className`
 *          and `style`, forwards a ref to it.
 *
 *   Composite  renders a tree with no single "the" element. Exposes named props
 *              only. No ref, no passthrough — a ref to a composite is a ref to
 *              an implementation detail, and it is how consumers end up styling
 *              internals that then cannot change.
 *
 * `className` stays omitted in both cases. That is the load-bearing part: an
 * escape hatch on a design system component is a design system with no rules,
 * because the first deadline turns it into a second styling layer nobody owns.
 * When a component cannot express something, the answer is a prop or an entry
 * in DS-GAPS.md.
 */

/**
 * Props for a leaf component: everything the native element accepts, minus the
 * two escape hatches, plus the component's own axes.
 *
 * ```ts
 * export type ButtonProps = LeafProps<'button'> & {
 *   variant?: ButtonVariant;
 *   tone?: ButtonTone;
 * };
 * ```
 */
export type LeafProps<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.JSX.IntrinsicElements[T],
  'className' | 'style' | 'ref'
>;

/** Marker for the doc generator and the parity check: this component is closed. */
export type CompositeProps<P> = P & { className?: never; style?: never };
