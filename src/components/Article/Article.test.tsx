import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Article, ArticleMargin } from './Article';

const toc = [
  { id: 'dwa-dolki', label: 'Dwa dołki' },
  { id: 'ostrosc', label: 'Ostrość' },
];

describe('Article', () => {
  it('is an article landmark named by its title', () => {
    render(
      <Article title="Wzrok" meta="Lekcja 1 z 5 · 12 min">
        <p>Tekst</p>
      </Article>,
    );
    expect(screen.getByRole('article', { name: 'Wzrok' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Wzrok' })).toBeInTheDocument();
  });

  it('links each table of contents entry to its heading, and marks the first as current', () => {
    render(
      <Article title="Wzrok" toc={toc} tocLabel="W tej lekcji">
        <h2 id="dwa-dolki">Dwa dołki</h2>
        <h2 id="ostrosc">Ostrość</h2>
      </Article>,
    );
    // Two copies - the rail and the fold - of which CSS shows one; both are
    // navigation landmarks with the same name.
    const navs = screen.getAllByRole('navigation', { name: 'W tej lekcji' });
    expect(navs).toHaveLength(2);
    const links = within(navs[1]!).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#dwa-dolki', '#ostrosc']);
    expect(links[0]).toHaveAttribute('aria-current', 'location');
    expect(links[1]).not.toHaveAttribute('aria-current');
  });

  it('renders no table of contents when there is none to show', () => {
    render(
      <Article title="Wzrok" toc={[]}>
        <p>Tekst</p>
      </Article>,
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('keeps margin notes out of the landmark list', () => {
    render(
      <Article title="Wzrok">
        <p>Tekst</p>
        <ArticleMargin>Fot. J. Kowalski · CC BY-SA 4.0</ArticleMargin>
      </Article>,
    );
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.getByText('Fot. J. Kowalski · CC BY-SA 4.0')).toHaveClass('bh-article__margin');
  });
});
