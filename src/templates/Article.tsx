import { AppBar } from '../components/AppBar/AppBar';
import { AppShell, SkipLink } from '../components/AppShell/AppShell';
import { Article, ArticleMargin } from '../components/Article/Article';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { NavGroup, NavItem } from '../components/NavList/NavList';
import { SidePanel } from '../components/SidePanel/SidePanel';
import { Skeleton, SkeletonGroup } from '../components/Skeleton/Skeleton';
import { StateBlock } from '../components/StateBlock/StateBlock';

/**
 * Template — a lesson in a course.
 *
 * One of many pages that are the same page: a course of sixty lessons has one
 * layout, sixty times. The decision it carries: the reader always knows where
 * they are in the course and in the lesson, and nothing beside the text is in
 * the text's way.
 *
 * - Where in the course: the module's lessons are the syllabus, in the shell's
 *   navigation, where the product's modules already are - not a second list
 *   in a second left column. The meta line says "Lesson 1 of 5".
 * - Where in the lesson: the table of contents, sticky on a wide screen.
 * - Beside the text: photos with their credit, and side facts, in the margin
 *   at the height of the paragraph they belong to; in the text on a narrow
 *   screen.
 * - After the text: mark it read, then the next lesson as the one clear move.
 *
 * The body's typography is the product's: Article lays out and does not style
 * headings, lists or tables.
 */

export type ArticleTemplateProps = {
  state?: 'ready' | 'loading' | 'error';
};

const lessons = [
  { id: 'wzrok', label: 'Wzrok', subline: 'W trakcie', icon: '●' },
  { id: 'szpony', label: 'Szpony, stopy i dziób', icon: '○' },
  { id: 'skrzydla', label: 'Skrzydła, lot i pióra', icon: '○' },
  { id: 'trawienie', label: 'Trawienie i fizjologia', icon: '○' },
  { id: 'cwiczenia', label: 'Ćwiczenia i projekt', subline: 'Quiz, próg 80%', icon: '○' },
];

const toc = [
  { id: 'dwa-dolki', label: 'Dwa dołki w siatkówce' },
  { id: 'ostrosc', label: 'Ostrość, czyli ile widzi' },
  { id: 'barwy', label: 'Barwy i ultrafiolet' },
  { id: 'sprawdz', label: 'Sprawdź się' },
];

function Photo({ caption, credit }: { caption: string; credit: string }) {
  return (
    <figure className="tpl-article__figure">
      <div className="tpl-article__photo" role="img" aria-label={caption} />
      <figcaption className="tpl-article__caption">
        <span className="tpl-article__caption-title">{caption}</span>
        <span>{credit}</span>
      </figcaption>
    </figure>
  );
}

function LessonBody() {
  return (
    <div className="tpl-article__prose">
      <Card elevation="flat" padding="snug">
        <p className="tpl-article__goals-title">Po tej lekcji</p>
        <ul className="tpl-article__goals">
          <li>wyjaśnisz, po co ptakom drapieżnym dwa dołki w siatkówce,</li>
          <li>porównasz ostrość wzroku myszołowa i człowieka,</li>
          <li>powiesz, co ultrafiolet może mówić pustułce o łące.</li>
        </ul>
      </Card>

      <h2 id="dwa-dolki">Dwa dołki w siatkówce</h2>
      <ArticleMargin>
        <Photo
          caption="Pustułka w zawisie"
          credit="Fot. J. Kowalski · CC BY-SA 4.0 · Wikimedia Commons"
        />
      </ArticleMargin>
      <p>
        Człowiek ma w siatkówce jeden dołek, czyli miejsce najostrzejszego widzenia. Wiele ptaków
        drapieżnych polujących za dnia ma dwa: centralny, patrzący w bok, i skroniowy, patrzący
        przed siebie, tam, gdzie pola widzenia obu oczu się nakładają.
      </p>
      <p>
        Dołek centralny służy do wypatrywania z daleka, skroniowy do oceny odległości w ostatniej
        fazie ataku. Dlatego sokół pikujący na ofiarę często leci po łuku, a nie prosto: trzyma ją w
        polu dołka, który widzi najostrzej.
      </p>

      <h2 id="ostrosc">Ostrość, czyli ile widzi</h2>
      <ArticleMargin>
        <aside className="tpl-article__fact" aria-label="Ciekawostka">
          <p className="tpl-article__fact-title">Ciekawostka</p>
          <p>
            Oko orła przedniego jest mniej więcej tak duże jak ludzkie, w głowie o wiele mniejszej.
          </p>
        </aside>
      </ArticleMargin>
      <p>
        Ostrość wzroku zależy od tego, jak gęsto upakowane są czopki. U orłów i sępów jest ich tak
        wiele, że rozróżniają szczegóły z odległości kilka razy większej niż my.
      </p>
      <p>
        Duże oko w małej głowie ma swoją cenę: gałka prawie się nie obraca. Żeby spojrzeć w bok,
        ptak obraca całą głowę.
      </p>

      <h2 id="barwy">Barwy i ultrafiolet</h2>
      <p>
        Ptaki mają cztery rodzaje czopków, my trzy. Badania z lat 90. sugerowały, że pustułki
        dostrzegają w ultrafiolecie ślady moczu nornic; późniejsze prace podają to w wątpliwość, i
        dobrze to wiedzieć, zanim powtórzy się ciekawostkę dalej.
      </p>

      <h2 id="sprawdz">Sprawdź się</h2>
      <p>Po co pikującemu sokołowi lot po łuku, a nie prosto na ofiarę?</p>
    </div>
  );
}

function LessonFooter() {
  return (
    <>
      <Checkbox label="Oznacz jako przeczytaną" />
      <Card padding="snug" actions={<Button size="sm">Zacznij lekcję 2</Button>}>
        <p className="tpl-article__next-label">Następna lekcja</p>
        <p className="tpl-article__next-title">Szpony, stopy i dziób</p>
      </Card>
    </>
  );
}

export function ArticleTemplate({ state = 'ready' }: ArticleTemplateProps) {
  const syllabus = (
    <SidePanel ariaLabel="Moduł A2: Anatomia łowcy" title="A2 Anatomia łowcy">
      <NavGroup label="Lekcje">
        {lessons.map((lesson, index) => (
          <NavItem key={lesson.id} item={lesson} active={index === 0} />
        ))}
      </NavGroup>
    </SidePanel>
  );

  return (
    <AppShell
      header={
        <>
          <SkipLink />
          <AppBar
            brand={<strong>World of Raptors</strong>}
            title="Anatomia łowcy"
            titleAsHeading={false}
          />
        </>
      }
      sidebar={syllabus}
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
              <Breadcrumbs
                items={[
                  { label: 'Moduły', href: '#' },
                  { label: 'A2 Anatomia łowcy', href: '#' },
                  { label: 'Wzrok' },
                ]}
              />
            }
            title="Wzrok"
            meta="Lekcja 1 z 5 · około 12 minut"
            lead="Jak widzi ptak, który poluje z wysokości: dwa punkty najostrzejszego widzenia, ostrość kilka razy większa niż nasza i barwy, których nie widzimy."
            toc={state === 'ready' ? toc : undefined}
            tocLabel="W tej lekcji"
            footer={state === 'ready' ? <LessonFooter /> : undefined}
          >
            {state === 'loading' ? (
              <SkeletonGroup label="Wczytywanie lekcji">
                <div className="tpl-article__skeleton">
                  <Skeleton height={96} radius="surface" />
                  <Skeleton width="40%" height={20} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton width="70%" />
                </div>
              </SkeletonGroup>
            ) : (
              <LessonBody />
            )}
          </Article>
        )}
      </div>
    </AppShell>
  );
}
