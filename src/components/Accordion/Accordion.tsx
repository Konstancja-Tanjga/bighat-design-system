import { createContext, useContext, useId, useState, type ReactNode } from 'react';

import './Accordion.css';

/**
 * Disclosure, not navigation.
 *
 * The header is a real `<button>` inside a heading, so the content is
 * reachable by keyboard, announced as expanded or collapsed, and listed by a
 * screen reader's heading rotor. A `<div onClick>` with a chevron looks the
 * same and does none of that.
 *
 * The panel stays in the DOM but is `hidden` when collapsed — find-in-page
 * finds nothing inside a closed panel, which is the same promise the platform
 * makes for `<details>`.
 */
type AccordionContextValue = {
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  headingLevel: 2 | 3 | 4 | 5 | 6;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

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

export function Accordion({
  multiple = false,
  defaultOpen = [],
  headingLevel = 3,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const value: AccordionContextValue = {
    isOpen: (id) => open.includes(id),
    toggle: (id) =>
      setOpen((current) => {
        if (current.includes(id)) return current.filter((entry) => entry !== id);
        return multiple ? [...current, id] : [id];
      }),
    headingLevel,
  };

  return (
    <div className="bh-accordion">
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
}

export type AccordionItemProps = {
  /** Stable identity for the open/closed state. */
  id?: string;
  title: ReactNode;
  /** Short count or status shown next to the title. Never the only cue. */
  meta?: ReactNode;
  children: ReactNode;
};

export function AccordionItem({ id, title, meta, children }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be rendered inside an Accordion');

  const generatedId = useId();
  const itemId = id ?? generatedId;
  const panelId = `${itemId}-panel`;
  const buttonId = `${itemId}-button`;
  const expanded = context.isOpen(itemId);
  const Heading = `h${context.headingLevel}` as 'h3';

  return (
    <div className="bh-accordion__item">
      <Heading className="bh-accordion__heading">
        <button
          type="button"
          id={buttonId}
          className="bh-accordion__trigger bh-focusable"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => context.toggle(itemId)}
        >
          <span className="bh-accordion__chevron" aria-hidden="true" data-open={expanded} />
          <span className="bh-accordion__title">{title}</span>
          {meta && <span className="bh-accordion__meta">{meta}</span>}
        </button>
      </Heading>

      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!expanded}>
        <div className="bh-accordion__panel">{children}</div>
      </div>
    </div>
  );
}
