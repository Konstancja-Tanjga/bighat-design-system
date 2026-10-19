// url=https://www.figma.com/design/OnPxkRmbGavyxKaygQrCRR/Big-Hat-Design-System?node-id=32-3041
// source=src/components/Article/Article.tsx
// component=Article
import figma from 'figma';
const instance = figma.selectedInstance;

const title = instance.getString('Title');
const eyebrow = instance.getString('Eyebrow');
const meta = instance.getString('Meta');
const lead = instance.getString('Lead');
const toc = instance.getBoolean('ToC', {
  true: `
  toc={[
    { id: 'what', label: 'What dunning is' },
    { id: 'how', label: 'How a reminder is sent' },
  ]}
  tocLabel="In this article"`,
  false: '',
});
const footer = instance.getBoolean('Footer', { true: '\n  footer={footer}', false: '' });

// Article has no layout prop: the margin and the contents column appear when the
// container is wide enough.
export default {
  example: figma.code`<Article
  eyebrow="${eyebrow}"
  title="${title}"
  meta="${meta}"
  lead="${lead}"${toc}${footer}
>
  <h2 id="what">What dunning is</h2>
  <p>…</p>
  <ArticleMargin>A matched payment stops every reminder still queued.</ArticleMargin>
</Article>`,
  imports: ['import { Article, ArticleMargin } from "@bighat/ui"'],
  id: 'article',
  metadata: { nestable: false },
};
