# 001 — Pagina Dev: sezioni "Esperienza / Formazione / Chi sono" dal CV

**Data analisi:** 2026-05-31
**Stato:** ⏸️ **IN ATTESA DELLE RISPOSTE UTENTE** (vedi §8). Finché la §8 non è compilata, **non scrivere codice**: produci al massimo un piano.
**Tipo:** documento di handoff (contesto + analisi + domande). NON è ancora un piano esecutivo.
**Origine:** richiesta utente — analizzare `public/doc/dev-doc/CV Lorenzo Oliva.pdf` per capire come arricchire la pagina `/dev` con sezioni su esperienza ed altro.

---

## 0. PER L'AGENTE CHE LEGGE (onboarding) — leggi questo per primo

Stai riprendendo un lavoro in corso su un **sito portfolio personale bilingue (IT/EN)** di Lorenzo Oliva (web developer + artista), in **Next.js 14 App Router** esportato come **sito statico** (`output: "export"`, deploy su Aruba/Apache, **nessun backend/SSR/API/middleware**). Non hai la memoria della conversazione che ha prodotto questo file: ricostruisci il contesto leggendo le fonti qui sotto **prima di agire**.

### Regole d'oro (non negoziabili — dettagli in `CLAUDE.md`)
- **Static export**: niente codice server a runtime. `new Date().getFullYear()` ecc. è ok solo se valutato a build.
- **i18n obbligatoria**: ogni stringa visibile passa da next-intl, e ogni chiave va aggiunta in **entrambi** i file `messages/it.json` **e** `messages/en.json`.
- **CSS utility "nome = valore"** (`CLAUDE.md` §7.1): mai cambiare il valore dietro una classe esistente; se serve un valore nuovo, crea una classe nuova. Nel dubbio sul nome, chiedi.
- **Dati hardcoded** in `(data)/*.tsx`, interfacce in `Interface/*.tsx`, contenuti bilingui come `{ italian, english }`. I componenti UI ricevono dati via props, non importano dati (tranne le pagine).
- **Default server component**; `"use client"` solo se servono hook/eventi/browser API (le cartelle client hanno suffisso `-client`).

### File da leggere PRIMA (in quest'ordine, con motivo)
1. `website-lorenzoliva-next/CLAUDE.md` — regole ingegneristiche complete (static export §8, i18n §6, styling §7, naming §3, vietati §13). **Obbligatorio.**
2. `website-lorenzoliva-next/Architecture.md` — mappa di directory, route, componenti, flusso i18n/dati.
3. **Memoria auto-caricata** (in `~/.claude/.../memory/`, già in contesto a inizio sessione): `MEMORY.md` (indice) → `website-lorenzoliva-decisioni.md` (decisioni di prodotto già prese: focus "lavoro dev", static export senza middleware, pagina Art opzione B, SEO, P.IVA in footer, fix punto 4, ecc.) e `website-lorenzoliva-css-convention.md`. **Verifica sempre sul codice** ciò che la memoria afferma (può essere datata).
4. `0_lorenzoliva_studies/suggestions/001_suggerimenti-miglioramento-sito.md` — roadmap completa del sito. Rilevanti per questo lavoro: **punto 4** (NavbarDev "poco discoverable" → **rinviato** perché fragile), **punto 5** (testi), **punto 12.2** (gerarchia hero Home), **punto 12.3** (tassonomia progetti: future sezioni "Collaborazioni"/"Progetti personali").
5. Codice chiave (leggere prima di toccare):
   - `app/[locale]/(routes)/dev/page.tsx` — la pagina da estendere.
   - `app/[locale]/(components)/(molecules)/NavbarDev-client/NavbarDev.tsx` (+ `(Provider)/HashContext`, `(atoms)/SectionObserver-client/SectionObserver.tsx`) — il **nodo critico**, vedi §3.
   - `app/[locale]/(data)/portfolioProjects.tsx` — pattern dei dati esistenti (`skills`, `links`, `portfolioData`, `thisWebsite`).
   - `app/[locale]/(data)/artworks.tsx` + `app/[locale]/Interface/IArtwork.tsx` — **modello di riferimento** per dati bilingui con ID statici (template ideale per `experiences`/`education`).
   - `app/[locale]/(components)/(organisms)/PortfolioList/PortfolioList.tsx` — esporta `getIcon(requirement)` (riusabile per i tag tecnologici).
   - `messages/it.json` + `messages/en.json` — sezione `DevSection` (chiavi esistenti).
6. `public/doc/dev-doc/CV Lorenzo Oliva.pdf` — fonte dei contenuti (riassunto nella §1, ma rileggilo per i dettagli/tono).

### Come procedere (workflow)
1. Leggi le fonti sopra e **ricostruisci il contesto**.
2. Leggi le **risposte utente nella §8**. Se mancano/incomplete → fermati e chiedi, non improvvisare scelte di contenuto o di scope.
3. Trasforma analisi + risposte in un **piano operativo** (sezioni da creare, dati, i18n, eventuale refactor NavbarDev).
4. Implementa seguendo `CLAUDE.md`; aggiorna **sempre** entrambi i file i18n.
5. **Verifica con `next build`** (export statico 10/10) e controlla l'HTML in `out/`.
6. Aggiorna `Architecture.md` e la memoria (`website-lorenzoliva-decisioni.md`); aggiorna lo **stato** in cima a questo file.

---

## 1. Cosa contiene il CV (materiale grezzo disponibile)

Estratto dal PDF (1 pagina). Contenuti riutilizzabili sul sito:

| Blocco CV                     | Contenuto |
| ----------------------------- | --- |
| **Profilo professionale**     | Sviluppatore Front-end con base solida in HTML/CSS/JavaScript, attenzione al *pixel perfect*; arte e design influenzano positivamente l'approccio al web dev; intenzione di ampliare framework/linguaggi. |
| **Esperienze lavorative** (3) | **1) Web developer full stack — Riverloop srls** (Gen 2025 – presente): progetti commissionati in team; progettazione, Frontend e Backend Next.js, DB Prisma; piattaforme digitali e sistemi di gestione dati, elementi modulari, interfacce e funzionalità avanzate.<br>**2) Docente Web developer — Riverloop srls** (Mar 2025 – presente): lezioni live, supporto formativo.<br>**3) Artista e decoratore di legno e pareti** (2016 – 2024): settore artistico, clienti, creatività, attenzione ai dettagli, metodo e ottimizzazione dei tempi. |
| **Formazione**                | 2024 — Corso Frontend developer full time, Coding Bootcamp **Edgemony**; 2015/2018 — corsi professionali di restauro; 2012 — Diploma **Liceo Artistico** E. Catalano. |
| **Riassunto competenze**      | HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js, GraphQL, Prisma (+ Linktree). |
| **Profilo personale**         | Passione per arte, sport e logica → equilibrio tra creatività, disciplina e pensiero critico. |
| **Contatti**                  | lorenzodev@lorenzoliva.it, **lorenzo.oliva.1308@gmail.com** (personale), tel 3208121031, Palermo, LinkedIn, GitHub. |
| **Titolo CV**                 | "Frontend Web Developer **Junior** \| P.IVA & Artist". |

---

## 2. Stato attuale della pagina `/dev` (verificato sul codice)

`app/[locale]/(routes)/dev/page.tsx` ha **3 sole sezioni**, nell'ordine:

1. `#skills` — griglia icone competenze (da `skills` in `portfolioProjects.tsx`)
2. `#links` — LinkedIn / GitHub / vai-ai-contatti (da `links`)
3. `#portfolio` — "Questo sito" (`thisWebsite`) + "Esercitazioni" (`portfolioData`, 14 progetti)

I contatti vivono nel footer (`#contacts` / `#footer-end`).

**Manca completamente il racconto professionale**: nessuna sezione "Chi sono", "Esperienza", "Formazione". Per un portfolio con focus *lavoro dev / recruiter* è il buco più vistoso ora che le priorità alte (SEO, a11y, Art) sono chiuse.

---

## 3. Nodo tecnico: aggiungere una sezione `/dev` NON è isolato ⚠️

Questo è il punto centrale del "come gestire le modifiche".

- **`SectionObserver`** osserva *tutte* le `<section>` con `querySelectorAll("section")` → una nuova sezione viene tracciata in automatico. **Nessun intervento qui.**
- **`NavbarDev`** invece ha una lista **hardcoded e ordine-sensibile**:
  ```ts
  const labels = ["Skills", "Links", "Portfolio", "Contacts"];
  ```
  Da questa lista derivano: (a) le voci del menu rotondo, (b) gli `href` `#${label.toLowerCase()}`, (c) i path icona `${label.toLowerCase()}-icon.svg`, (d) **la barra di avanzamento verticale**: `pathCompletly = 100 * (indexOfHash / (labels.length - 1))`, con `indexOfHash = labels.indexOf(capitalizeHash)`.
- **Conseguenza critica:** se aggiungo `<section id="experience">` ma NON aggiorno `labels`, quando quella sezione entra in viewport `indexOf` ritorna **-1** → percentuale **negativa** → la barra di avanzamento si rompe / azzera. **Quindi ogni nuova sezione Dev è accoppiata a NavbarDev.**
- NavbarDev è esattamente il componente **fragile** che al punto 4 (file suggerimenti) avevamo deciso di **rinviare** (HashContext + observer + timeout + z-index). Aggiungere sezioni ci obbliga a rimetterci le mani.

### Implicazioni operative per OGNI nuova sezione Dev
1. `<section id="...">` in `dev/page.tsx` (ordine top→bottom = ordine in `labels`).
2. Voce in `NavbarDev.labels` nella **posizione giusta** (l'ordine guida la barra).
3. Nuova **icona** `${id}-icon.svg` (+ eventuale `.png`) in `public/assets/nav-icon/nav-dev-icon/`.
4. **i18n del titolo nel menu**: oggi `title={label === "Contacts" ? t("contactsLabel") : label}` → le voci sono in inglese crudo tranne Contacts. Una voce "Esperienza/Experience" va tradotta → estendere quella logica (meglio: mappare label→chiave i18n).
5. Chiavi i18n della sezione (titolo + contenuti) in `it.json` **e** `en.json`.
6. Eventuali dati in `(data)/*.tsx` + interfaccia in `Interface/*.tsx`.

### Raccomandazione architetturale (riduce il rischio)
Estrarre l'elenco sezioni in **un'unica fonte di verità** condivisa, es. `(data)/devSections.tsx`:
```ts
export const devSections = [
  { id: "skills",    titleKey: "skillsLabel",     icon: "skills-icon.svg" },
  { id: "experience",titleKey: "experienceLabel", icon: "experience-icon.svg" },
  { id: "links",     titleKey: "linkLabel",       icon: "links-icon.svg" },
  { id: "portfolio", titleKey: "portfolioLabel",  icon: "portfolio-icon.svg" },
  { id: "contacts",  titleKey: "contactsLabel",   icon: "contacts-icon.svg" },
];
```
Consumato sia da `dev/page.tsx` (per ordinare/renderizzare) sia da `NavbarDev` (menu + barra + i18n titolo). Così **aggiungere una sezione = un solo edit**, l'ordine resta coerente per costruzione e si sistema en-passant il debito i18n del menu. È un piccolo refactor di NavbarDev, ma mirato e a basso rischio (niente tocco alla logica di hash/observer/timeout).

---

## 4. Proposte di contenuto (mappa CV → sito)

Ordinate per impatto sul focus "lavoro dev".

### 4.1 — "Esperienza" (priorità ALTA) ⭐
Le 3 esperienze del CV. È il contenuto che più manca a un recruiter.
- **Riverloop (full stack)** e **Riverloop (docente)**: lavoro **reale, commissionato, in team** → qualitativamente diverso dalle "Esercitazioni". Smentisce di fatto la nota in memoria "i 14 progetti sono tutti esercitazioni": ora *c'è* esperienza professionale reale (da Gen 2025).
- **Artista/decoratore (2016-2024)**: lega il mondo arte a quello dev (coerente con la narrazione del sito), utile come *background*.
- **Forma suggerita:** timeline / card verticali con `ruolo · azienda · periodo · descrizione · (tag tecnologici riusando `getIcon`)`. Niente screenshot/repo (vedi §5: possibile NDA sui commissionati).

### 4.2 — "Formazione" (priorità MEDIA)
Edgemony 2024, restauro 2015/2018, Liceo Artistico 2012. Blocco compatto (anno · titolo · ente). Rafforza il profilo "arte → tech".

### 4.3 — "Chi sono / Profilo" (priorità DA DECIDERE)
Profilo professionale + personale (arte/sport/logica). **Dove?** Due strade:
- come **sezione `/dev`** (in cima, prima di Skills), oppure
- per **arricchire la Home** (lega col punto 12.2 "gerarchia hero" del file suggerimenti: nome → tagline → CTA → blocco "About").
Da non duplicare con la presentazione Home esistente (`Home.presentationTxt1/2`).

---

## 5. Note di attenzione (content)

- **NDA / riservatezza:** i progetti Riverloop sono *commissionati*. Probabile impossibilità di mostrare screenshot, nome cliente finale o repo. → trattarli come **racconto** (ruolo + cosa hai fatto), non come card portfolio cliccabili. **Da confermare con l'utente cosa è divulgabile** (anche solo "Riverloop srls" come datore).
- **Email personale Gmail** (`lorenzo.oliva.1308@gmail.com`): è nel CV ma **non va messa sul sito** (spam/privacy); il sito usa già `lorenzodev@lorenzoliva.it`. Tenerla fuori.
- **"Junior":** il CV dice "Frontend Web Developer Junior", ma il sito (decisione SEO 2026-05-29) usa tagline **"Web Developer Full Stack"**; e il CV stesso ora dichiara Frontend **+ Backend** (Next.js + Prisma). C'è una piccola tensione *Junior/full-stack* da sciogliere: che etichetta vuoi esporre pubblicamente?
- **Date "presente":** "Gennaio 2025 – presente" / "Marzo 2025 – presente". Tenere "presente" come stringa i18n (no logica data). Coerente con date leggibili del punto 5 testi (file suggerimenti).
- **Tassonomia (collega al punto 12.3 del file suggerimenti):** l'esperienza Riverloop è materiale da **"Collaborazioni"** (sezione futura prevista, oggi vuota). Va deciso se "Esperienza" e "Collaborazioni" sono la stessa cosa o due cose distinte (esperienza = ruoli/timeline; collaborazioni = progetti specifici).

---

## 6. Suggerimenti (sintesi)

1. **Aggiungere "Esperienza" come sezione `/dev`** è l'intervento a maggior valore ora. Ma richiede di toccare NavbarDev → cogliere l'occasione per il **refactor a fonte unica** (`devSections`), così sblocca anche tutte le sezioni future a costo marginale.
2. **Modellare i dati** in `(data)/experiences.tsx` (+ `Interface/IExperience.tsx`) e `(data)/education.tsx`, bilingui `{ italian, english }`, ID statici (come `artworks`/`socialNetwork`), riusando `getIcon` per i tag tecnologici.
3. **Formazione** come secondo blocco, leggero.
4. **Profilo/Chi sono**: deciderne la collocazione (Home vs /dev) prima di scrivere, per non duplicare la presentazione Home.
5. **Aggiornare la memoria** quando si procede: la frase "i 14 progetti sono tutti esercitazioni / niente collaborazioni" non è più del tutto vera (c'è esperienza reale Riverloop).
6. Non reintrodurre la versione "Junior" senza decisione esplicita; allineare al tagline pubblico scelto.

---

## 7. Domande aperte per l'utente

> Le risposte vanno scritte nella **§8**. Qui solo l'elenco con il razionale.

1. **Quali sezioni** aggiungere ora? (a) solo Esperienza · (b) Esperienza + Formazione · (c) Esperienza + Formazione + Chi sono.
2. **Esperienza — dove**: nuova sezione su `/dev` (consigliato, con voce nel menu NavbarDev) o altrove?
3. **NavbarDev**: dato che aggiungere sezioni lo tocca per forza, **refactor a fonte unica `devSections`** (consigliato) o **intervento minimo** sull'array hardcoded?
4. **Progetti Riverloop**: cosa è **divulgabile**? Si può nominare "Riverloop srls"? Solo descrizione del ruolo o anche progetti/clienti? Ci sono NDA?
5. **Etichetta professionale pubblica**: "Web Developer Full Stack" (attuale) o reintrodurre "Junior" / altra dicitura?
6. **"Chi sono"**: su `/dev` o per arricchire la **Home** (gerarchia hero, punto 12.2)?
7. **Formazione**: includere tutto (incl. restauro 2015/2018 e Liceo Artistico) o solo il percorso tech (Edgemony)?
8. **Tassonomia**: "Esperienza" (ruoli/timeline) e le future "Collaborazioni" (progetti, punto 12.3) sono sezioni distinte o le unifichiamo?
9. **Lingua dei contenuti**: fornisci tu i testi IT/EN definitivi o si parte da una **bozza basata sul CV** da validare?

---

## 8. RISPOSTE UTENTE  ⬅️ COMPILARE QUI (l'agente legge da qui)

> Istruzione per l'utente: rispondi sotto ogni voce (anche in forma breve). Istruzione per l'agente: usa **solo** ciò che è scritto qui come decisione; se una risposta manca o è ambigua, **chiedi prima di implementare**.

1. Sezioni da aggiungere: _____
2. Esperienza — collocazione: _____
3. NavbarDev (refactor `devSections` vs intervento minimo): _____
4. Riverloop — cosa è divulgabile (nome azienda / ruoli / progetti / NDA): _____
5. Etichetta pubblica (Full Stack / Junior / altro): _____
6. "Chi sono" — collocazione (Home vs /dev): _____
7. Formazione — ampiezza (tutto / solo tech): _____
8. Tassonomia (Esperienza vs Collaborazioni): _____
9. Testi — chi li fornisce (utente / bozza da validare): _____

**Note libere aggiuntive dell'utente:** _____

---

## 9. File che verranno coinvolti (quando si implementerà)

- `app/[locale]/(routes)/dev/page.tsx` — nuove `<section>`
- `app/[locale]/(components)/(molecules)/NavbarDev-client/NavbarDev.tsx` — menu/barra (refactor o array)
- `app/[locale]/(data)/devSections.tsx` *(nuovo, se refactor)*, `(data)/experiences.tsx` *(nuovo)*, `(data)/education.tsx` *(nuovo)*
- `app/[locale]/Interface/IExperience.tsx`, `IEducation.tsx` *(nuovi)*
- eventuale nuovo organism/molecule per la timeline esperienze + CSS colocato
- `public/assets/nav-icon/nav-dev-icon/experience-icon.svg` (+ altre icone se più sezioni)
- `messages/it.json` + `messages/en.json` — nuova sezione/chiavi `DevSection`
- aggiornare `Architecture.md` (mappa) e la memoria

> **Riferimenti incrociati:** file suggerimenti `0_lorenzoliva_studies/suggestions/001_suggerimenti-miglioramento-sito.md` — punti 4 (NavbarDev rinviato), 5 (testi), 12.2 (hero), 12.3 (tassonomia Collaborazioni/Progetti personali).
