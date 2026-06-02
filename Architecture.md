# Architecture — website-lorenzoliva-next

Sito portfolio personale bilingue (IT/EN) costruito con Next.js 14 App Router.
Nessun backend, nessun database, nessuna autenticazione. Dati hardcoded, output puramente statico (`output: "export"`).
**Niente `middleware.ts`**: rimosso per il deploy statico su Aruba (Apache, nessun runtime Node).

---

## Stack

| Layer      | Tecnologia                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 14.2.13 (App Router)       |
| Linguaggio | TypeScript (strict: false)          |
| Styling    | CSS custom utility library (no preprocessor, no Tailwind) |
| Icone      | `lucide-react` per le voci del menu `/dev` (NavbarDev); `simple-icons` per i loghi tech (griglia Skills + tag-icona dei progetti), resi monocromatici tinti via l'atomo `BrandIcon`; i loghi brand dei **Links** (LinkedIn/GitHub) restano asset PNG in `public/` (contenuto) |
| i18n       | next-intl ^3.20.0 (IT, EN)         |
| Font       | Google Fonts (Zain) via `@import` in globals.css. I file Geist/GeistMono in `app/fonts/` esistono ma **non sono referenziati** (non importati) |
| Deploy     | Static export (`output: "export"`) → Aruba hosting Linux base (Apache) |

---

## Struttura directory

```
website-lorenzoliva-next/
│
├── app/
│   ├── layout.tsx                    # Root layout (importa CSS globali, wrappa children)
│   ├── page.js                       # Root "/" → redirect client-side a /{locale}
│   ├── not-found.tsx                 # 404 globale
│   ├── fonts/                        # GeistVF.woff, GeistMonoVF.woff
│   │
│   └── [locale]/                     # Dynamic segment: "it" | "en"
│       ├── layout.tsx                # Layout principale: NextIntlClientProvider, Header, Footer
│       ├── page.tsx                  # Home page
│       ├── not-found.tsx             # 404 per locale
│       ├── globals.css               # CSS variabili, reset, scrollbar
│       ├── layout.css                # CSS layout principale
│       ├── home.css                  # CSS home page
│       │
│       ├── (routes)/                 # Route group (non influenza URL)
│       │   ├── dev/
│       │   │   ├── page.tsx          # Pagina portfolio sviluppatore
│       │   │   └── Dev.css
│       │   └── art/
│       │       ├── page.tsx          # Pagina portfolio artistico
│       │       └── layout.tsx        # Layout art (solo wrapper CSS)
│       │
│       ├── (components)/             # Route group per componenti
│       │   ├── (atoms)/              # Componenti base
│       │   ├── (molecules)/          # Composizioni di atoms
│       │   └── (organisms)/          # Sezioni complete (Header, Footer, PortfolioList)
│       │
│       ├── (css-library-utilities)/  # Utility CSS library (12 file)
│       │   └── library-import.css    # Entry point che importa tutti gli utility
│       │
│       ├── (data)/                   # Dati hardcoded
│       │   ├── portfolioProjects.tsx # Array progetti, skills, links
│       │   ├── devSections.tsx       # Fonte unica voci /dev (menu NavbarDev + barra)
│       │   ├── experiences.tsx       # Esperienze professionali (sezione /dev #experience)
│       │   └── socialNetwork.tsx     # Array social network
│       │
│       ├── (Provider)/               # Context providers
│       │   └── HashContext.tsx        # Context per tracking sezione corrente (usato da NavbarDev)
│       │
│       └── Interface/
│           ├── IPortfolioProject.tsx  # Interfaccia TypeScript per i progetti
│           ├── IDevSection.tsx        # Forma voce navigazione /dev
│           └── IExperience.tsx        # Forma singola esperienza professionale
│
├── i18n/
│   ├── routing.ts                    # Config locale + export Link, usePathname, useRouter, redirect
│   └── request.ts                    # getRequestConfig: carica i JSON di traduzione
│
├── messages/
│   ├── it.json                       # Traduzioni italiane (~78 chiavi)
│   └── en.json                       # Traduzioni inglesi (~64 chiavi)
│
├── next.config.mjs                    # Config Next.js: output:"export", images.unoptimized, plugin next-intl
├── tsconfig.json                      # TypeScript config
├── jsconfig.json                      # Path alias: @/* → ./*
├── package.json
│
├── public/
│   ├── LO-img-3.3.png               # Favicon / avatar
│   ├── assets/
│   │   ├── LO-img-3.2.png           # Foto profilo
│   │   ├── Lorenzo-Oliva-2.jpg
│   │   ├── img-hello.jpg, img-hello-2.jpg
│   │   ├── nav-icon/                 # Icone navigazione + bandiere lingua
│   │   ├── skills-img/              # Loghi tecnologie (GitHub, React, ecc.)
│   │   ├── projects-img/            # Screenshot progetti (WebP)
│   │   └── artPage/                 # Immagini sezione art + loghi social
│   └── doc/
│       ├── dev-doc/                  # PDF dev (188KB)
│       └── art-doc/                  # PDF art (86MB portfolio + 567KB CV)
│
└── 0_lorenzoliva_studies/            # Documentazione interna
    ├── prompt_exemple.md
    └── planes/
        └── 001_analisi-migrazione-static-export.md
```

---

## Route e URL

| URL pattern     | File                                  | Contenuto           |
| --------------- | ------------------------------------- | ------------------- |
| `/`             | `app/page.js`                         | Redirect a `/{locale}` |
| `/{locale}`     | `app/[locale]/page.tsx`               | Home page           |
| `/{locale}/dev` | `app/[locale]/(routes)/dev/page.tsx`  | Portfolio sviluppatore (skills, links, esperienza, portfolio) |
| `/{locale}/art` | `app/[locale]/(routes)/art/page.tsx`  | Portfolio artistico |

Locale validi: `it`, `en`. Default: `it`.

---

## Layout nesting

```
app/layout.tsx                          → CSS globali, shell HTML minima
  └── app/[locale]/layout.tsx           → NextIntlClientProvider, Header, <main>, Footer
        ├── page.tsx                    → Home
        ├── (routes)/dev/page.tsx       → Dev (nessun layout proprio)
        └── (routes)/art/layout.tsx     → Wrapper CSS art
              └── art/page.tsx          → Art
```

---

## Componenti — Atomic Design

### Atoms (`(components)/(atoms)/`)

| Componente                  | Client | Descrizione                                |
| --------------------------- | ------ | ------------------------------------------ |
| BlurBlue                    | No     | Elemento decorativo blur                   |
| BrandIcon                   | No     | Logo-brand monocromatico da `simple-icons` (prop `icon`=oggetto simple-icons, `size`, `title`); colore via classe utility (`currentColor`→`fill`). Usato in griglia Skills (72px) e tag-icona Portfolio (24px) |
| BtnClose                    | No     | Bottone chiudi                             |
| Jumper                      | No     | Animazione decorativa (usato in 404)       |
| ParagraphList-client        | Si     | Lista paragrafi con scroll, legge `useLocale` per scegliere lingua descrizione |
| RoundedIconEl               | No     | Icona tonda con link (usa `Link` da i18n/routing); accetta un'icona come componente lucide (`Icon`) **o** come immagine (`src`) |
| SectionDocs                 | No     | Sezione documenti (usa `useTranslations`)  |
| SectionObserver-client      | Si     | Observer per tracking sezione visibile     |
| SelectLanguage-client       | Si     | Dropdown `<select>` cambio lingua          |
| SubtitlePortfolio           | No     | Sottotitolo sezione portfolio              |
| SwitchLanguageInline-client | Si     | Switch lingua con bandiere (click)         |
| Tag                         | No     | Etichetta generica con sfondo semi-trasparente; colore via prop (`color`, default `"primary"`). Usato per il tech stack delle esperienze |
| Toast                       | No     | Notifica toast — **stub vuoto** (`return <div></div>`), non utilizzato |

### Molecules (`(components)/(molecules)/`)

| Componente            | Client | Descrizione                                         |
| --------------------- | ------ | --------------------------------------------------- |
| ButtonDocs-client     | Si     | Bottone apertura documenti                          |
| ButtonHam             | No     | Bottone hamburger menu                              |
| ButtonPhoto-client    | Si     | Bottone foto con modale                             |
| Carousel-client       | Si     | Carousel progetti (legge `useLocale`) — **non importato da nessuna page** (codice morto: `PortfolioList` usa direttamente la classe CSS `.carousel`) |
| ModalDocs-client      | Si     | Modale documenti (CV, portfolio PDF)                |
| ModalHam-client       | Si     | Menu mobile (createPortal)                          |
| ModalHello-client     | Si     | Modale benvenuto con foto                           |
| Navbar-client         | Si     | Navigazione principale (Link da i18n/routing)       |
| NavbarDev-client      | Si     | Navigazione sezione dev (anchor link a sezioni). Voci/ordine/barra derivati dalla fonte unica `devSections`; icone come componenti lucide (mappa `iconKey`→componente) |
| SectionFooter-client  | Si     | Contenuto footer (contatti, docs, social)           |

### Organisms (`(components)/(organisms)/`)

| Componente    | Client | Descrizione                                                |
| ------------- | ------ | ---------------------------------------------------------- |
| Header         | No     | Compone ButtonHam + Navbar + NavbarDev                     |
| Footer         | No     | Compone SectionFooter + testi copyright (`useTranslations`) |
| PortfolioList  | No     | Lista progetti con Carousel (dati da portfolioProjects.tsx) |
| ExperienceList | No     | Card esperienze professionali (dati da experiences.tsx); `useLocale` per i contenuti bilingui; descrizione come `<p>` intero; periodo reso con atomo `Tag`; tech come icone `BrandIcon` (via `getIcon`) |

---

## Flusso i18n

```
i18n/routing.ts
  ├── definisce locales: ["en", "it"], defaultLocale: "it"
  └── esporta: Link, redirect, usePathname, useRouter (locale-aware)

i18n/request.ts
  └── getRequestConfig: carica messages/{locale}.json

(nessun middleware.ts: con output statico il locale è enumerato a build da
 generateStaticParams; il redirect "/" → "/{locale}" è client-side in app/page.tsx)

messages/it.json, messages/en.json
  └── chiavi: Layout.*, ModalDoc.*, Home.*, DevSection.*, ArtSection.*

app/[locale]/layout.tsx
  └── <NextIntlClientProvider messages={messages}> wrappa tutta l'app

Componenti:
  └── useTranslations("NomeSezione") per accedere alle traduzioni
  └── useLocale() per logica condizionale sulla lingua
```

**Componenti che usano `useTranslations`:** Home page, Dev page, Art page, Footer, SectionFooter, Navbar, NavbarDev, ModalDocs, ModalHello, SectionDocs, SelectLanguage, SwitchLanguageInline, ParagraphList, PortfolioList, portfolioProjects (dati).

**Componenti che usano `useLocale`:** ParagraphList, Carousel, SwitchLanguageInline, SelectLanguage, ExperienceList.

**Componenti che usano `Link`/`usePathname` da i18n/routing:** Navbar, SectionFooter, SelectLanguage, SwitchLanguageInline, ModalDocs, RoundedIconEl, Home page.

---

## Dati

Nessun API, nessun database. Tutti i dati sono in file TSX:

### `portfolioProjects.tsx`

Esporta:
- `portfolioData: IPortfolioData[]` — 14 progetti con titolo, tech requirements, immagine, descrizione bilingue, link GitHub/live
- `skills: {id, icon, label}[]` — tecnologie della griglia /dev; `icon` è un oggetto `simple-icons` (path monocromatico), reso da `BrandIcon`. ID statici. `getIcon(requirement)` (esportato da `PortfolioList`) mappa i requirement dei progetti agli stessi oggetti `simple-icons` (undefined se sconosciuto → il chiamante salta)
- `links: {id, icon, label, title, url}[]` — link esterni (GitHub, LinkedIn, contatti)
- `thisWebsite: IPortfolioData` — dati del sito stesso (mostrato separatamente in dev page)

### `devSections.tsx`

Esporta:
- `devSections: IDevSection[]` — fonte unica delle voci `/dev` (id, `titleKey` i18n, `iconKey` per la mappa lucide, `isPageSection`). L'ordine guida menu, barra di avanzamento e highlight in `NavbarDev`. `contacts` ha `isPageSection: false` (voce solo-menu: i contatti vivono nel footer).

### `experiences.tsx`

Esporta:
- `experiences: IExperience[]` — esperienze professionali dev (ruolo, azienda, periodo, descrizione bilingue, tech, `current`). Vincolo NDA: nomi azienda/ruolo/tipologie, niente clienti/repo. Renderizzate da `ExperienceList` nella sezione `/dev #experience`.

### `socialNetwork.tsx`

Esporta:
- `socialNetwork: {id, label, icon, url}[]` — 2 social (usati in art page)

### `IPortfolioProject.tsx`

```ts
interface IPortfolioData {
  id: string
  title: string
  tecnicalRequirements: string[]
  img: string
  description: { italian: string, english: string }
  linkGithub: string
  linkProject: string
  created: string
}
```

---

## CSS utility library

12 file in `(css-library-utilities)/`, importati via `library-import.css`:

| File           | Contenuto                                                  |
| -------------- | ---------------------------------------------------------- |
| animation.css  | Keyframe e classi animazione                               |
| border.css     | Border radius, border styles                               |
| color.css      | Variabili CSS colori (primary/secondary con varianti opacita'), classi txt/bg |
| components.css | Classi componenti riutilizzabili (btn, shadow, ecc.)       |
| display.css    | Display, visibility, overflow, pointer, z-index            |
| flex.css       | Flex utilities (center, between, column, wrap, gap)        |
| font.css       | Font family, size, weight (Google Fonts Zain)              |
| layout.css     | Main width, section widths, media queries breakpoint       |
| position.css   | Position fixed/absolute/relative, top/left/right/bottom    |
| size.css       | Width, height, ratio, min/max                              |
| spacing.css    | Padding, margin (utility classes tipo p-10px, m-auto)      |

Le variabili colore principali sono definite in `globals.css` come CSS custom properties (`--color-primary-*`, `--color-secondary-*`).

---

## Context providers

### HashContext (`(Provider)/HashContext.tsx`)

Context con `currentHash` (string) e `setCurrentHash`. **Utilizzato da `NavbarDev`**: `NavbarDev` wrappa il proprio contenuto in `HashProvider` e legge `currentHash` via `useHash()` (insieme a `SectionObserver`) per evidenziare la sezione visibile e calcolare il progresso di scroll nella pagina dev. Non è invece montato a livello di layout globale.

---

## Assets

| Cartella                  | Contenuto                                    | Peso     |
| ------------------------- | -------------------------------------------- | -------- |
| `public/assets/`          | Immagini profilo, icone nav, skill, progetti | ~3MB     |
| `public/assets/projects-img/` | Screenshot progetti in WebP              | incluso  |
| `public/doc/dev-doc/`     | PDF curriculum dev                           | 188KB    |
| `public/doc/art-doc/`     | PDF portfolio artistico + CV                 | ~86.5MB  |
