import { useState } from 'react';

import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Badge, type BadgeTone } from '../components/Badge/Badge';
import { Board, BoardCard, BoardColumn } from '../components/Board/Board';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { NavRail } from '../components/NavRail/NavRail';
import { Select } from '../components/Select/Select';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Skeleton, SkeletonGroup } from '../components/Skeleton/Skeleton';
import { StateBlock } from '../components/StateBlock/StateBlock';
import { IconDoc, IconFlow, IconGrid, IconHome, IconInbox, IconStar } from './icons';
import './KanbanBoard.css';

/**
 * Template — document management board.
 *
 * A kanban view of documents moving through classification, review and
 * approval. The interesting part is not the layout; it is that moving a card
 * does not require a mouse.
 */

type ColumnId = 'inbox' | 'classifying' | 'review' | 'approved' | 'archived';

type Doc = {
  id: string;
  title: string;
  meta: string;
  column: ColumnId;
  tone: BadgeTone;
  status: string;
};

const COLUMNS: Array<{ id: ColumnId; title: string; limit?: number }> = [
  { id: 'inbox', title: 'Inbox' },
  { id: 'classifying', title: 'Classifying', limit: 3 },
  { id: 'review', title: 'In review', limit: 4 },
  { id: 'approved', title: 'Approved' },
  { id: 'archived', title: 'Archived' },
];

const INITIAL: Doc[] = [
  {
    id: 'd1',
    title: 'Master services agreement — Northwind',
    meta: 'PDF · 2.4 MB · uploaded 10:12',
    column: 'inbox',
    tone: 'neutral',
    status: 'Unclassified',
  },
  {
    id: 'd2',
    title: 'Invoice INV-2041',
    meta: 'PDF · 180 KB · uploaded 09:48',
    column: 'inbox',
    tone: 'neutral',
    status: 'Unclassified',
  },
  {
    id: 'd3',
    title: 'NDA — Fabrikam Energy',
    meta: 'DOCX · 96 KB · uploaded yesterday',
    column: 'classifying',
    tone: 'info',
    status: 'Auto-classifying',
  },
  {
    id: 'd4',
    title: 'Q3 audit letter',
    meta: 'PDF · 1.1 MB · uploaded yesterday',
    column: 'classifying',
    tone: 'warning',
    status: 'Low confidence',
  },
  {
    id: 'd5',
    title: 'Supplier contract — Tailspin',
    meta: 'PDF · 3.8 MB · 2 days ago',
    column: 'review',
    tone: 'warning',
    status: 'Needs review',
  },
  {
    id: 'd6',
    title: 'Data processing addendum',
    meta: 'PDF · 420 KB · 2 days ago',
    column: 'review',
    tone: 'critical',
    status: 'Missing signature',
  },
  {
    id: 'd7',
    title: 'Framework agreement — Contoso',
    meta: 'PDF · 2.0 MB · last week',
    column: 'approved',
    tone: 'success',
    status: 'Approved',
  },
  {
    id: 'd8',
    title: 'Insurance certificate 2025',
    meta: 'PDF · 640 KB · last month',
    column: 'archived',
    tone: 'neutral',
    status: 'Archived',
  },
];

export type KanbanTemplateProps = {
  state?: 'ready' | 'loading' | 'error';
  /** Demonstrates the work-in-progress limit being exceeded. */
  overLimit?: boolean;
};

export function KanbanTemplate({ state = 'ready', overLimit = false }: KanbanTemplateProps) {
  const [docs, setDocs] = useState<Doc[]>(
    overLimit
      ? INITIAL.map((doc) => (doc.column === 'inbox' ? { ...doc, column: 'classifying' } : doc))
      : INITIAL,
  );
  const [announcement, setAnnouncement] = useState('');
  const [activeRail, setActiveRail] = useState('documents');

  const move = (docId: string, targetId: string) => {
    const doc = docs.find((d) => d.id === docId);
    const target = COLUMNS.find((c) => c.id === targetId);
    if (!doc || !target) return;

    setDocs((current) => current.map((d) => (d.id === docId ? { ...d, column: target.id } : d)));
    // Announced by the board's live region. Without this the card simply
    // vanishes from where the keyboard user was standing.
    setAnnouncement(`${doc.title} moved to ${target.title}.`);
  };

  return (
    <AppShell
      header={
        <>
          <SkipLink />
          <AppBar
            brand={
              <>
                <span className="bh-kanban__logo" aria-hidden="true">
                  bh<sup>◆</sup>
                </span>
                <span className="bh-visually-hidden">Big Hat Poland</span>
              </>
            }
            title="Document Manager"
            actions={
              <>
                <Button variant="secondary" size="sm">
                  Import
                </Button>
                <Button size="sm">Upload</Button>
              </>
            }
          />
        </>
      }
      rail={
        <NavRail
          items={[
            { id: 'home', label: 'Home', icon: <IconHome /> },
            { id: 'documents', label: 'Documents', icon: <IconGrid /> },
            { id: 'workflows', label: 'Workflows', icon: <IconFlow /> },
            { id: 'starred', label: 'Starred', icon: <IconStar /> },
          ]}
          footerItems={[{ id: 'inbox', label: 'Inbox', icon: <IconInbox />, badge: true }]}
          activeId={activeRail}
          onSelect={setActiveRail}
          ariaLabel="Product areas"
        />
      }
      sidebar={
        <SidePanel
          ariaLabel="Filters"
          title="Filters"
          width={248}
          header={<Input label="Search documents" hideLabel placeholder="Search documents" />}
        >
          <div className="bh-kanban__filters">
            <Select
              label="Document type"
              placeholder="All types"
              defaultValue=""
              options={[
                { value: 'contract', label: 'Contract' },
                { value: 'invoice', label: 'Invoice' },
                { value: 'certificate', label: 'Certificate' },
              ]}
            />
            <Select
              label="Owner"
              placeholder="Anyone"
              defaultValue=""
              options={[
                { value: 'me', label: 'Me' },
                { value: 'legal', label: 'Legal team' },
                { value: 'finance', label: 'Finance team' },
              ]}
            />
            <Select
              label="Uploaded"
              defaultValue="30"
              options={[
                { value: '7', label: 'Last 7 days' },
                { value: '30', label: 'Last 30 days' },
                { value: 'all', label: 'Any time' },
              ]}
            />
          </div>
        </SidePanel>
      }
    >
      <div className="bh-kanban">
        <header className="bh-kanban__head">
          <h2 className="bh-kanban__title">All documents</h2>
          <p className="bh-kanban__subtitle">
            {docs.length} documents · classification runs automatically on upload
          </p>
        </header>

        {state === 'loading' && (
          <SkeletonGroup label="Loading documents" className="bh-kanban__skeleton">
            {COLUMNS.slice(0, 4).map((column) => (
              <div key={column.id} className="bh-kanban__skeleton-column">
                <Skeleton width="45%" height={13} />
                {[0, 1, 2].map((row) => (
                  <div key={row} className="bh-kanban__skeleton-card">
                    <Skeleton width="85%" height={13} />
                    <Skeleton width="60%" height={11} />
                    <Skeleton width={72} height={18} radius="pill" />
                  </div>
                ))}
              </div>
            ))}
          </SkeletonGroup>
        )}

        {state === 'error' && (
          <StateBlock
            state="error"
            density="page"
            title="We could not load your documents"
            description="The document service did not respond. Nothing has been uploaded, moved or deleted."
            action={<Button size="sm">Try again</Button>}
            diagnostics="correlation-id: 4c81de20-9a3f-4d02-b6ab-71f0a2c5e918 · HTTP 503"
          />
        )}

        {state === 'ready' && (
          <Board ariaLabel="Documents by stage" announcement={announcement}>
            {COLUMNS.map((column) => {
              const items = docs.filter((doc) => doc.column === column.id);
              return (
                <BoardColumn
                  key={column.id}
                  title={column.title}
                  count={items.length}
                  limit={column.limit}
                  empty={
                    <StateBlock
                      density="inline"
                      state="empty"
                      title="Nothing here"
                      description={
                        column.id === 'inbox'
                          ? 'Uploaded documents land here first.'
                          : 'Move a document in to get started.'
                      }
                    />
                  }
                >
                  {items.map((doc) => (
                    <BoardCard
                      key={doc.id}
                      title={doc.title}
                      onOpen={() => {}}
                      moveTargets={COLUMNS.filter((c) => c.id !== column.id).map((c) => ({
                        id: c.id,
                        label: c.title,
                      }))}
                      onMove={(targetId) => move(doc.id, targetId)}
                    >
                      <span className="bh-kanban__card-title">
                        <span className="bh-kanban__card-icon" aria-hidden="true">
                          <IconDoc />
                        </span>
                        {doc.title}
                      </span>
                      <span className="bh-kanban__card-meta">{doc.meta}</span>
                      <span className="bh-kanban__card-status">
                        <Badge tone={doc.tone}>{doc.status}</Badge>
                      </span>
                    </BoardCard>
                  ))}
                </BoardColumn>
              );
            })}
          </Board>
        )}
      </div>
    </AppShell>
  );
}
