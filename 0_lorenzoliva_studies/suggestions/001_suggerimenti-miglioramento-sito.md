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

## PRIORITA' ALTA — impatto significativo, effort contenuto

### 1. SEO e metadati

**Stato attuale:** solo `<title>` ("Lorenzoliva") e favicon. Nessun Open Graph, description, sitemap, robots.txt, structured data.

**Problema:** il sito non genera preview quando condiviso su LinkedIn/social (critico per un portfolio dev) e non e' indicizzabile efficacemente.

**Suggerimenti:**

- [ ] Aggiungere metadata nel layout `app/[locale]/layout.tsx`:
  - `description` per locale
  - `og:title`, `og:description`, `og:image` (preview social)
  - `og:locale` (`it_IT` / `en_GB`)
  - `twitter:card` (`summary_large_image`)
- [ ] Creare `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://lorenzoliva.it/sitemap.xml
  ```
- [ ] Creare `public/sitemap.xml` con le 6 URL statiche
- [ ] Aggiungere `<html lang={locale}>` (attualmente `<html>` senza `lang`, in `app/[locale]/layout.tsx` riga 33)
- [ ] JSON-LD structured data (tipo `Person` + `WebSite`) per rich snippet Google
- [ ] **Metadata duplicato** — sia `app/layout.tsx` sia `app/[locale]/layout.tsx` esportano `metadata` con lo stesso `title: "Lorenzoliva"`. `app/layout.tsx` rende solo un Fragment con `{children}` (niente `<html>/<body>`), ha un `import Head from "next/head"` inutilizzato e un blocco `<html>/<Head>` commentato → consolidare i metadata in un unico punto (preferibilmente per locale)

**File coinvolti:** `app/layout.tsx`, `app/[locale]/layout.tsx`, `public/robots.txt` (nuovo), `public/sitemap.xml` (nuovo)

**Effort umano:** 2-3h | **Effort agente:** ~20 min | **Impatto:** alto

---

### 2. Accessibilita' (a11y)

**Problemi rilevati dall'analisi del codice:**

- [ ] **`alt=""` su immagine profilo** in `app/[locale]/page.tsx` riga 22 (`src` a riga 19) — dovrebbe essere `alt="Lorenzo Oliva - Web Developer e Artista"`
- [ ] **Secondo `alt=""`** in `app/[locale]/(routes)/art/page.tsx` riga 21 (immagine di sfondo `img-bg-workart.png`) → valutare `alt` descrittivo o `role="presentation"` se puramente decorativa
- [ ] **`ButtonHam.tsx`** — 3 `<div>` vuoti in un `<button>`, nessun testo screen reader → aggiungere `aria-label="Menu di navigazione"` + `aria-expanded={hambActive}`
- [ ] **`BtnClose.tsx`** — solo span visuali → aggiungere `aria-label="Chiudi"`
- [ ] **`ButtonPhoto.tsx`** — `onClick` su `<div className="img-container">` (riga 16) → cambiare in `<button>` con `aria-label`
- [ ] **Link disabilitati** — quando un link `< 2` caratteri punta a `"#"` ma resta cliccabile (solo `opacity-4`) → usare `aria-disabled="true"` + `pointer-events: none`, oppure renderizzare `<span>` al posto di `<a>`. Il pattern ricorre in più punti: `PortfolioList.tsx` (sia `linkGithub` riga 88 sia `linkProject` riga 107) e `dev/page.tsx` (blocco `thisWebsite`, `linkGithub` riga 132)
- [ ] **`<label>` del selettore lingua nascosta** — in `SelectLanguage.tsx` (riga 24) e `SwitchLanguageInline.tsx` (riga 40) la `<label htmlFor="selectLanguage">` ha classe `diplay-none` (`display:none`) → tolta dall'albero di accessibilità, lo screen reader non legge l'etichetta del select. Usare una classe `sr-only`/visually-hidden invece di `display:none` (e correggere il refuso, vedi sotto)
- [ ] **Contrasto colore** — font-weight 300 su testo chiaro (`secondary-light`) su sfondo scuro (`primary-very-dark`) → verificare rapporto WCAG AA, eventualmente portare a weight 400
- [ ] **Manca uno stile `:focus-visible` globale/coerente** — esistono solo focus puntuali (`.btn-close:focus` in `BtnClose.css`, `.hover-trx20px-scale105:focus` in `components.css:84`); link, bottoni e nav non hanno feedback da tastiera → aggiungere una regola `:focus-visible` globale
- [ ] **Manca skip-to-content** → aggiungere link nascosto "Salta al contenuto" per keyboard navigation
- [ ] **Modali senza focus trap** — `ModalHello.tsx` (ha solo l'handler Escape) e `ModalHam.tsx` non intrappolano il focus, il tab esce dalla modale
- [ ] **Refuso CSS `.diplay-none`** in `display.css` riga 1 (manca una "s") — NON è un bug latente: la classe è effettivamente usata (`SelectLanguage.tsx:24`, `SwitchLanguageInline.tsx:40`) e combacia col selettore (anch'esso col refuso), quindi "funziona" per coincidenza. Va comunque corretto in `.display-none` insieme agli usi, per pulizia e per evitare regressioni future

**File coinvolti:** `ButtonHam.tsx`, `BtnClose.tsx`, `ButtonPhoto.tsx`, `PortfolioList.tsx`, `dev/page.tsx`, `SelectLanguage.tsx`, `SwitchLanguageInline.tsx`, `ModalHello.tsx`, `ModalHam.tsx`, `app/[locale]/page.tsx`, `art/page.tsx`, `globals.css`, `display.css`

**Effort umano:** 3-4h | **Effort agente:** ~30 min | **Impatto:** alto

---

### 3. Pagina Art incompleta

**Stato attuale:** `app/[locale]/(routes)/art/page.tsx` mostra solo "Questa pagina e' momentaneamente in manutenzione" + link social. Sezione intera vuota su un portfolio personale.

**Opzioni:**

- [ ] ~~**A (minima):** rimuovere route `/art` e bottone dalla home~~ — scartata
- [x] **B (rapida): SCELTA** — gallery minimale con 5-8 immagini estratte dal PDF portfolio artistico + link social
- [ ] ~~**C (completa):** sezione con gallery, categorie opere, link social~~ — eventuale evoluzione futura

**Implementazione opzione B:**

- [ ] Estrarre 5-8 immagini rappresentative dal PDF `Portfolio-artistico-Oliva-Lorenzo.pdf` e salvarle ottimizzate (WebP) in `public/assets/artPage/`
- [ ] Sostituire il blocco "in manutenzione" con una gallery responsive (griglia/masonry) coerente con lo stile del sito
- [ ] Mantenere i social (`socialNetwork.tsx`) e il link al PDF completo (già in `ModalDocs`)
- [ ] Aggiungere le chiavi i18n in `ArtSection` (titolo sezione, eventuali didascalie) e rimuovere `maintenancePageLabel` dall'uso
- [ ] Coerente con focus "lavoro dev": la gallery sblocca la sezione (non più "in manutenzione", che dà cattiva impressione) ma resta secondaria rispetto a Dev — basta che sia curata e finita, senza investirci quanto sul portfolio dev
- [ ] Decisione tema: definire se la gallery resta su sfondo chiaro ("galleria bianca") o si uniforma al dark del resto (vedi punto 12.1)

**File coinvolti:** `app/[locale]/(routes)/art/page.tsx`, `messages/it.json` + `messages/en.json` (`ArtSection`), nuove immagini in `public/assets/artPage/`. La home (`app/[locale]/page.tsx`) e il bottone "Artista" restano invariati.

**Effort umano:** 2-6h | **Effort agente:** 1-3h (richiede scelta utente su quale opzione) | **Impatto:** alto

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
| 1   | SEO e metadati          | Alta        | 2-3h         | ~20 min       | Alto       |
| 2   | Accessibilita'          | Alta        | 3-4h         | ~30 min       | Alto       |
| 3   | Pagina Art incompleta   | Alta        | 2-6h         | 1-3h \*       | Alto       |
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
| Solo priorita' alta (1-3) | ~7-13h              | ~2-4h             |
| Tutto (1-11)              | ~20-34h             | ~4-7h + verifiche |
| Idee aggiuntive (12)      | da stimare per voce | + verifiche       |

**Approccio consigliato:** partire da SEO (1) + accessibilita' (2) + fix testi (5) — miglior rapporto impatto/effort, nessun redesign. La pagina Art (3, opzione B) è il primo intervento di contenuto. Le idee UI/UX (12) sono mini-redesign da pesare singolarmente, non incluse nel "core".
