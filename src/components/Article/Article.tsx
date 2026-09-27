import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';

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
 * - narrow: one column, and every margin note returns to the text, just
 *   above the paragraph it belongs to.
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

function useActiveHeading(ids: string[], articleRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    if (ids.length === 0) {
      setActive(undefined);
      return;
    }
    // The current section is the last heading at or above a line a third of
    // the way down the viewport - recomputed from every heading on each
    // scroll, so scrolling up is tracked as well as down. At the end of the
    // article the last section wins even if its heading cannot reach the line.
    const compute = () => {
      const article = articleRef.current;
      const box = article?.getBoundingClientRect();
      // Not laid out (a test environment, a hidden tab): the first section.
      if (!box || box.height === 0) return ids[0];
      if (box.bottom <= window.innerHeight + 1) return ids[ids.length - 1];
      const line = window.innerHeight / 3;
      let current = ids[0];
      for (const id of ids) {
        const heading = document.getElementById(id);
        if (heading && heading.getBoundingClientRect().top <= line) current = id;
      }
      return current;
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(compute()));
    };
    setActive(compute());
    // Capture, because the scroll container is whatever the product put the
    // article in - AppShell's main, or the window.
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
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
  const articleRef = useRef<HTMLElement>(null);
  const active = useActiveHeading(toc?.map((item) => item.id) ?? [], articleRef);
  const hasToc = toc !== undefined && toc.length > 0;

  return (
    <article className="bh-article" aria-labelledby={titleId} ref={articleRef}>
      <div
        className={`bh-article__grid${hasToc ? ' bh-article__grid--toc' : ''}${footer ? ' bh-article__grid--footer' : ''}`}
      >
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
