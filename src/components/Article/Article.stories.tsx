import type { Meta, StoryObj } from '@storybook/react-vite';

import { Article, ArticleMargin } from './Article';

/**
 * A long read laid out by its own width: text, margin and table of contents
 * when wide; text and margin when medium; one column when narrow.
 */
const meta = {
  title: 'Components/Article',
  component: Article,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=66-68',
    },
    layout: 'padded',
  },
} satisfies Meta<typeof Article>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = (
  <div style={{ lineHeight: 'var(--bh-text-leading-normal)' }}>
    <h2 id="dwa-dolki">Dwa dołki w siatkówce</h2>
    <p>
      Wiele ptaków drapieżnych polujących za dnia ma w siatkówce dwa dołki: centralny, patrzący w
      bok, i skroniowy, patrzący przed siebie.
    </p>
    <ArticleMargin>
      <p style={{ margin: 0, color: 'var(--bh-text-secondary)' }}>
        Pustułka w zawisie. Fot. J. Kowalski · CC BY-SA 4.0
      </p>
    </ArticleMargin>
    <p>
      Dołek centralny służy do wypatrywania z daleka, skroniowy do oceny odległości w ostatniej
      fazie ataku.
    </p>
    <h2 id="ostrosc">Ostrość, czyli ile widzi</h2>
    <p>Ostrość wzroku zależy od tego, jak gęsto upakowane są czopki.</p>
  </div>
);

/** With a table of contents and a margin note: the lesson shape. */
export const Default: Story = {
  args: {
    title: 'Wzrok',
    meta: 'Lekcja 1 z 5 · około 12 minut',
    lead: 'Jak widzi ptak, który poluje z wysokości.',
    toc: [
      { id: 'dwa-dolki', label: 'Dwa dołki w siatkówce' },
      { id: 'ostrosc', label: 'Ostrość, czyli ile widzi' },
    ],
    tocLabel: 'W tej lekcji',
    children: body,
  },
};

/** A short article needs no table of contents; the margin still works. */
export const WithoutContents: Story = {
  args: { title: 'Wzrok', meta: 'Lekcja 1 z 5', children: body },
};
