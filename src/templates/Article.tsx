import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Article, ArticleMargin } from '../components/Article/Article';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Skeleton, SkeletonGroup } from '../components/Skeleton/Skeleton';
import { StateBlock } from '../components/StateBlock/StateBlock';

/**
 * Template — a lesson in a course, as World of Raptors ships it.
 *
 * The same Article component the product uses, under the product's own
 * theme: World of Raptors overrides the semantic tokens (warm paper, a rust
 * accent, larger reading sizes) and sets its headings and body in serif
 * faces. The theme is scoped to this template's wrapper, so the package's
 * own look is untouched - which is the point it demonstrates: a product
 * re-themes the roles, not the components.
 *
 * - Where in the course: the module and its lessons in a bar under the app
 *   bar, numbered, with the current lesson named and the progress beside it.
 * - Where in the lesson: numbered sections, and the table of contents beside
 *   the text on a wide screen.
 * - Beside the text: photos with their credit, and side notes, in the margin
 *   at the height of the paragraph they belong to.
 * - After the text: mark it done, then the next lesson as the one clear move.
 */

export type ArticleTemplateProps = {
  state?: 'ready' | 'loading' | 'error';
};

const LESSONS = [
  'Co czyni drapieżnika drapieżnikiem',
  'Drzewo rodowe, czyli taksonomia i filogeneza',
  'Rodziny i ich różnorodność na świecie',
  'Drapieżniki Europy i Polski, czyli przegląd grup',
  'Ćwiczenia i projekt',
];

const TOC = [
  { id: 'nie-to-samo', label: 'Drapieżnik to nie to samo co „ptak, który je mięso”' },
  { id: 'cztery-cechy', label: 'Cztery cechy łowcy' },
  { id: 'dodatkowe', label: 'Cechy „dodatkowe”, częste, ale nie obowiązkowe' },
  { id: 'padlinozerca', label: 'Czy padlinożerca jest drapieżnikiem?' },
];

function Photo({
  src,
  alt,
  caption,
  credit,
}: {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}) {
  return (
    <figure className="tpl-article__figure">
      <img className="tpl-article__photo" src={src} alt={alt} loading="lazy" />
      <figcaption className="tpl-article__caption">
        <span className="tpl-article__caption-title">{caption}</span>
        <span>{credit}</span>
      </figcaption>
    </figure>
  );
}

function CourseNav() {
  return (
    <nav className="tpl-article__nav" aria-label="Główna">
      {['Kurs', 'Atlas', 'Fiszki', 'Checklista'].map((label, index) => (
        <a
          key={label}
          className="tpl-article__nav-link bh-focusable"
          href="#"
          aria-current={index === 0 ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

/** The module and its lessons: number, the current one named, progress beside. */
function LessonBar() {
  return (
    <nav className="tpl-article__bar" aria-label="Lekcje modułu A1">
      <a className="tpl-article__bar-module bh-focusable" href="#">
        <span className="tpl-article__bar-id">A1</span>
        <span className="tpl-article__bar-title">Kim są ptaki drapieżne?</span>
      </a>
      <ol className="tpl-article__bar-lessons">
        {LESSONS.map((title, index) => (
          <li key={title}>
            <a
              className="tpl-article__bar-lesson bh-focusable"
              href="#"
              aria-current={index === 0 ? 'page' : undefined}
            >
              <span className="tpl-article__bar-nr" aria-hidden="true">
                {index + 1}
              </span>
              <span className="tpl-article__bar-name">
                <span className="bh-visually-hidden">Lekcja {index + 1}: </span>
                {title}
              </span>
            </a>
          </li>
        ))}
      </ol>
      <p className="tpl-article__bar-state">Ukończone: 0 z 5</p>
    </nav>
  );
}

function LessonBody() {
  return (
    <div className="tpl-article__prose">
      <h2 id="nie-to-samo">Drapieżnik to nie to samo co „ptak, który je mięso”</h2>
      <p>
        Mięso i inne zwierzęta je mnóstwo ptaków: czaple łowią ryby, bociany zjadają żaby, kowaliki
        wyjadają owady, a kruk chętnie pożywi się padliną. Mimo to żadnego z nich nie nazywamy
        ptakiem drapieżnym.
      </p>
      <p>
        W ornitologii „ptaki drapieżne” (ang. <em>raptors</em> albo <em>birds of prey</em>) to
        umowna grupa ptaków, które łączy <strong>zestaw cech naraz</strong>, a nie jedna cecha.
        Najważniejsze są cztery.
      </p>

      <h2 id="cztery-cechy">Cztery cechy łowcy</h2>
      <ArticleMargin>
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Golden_Eagle_at_Grayson_Highlands_State_Park_%286917491073%29.jpg/960px-Golden_Eagle_at_Grayson_Highlands_State_Park_%286917491073%29.jpg"
          alt="Badacz trzyma w dłoni stopy orła przedniego z żółtymi palcami i długimi czarnymi szponami"
          caption="Stopy orła przedniego: grube palce i długie, zakrzywione szpony to główna broń drapieżnika"
          credit="Fot. Virginia State Parks staff, CC BY 2.0, Wikimedia Commons"
        />
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/a/af/Catching_fish_on_the_Camowen_River%2C_Omagh_-_geograph.org.uk_-_127294.jpg"
          alt="Głowa czapli siwej z dużą rybą trzymaną w długim, prostym dziobie"
          caption="Czapla siwa łowi dziobem, nie stopami: tu z pstrągiem w dziobie"
          credit="Fot. Kenneth Allen, CC BY-SA 2.0, Wikimedia Commons"
        />
        <blockquote className="tpl-article__note">
          U podstawy dzioba większości drapieżników jest <strong>woskówka</strong>: miękka, bezpióra
          skórka, w której leżą nozdrza. Ma ją także… papuga.
        </blockquote>
      </ArticleMargin>
      <div
        className="tpl-article__table"
        tabIndex={0}
        role="region"
        aria-label="Cztery cechy łowcy"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Cecha</th>
              <th scope="col">Do czego służy</th>
              <th scope="col">Uwagi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Szpony</strong>: silne palce z długimi, zakrzywionymi pazurami
              </td>
              <td>chwytanie i zabijanie zdobyczy</td>
              <td>
                u większości to <strong>główna broń</strong>: ptak zabija stopami
              </td>
            </tr>
            <tr>
              <td>
                <strong>Haczykowaty dziób</strong>
              </td>
              <td>rozrywanie mięsa na kawałki</td>
              <td>u sokołów dodatkowo „ząb” na krawędzi dzioba</td>
            </tr>
            <tr>
              <td>
                <strong>Bardzo dobry wzrok</strong> (u sów także słuch)
              </td>
              <td>wypatrzenie zdobyczy z daleka lub w ciemności</td>
              <td>
                szczegóły w module{' '}
                <a className="bh-focusable" href="#">
                  A2 · Anatomia łowcy
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mięsożerność</strong>
              </td>
              <td>dieta z kręgowców lub dużych bezkręgowców</td>
              <td>od ryb i ssaków po osy, ślimaki i padlinę</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Kluczowe jest to, że <strong>stopy są narzędziem polowania</strong>. Czapla też ma świetny
        wzrok i ostry dziób, ale łowi dziobem, a stopy służą jej do chodzenia. Drapieżnik chwyta
        stopami.
      </p>

      <h2 id="dodatkowe">Cechy „dodatkowe”, częste, ale nie obowiązkowe</h2>
      <ul>
        <li>
          <strong>Samica większa od samca.</strong> U wielu drapieżników samica jest wyraźnie
          większa (tzw. odwrócony dymorfizm płciowy). Więcej w module{' '}
          <a className="bh-focusable" href="#">
            A4 · Rozród
          </a>
          .
        </li>
        <li>
          <strong>Wypluwki.</strong> Niestrawione resztki (sierść, pióra, kości) drapieżniki
          zwracają w postaci zbitej wypluwki.
        </li>
        <li>
          <strong>Długie dzieciństwo.</strong> Młode długo uczą się polować, a duże gatunki
          dojrzewają przez kilka lat.
        </li>
      </ul>

      <h2 id="padlinozerca">Czy padlinożerca jest drapieżnikiem?</h2>
      <p>
        Tak, jeśli chodzi o grupę systematyczną. <strong>Sępy</strong> rzadko zabijają, a mimo to
        zaliczamy je do ptaków drapieżnych, bo należą do tych samych linii rodowych co orły i
        jastrzębie.
      </p>
      <p>
        Widać tu ważną rzecz: „ptak drapieżny” to po części <strong>pojęcie ekologiczne</strong>{' '}
        (jak ptak żyje), a po części <strong>systematyczne</strong> (z kim jest spokrewniony).
      </p>
    </div>
  );
}

function LessonFooter() {
  return (
    <>
      <Checkbox
        label="Oznacz jako ukończoną"
        description="Zaznacz, żeby w menu było widać postęp modułu."
      />
      <a className="tpl-article__next bh-focusable" href="#">
        <span className="tpl-article__next-label">Następna lekcja</span>
        <span className="tpl-article__next-title">
          Drzewo rodowe, czyli taksonomia i filogeneza
        </span>
        <span className="tpl-article__next-action">Zacznij lekcję 2</span>
      </a>
    </>
  );
}

export function ArticleTemplate({ state = 'ready' }: ArticleTemplateProps) {
  // lang="pl": the copy is Polish in an English document, and a screen reader
  // otherwise reads it with an English voice (WCAG 3.1.2).
  return (
    <div lang="pl" className="tpl-article-theme">
      <AppShell
        height="flow"
        header={
          <>
            <SkipLink />
            <AppBar
              brand={
                <span className="tpl-article__brand">
                  <svg className="tpl-article__brand-mark" viewBox="0 0 32 16" aria-hidden="true">
                    <path d="M1 10c5-1 9-6 15-2 6-4 10 1 15 2-5 0-9 2-15 5C10 12 6 10 1 10z" />
                  </svg>
                  World of Raptors
                </span>
              }
              actions={<CourseNav />}
            />
            <LessonBar />
          </>
        }
      >
        <div className="tpl-article">
          {state === 'error' ? (
            <StateBlock
              state="error"
              title="Lekcja się nie wczytała"
              description="Twój postęp w module jest zapisany. Spróbuj jeszcze raz albo wróć do listy lekcji."
              action={<Button variant="secondary">Spróbuj ponownie</Button>}
            />
          ) : (
            <Article
              eyebrow={
                <span className="tpl-article__eyebrow">
                  <a className="tpl-article__module bh-focusable" href="#">
                    A1 Kim są ptaki drapieżne?
                  </a>
                  <span>Lekcja 1 z 5</span>
                </span>
              }
              title="Co czyni drapieżnika drapieżnikiem"
              meta="Czytanie: około 4 minut"
              toc={state === 'ready' ? TOC : undefined}
              tocLabel="W tej lekcji"
              footer={state === 'ready' ? <LessonFooter /> : undefined}
            >
              {state === 'loading' ? (
                <SkeletonGroup label="Wczytywanie lekcji">
                  <div className="tpl-article__skeleton">
                    <Skeleton width="40%" height={28} />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="70%" />
                    <Skeleton height={160} radius="surface" />
                  </div>
                </SkeletonGroup>
              ) : (
                <LessonBody />
              )}
            </Article>
          )}
        </div>
      </AppShell>
    </div>
  );
}
