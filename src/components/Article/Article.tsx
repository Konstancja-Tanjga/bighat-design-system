import { useEffect, useId, useState, type ReactNode } from 'react';

/**
 * A long read: one column of text at a reading measure, a margin beside it
 * for figures and asides, and a table of contents.
 *
 * The layout is decided by the article's own width, not the window's - an
 * article inside AppShell has a sidebar taking part of the screen - and it
 * has three shapes:
 *
 * - wide: text | margin | table of contents, which stays in view while the
 *   reader scrolls;
 * - medium: text | margin, and the table of contents folds into a disclosure
 *   under the header, because a sticky list would sit on top of the margin
 *   notes that share its column;
 * - narrow: one column, and every margin note returns to the text after the
 *   paragraph it belongs to.
 *
 * It lays out; it does not style the text inside it. Headings, lists and
 * tables in the body are the product's, because long-form typography is a
 * product decision (see the 4.x gap review), and the ids the table of contents
 * links to are the product's too.
 */
export type ArticleTocItem = {
  /** The id of the heading in the body this entry jumps to. */
  id: string;
  label: string;
};

export type ArticleProps = {
  title: ReactNode;
  /** Above the title: breadcrumbs, or where this article sits in a sequence. */
  eyebrow?: ReactNode;
  /** Under the title: position in a sequence, reading time. */
  meta?: ReactNode;
  /** One or two sentences under the meta line. */
  lead?: ReactNode;
  /** Headings in the body, in order. Omit for an article too short to need one. */
  toc?: ArticleTocItem[];
  /** Names the table of contents' landmark and its heading. */
  tocLabel?: string;
  children: ReactNode;
  /** After the body: what to do next - a completion control, the next article. */
  footer?: ReactNode;
};

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || ids.length === 0) return;
    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    // The active section is the last heading that has scrolled past the top
    // third of the viewport, so a short section is not skipped over.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -66% 0px' },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function TocList({ items, active }: { items: ArticleTocItem[]; active?: string }) {
  return (
    <ol className="bh-article__toc-list">
      {items.map((item) => (
        <li key={item.id}>
          <a
            className="bh-article__toc-link bh-focusable"
            href={`#${item.id}`}
            aria-current={item.id === active ? 'location' : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function Article({
  title,
  eyebrow,
  meta,
  lead,
  toc,
  tocLabel = 'On this page',
  children,
  footer,
}: ArticleProps) {
  const titleId = useId();
  const active = useActiveHeading(toc?.map((item) => item.id) ?? []);
  const hasToc = toc !== undefined && toc.length > 0;

  return (
    <article className="bh-article" aria-labelledby={titleId}>
      <div className={`bh-article__grid${hasToc ? ' bh-article__grid--toc' : ''}`}>
        <header className="bh-article__header">
          {eyebrow && <div className="bh-article__eyebrow">{eyebrow}</div>}
          <h1 className="bh-article__title" id={titleId}>
            {title}
          </h1>
          {meta && <p className="bh-article__meta">{meta}</p>}
          {lead && <p className="bh-article__lead">{lead}</p>}
          {hasToc && (
            // The folded table of contents, for widths where the rail cannot
            // hold it. Hidden by CSS when the rail can.
            <nav className="bh-article__toc-fold" aria-label={tocLabel}>
              <details>
                <summary className="bh-article__toc-summary bh-focusable">{tocLabel}</summary>
                <TocList items={toc} active={active} />
              </details>
            </nav>
          )}
        </header>

        <div className="bh-article__body">{children}</div>

        {hasToc && (
          <nav className="bh-article__toc" aria-label={tocLabel}>
            <p className="bh-article__toc-title" aria-hidden="true">
              {tocLabel}
            </p>
            <TocList items={toc} active={active} />
          </nav>
        )}

        {footer && <footer className="bh-article__footer">{footer}</footer>}
      </div>
    </article>
  );
}

export type ArticleMarginProps = {
  children: ReactNode;
};

/**
 * Content that belongs beside a paragraph rather than in its way: a photo with
 * its credit, a side fact, a definition. Place it right before the paragraph
 * it goes with. Where the article is wide enough it floats into the margin
 * level with the top of that paragraph; where it is not, it stays in the text,
 * just above it - the way a figure sits above the text that discusses it.
 */
export function ArticleMargin({ children }: ArticleMarginProps) {
  // A div, not an aside: an article with six margin notes would otherwise add
  // six "complementary" landmarks to a screen reader's list of regions.
  return <div className="bh-article__margin">{children}</div>;
}
