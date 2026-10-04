// url=https://www.figma.com/design/xIbIzmUNRZ3gyONsVn9jle/BigHat-Design-System?node-id=66-68
// source=src/components/Article/Article.tsx
// component=Article
import figma from 'figma';

// The layout is the container's width, not a prop: wide shows the margin and the contents.
export default {
  example: figma.code`<Article
  eyebrow="Guides · Billing"
  title="How dunning works"
  meta="6 min read · Updated 2 July 2026"
  lead="Overdue invoices get three reminders, a week apart."
  toc={[
    { id: 'what', label: 'What dunning is' },
    { id: 'how', label: 'How a reminder is sent' },
  ]}
  tocLabel="In this article"
  footer={footer}
>
  <h2 id="what">What dunning is</h2>
  <p>…</p>
  <ArticleMargin>A matched payment stops every reminder still queued.</ArticleMargin>
</Article>`,
  imports: ['import { Article, ArticleMargin } from "@bighat/ui"'],
  id: 'article',
  metadata: { nestable: false },
};
