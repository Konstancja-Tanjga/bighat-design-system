import { render, screen, waitFor } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Skeleton, SkeletonGroup } from './Skeleton';

describe('SkeletonGroup', () => {
  it('announces its label once, with every bone hidden', async () => {
    render(
      <SkeletonGroup label="Loading invoices">
        <Skeleton />
        <Skeleton />
      </SkeletonGroup>,
    );
    const region = screen.getByRole('status');
    await waitFor(() => expect(region).toHaveTextContent('Loading invoices'));
    expect(region).not.toHaveAttribute('aria-busy');
    expect(region.querySelectorAll('.bh-skeleton[aria-hidden="true"]')).toHaveLength(2);
  });

  it('draws the bones at once but lets the label arrive as a change', () => {
    const first = renderToStaticMarkup(
      <SkeletonGroup label="Loading invoices">
        <Skeleton />
      </SkeletonGroup>,
    );
    expect(first).toContain('bh-skeleton');
    expect(first).not.toContain('Loading invoices');
  });
});
