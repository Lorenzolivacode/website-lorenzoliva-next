# 001 - Suggerimenti per migliorare il sito senza snaturarlo

**Data:** 2026-05-28 — **revisione/verifica sul codice:** 2026-05-29
**Tipo:** lista suggerimenti con analisi (non un piano esecutivo)
**Principio guida:** migliorare senza rivoluzionare — il sito deve restare riconoscibile

> Nota revisione 2026-05-29: ogni voce è stata verificata contro il codice sorgente. Correzioni principali: `scroll-behavior: smooth` è **già presente** (non manca); gli ID dei dati non cambiano "ad ogni render" ma a load del modulo (rischio reale = hydration mismatch); il refuso `.diplay-none` è usato realmente e "funziona" per coincidenza; il `@import` dei font ha già `display=swap`; numeri di file/componenti/chiavi nell'header corretti.

---

## CONTESTO PER AGENTE

Sito portfolio personale bilingue (IT/EN) di Lorenzo Oliva — web developer e artista.
Struttura completa documentata in `website-lorenzoliva-next/Architecture.md`.

| Chiave        | Valore                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------ |
| Framework     | Next.js 14.2.13 (App Router), TypeScript                                                   |
| Styling       | CSS custom utility library (12 file utility; 28 .css totali, no Tailwind, no preprocessor) |
| i18n          | next-intl ^3.20.0 (IT, EN), ~64 chiavi per lingua                                          |
| Route         | 3 pagine (Home, Dev, Art) x 2 lingue = 6 pagine                                            |
| Componenti    | 24 totali (Atomic Design: 11 atoms, 10 molecules, 3 organisms)                             |
| Dati          | Hardcoded in TSX — nessun API/DB/auth                                                      |
| Deploy target | Static export su Aruba hosting Linux (Apache)                                              |

**Vincolo:** ogni suggerimento deve essere implementabile senza aggiungere backend, API, o dipendenze pesanti.

---

## DECISIONI E ASSUNZIONI (2026-05-29)

Scelte confermate dall'utente, da usare come guida per priorità e implementazione:

| Tema               | Decisione                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pubblico/obiettivo | **Lavoro dev** (recruiter / aziende tech). Privilegiare il portfolio sviluppo: SEO/OG curati per condivisione professionale (LinkedIn), hero orientata al dev, CTA "Developer" come azione primaria. La sezione Art resta presente ma **secondaria**.                                                                                                                 |
| Pagina Art         | **Opzione B** — gallery minimale (5-8 immagini dal PDF) + social. Vedi punto 3.                                                                                                                                                                                                                                                                                       |
| Static export      | **Già fatto.** `next.config.mjs` ha `output: "export"` + `images.unoptimized: true`. **Non esiste `middleware.ts`** nel progetto (rimosso per il deploy su Aruba): non va reintrodotto. Vincoli operativi: nessun API/SSR/route handler/server action a runtime; `sitemap.xml`/`robots.txt` statici in `public/`; redirect `/` → `/{locale}` solo client-side (`app/page.tsx`). `copyrightLabel` dinamico via `new Date().getFullYear()` resta valido (valutato in JSX a render/build, non richiede server). Cfr. `CLAUDE.md` §8 e `0_lorenzoliva_studies/docs/001_deploy-aruba-static-export.md`. |

**Confermato dall'utente (2026-05-29):**

- Dominio canonico: **`https://lorenzoliva.it`** — per sitemap / OG / `canonical`.
- `og:locale` EN: **`en_GB`** (IT = `it_IT`).
- `tel:` nel footer: **con prefisso `+39`** → `tel:+393208121031`.

---

## LAVORO GIÀ SVOLTO (sessione 2026-05-29) — non rifare

Una sessione di ridimensionamento UI è stata completata. **Prima di toccare CSS/dimensioni, leggi qui** per non duplicare o contraddire:

- **Bug line-height risolto:** `globals.css` `* { line-height }` era in `rem` (fisso) → ora unitless (`1.5`). Non reintrodurre unità.
- **Scala tipografica ridotta ~12-20%** e resa fluida con `clamp()`. Le classi font seguono la convenzione **nome=valore** (vedi `CLAUDE.md` §7.1, regola CRITICA): valore fisso → `f-size-0d875` (=0.875rem, body 14px); fluido → `f-size-<min>-<max>` (es. `f-size-0d95-1d05` = `clamp(0.95rem,…,1.05rem)`). **Mai cambiare il valore dietro un nome esistente: creare una nuova classe.**
- **Header rimpicciolito ~20%:** introdotta variabile `--header-h: 56px` in `globals.css` (+ `--header-clearance`), unica fonte per gli offset (main, ModalHam, NavbarDev, art layout). Cambiare l'altezza header = toccare solo la variabile.
- **Header "staccato dal top" risolto:** il wrapper usa `flex-cross-start` (non più `-center`), così resta ancorato al top a prescindere dall'altezza di NavbarDev.
- **Ridotti ~20%:** `.btn`, ButtonHam (30px), icone nav (20px)/docs(24px)/menu-dev(24px), ButtonPhoto home (180px), icone skill (72px)/link(44px)/tech(24px, classe nuova `w-24px`), padding `.section-code-page` (48px), footer (padding 1.2rem, social 32px, copyright a 14px).
- **In sospeso (non bloccante):** il trigger di `NavbarDev` (`RoundedIconEl` in `NavbarDev.tsx`) ha ancora `w-100px h-70px`, tarato sul vecchio header da 70px. Innocuo, ma se il pulsante-menu di /dev appare un filo basso rispetto all'header (56px), riallinearlo. Da valutare a video.
- **Problema preesistente notato (non risolto):** in `size.css` le classi `.w-20px` e `.w-30px` sono **duplicate** (definite 2 volte). Pulizia minore, vedi punto 10.

> I punti sotto che toccano dimensioni (6 tipografia, 7 ButtonPhoto, 8 responsive) vanno riletti alla luce di quanto sopra: alcune osservazioni potrebbero essere già superate.

---

## PRIORITA' ALTA — impatto significativo, effort contenuto

### 1. SEO e metadati ✅ FATTO (2026-05-29)

**Stato attuale:** solo `<title>` ("Lorenzoliva") e favicon. Nessun Open Graph, description, sitemap, robots.txt, structured data.

**Problema:** il sito non genera preview quando condiviso su LinkedIn/social (critico per un portfolio dev) e non e' indicizzabile efficacemente.

**Suggerimenti:**

- [x] Aggiungere metadata nel layout `app/[locale]/layout.tsx`:
  - [x] `description` per locale
  - [x] `og:title`, `og:description`, `og:image` (preview social)
  - [x] `og:locale` (`it_IT` / `en_GB`) + `og:locale:alternate`
  - [x] `twitter:card` (`summary_large_image`)
- [x] Creare `public/robots.txt`
- [x] Creare `public/sitemap.xml` con le 6 URL statiche
- [x] Aggiungere `<html lang={locale}>`
- [x] JSON-LD structured data (tipo `Person` + `WebSite`) per rich snippet Google
- [x] **Metadata duplicato** consolidato — `app/layout.tsx` ora è un root layout minimale (solo CSS + Fragment); rimossi `import Head` inutilizzato, blocco commentato e metadata duplicato. Unica fonte di verità: i metadata per-locale.

**COSA È STATO FATTO (dettaglio):**

- **Builder metadata centralizzato** in nuovo modulo `app/[locale]/seo.ts` → funzione `buildMetadata(locale, path)` che costruisce title/description/OG/twitter/canonical/hreflang **per-pagina**. Stringhe da i18n (nuova sezione `Seo`) via `getTranslations`.
- **`generateMetadata` per-pagina**: `layout.tsx` (home, path `""`), `dev/page.tsx` (`/dev`), `art/page.tsx` (`/art`) → ognuna espone la **propria** `og:url` e `canonical` (non più tutte la home).
- **Canonical + hreflang per-pagina** (`alternates.canonical` + `languages` it/en): inizialmente rinviati perché a livello layout avrebbero fatto puntare le sottopagine alla home; risolti col builder per-pagina. Gli hreflang sono **anche** nel `sitemap.xml` (it/en/x-default su tutte e 6 le URL).
- **JSON-LD** `Person` + `WebSite` (`@graph`) iniettato nel `<body>` del layout; `sameAs` raccolto dai dati esistenti (LinkedIn, GitHub da `portfolioProjects`; Facebook, Instagram da `socialNetwork`) senza duplicazione. `jobTitle`/`inLanguage` per-locale, `address` = Palermo.
- **Immagine OG** `public/assets/og-image.png` (1200×630) generata ad hoc: palette e font (Zain) del sito, logo "LO" in cerchio, nome + tagline + tech + dominio. Generata con tool usa-e-getta (`@resvg/resvg-js` in dir temporanea poi rimossa) → **nessuna dipendenza runtime aggiunta**.
- **Nuova sezione i18n `Seo`** (`siteTitle`, `siteDescription`, `ogImageAlt`) in `it.json` **e** `en.json`.
- **Decisioni di contenuto (utente):** tagline/titolo **dev-first** e aggiornato a **"Web Developer Full Stack"** + **Node.js** tra le tech (non più solo frontend); OG image con **logo** (non foto, per coerenza col dark theme).

**Verificato** sull'export `out/`: `lang` per locale, OG/twitter/description, `og:image` come URL assoluto, JSON-LD valido, `og:url`/`canonical`/`hreflang` per-pagina, sitemap XML ben formato (6 loc, 18 hreflang), robots/sitemap/immagine copiati. Build statico riuscito (10/10).

**Test residui (post-deploy, richiedono URL live):** LinkedIn Post Inspector, Facebook Sharing Debugger, Google Rich Results Test, raggiungibilità `/robots.txt` e `/sitemap.xml`, invio sitemap a Search Console.

**File coinvolti (effettivi):** `app/layout.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/seo.ts` (nuovo), `app/[locale]/(routes)/dev/page.tsx`, `app/[locale]/(routes)/art/page.tsx`, `messages/it.json`, `messages/en.json`, `public/robots.txt` (nuovo), `public/sitemap.xml` (nuovo), `public/assets/og-image.png` (nuovo)

**Effort umano:** 2-3h | **Effort agente:** ~20 min | **Impatto:** alto

---

### 2. Accessibilita' (a11y) ✅ FATTO (2026-05-29)

**Problemi rilevati dall'analisi del codice:**

- [x] **`alt=""` su immagine profilo** in `app/[locale]/page.tsx` riga 22 — **deciso: resta `alt=""`**. È lo sfondo decorativo `.img-bg` (opacity 0.3); la foto profilo "vera" è in `ButtonPhoto` e ha già `alt="Lorenzo Oliva"`. Sfondo decorativo → `alt=""` è corretto.
- [x] **Secondo `alt=""`** in `art/page.tsx` riga 31 (`img-bg-workart.png`) — **deciso: resta `alt=""`** (immagine di sfondo puramente decorativa).
- [x] **`ButtonHam.tsx`** — aggiunti `aria-label={t("navMenuLabel")}` + `aria-expanded={hambActive}` (con `useTranslations("Layout")`).
- [x] **`BtnClose.tsx`** — aggiunto `aria-label={t("closeLabel")}` (con `useTranslations("Layout")`).
- [x] **`ButtonPhoto.tsx`** — `<div onClick>` → `<button className="img-container reset-default pointer">` con `aria-label={t("photoButtonLabel")}`.
- [x] **Link disabilitati** — approccio (a): quando il link `< 2` char → `aria-disabled={true}` + `tabIndex={-1}` + nuova utility `.pointer-events-none` (mantenendo `opacity-4`). Applicato in `PortfolioList.tsx` (`linkGithub` r.87, `linkProject` r.106) e `dev/page.tsx` (`thisWebsite.linkGithub` r.142). Fixato anche il `&& "opacity-4"` che interpolava la stringa fantasma `"false"` → ternario.
- [x] **`<label>` del selettore lingua nascosta** — `diplay-none` → nuova classe `.sr-only` (visually-hidden accessibile) in `SelectLanguage.tsx:24` e `SwitchLanguageInline.tsx:40`. (Nota residua, fuori scope: in `SwitchLanguageInline` la label punta a un `<ul>`, associazione `htmlFor` non valida — testo comunque leggibile dallo SR.)
- [ ] **Contrasto colore** — **RINVIATO al punto 6**: il rapporto `secondary-light` (#f9f6e6) su `primary-very-dark` (#080d13) è ≈17:1, supera ampiamente WCAG AA. Il tema reale è la leggibilità del weight 300, che è una scelta tipografica del punto 6 (priorità media).
- [x] **`:focus-visible` globale** — aggiunta regola globale in `globals.css`: `outline: 2px solid var(--color-secondary-saturated-medium)` (gold) + `outline-offset: 2px`.
- [x] **skip-to-content** — classe `.skip-link` in `globals.css` (fuori schermo finché non riceve focus) + `<a href="#main-content">` in `layout.tsx` con `id="main-content"` sul `<main>`. Testo da nuova chiave `Layout.skipToContentLabel`.
- [x] **Modali senza focus trap** — aggiunto focus-trap (focus iniziale nella modale, trap `Tab`/`Shift+Tab`, ripristino focus all'elemento precedente alla chiusura) in `ModalHello.tsx` e `ModalHam.tsx`. Logica inline in ciascun componente (no nuova cartella/hook, per CLAUDE §13).
- [x] **Refuso CSS `.diplay-none`** — rimossa la regola refuso da `display.css`; `.display-none` (corretta) lasciata; usi migrati a `.sr-only`. Nessun `diplay-none` residuo nel codice.

**COSA È STATO FATTO (dettaglio):**

- **Nuove utility CSS** (nomi proposti e confermati prima di scriverle, §7.1): `.pointer-events-none` e `.sr-only` in `display.css`; regola globale `:focus-visible` e classe componente `.skip-link` in `globals.css`.
- **Nuove chiavi i18n** (sezione `Layout`, IT **e** EN): `navMenuLabel`, `closeLabel`, `photoButtonLabel`, `skipToContentLabel`.
- **Decisioni utente:** alt sfondi → decorativi (`alt=""`); link disabilitati → approccio (a) `aria-disabled`; colore focus → gold; contrasto/weight → rinviato al punto 6.

**Verificato** sull'export `out/`: build statico riuscito (10/10 pagine); nell'HTML statico presenti `class="skip-link"`, "Salta al contenuto", `id="main-content"`, `aria-expanded`, `aria-label` (menu/foto), `aria-disabled="true"` sui link disabilitati; nel bundle CSS presenti `:focus-visible{outline…}` e `.sr-only{position…}`. (aria-label di BtnClose e focus-trap dei modali non sono nell'HTML statico perché montati client-side al click — atteso.)

**File coinvolti (effettivi):** `ButtonHam.tsx`, `BtnClose.tsx`, `ButtonPhoto.tsx`, `PortfolioList.tsx`, `dev/page.tsx`, `SelectLanguage.tsx`, `SwitchLanguageInline.tsx`, `ModalHello.tsx`, `ModalHam.tsx`, `layout.tsx`, `globals.css`, `display.css`, `messages/it.json`, `messages/en.json`

**Effort umano:** 3-4h | **Effort agente:** ~30 min | **Impatto:** alto

---

### 3. Pagina Art incompleta ✅ FATTO (opzione B, verificato sul codice 2026-05-31)

**Stato attuale (prima):** `app/[locale]/(routes)/art/page.tsx` mostrava solo "Questa pagina e' momentaneamente in manutenzione" + link social. Sezione intera vuota su un portfolio personale.

**Opzioni:**

- [ ] ~~**A (minima):** rimuovere route `/art` e bottone dalla home~~ — scartata
- [x] **B (rapida): SCELTA E REALIZZATA** — gallery delle opere + lightbox + social. Realizzata oltre la stima iniziale (17 opere invece di 5-8, con lightbox completa anziché semplice griglia).
- [ ] ~~**C (completa):** sezione con gallery, categorie opere, link social~~ — eventuale evoluzione futura

**Implementazione opzione B — checklist:**

- [x] Estrarre immagini dal PDF `Portfolio-artistico-Oliva-Lorenzo.pdf` e salvarle ottimizzate (WebP). **Fatto: 17 opere** (non 5-8), ciascuna in coppia `thumb` + `full` (34 file) in `public/assets/artPage/gallery/`.
- [x] Sostituire il blocco "in manutenzione" con una gallery responsive coerente con lo stile del sito → griglia `ArtGallery` con reveal progressivo delle celle.
- [x] Mantenere i social (`socialNetwork.tsx`) e il link al PDF completo → entrambi presenti in fondo alla pagina (`art-pdf-link` apre il PDF; lista social invariata).
- [x] Aggiungere le chiavi i18n in `ArtSection` e rimuovere `maintenancePageLabel` dall'uso → **12 chiavi nuove** IT+EN allineate; `maintenancePageLabel` **non più referenziato** (verificato: nessun uso in `app/` né `messages/`).
- [x] Coerente con focus "lavoro dev": sezione sbloccata, curata ma secondaria a Dev.
- [x] Decisione tema (punto 12.1) → **risolta: "galleria bianca"** (identità voluta). Strato fisso `.art-bg-fixed` (`--color-secondary-very-light`) dietro al contenuto; testo `txt-c-primary-dark`. La lightbox resta scura per far risaltare l'opera.

**COSA È STATO FATTO (dettaglio):**

- **Dati opere** in nuovo modulo `(data)/artworks.tsx` (`artworks: IArtwork[]`): 17 opere ordinate dalla più recente alla più datata, con **ID statici** (`art-0068`, …) per evitare mismatch di hydration. Ogni opera porta `thumb`/`full`, `width`/`height` (per l'aspect-ratio di `next/image`), `title`, `technique` e `description` **bilingui** (riusano `IDescriptionPData`), `year`, `dimensions`. Alcune descrizioni sono volutamente vuote (gestite a runtime, vedi sotto).
- **Nuova interfaccia** `Interface/IArtwork.tsx`.
- **`ArtGallery`** (organism client, `ArtGallery-client/`): griglia di pulsanti-cella; al click apre la lightbox con navigazione **circolare** (`prev`/`next` in modulo su `total`). Micro-interazione di **reveal progressivo** delle celle via `IntersectionObserver`, con fallback se assente o `prefers-reduced-motion`.
- **`ArtworkModal`** (molecule client, `ArtworkModal-client/`): lightbox costruita sopra la modale base `Modal` (portal/overlay/focus-trap/Esc). Aggiunge: layout a due colonne (opera + dettagli), frecce prev/next + tastiera (`ArrowLeft`/`ArrowRight`), **contatore** `index/total`, **pills** (tecnica/anno/dimensioni), **descrizione ad accordion** (sempre aperta su desktop via CSS, comprimibile su mobile; nascosta se vuota → `hasDescription`), **striscia di anteprime paginata** (7 per pagina, niente scroll: si pagina con frecce, anteprima attiva evidenziata), e **vista a schermo intero** (seconda `Modal` annidata, con Esc che chiude prima il fullscreen via `closeOnEsc`).
- **Pagina** `art/page.tsx`: intro (occhiello `galleryEyebrow` + titolo `galleryTitle` con filetto gold + lead `galleryLead`), artist statement `galleryStatement`, `<ArtGallery>`, link al PDF completo, lista social. `generateMetadata` per-pagina già presente (canonical/og:url `/art`). Sfondo decorativo `.img-bg` con `alt=""` (deciso al punto 2).
- **i18n** sezione `ArtSection` (IT **e** EN): `galleryTitle`, `galleryEyebrow`, `galleryLead`, `galleryStatement`, `openArtworkLabel`, `descriptionLabel`, `prevLabel`, `nextLabel`, `stripPrevLabel`, `stripNextLabel`, `viewFullscreenLabel`, `viewFullPortfolioLabel`. Tutti gli `aria-label` dei controlli passano da qui.
- **CSS** colocato (`Art.css`, `ArtGallery.css`, `ArtworkModal.css`): classi componente/pagina (eccezione legittima a nome=valore, §7.1); colori solo da variabili `globals.css`.

**Scostamenti dal piano iniziale (in meglio):** opzione B prevedeva "5-8 immagini + griglia"; la realizzazione è più ricca — 17 opere e una lightbox completa con striscia, accordion e fullscreen. Resta comunque sezione *secondaria* a Dev (nessun investimento sproporzionato), in linea con il focus scelto.

**File coinvolti (effettivi):** `app/[locale]/(routes)/art/page.tsx`, `app/[locale]/(routes)/art/Art.css`, `app/[locale]/(routes)/art/layout.tsx`, `app/[locale]/(data)/artworks.tsx` (nuovo), `app/[locale]/Interface/IArtwork.tsx` (nuovo), `app/[locale]/(components)/(organisms)/ArtGallery-client/ArtGallery.tsx` + `.css` (nuovi), `app/[locale]/(components)/(molecules)/ArtworkModal-client/ArtworkModal.tsx` + `.css` (nuovi), `messages/it.json` + `messages/en.json` (`ArtSection`), immagini in `public/assets/artPage/gallery/` (34 WebP). La home e il bottone "Artista" sono rimasti invariati.

**Verifica residua (manuale/visiva):** resa responsive della griglia ai vari breakpoint, leggibilità della striscia paginata su mobile e transizione tema scuro (Home/Dev) → chiaro (Art) — vedi punto 12.1, ora deciso ma da rifinire visivamente se il passaggio risulta netto.

**Effort umano:** 2-6h | **Effort agente:** 1-3h | **Impatto:** alto

---

## PRIORITA' MEDIA — miglioramenti qualitativi

### 4. UX — Flusso di navigazione

- [x] ~~**Navbar ordine** — `Dev | Home | Art` → `Home | Dev | Art`~~ — **SCARTATO** (decisione utente 2026-05-29): si mantiene l'ordine attuale `Dev | Home | Art`. Con focus dev, avere Dev come primo elemento è anzi coerente
- [ ] **NavbarDev poco discoverable** — menu sezioni dev nascosto dietro bottone rotondo → renderlo visibile di default su desktop
  - File: `app/[locale]/(components)/(molecules)/NavbarDev-client/NavbarDev.tsx`
- [ ] **Contatti non cliccabili** — telefono e email nel footer sono testo semplice → aggiungere `<a href="tel:+393208121031">` e `<a href="mailto:...">`
  - File: `app/[locale]/(components)/(molecules)/SectionFooter-client/SectionFooter.tsx`
- [ ] **Copyright 2024 hardcoded** → aggiornare o rendere dinamico con `new Date().getFullYear()`
  - File: `messages/it.json` e `messages/en.json`, chiave `Layout.copyrightLabel`
- [ ] **`scroll-behavior: smooth` già presente ma mal collocato** — è definito in `components.css:43` (non assente, come si poteva pensare) → per coerenza spostarlo su `html` in `globals.css`
- [ ] **Due componenti per cambio lingua** — `SelectLanguage` (dropdown) e `SwitchLanguageInline` (bandiere) fanno la stessa cosa → valutare se unificare

**Effort umano:** 2-3h | **Effort agente:** ~20 min | **Impatto:** medio

---

### 5. UX — Contenuto e testi

- [ ] **Titolo tab browser** — "Lorenzoliva" non da' contesto → "Lorenzo Oliva — Web Developer & Artista"
  - File: `app/[locale]/layout.tsx`, oggetto `metadata`
- [ ] **Presentazione home troppo lunga** — mescola dev, artista, decorazione, grafica, liceo in un blocco → headline diretta + dettaglio sotto
  - File: `messages/it.json` e `messages/en.json`, chiavi `Home.presentationTxt1/2`
- [ ] **Date in formato ISO** — "2024-07-08" non e' user-friendly → formattare come "Luglio 2024" / "July 2024"
  - File: `app/[locale]/(components)/(organisms)/PortfolioList/PortfolioList.tsx` + `app/[locale]/(data)/portfolioProjects.tsx`
- [ ] **Label "Esercitazioni"** — suona come "compiti a casa" per un portfolio professionale → "Progetti personali" / "Personal Projects". Stesso tono "scolastico" anche in `DevSection.exEndLabel` ("Esercitazione conclusa:") mostrato prima della data di ogni progetto → rivedere insieme (es. "Completato il" / "Completed on")
  - File: `messages/it.json` (`DevSection.subtitleExercises`, `DevSection.exEndLabel`), `messages/en.json`
- [ ] **Descrizioni bilingue nei dati** — `description: { italian, english }` hardcoded nell'interfaccia invece che in i18n. Non critico, ma incoerente col sistema di traduzioni

**Effort umano:** 1-2h | **Effort agente:** ~15 min (testi richiedono validazione utente) | **Impatto:** medio

---

### 6. UI — Sistema colori e tipografia

- [ ] **Font weight 300 base** — molto leggero, difficile da leggere su schermi non-retina → suggerimento: 400 come base, 300 per decorativo
  - File: `app/[locale]/globals.css`, regola `*`
- [ ] **Font Geist presente ma non usato** — file `app/fonts/GeistVF.woff` e `GeistMonoVF.woff` esistono nel progetto ma non sono referenziati. Geist potrebbe funzionare bene per titoli come complemento a Zain
- [ ] **~30 variabili colore** — molte varianti simili creano confusione. Il sito usa effettivamente una palette blue scuro + gold/chiaro → ridurre a 10-12 variabili
  - File: `app/[locale]/globals.css`, sezione `:root`
- [ ] **Scrollbar custom** — stilizzata con colori tema, buon dettaglio → mantenere

**Effort umano:** 1-2h | **Effort agente:** ~10 min | **Impatto:** medio

---

### 7. UI — Componenti specifici

#### Home

- [ ] **Immagine profilo `.img-bg`** — `position: fixed`, `opacity: 0.3` su desktop, `opacity: 0.15` su mobile (quasi invisibile) → rimuoverla sotto 480px o aumentare opacita'
  - File: `app/[locale]/(css-library-utilities)/components.css`, media query 480px
- [ ] **Bottoni Dev/Art gap mobile** — da 30px a 5px, le label quasi si toccano → aumentare a 10-15px
  - File: `app/[locale]/home.css`, media query mobile

#### Dev Page

- [ ] **Skills label visibili solo su hover** — non accessibile da mobile (`:active` scompare al rilascio) → label sempre visibili con font piu' piccolo
  - File: `app/[locale]/(routes)/dev/Dev.css`, classe `.img-skill-container`
- [ ] **"thisWebsite" separato** — layout diverso dal resto portfolio, crea discontinuita' → integrare come primo elemento con badge "Questo sito"
  - File: `app/[locale]/(routes)/dev/page.tsx`
- [ ] **Screenshot expand brusco** — `.project-el-show:active` espande a `100vw/100vh` senza transizione → aggiungere `transition` per ammorbidire
  - File: `app/[locale]/(css-library-utilities)/components.css`

#### Modali

- [ ] **ModalHello delay chiusura 1s** — `handleBtnClose` ha `setTimeout(1000)` → ridurre a 300ms o eliminare
  - File: `app/[locale]/(components)/(molecules)/ModalHello-client/ModalHello.tsx`, righe 57-61
- [ ] **ModalHam portal su `<header>`** — inusuale, potrebbe creare problemi z-index → considerare `document.body`
  - File: `app/[locale]/(components)/(molecules)/ModalHam-client/ModalHam.tsx`
- [ ] **ModalDocs overflow viewport** — posizionata `absolute` con offset fissi, su schermi piccoli esce dal viewport
  - File: `app/[locale]/(components)/(molecules)/ModalDocs-client/ModalDocs.tsx`

#### Footer

- [ ] **Form contatto commentato** — codice morto in `SectionFooter.tsx` → rimuovere o implementare (serve servizio esterno: Formspree, EmailJS)
- [ ] **Sezione "Informazioni personali" commentata** — codice morto → rimuovere o implementare

**Effort umano:** 4-6h | **Effort agente:** 1-2h (richiede verifica visiva utente) | **Impatto:** medio

---

### 8. UI — Responsive

**Breakpoint attuali:** 1440px, 1024px, 768px, 480px — buona copertura.

- [ ] **`.main-w-screen` a 50% su desktop** — su 1920px il contenuto occupa ~960px, stretto per portfolio con screenshot → 60-65% + `max-width: 1200px`
  - File: `app/[locale]/(css-library-utilities)/layout.css`
- [ ] **Navbar switch brusco** — `.nav-x` sparisce a 768px, hamburger appare → verificare che non ci sia un punto in cui entrambi o nessuno sono visibili
  - File: `app/[locale]/(components)/(molecules)/Navbar-client/Navbar.css`
- [ ] **Portfolio cards 480-768px** — screenshot compresso a 150px → aumentare a 200-250px
  - File: `app/[locale]/(css-library-utilities)/components.css`, media query 480-768px
- [ ] **Footer jump 40% → 100%** — transizione brusca tra tablet e mobile
  - File: `app/[locale]/(components)/(molecules)/SectionFooter-client/SectionFooter.css`

**Effort umano:** 2-3h | **Effort agente:** ~20 min (richiede verifica visiva utente) | **Impatto:** medio

---

## PRIORITA' BASSA — raffinamenti

### 9. Performance

- [ ] **ID generati in modo non deterministico** — in `portfolioProjects.tsx` gli ID usano `crypto.randomUUID()` (skills) e `generateId()` = `Date.now()`+`Math.random()` (links, thisWebsite, portfolioData). NB: girano una sola volta al caricamento del modulo, **non ad ogni render** (quindi sono stabili tra i re-render), ma sono comunque sconsigliati: con SSG/SSR il modulo è valutato sul server e di nuovo sul client → rischio di **mismatch di hydration** sulle `key` React, oltre a essere non riproducibili. Usare ID statici (`"project-scb"`, `"project-heraclea"`). Da notare anche l'incoerenza interna: due meccanismi diversi (`crypto.randomUUID()` vs `generateId()`) nello stesso file.
  - File: `app/[locale]/(data)/portfolioProjects.tsx` (`socialNetwork.tsx` usa **già** ID statici `"sn-fb"`/`"sn-ig"`, nessun intervento)
- [ ] **PDF da 86MB** — singolo asset piu' pesante. Comprimerlo a 15-20MB migliorerebbe download
  - File: `public/doc/art-doc/Portfolio-artistico-Oliva-Lorenzo.pdf`
- [ ] **Google Fonts via CSS `@import`** — confermato `@import url("...Zain...&display=swap")` in `globals.css:1`. `display=swap` è **già presente**; resta da migliorare spostando il caricamento in un `<link>` nel `<head>` con `<link rel="preconnect">` verso `fonts.googleapis.com`/`fonts.gstatic.com` (l'`@import` blocca il rendering)
  - File: `app/[locale]/globals.css`, `app/[locale]/layout.tsx`

**Effort umano:** 1-2h | **Effort agente:** ~10 min | **Impatto:** basso-medio

---

### 10. Pulizia codice

- [ ] **`Toast.tsx` vuoto** — componente con solo `<div></div>` → rimuovere
- [ ] **`Carousel.tsx` non importato** — esiste ma nessuna page lo importa (verificato: nessun `import` del componente). `PortfolioList` usa la classe CSS `.carousel` direttamente. Inoltre il componente renderizza un `<h2>{locale}</h2>` di debug → rimuovere il componente
- [ ] **`ButtonHam.tsx` esporta `ButtonDocs`** — nome funzione sbagliato (`function ButtonDocs()` come export default, non causa bug ma confonde)
- [ ] **`import Head from "next/head"` non usato** in `app/layout.tsx` → rimuovere (insieme al blocco `<html>/<Head>` commentato)
- [ ] **`alt={"ciao"}` placeholder** in `NavbarDev.tsx` riga 84 (icona `path-icon.png`) → alt non significativo, da sostituire con testo descrittivo o `alt=""` se decorativa
- [ ] **Commenti didattici in `SectionObserver.tsx`** — spiegano IntersectionObserver in dettaglio → utili per studio ma appesantiscono produzione

**Effort umano:** 1h | **Effort agente:** ~5 min | **Impatto:** basso

---

### 11. Micro-animazioni

- [ ] **`scroll-behavior: smooth` già presente** (in `components.css:43`) → eventualmente spostarlo su `html` in `globals.css` per coerenza (vedi punto 4) — NON è un'aggiunta mancante
- [ ] **Transizioni pagina istantanee** → fade leggera (200-300ms) con wrapper opacity o CSS `@view-transition`
- [ ] **Hover skill icons wave** → aggiungere `transition-delay` sfalsato per effetto onda sulla griglia
- [ ] **Loading indicator PDF** → progress indicator per download 86MB (se mantenuto)

**Effort umano:** 1-2h | **Effort agente:** ~15 min | **Impatto:** basso

---

## IDEE UI/UX AGGIUNTIVE (rev. 2026-05-29)

Spunti emersi dalla rilettura del codice, da leggere con la lente del focus scelto ("lavoro dev" prioritario, Art secondaria). Sono proposte di prodotto (più che fix): richiedono validazione e qualcuna è un mini-redesign, quindi vanno oltre il principio "nessun redesign" — da pesare singolarmente.

### 12.1 Coerenza tema dark ↔ light

- [ ] Home e Dev sono scure, la pagina Art è chiara (`art-bg` bianco in `globals.css`). Il passaggio è netto. Due strade:
  - **identità voluta**: "arte = galleria bianca", dev = ambiente scuro → renderlo intenzionale (transizione morbida, header che si adatta al tema della pagina)
  - **uniformare**: stessa base cromatica su tutte le sezioni
- [ ] Decisione richiesta perché impatta direttamente la gallery dell'opzione B (punto 3)
  - File: `app/[locale]/globals.css`, `art/page.tsx`, `art/layout.tsx`

### 12.2 Gerarchia della hero (Home)

- [ ] Oggi competono: nome + 2 sottotitoli (`webDev`/`artist`) + 2 paragrafi + 2 bottoni. Proposta: nome grande → **una** tagline sintetica → i 2 CTA (Dev/Art) subito visibili → presentazione lunga spostata sotto o in un blocco "About"
- [ ] Coerente con focus "lavoro dev": il CTA "Developer" può essere l'azione primaria (più prominente), con "Artista" come secondario — senza nasconderlo
  - File: `app/[locale]/page.tsx`, `home.css`, chiavi `Home.presentationTxt1/2`

### 12.3 Tassonomia progetti: future sezioni "Collaborazioni" e "Progetti personali"

**Stato attuale (chiarito dall'utente 2026-05-29):** i 14 progetti in `portfolioData` sono **tutti esercitazioni**, già ordinati per data decrescente — i più recenti (SCB, HeracleApp, AI Storyteller) sono anche i più avanzati e stanno già in cima. Quindi l'ordinamento attuale è corretto e **non** va riclassificato: non sono "collaborazioni" né "progetti personali".

**Direzione (NON ora — quando ci sarà contenuto):** in futuro si aggiungeranno **due sezioni nuove sopra le Esercitazioni**, popolandole man mano che nascono lavori di quel tipo:

- [ ] **Collaborazioni** — progetti di team / reali (sezione in cima, massima evidenza). *Vuota oggi.*
- [ ] **Progetti personali** — progetti propri completi e pubblicati, distinti dagli esercizi formativi. *Vuota oggi.*
- [ ] **Esercitazioni** — la lista attuale, invariata nell'ordine, che resta in fondo

**Quando si implementerà (predisposizione, non lavoro immediato):**

- [ ] Aggiungere un campo categoria a `IPortfolioData` (es. `category: "collab" | "personal" | "exercise"`) in `Interface/IPortfolioProject.tsx`; di default tutti i progetti correnti = `"exercise"`
- [ ] In `dev/page.tsx`: renderizzare le sezioni solo se hanno almeno un progetto (evitare titoli su liste vuote)
- [ ] Nuove chiavi i18n in `DevSection` per i titoli "Collaborazioni" / "Progetti personali" (IT+EN); `subtitleExercises` resta per la terza
- [ ] Mantenere l'ordinamento per data decrescente **dentro** ogni sezione
  - File: `Interface/IPortfolioProject.tsx`, `portfolioProjects.tsx`, `dev/page.tsx`, `PortfolioList.tsx`, `messages/it.json` + `messages/en.json`

> **Nota priorità:** intervento **rinviato** (backlog), non per la fase corrente — dipende dalla disponibilità di nuovi progetti da inserire nelle due sezioni.

### 12.4 Filtri per tecnologia nel portfolio

- [ ] Aggiungere chip filtro (`next`/`react`/`css`/`typescript`…) sfruttando i `tecnicalRequirements` già presenti nei dati. Tutto client-side, compatibile con static export
  - File: `dev/page.tsx`, `PortfolioList.tsx`

### 12.5 Descrizioni progetto (`ParagraphList`)

- [ ] Le descrizioni in box con scroll interno possono nascondere testo e non segnalano che c'è altro da leggere → valutare line-clamp + "leggi tutto", o altezza adattiva
  - File: `ParagraphList.tsx` + relativo CSS

### 12.6 Timing complessivo di `ModalHello`

- [ ] Oltre alla chiusura (1s, punto 7), c'è 800ms di delay iniziale + effetto typewriter a 100ms/carattere: nell'insieme è percepito lento → rivedere il timing come esperienza unica (delay più corto, typewriter più rapido o opzionale)
  - File: `ModalHello.tsx` (righe 30-61)

**Effort umano:** variabile (12.1/12.2 = mini-redesign; 12.4/12.5/12.6 = contenuti; **12.3 = rinviato/backlog**, dipende da nuovi progetti) | **Effort agente:** medio, tutte richiedono validazione utente | **Impatto:** medio-alto sulla percezione di qualità

---

## RIEPILOGO

| #   | Suggerimento            | Priorita'   | Effort umano | Effort agente | Impatto    |
| --- | ----------------------- | ----------- | ------------ | ------------- | ---------- |
| 1   | SEO e metadati ✅ FATTO | Alta        | 2-3h         | ~20 min       | Alto       |
| 2   | Accessibilita' ✅ FATTO | Alta        | 3-4h         | ~30 min       | Alto       |
| 3   | Pagina Art ✅ FATTO     | Alta        | 2-6h         | 1-3h          | Alto       |
| 4   | Flusso navigazione      | Media       | 2-3h         | ~20 min       | Medio      |
| 5   | Contenuto e testi       | Media       | 1-2h         | ~15 min \*    | Medio      |
| 6   | Colori e tipografia     | Media       | 1-2h         | ~10 min       | Medio      |
| 7   | Componenti UI specifici | Media       | 4-6h         | 1-2h \*       | Medio      |
| 8   | Responsive              | Media       | 2-3h         | ~20 min \*    | Medio      |
| 9   | Performance             | Bassa       | 1-2h         | ~10 min       | Basso      |
| 10  | Pulizia codice          | Bassa       | 1h           | ~5 min        | Basso      |
| 11  | Micro-animazioni        | Bassa       | 1-2h         | ~15 min       | Basso      |
| 12  | Idee UI/UX aggiuntive   | Da valutare | variabile    | medio \*      | Medio-alto |

\* = richiede input/validazione utente (scelte creative, verifica visiva, approvazione testi)

| Totale                    | Effort umano        | Effort agente     |
| ------------------------- | ------------------- | ----------------- |
| Solo priorita' alta (1-3) | ~7-13h ✅ COMPLETATA | ~2-4h             |
| Tutto (1-11)              | ~20-34h             | ~4-7h + verifiche |
| Idee aggiuntive (12)      | da stimare per voce | + verifiche       |

**Approccio consigliato:** l'intera **priorità alta è completata** — SEO (1) ✅ e accessibilità (2) ✅ FATTI (2026-05-29), pagina Art (3, opzione B) ✅ FATTA (verificata sul codice 2026-05-31), con realizzazione più ricca del previsto (17 opere + lightbox). **Prossimo step: priorità media** — fix testi (5) e flusso di navigazione (4) sono i candidati a miglior rapporto impatto/effort. Le idee UI/UX (12) sono mini-redesign da pesare singolarmente, non incluse nel "core".
