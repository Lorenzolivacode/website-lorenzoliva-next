# 001 — Pagina Dev: sezioni "Esperienza / Formazione / Chi sono" dal CV

**Date:** analisi 2026-05-31 · piano 2026-06-01 · esecuzione e rifiniture 2026-06-01/06-02 · prossimi passi 2026-06-03 (§15)
**Stato:** ✅ **SEZIONE ESPERIENZA COMPLETATA E VERIFICATA** (build statico 10/10, IT+EN). Restano lavori **pianificati per domani** (Skills da CV + 2 sottosezioni Portfolio): vedi §15. Niente push (non è un repo git).
**Tipo:** documento di handoff → piano esecutivo → **log di lavoro**. **Per un nuovo agente: leggere il blocco "★ TL;DR" qui sotto, poi §14 (esecuzione) e §15 (prossimi passi). Le §1–§13 sono la traccia storica delle decisioni (contesto, non stato corrente).**
**Origine:** richiesta utente — analizzare `public/doc/dev-doc/CV Lorenzo Oliva.pdf` per arricchire la pagina `/dev`.

---

## ★ TL;DR PER IL NUOVO AGENTE (leggere per primo)

> Punto di ingresso unico: cosa è **già implementato e verificato** e cosa **resta da fare**. Dettaglio file in §11, log di esecuzione in §14, prossimi passi in §15. Le §0–§13 sono la traccia storica delle decisioni (contesto, non stato corrente).

### Cosa è stato implementato (sezione Esperienza su `/dev`) — DONE, build 10/10, IT+EN

- **Sezione `/dev #experience`**: 2 esperienze **Riverloop srls** (Full Stack, Docente), dati bilingui in `(data)/experiences.tsx` (`Interface/IExperience.tsx`), rese da `(components)/(organisms)/ExperienceList/` (server component; descrizione come `<p>` intero, niente clamp/scroll, vedi §14.2). Testi finali in §12.9.
- **Fonte unica `(data)/devSections.tsx`** (`Interface/IDevSection.tsx`): unico punto-verità per **ordine sezioni + menu NavbarDev + barra di avanzamento + highlight**. `contacts` ha `isPageSection:false` (voce solo-menu, vive nel footer). Toccando solo questo array si aggiungono/riordinano voci.
- **Icone menu NavbarDev = `lucide-react`** (dipendenza nuova): mappa `iconKey`→componente dentro `NavbarDev`. `RoundedIconEl` accetta `Icon` (lucide) **o** `src` (immagine; il trigger `path-icon.png` resta immagine) e impone `txt-c-primary-very-dark` (fix icone "viola" da colore link visitati, §14.4).
- **Atomo `Tag` generico** `(components)/(atoms)/Tag/`: sfondo **semi-trasparente + bordo**, colore via prop (`color="primary"`). Usato per il tech stack delle esperienze. Utility nuove aggiunte (nome=valore): `--color-primary-medium-light-0d3` + `.bg-primary-medium-light-0d3` (color.css), `.border1-p-m-l-0d5` (border.css).
- **Ordine sezioni `/dev` (finale):** **Skills · Experience · Portfolio · Links** (Contacts = footer). Vedi §14.5.
- **i18n** (`DevSection`, IT+EN): aggiunte `navSkills/navLinks/navExperience/navPortfolio/navContacts` (pill menu corte) + `experienceTitle`. Nessun badge "In corso" (ridondante con "presente", §14.3).

### Decisioni bloccate (NON rimettere in discussione)

- Etichetta pubblica **"Web Developer Full Stack"**, mai "Junior".
- **`/dev` resta solo-dev**: niente Formazione, niente "Chi sono" (semmai in Home, task separata).
- **NDA Riverloop**: azienda + ruolo + tipologie di progetto; niente clienti/repo/screenshot; domini tenuti vaghi.
- **Mai il trattino lungo "—" nei testi** (usare `:` / `(...)` / `,`). Memoria: [[no-em-dash]].
- **CSS "nome = valore"** (`CLAUDE.md` §7.1): mai cambiare il valore dietro una classe; crearne una nuova. Confermare sempre che una utility esista prima di usarla (fallimento silenzioso).
- Tassonomia: **Esperienza** (ruoli/timeline) **≠ Collaborazioni** (progetti esterni).

### Prossimi passi (pianificati 2026-06-03) → dettaglio e contesto in §15

1. **Aggiornare la sezione Skills** dai dati del CV (anche valutando la skill "AI-assisted" rinviata).
2. **Aggiungere due sottosezioni al Portfolio** (presumibilmente Collaborazioni + Progetti personali).

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

| Blocco CV                     | Contenuto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Profilo professionale**     | Sviluppatore Front-end con base solida in HTML/CSS/JavaScript, attenzione al _pixel perfect_; arte e design influenzano positivamente l'approccio al web dev; intenzione di ampliare framework/linguaggi.                                                                                                                                                                                                                                                                                                                                          |
| **Esperienze lavorative** (3) | **1) Web developer full stack — Riverloop srls** (Gen 2025 – presente): progetti commissionati in team; progettazione, Frontend e Backend Next.js, DB Prisma; piattaforme digitali e sistemi di gestione dati, elementi modulari, interfacce e funzionalità avanzate.<br>**2) Docente Web developer — Riverloop srls** (Mar 2025 – presente): lezioni live, supporto formativo.<br>**3) Artista e decoratore di legno e pareti** (2016 – 2024): settore artistico, clienti, creatività, attenzione ai dettagli, metodo e ottimizzazione dei tempi. |
| **Formazione**                | 2024 — Corso Frontend developer full time, Coding Bootcamp **Edgemony**; 2015/2018 — corsi professionali di restauro; 2012 — Diploma **Liceo Artistico** E. Catalano.                                                                                                                                                                                                                                                                                                                                                                              |
| **Riassunto competenze**      | HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js, GraphQL, Prisma (+ Linktree).                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Profilo personale**         | Passione per arte, sport e logica → equilibrio tra creatività, disciplina e pensiero critico.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Contatti**                  | lorenzodev@lorenzoliva.it, **lorenzo.oliva.1308@gmail.com** (personale), tel 3208121031, Palermo, LinkedIn, GitHub.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Titolo CV**                 | "Frontend Web Developer **Junior** \| P.IVA & Artist".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

---

## 2. Stato attuale della pagina `/dev` (verificato sul codice)

`app/[locale]/(routes)/dev/page.tsx` ha **3 sole sezioni**, nell'ordine:

1. `#skills` — griglia icone competenze (da `skills` in `portfolioProjects.tsx`)
2. `#links` — LinkedIn / GitHub / vai-ai-contatti (da `links`)
3. `#portfolio` — "Questo sito" (`thisWebsite`) + "Esercitazioni" (`portfolioData`, 14 progetti)

I contatti vivono nel footer (`#contacts` / `#footer-end`).

**Manca completamente il racconto professionale**: nessuna sezione "Chi sono", "Esperienza", "Formazione". Per un portfolio con focus _lavoro dev / recruiter_ è il buco più vistoso ora che le priorità alte (SEO, a11y, Art) sono chiuse.

---

## 3. Nodo tecnico: aggiungere una sezione `/dev` NON è isolato ⚠️

Questo è il punto centrale del "come gestire le modifiche".

- **`SectionObserver`** osserva _tutte_ le `<section>` con `querySelectorAll("section")` → una nuova sezione viene tracciata in automatico. **Nessun intervento qui.**
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
  { id: "skills", titleKey: "skillsLabel", icon: "skills-icon.svg" },
  {
    id: "experience",
    titleKey: "experienceLabel",
    icon: "experience-icon.svg",
  },
  { id: "links", titleKey: "linkLabel", icon: "links-icon.svg" },
  { id: "portfolio", titleKey: "portfolioLabel", icon: "portfolio-icon.svg" },
  { id: "contacts", titleKey: "contactsLabel", icon: "contacts-icon.svg" },
];
```

Consumato sia da `dev/page.tsx` (per ordinare/renderizzare) sia da `NavbarDev` (menu + barra + i18n titolo). Così **aggiungere una sezione = un solo edit**, l'ordine resta coerente per costruzione e si sistema en-passant il debito i18n del menu. È un piccolo refactor di NavbarDev, ma mirato e a basso rischio (niente tocco alla logica di hash/observer/timeout).

> ⚠️ **Correzioni verificate sul codice (2026-06-01)** — l'esempio `devSections` sopra è incompleto su due punti, da recepire nel piano:
>
> 1. **`contacts` NON è una `<section>` di `/dev`.** Nel codice i contatti vivono nel footer (`#section-contacts` / `#footer-end`); `dev/page.tsx` ha solo `skills`/`links`/`portfolio`, mentre `labels` include comunque `"Contacts"`. Quindi `devSections` **non può** essere usato ingenuamente come "renderizza tutte le sezioni" dalla pagina: `contacts` è una voce **solo-menu** che punta a un'ancora esterna. Serve distinguerla, es. con un flag `isPageSection: false` (oppure due liste: voci-menu vs sezioni-pagina). Senza questo, una pagina che renderizza l'array genererebbe una sezione `contacts` fantasma.
> 2. **Terzo consumer di `labels`:** oltre a (a) menu, (b) `href`, (c) path icona, (d) barra di avanzamento, c'è **`compareIndex`** (`NavbarDev.tsx` righe 54-65) che decide l'highlight "attivo" di tutte le icone fino a quella corrente, sempre via `labels.indexOf`. Il refactor a fonte unica deve alimentare **anche** `compareIndex` dalla stessa lista (cambio meccanico — è già lo stesso array — ma va incluso esplicitamente per non lasciare un secondo punto-verità).

---

## 4. Proposte di contenuto (mappa CV → sito)

Ordinate per impatto sul focus "lavoro dev".

### 4.1 — "Esperienza" (priorità ALTA) ⭐

Le 3 esperienze del CV. È il contenuto che più manca a un recruiter.

- **Riverloop (full stack)** e **Riverloop (docente)**: lavoro **reale, commissionato, in team** → qualitativamente diverso dalle "Esercitazioni". Smentisce di fatto la nota in memoria "i 14 progetti sono tutti esercitazioni": ora _c'è_ esperienza professionale reale (da Gen 2025).
- **Artista/decoratore (2016-2024)**: lega il mondo arte a quello dev (coerente con la narrazione del sito), utile come _background_.
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

- **NDA / riservatezza:** i progetti Riverloop sono _commissionati_. Probabile impossibilità di mostrare screenshot, nome cliente finale o repo. → trattarli come **racconto** (ruolo + cosa hai fatto), non come card portfolio cliccabili. **Da confermare con l'utente cosa è divulgabile** (anche solo "Riverloop srls" come datore).
- **Email personale Gmail** (`lorenzo.oliva.1308@gmail.com`): è nel CV ma **non va messa sul sito** (spam/privacy); il sito usa già `lorenzodev@lorenzoliva.it`. Tenerla fuori.
- **"Junior":** il CV dice "Frontend Web Developer Junior", ma il sito (decisione SEO 2026-05-29) usa tagline **"Web Developer Full Stack"**; e il CV stesso ora dichiara Frontend **+ Backend** (Next.js + Prisma). C'è una piccola tensione _Junior/full-stack_ da sciogliere: che etichetta vuoi esporre pubblicamente?
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

## 8. RISPOSTE UTENTE ⬅️ COMPILARE QUI (l'agente legge da qui)

> Istruzione per l'utente: rispondi sotto ogni voce (anche in forma breve). Istruzione per l'agente: usa **solo** ciò che è scritto qui come decisione; se una risposta manca o è ambigua, **chiedi prima di implementare**.

1. Sezioni da aggiungere: (a)
2. Esperienza — collocazione: (dev, fra link e portfolio)
3. NavbarDev (refactor `devSections` vs intervento minimo): (se la consigli, fonte unica)
4. Riverloop — cosa è divulgabile (nome azienda / ruoli / progetti / NDA): (Si può nominare "Riverloop srls", descrizione del ruolo e tipologie di progetti)
5. Etichetta pubblica (Full Stack / Junior / altro): (valuta in base alle competenze emerse dal cv)
6. "Chi sono" — collocazione (Home vs /dev): (/dev deve riguardare solo ambito dev, possiamo ampliare la home, senza snaturare o dilungarci)
7. Formazione — ampiezza (tutto / solo tech): (non inseriamo > interessa solo ambito dev e non è sufficente, omettiamo)
8. Tassonomia (Esperienza vs Collaborazioni): (sono distinte, nelle collab andranno altri progetti esterni non direttamente collegati al lavoro)
9. Testi — chi li fornisce (utente / bozza da validare): (bozza da validare in base a ciò che viene elaborato a partire dal cv)

**Note libere aggiuntive dell'utente:** **\_**

---

## 10. Valutazione risposte §8 + domande residue (2026-06-01)

Risposte §8 lette e valutate sul codice. **Coerenti tra loro e con lo scope minimale** del `CLAUDE.md`: 1 + 6 + 7 disegnano la stessa linea ("/dev resta dev, una sola sezione nuova, niente riempitivi"). Sotto: esito per voce, poi le **decisioni recepite** e le **domande residue**.

### 10.1 — Esito per voce

| #   | Risposta utente                                               | Esito                                                                                                                      |
| --- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Solo Esperienza (a)                                           | ✅ Scope chiuso. **Questa task = UNA sola sezione.** L'arricchimento "chi sono" in Home diventa task separata futura.      |
| 2   | Esperienza tra Links e Portfolio                              | ⚠️ Legittima ma vedi alternativa in §10.3-C. Ordine risultante: `Skills · Links · Experience · Portfolio · Contacts`.      |
| 3   | NavbarDev: deleghi la scelta                                  | ✅ **Confermo fonte unica `devSections`** — ma con le 2 correzioni di §3 (contacts non-sezione + `compareIndex`).          |
| 4   | Riverloop: nome + ruolo + tipologie progetto, no clienti/repo | ✅ Chiaro e prudente su NDA. Trattare come **racconto**, non card cliccabili.                                              |
| 5   | Etichetta: deleghi la scelta                                  | → Raccomandazione in §10.2; conferma richiesta in §10.3-B.                                                                 |
| 6   | Chi sono fuori da /dev, eventualmente Home                    | ✅ "Chi sono" **non entra in questa task** (lega al punto 12.2 hero, lavoro Home separato).                                |
| 7   | Formazione omessa                                             | ✅ Coerente con 1(a). Indebolisce un filo la narrazione arte→tech, ma scelta esplicita.                                    |
| 8   | Esperienza ≠ Collaborazioni                                   | ✅ Esperienza = ruoli/timeline (Riverloop); Collaborazioni (futuro) = progetti esterni. Da aggiornare memoria (vedi §6.5). |
| 9   | Bozza testi IT/EN dal CV, da validare                         | ✅ L'agente produce bozza, l'utente valida.                                                                                |

### 10.2 — Decisioni recepite (default operativi)

- **Scope:** una sola sezione nuova `Experience` su `/dev`. Niente Formazione, niente "Chi sono" qui.
- **Refactor:** fonte unica `devSections` con flag `isPageSection` (per gestire `contacts`) e wiring di `compareIndex` (vedi §3, correzioni).
- **Riverloop:** raccontato come ruolo + tipologie di progetto; "Riverloop srls" nominabile; nessun cliente/repo/screenshot.
- **Etichetta (raccomandazione):** mantenere **"Web Developer Full Stack"**, **non** reintrodurre "Junior". Razionale: (a) coerenza con decisione SEO 2026-05-29 già in memoria; (b) il CV documenta FE **+** BE (Next.js full stack, Prisma, DB) → "Full Stack" è onesto; (c) "Junior" in un hero di portfolio si auto-limita senza aggiungere informazione. L'anzianità (~da Gen 2025) si comunica con le **date**, non con l'etichetta.
- **Memoria:** correggere la nota "i 14 progetti sono tutti esercitazioni / niente collaborazioni" → ora c'è esperienza professionale reale (Riverloop, Gen 2025).

### 10.3 — Domande residue ⬅️ COMPILARE QUI (chiudere prima del piano)

> Istruzione utente: rispondi sotto ogni voce. Istruzione agente: senza queste risposte, redigi il piano usando i **default consigliati** indicati, ma **non scrivere codice**.

**A — Icona `experience-icon.svg`.** Il menu NavbarDev richiede un'icona per la nuova voce in `public/assets/nav-icon/nav-dev-icon/`. Le altre voci usano asset esistenti. La fornisci tu o procedo con un placeholder/SVG provvisorio da sostituire?
_Default consigliato:_ placeholder provvisorio, da sostituire con asset definitivo.
**Risposta:** usa icona di lucide react, stesa cosa per gli altri step, scegli tu

**B — Etichetta pubblica.** Confermi la raccomandazione §10.2 ("Web Developer Full Stack", niente "Junior")?
_Default consigliato:_ sì (mantieni Full Stack).
**Risposta:** ok

**C — Ordine della sezione.** Confermi `Experience` **tra Links e Portfolio**, o preferisci l'alternativa `Skills · Experience · Portfolio · … · Links` (tiene vicini i blocchi "cosa so / cosa ho fatto davvero / cosa ho costruito", spinge i social più in basso — narrazione più orientata al recruiter)?
_Default consigliato:_ la tua scelta attuale (tra Links e Portfolio) — Esperienza e Portfolio restano adiacenti.
**Risposta:** ok

### 10.4 — Esito §10.3 + micro-conferme recepite (2026-06-01)

- **A → lucide-react** (utente: "usa lucide-react, stessa cosa per gli altri step, scegli tu"). Recepito: si introduce la dipendenza `lucide-react` e si **migra l'intero set di icone del menu NavbarDev** (Skills, Links, Experience, Portfolio, Contacts) a componenti lucide. Set scelto: `Skills→Wrench`, `Experience→Briefcase`, `Links→Link2`, `Portfolio→FolderGit2`, `Contacts→Mail`. Dettagli e implicazioni architetturali in §12.2–12.4.
- **B → etichetta "Web Developer Full Stack", niente "Junior"** (utente: "ok"). Confermato.
- **C → ordine `Skills · Links · Experience · Portfolio · Contacts`** (utente: "ok"). Confermato.
- **Micro-conferme prese come default** (non bloccanti, vedi feedback 2026-06-01):
  1. **Ok introdurre la dipendenza** `lucide-react` (deviazione consapevole dalla convenzione "icone come asset in `public/`"; da registrare in memoria).
  2. **"Altri step" = solo le voci del menu NavbarDev.** Le icone della **griglia Skills** e dei **Links** in pagina sono **brand/logo = contenuto** → restano asset `next/image`, **non** si toccano.

---

## 11. File che verranno coinvolti (quando si implementerà)

- `app/[locale]/(routes)/dev/page.tsx` — nuove `<section>`
- `app/[locale]/(components)/(molecules)/NavbarDev-client/NavbarDev.tsx` — menu/barra (refactor o array)
- `app/[locale]/(data)/devSections.tsx` _(nuovo, se refactor)_, `(data)/experiences.tsx` _(nuovo)_, `(data)/education.tsx` _(nuovo)_
- `app/[locale]/Interface/IExperience.tsx`, `IEducation.tsx` _(nuovi)_
- eventuale nuovo organism/molecule per la timeline esperienze + CSS colocato
- `public/assets/nav-icon/nav-dev-icon/experience-icon.svg` (+ altre icone se più sezioni)
- `messages/it.json` + `messages/en.json` — nuova sezione/chiavi `DevSection`
- aggiornare `Architecture.md` (mappa) e la memoria

> **Riferimenti incrociati:** file suggerimenti `0_lorenzoliva_studies/suggestions/001_suggerimenti-miglioramento-sito.md` — punti 4 (NavbarDev rinviato), 5 (testi), 12.2 (hero), 12.3 (tassonomia Collaborazioni/Progetti personali).

---

## 12. PIANO OPERATIVO (2026-06-01)

> Obiettivo: aggiungere la sezione **Experience** su `/dev` (tra Links e Portfolio), introdurre la **fonte unica `devSections`**, **migrare le icone del menu NavbarDev a lucide-react**, modellare i **dati esperienze** bilingui e fornire una **bozza testi IT/EN** da validare. Implementazione **dopo** l'ok a questo piano. Tutto deve restare compatibile con lo **static export** (`CLAUDE.md` §8) e passare da next-intl in **entrambi** i locale (§6).

### 12.1 — Dipendenza nuova

- `npm install lucide-react` → entra in `package.json` `dependencies`. Compatibile con `output: "export"` (sono componenti SVG React, resi dentro `NavbarDev` che è già `"use client"`; tree-shakeable, peso trascurabile).

### 12.2 — Fonte unica `devSections` — `app/[locale]/(data)/devSections.tsx` _(nuovo)_

Risolve l'accoppiamento descritto in §3. Dati **puri** (nessun import di UI): l'icona è una **chiave-stringa**, non il componente.

```ts
import { IDevSection } from "../Interface/IDevSection";

// Ordine = ordine visivo in pagina e nel menu (guida la barra di avanzamento).
// isPageSection=false → voce solo-menu (contacts vive nel footer, non è una <section> di /dev).
export const devSections: IDevSection[] = [
  {
    id: "skills",
    titleKey: "navSkills",
    iconKey: "skills",
    isPageSection: true,
  },
  { id: "links", titleKey: "navLinks", iconKey: "links", isPageSection: true },
  {
    id: "experience",
    titleKey: "navExperience",
    iconKey: "experience",
    isPageSection: true,
  },
  {
    id: "portfolio",
    titleKey: "navPortfolio",
    iconKey: "portfolio",
    isPageSection: true,
  },
  {
    id: "contacts",
    titleKey: "navContacts",
    iconKey: "contacts",
    isPageSection: false,
  },
];
```

- `Interface/IDevSection.tsx` _(nuovo)_: `{ id: string; titleKey: string; iconKey: string; isPageSection: boolean }`.
- **`titleKey` dedicati al menu** (`navSkills`…`navContacts`): tengono la pill **corta**. Necessario perché il titolo della pill è anche il `<p>` sotto l'icona in `RoundedIconEl`; riusare `portfolioLabel` ("Portfolio progetti") allungherebbe la pill → regressione di layout. Vedi §12.8-A.
- Il **link** di ogni voce resta derivato `#${id}` (comportamento attuale invariato, contacts→`#contacts`). `isPageSection` **non** tocca il link: governa solo cosa renderizza la pagina (vedi §12.5).

### 12.3 — Refactor `NavbarDev` — `(components)/(molecules)/NavbarDev-client/NavbarDev.tsx`

Sostituisce l'array hardcoded `labels` con `devSections`. Mappa **iconKey → componente lucide** (la mappa vive nel client, non nei dati):

```tsx
import { Wrench, Link2, Briefcase, FolderGit2, Mail } from "lucide-react";
const DEV_ICONS = {
  skills: Wrench,
  links: Link2,
  experience: Briefcase,
  portfolio: FolderGit2,
  contacts: Mail,
};
```

Interventi puntuali (niente tocco a HashContext / observer / timeout):

- `navDevList` deriva da `devSections`: `{ id, link: '#'+id, Icon: DEV_ICONS[s.iconKey], titleKey }`.
- **Barra di avanzamento**: `indexOfHash = devSections.findIndex(s => s.id === hash)` (via `id`, niente più capitalize); denominatore `devSections.length - 1`; resta il caso speciale `footer-end → 100`.
- **`compareIndex`** (terzo consumer, §3): riscritto su `devSections.findIndex(s => s.id === id) <= indexOfHash || hash === "footer-end"`.
- **Titolo i18n per TUTTE le voci**: `t(section.titleKey)` (sana il debito i18n del menu — prima solo "Contacts" era tradotto).
- Le icone passano da `<Image src=".svg">` a componente lucide → vedi §12.4. Spariscono i path `${id}-icon.svg`; gli SVG in `public/assets/nav-icon/nav-dev-icon/` diventano inutilizzati (lasciati lì, non bloccanti).
- **Trigger rotondo** (`path-icon.png`): **resta com'è** (non è uno "step"; default §12.8 lo conferma).

### 12.4 — Refactor atomo `RoundedIconEl` — `(components)/(atoms)/RoundedIconEl/RoundedIconEl.tsx`

Usato **solo** da NavbarDev (verificato) → blast-radius contenuto. Reso **retro-compatibile** per non rompere il trigger (che usa ancora `src` PNG):

- Props: rendere `src?: string` opzionale e aggiungere `Icon?: LucideIcon`.
- Render: se `Icon` presente → `<Icon size={24} aria-hidden />`; altrimenti → `<Image …>` come oggi (trigger).
- `alt` diventa opzionale (icona decorativa); il testo accessibile resta il `title` mostrato sotto.

### 12.5 — Pagina `/dev` — `app/[locale]/(routes)/dev/page.tsx`

- Inserire `<section id="experience" className="section-code-page …">` **tra** `#links` e `#portfolio` (ordine = `devSections`). `SectionObserver` la traccia in automatico (`querySelectorAll("section")`, §3).
- Heading `h2` con `t("experienceTitle")`; rendering della lista esperienze tramite il nuovo organism (§12.6), dati passati via props: `<ExperienceList data={experiences} />`.
- **Nota onesta sull'`isPageSection`**: il markup delle sezioni è bespoke (skills-grid, links-list, portfolio ≠ generici), quindi la pagina **non** itera `devSections` per generare le sezioni; le sezioni restano JSX esplicito **ordinato a mano** per combaciare con `devSections`. `isPageSection` resta come campo di verità/guardia (distingue `contacts` nav-only) e per usi futuri, non come motore di rendering in questa iterazione.

### 12.6 — Dati esperienze + interfaccia + UI

- `Interface/IExperience.tsx` _(nuovo)_:
  ```ts
  import { IDescriptionPData } from "./IPortfolioProject"; // { italian; english }
  export interface IExperience {
    id: string;
    role: IDescriptionPData; // ruolo (bilingue)
    company: string; // "Riverloop srls" (invariato nelle due lingue)
    period: IDescriptionPData; // "Gen 2025 – presente" / "Jan 2025 – present" (stringa, NO logica data)
    description: IDescriptionPData; // racconto bilingue
    tech: string[]; // tag tecnologici (pill testuali, vedi §12.8-B)
    current: boolean; // ruolo in corso (badge opzionale)
  }
  ```
- `(data)/experiences.tsx` _(nuovo)_: ID statici (come `artworks`), contenuti `{ italian, english }`, **solo le 2 esperienze dev Riverloop** (full stack + docente). L'esperienza **Artista/decoratore (2016-2024) è OMESSA** da `/dev` perché non-dev (coerente con §8.6 "/dev solo ambito dev"); vive semmai nella narrazione Art. Vedi §12.8-C.
- `(components)/(organisms)/ExperienceList/ExperienceList.tsx` + `ExperienceList.css` _(nuovi)_: **server component** (nessuna interattività), riceve `data: IExperience[]` via props, sceglie il campo bilingue con `useLocale()` (come `ParagraphList`). Card verticali: `ruolo · azienda · periodo · descrizione · tech pills`. Etichette statiche (es. badge "In corso") via `useTranslations`. Rispettare `CLAUDE.md` §10 (≤200-300 righe) e §7 (utility class esistenti; se serve un valore nuovo, **creare** la classe con nome=valore o **chiedere**, §7.1).

### 12.7 — i18n (`messages/it.json` + `messages/en.json`, sezione `DevSection`, **stesse chiavi in entrambi**)

Nuove chiavi (testi strutturali; i contenuti delle esperienze stanno nei **dati**, non qui):
| chiave | IT | EN |
| - | - | - |
| `navSkills` | Skills | Skills |
| `navLinks` | Link | Links |
| `navExperience` | Esperienza | Experience |
| `navPortfolio` | Portfolio | Portfolio |
| `navContacts` | Contatti | Contacts |
| `experienceTitle` | Esperienza | Experience |
| `currentRole` | In corso | Current |
_(le esistenti `skillsLabel/linkLabel/portfolioLabel/contactsLabel` restano per gli `h2`/contenuti di pagina; le `nav_` sono le versioni corte per le pill del menu.)\*

### 12.8 — Micro-decisioni di contenuto/UX (default consigliati — confermabili o modificabili)

- **A — Pill menu corte (`nav*` keys):** _default_ introdurre chiavi corte dedicate per non allungare le pill. Alternativa: riusare le label esistenti (ma "Portfolio progetti" rischia di rompere il layout della pill).
- **B — Tag tecnologici nelle esperienze = pill testuali:** _default_ testo (es. `Next.js · TypeScript · Prisma`), perché `getIcon` **non** ha i loghi di Prisma/GraphQL e si è scelto lucide per le icone-UI (no nuovi asset brand). Alternativa: aggiungere i loghi mancanti e riusare `getIcon` (più asset da reperire).
- **C — Artista/decoratore (2016-2024) OMESSO da /dev:** _default_ omettere (non-dev, coerente con §8.6). Alternativa: una riga di _background_ in fondo alla sezione.

### 12.9 — Contenuti bozza esperienze v2 (rielaborata da §13 — da validare)

Vincolo NDA (§8.4): "Riverloop srls" nominabile, ruolo + tipologie di progetto, **niente** clienti/repo/screenshot. Fonte: risposte §13 (nessun dettaglio inventato). **Scelta utente (2026-06-01):** restare **vaghi** sui domini specifici (no "scolastico/ristorazione" espliciti). **Pothos confermato** come schema-builder GraphQL.

**1) Web Developer Full Stack — Riverloop srls — Gen 2025 – presente** (`current: true`)

- IT: «Sviluppo full stack di applicazioni web commissionate in un team ristretto, con piena autonomia: dalla progettazione e dallo studio architetturale fino al rilascio. Ho realizzato gestionali e piattaforme SaaS in ambiti differenti, alcune con funzionalità basate su AI. Lato backend curo in prima persona la modellazione dei dati e le API: PostgreSQL con Prisma e un layer GraphQL (Pothos). Lato frontend sviluppo l'interfaccia in Next.js e React, con attenzione all'UX/UI, definendone spesso il design in autonomia. Integro stabilmente strumenti di AI nel flusso di lavoro — non solo per generare codice, ma per studio, pianificazione e ragionamento architetturale — gestendo il processo in modo strutturato e con revisione critica.»
- EN: «Full-stack development of commissioned web applications in a small team, with full autonomy: from design and architectural planning through to delivery. I built management systems and SaaS platforms across different sectors, some featuring AI-based functionality. On the backend I personally handle data modelling and APIs: PostgreSQL with Prisma and a GraphQL layer (Pothos). On the frontend I develop the interface in Next.js and React, with care for UX/UI, often defining the design myself. I consistently integrate AI tools into my workflow — not just to generate code, but for study, planning and architectural reasoning — running the process in a structured, critically-reviewed way.»
- tech: `Next.js · React · TypeScript · PostgreSQL · Prisma · GraphQL (Pothos)`

**2) Docente Web Developer — Riverloop srls — Mar 2025 – presente** (`current: true`)

- IT: «Docente di sviluppo web per studenti adulti principianti, in gruppi di circa dieci persone. Tengo lezioni teorico-pratiche strutturate, incentrate su JavaScript, React e Next.js, e preparo personalmente il materiale didattico — slide, esercizi e lezioni organizzate su Notion.»
- EN: «Web development instructor for adult beginner students, in groups of around ten. I deliver structured theory-and-practice lessons focused on JavaScript, React and Next.js, and I personally prepare the teaching materials — slides, exercises and lessons organised in Notion.»
- tech: `JavaScript · React · Next.js`

`period` bilingue: IT "Gen 2025 – presente" / EN "Jan 2025 – present"; IT "Mar 2025 – presente" / EN "Mar 2025 – present".
`role` bilingue: IT "Web Developer Full Stack" / EN "Full Stack Web Developer"; IT "Docente Web Developer" / EN "Web Development Instructor".

**Skill "AI-assisted development" (§13.10-12) — collocazione:**

- **Ora:** integrata come **frase finale nella descrizione Riverloop Full Stack** (sopra), inquadrata sul _metodo_ (studio/pianificazione/architettura + revisione critica), non come slogan — coerente con lo stile di lavoro metodico e pianificato che emerge dalla memoria di progetto.
- **Poi:** quando le `skills` verranno aggiornate (nota §13: "le skills andranno aggiornate in base al CV"), aggiungere una voce dedicata. Nota tecnica: la griglia `skills` usa loghi brand PNG; per l'AI non esiste un logo asset → si userebbe un'icona lucide (`Sparkles`/`Bot`), piccola deviazione coerente con l'adozione di lucide nel menu. **Fuori scope di questa task** (rientra nell'update skills futuro).

### 12.10 — Ordine di implementazione (quando approvato)

1. `npm install lucide-react`.
2. `Interface/IDevSection.tsx` + `(data)/devSections.tsx`.
3. Refactor `RoundedIconEl` (supporto `Icon`), poi `NavbarDev` (devSections + mappa lucide + barra/compareIndex/i18n).
4. `Interface/IExperience.tsx` + `(data)/experiences.tsx` (bozza §12.9).
5. `ExperienceList` (organism + css).
6. `dev/page.tsx`: nuova `<section id="experience">` tra links e portfolio.
7. i18n: nuove chiavi in **it.json + en.json** (§12.7).
8. **`next build`** → static export 10/10; ispezione `out/` (HTML sezione + menu) nei due locale.
9. Aggiornare `Architecture.md` (nuovi file/dep) e **memoria** (`website-lorenzoliva-decisioni.md`): sezione Experience aggiunta, lucide adottato, etichetta "Full Stack" confermata, correggere la nota "14 progetti = tutte esercitazioni" (ora c'è esperienza reale Riverloop). Aggiornare lo **stato** in cima a questo file.

### 12.11 — Rischi & non-obiettivi

- **Rischi:** (a) layout pill menu se le label sono lunghe → mitigato da `nav*` corte (§12.8-A); (b) barra avanzamento se l'indice non trova l'id → mitigato dal passaggio a `findIndex(id)` e dal caso `footer-end`; (c) dimenticare una chiave i18n in un solo locale → check finale su entrambi i file (§13 CLAUDE.md).
- **Non-obiettivi (fuori scope qui):** Formazione (§8.7), "Chi sono"/arricchimento Home (§8.6, task separata), sezione "Collaborazioni" (§8.8, futura), refactor profondo di HashContext/observer (punto 4 suggerimenti, resta rinviato).

---

## 13. Interviste esperienze Riverloop (COMPATTATO) — esiti canonici in §12.9 + `(data)/experiences.tsx`

> Domande mirate per concretizzare le descrizioni; risposte recepite e già fuse nei contenuti finali. Sintesi dei fatti (NDA: niente clienti/repo/screenshot):
>
> - **Full Stack:** gestionali/SaaS in ambiti vari (alcune con AI); backend in prima persona (PostgreSQL + Prisma, layer GraphQL/Pothos); frontend Next.js/React con UX/UI spesso in autonomia; team di 2 pari, autonomia totale, sprint autogestiti, studio architetturale sugli ultimi progetti; ~2-3 mesi in solitaria sugli ultimi due.
> - **Docente:** adulti principianti (~10), lezioni teorico-pratiche su JS/React/Next.js, materiale proprio (slide/esercizi/Notion).
> - **AI come metodo** (studio/pianificazione/architettura + revisione critica): resa come frase finale nella descrizione full-stack; voce skill dedicata rinviata.
> - Nota utente: le skills andranno aggiornate in base al CV (poi fatto, §15.1/§16).

---

## 14. ESITO ESECUZIONE (2026-06-01)

Implementazione completata in autonomia secondo la sequenza §12.10. Build statico **10/10** (`/it/dev` + `/en/dev` inclusi); contenuti verificati nell'HTML di `out/` in entrambi i locale (sezione `id="experience"`, "Pothos", "In corso" / "Current", "Full Stack Web Developer"). I warning di build (autoprefixer in `flex.css`, `react-hooks/exhaustive-deps` in file preesistenti) **non** sono stati introdotti da questo lavoro.

**Dipendenza:** `lucide-react` aggiunta a `package.json`.

**File creati:**

- `app/[locale]/Interface/IDevSection.tsx`
- `app/[locale]/Interface/IExperience.tsx`
- `app/[locale]/(data)/devSections.tsx`
- `app/[locale]/(data)/experiences.tsx`
- `app/[locale]/(components)/(organisms)/ExperienceList/ExperienceList.tsx`
- `app/[locale]/(components)/(organisms)/ExperienceList/ExperienceList.css`

**File modificati:**

- `app/[locale]/(components)/(atoms)/RoundedIconEl/RoundedIconEl.tsx` (prop `Icon` lucide oppure `src` immagine)
- `app/[locale]/(components)/(molecules)/NavbarDev-client/NavbarDev.tsx` (fonte unica `devSections` + mappa icone lucide + barra/`compareIndex`/i18n su `id`)
- `app/[locale]/(routes)/dev/page.tsx` (nuova `<section id="experience">` tra links e portfolio)
- `messages/it.json` + `messages/en.json` (chiavi `navSkills/navLinks/navExperience/navPortfolio/navContacts`, `experienceTitle`, `currentRole`)
- `Architecture.md`, memoria `website-lorenzoliva-decisioni.md` + `MEMORY.md`

**Default UX applicati:** badge "In corso/Current" sì; nessuna intro di sezione. **Skill AI** resa come frase finale della descrizione full-stack; voce skill dedicata rinviata al futuro update `skills`. **Note di stile:** nessun trattino lungo nei testi.

**Aperti per dopo (non in questa task):** voce skill "AI-assisted" nella griglia (icona lucide `Sparkles`/`Bot`) al prossimo update skills; pulizia SVG `nav-dev-icon/*.svg` ora inutilizzati (lasciati in `public/`, non bloccanti).

### 14.1 — Rifiniture grafiche post-review (2026-06-01)

Confronto della card esperienza con gli altri elementi `/dev` (portfolio/links/section-code-page) e correzioni:

- **Badge "In corso/Current":** era `bg-x-p-sat-ml-l` (gradiente navy→azzurro→navy, illeggibile col testo scuro ai bordi: bug). Ora **`bg-primary-sat-medium` (#00436d) + `txt-c-primary-very-light`** (contrasto alto, accento blu coerente).
- **Pill tech → atomo `Tag` generico (nuovo):** `(components)/(atoms)/Tag/` (server component) con sfondo **semi-trasparente + bordo** e colore via prop (`color`, default `"primary"` → `bg-primary-medium-light-0d3` + `border1-p-m-l-0d5` + testo chiaro). Usato per il tech stack delle esperienze (`<Tag label={tech} color="primary" />`). Riutilizzabile altrove; nuovi colori = nuova voce nella mappa `TAG_COLOR_CLASS` con utility esistenti. Rimossa la pill ad-hoc `experience-tech-pill`; hook lista rinominato `technical-list` → `experience-tech-list`. **Nuove utility aggiunte (convenzione nome=valore):** var `--color-primary-medium-light-0d3` (rgba 0.3) + `.bg-primary-medium-light-0d3` (color.css); `.border1-p-m-l-0d5` (border.css, riusa la var `-0d5` esistente).
- **Superficie card → opzione B (scelta utente):** rimosso il pannello scuro pieno `bg-primary-very-dark-0d6`; la card è ora **trasparente con `shadow-light-small` + `radius-20px`**, mirror in piccolo di `.section-code-page` per massima coerenza col linguaggio "contenitore" della pagina.

Build statico **10/10** ri-verificato dopo ogni modifica.

### 14.2 — Fix scroll verticale forzato nella descrizione esperienza (2026-06-01)

**Sintomo:** scrollbar verticale interna alla card esperienza, senza motivo apparente. **Causa (misurata, non ipotizzata):** la descrizione riusava `ParagraphList`, che applica `overflow-auto grow-1 max-h-80p`; in quel contesto flex `max-height:80%` **si risolve davvero** (clamp a ~207px su contenuto ~379px) → scrollbar interna. Misura via Edge headless + `puppeteer-core` (dep temporanea installata per il debug e **poi rimossa**) sul dev server: il `<p>` esperienza compariva tra gli `innerScrollers`. **Fix:** nelle esperienze la descrizione va mostrata per intero → rimosso `ParagraphList`, sostituito con `<p className="f-size-0d95-1d05">{exp.description[lang]}</p>` (la card cresce col contenuto). **Verifica:** nell'HTML servito la descrizione è ora un `<p>` semplice e in pagina resta un solo `max-h-80p` (la card portfolio "Questo sito", preesistente e voluta). Le descrizioni del portfolio (`max-h-50p`/`80p`) restano invariate: lì lo scroll è intenzionale nelle card ad aspect-ratio fisso.

### 14.3 — Rimosso badge "In corso/Current" (2026-06-02)

Ridondante col periodo ("Gen 2025 – presente" dice già che è in corso). Rimosso il badge dalla card; `useTranslations` non più necessario in `ExperienceList`; chiave i18n `currentRole` eliminata da it.json + en.json; regole CSS `.experience-badge`/`.experience-meta` rimosse; il periodo è ora un `<p className="experience-period">` allineato in alto. Il campo dati `current` resta nel modello (metadato legittimo, disponibile per un eventuale indicatore visivo non testuale in futuro, es. piccolo dot accent). Build statico 10/10, badge assente in entrambi i locale.

### 14.4 — Fix icone NavbarDev viola (2026-06-02)

**Sintomo:** le icone del menu NavbarDev apparivano viola. **Causa:** le icone lucide usano `stroke="currentColor"`; le voci del menu sono `<Link>` (`<a>`) e, senza un `color` esplicito, ereditavano il **colore dei link visitati del browser (viola)**. Con le vecchie icone-immagine il problema non emergeva (avevano colore proprio; gli SVG originali erano `#080d13`). **Fix:** aggiunto `txt-c-primary-very-dark` a `roundedElClass` in `RoundedIconEl` → `currentColor` = `#080d13`, replicando il colore scuro originale e coerente su stato attivo/inattivo. **Verifica (Edge headless, menu aperto):** l'`<svg>` dell'icona calcola `rgb(8,13,19)` su `color`/`stroke` e sull'`<a>` → niente più viola. Build 10/10.

### 14.5 — Ordine sezioni aggiornato (2026-06-02) — SUPERA §10.3-C/§12.5

Scelta utente: **Skills · Experience · Portfolio · Links** (Contacts ultima, voce solo-menu/footer). Sostituisce l'ordine precedente "Experience tra Links e Portfolio" (§10.3-C/§12.5). Aggiornati in coerenza: `(data)/devSections.tsx` (ordine = menu + barra + highlight) e l'ordine delle `<section>` in `dev/page.tsx` (Experience spostata dopo Skills, Links spostata dopo Portfolio). Razionale: tiene vicini "cosa so / cosa ho fatto / cosa ho costruito" e spinge i social (Links) in fondo (orientamento recruiter). Verificato nell'HTML esportato: ordine `skills → experience → portfolio → links`. Build 10/10.

---

## 15. PROSSIMI PASSI (pianificati 2026-06-03) — NON ancora implementati

> Lavori dichiarati dall'utente per il giorno dopo. Qui il contesto per partire senza ricostruire tutto. Valgono tutte le regole del TL;DR (CSS nome=valore, i18n in entrambi i locale, niente "—", static export, ecc.).

### 15.1 — Aggiornare la sezione Skills (da CV)

> **DECISO 2026-06-02 (icone/loghi tech) — stile MONOCROMATICO tinto sito, via `simple-icons`.**
> Sostituisce la nota "icone brand via getIcon" del §15.2 sopra: non più loghi PNG full-color, ma silhouette monocromatiche coerenti per TUTTA la griglia Skills e per i tag-icona del Portfolio.
>
> - **Meccanismo:** dipendenza `simple-icons` (npm), stessa logica già accettata per `lucide-react`. Espone per ogni brand `{ title, slug, hex, path }`; si rende un `<svg viewBox="0 0 24 24"><path d={icon.path} fill="currentColor"/></svg>`. Risolve anche PostgreSQL (path ufficiale incluso) senza disegnare a mano.
> - **Tinta:** `var(--color-primary-medium-light)` = `#7a9dc7` (azzurro accento del sito), impostata via `color`/`currentColor` su classe utility (creare `.txt-c-primary-medium-light` se non esiste, convenzione nome=valore §7.1). Niente hover-variant (scelta utente).
> - **Nuovo atomo `BrandIcon`** `(components)/(atoms)/BrandIcon/`: server component, prop `{ slug | icon, size, color? }`; rende il path simple-icons tinto. Riusato a 72px nella griglia Skills e a 24px nei tag Portfolio.
> - **Refactor `getIcon`** (`PortfolioList`): da ritorno path-PNG a slug/icona simple-icons reso con `BrandIcon` (oggi `<Image src=getIcon(...)>` → `<BrandIcon .../>`); aggiungere fallback per requirement sconosciuto.
> - **Restyle griglia Skills** in `dev/page.tsx`: da `<Image>` PNG → `BrandIcon`. I PNG in `public/assets/skills-img/` restano inutilizzati (come gli SVG nav dopo lucide), non bloccanti.
> - **Brand da coprire:** esistenti (GitHub, HTML5, CSS, JavaScript, React, React Router, Tailwind, Sass, TypeScript, Next.js, Firebase) + nuovi dal CV (GraphQL, Prisma; PostgreSQL per i tag Portfolio). Allineare l'elenco `skills` al CV.
> - **AI-assisted (rinviata):** resta su icona `lucide` (`Sparkles`/`Bot`), non è un brand simple-icons; coerente come icona-UI, inquadrata sul metodo.

- **Dove:** array `skills` in `(data)/portfolioProjects.tsx` (`{ id, label, icon }`, `icon` = path asset in `public/assets/skills-img/`). Reso nella `<section id="skills">` di `dev/page.tsx` (griglia immagini, hover mostra label).
- **Skill attuali:** GitHub, HTML, CSS, JavaScript, React, ReactRouter, Tailwind, Sass, TypeScript, NextJs, Google Firebase.
- **Dal CV** risultano anche **GraphQL** e **Prisma** (già citati come testo nei tech delle esperienze). Per aggiungerli alla griglia servono i **loghi** (asset PNG/SVG in `skills-img/`): da reperire/ottimizzare. Allineare l'elenco a quanto dichiarato nel CV.
- **Skill "AI-assisted development" (rinviata da §12.9):** valutare se inserirla qui. La griglia usa loghi brand; per l'AI non esiste un logo → usare un'icona **lucide** (`Sparkles`/`Bot`), coerente con l'adozione di lucide nel menu. Inquadrarla sul **metodo** (studio/pianificazione/architettura + revisione critica), non come slogan. NB: la griglia oggi rende `<Image src=...>`; per un'icona lucide servirà una piccola variante di rendering nella cella skills (componente o ramo condizionale), oppure un mini-atomo.
- **`getIcon`** (`PortfolioList`) mappa `requirement`→logo per i **tag dei progetti**: NON ha prisma/graphql. Se le nuove sottosezioni Portfolio (15.2) useranno tag-icona per quelle tech, va esteso (oppure si usa l'atomo `Tag` testuale).

### 15.2 — Due sottosezioni nel Portfolio

- **Cosa sono (decisione di prodotto già presa):** sopra le **Esercitazioni** vanno **Collaborazioni** e **Progetti personali** (memoria `website-lorenzoliva-decisioni` + `suggestions/001…` punto 12.3 + §8.8 di questo doc). Le "due sottosezioni" sono presumibilmente queste.
- **Predisposizione prevista:** campo `category` in `IPortfolioProject` (default `"exercise"`); ogni sottosezione filtra `portfolioData` per categoria. Oggi `IPortfolioProject` NON ha ancora `category`: andrà aggiunto (e i 14 progetti restano `"exercise"`).
- **Riuso UI:** restano valide le card portfolio esistenti (`.project-list-el` / `.project-el-show` / `.project-el-details`, `SubtitlePortfolio` per i titoli di sottosezione, `ParagraphList`, `getIcon`).
- **Tag tecnologici → DECISO 2026-06-02: icone brand via `getIcon` (NON l'atomo `Tag` testuale).** Il Portfolio mantiene lo stile a icone; l'atomo `Tag` testuale resta solo in Experience. Conseguenze operative per 15.2:
  - **Estendere `getIcon`** (`PortfolioList.tsx`) con i loghi mancanti richiesti dalle nuove tech: **Prisma, GraphQL, PostgreSQL** (Pothos non ha un logo standard → mappare a GraphQL o ometterlo dal set icone). Le chiavi `requirement` sono stringhe lowercase (es. `"prisma"`, `"graphql"`, `"postgresql"`), non le label di display.
  - **Aggiungere un `default`/fallback in `getIcon`** (oggi ritorna `undefined` per requirement sconosciuto → `<Image src={undefined}>` rotto): icona generica o skip dell'elemento.
  - **Reperire/ottimizzare i nuovi asset PNG/SVG** in `public/assets/skills-img/` (coerenti per dimensione/stile con gli esistenti).
  - Nota di coerenza accettata: la pagina mantiene due linguaggi di tag (icone nel Portfolio, testo in Experience).
- **Sono SOTTOsezioni** dentro la `<section id="portfolio">` (come "Questo sito" ed "Esercitazioni", separate da `SubtitlePortfolio`): quindi **non** servono nuove voci in `devSections`/NavbarDev, a meno che non si vogliano ancore di menu dedicate (in tal caso aggiungere voci a `devSections` con icona lucide e `isPageSection` adeguato).
- **Coerenza tassonomica:** l'esperienza Riverloop sta in **Experience** (ruoli/timeline), non in Collaborazioni. Le "Collaborazioni" sono progetti esterni; se commissionati vale comunque l'NDA. Chiedere all'utente quali progetti reali popolano le due sottosezioni e i relativi contenuti bilingui.
- **i18n:** nuovi sottotitoli/etichette in `DevSection` (o sezione dedicata), sempre IT+EN.

### 15.3 — Promemoria operativi a fine lavoro (per entrambi)

- `next build` → export statico **10/10**, ispezionare `out/` nei due locale.
- Aggiornare `Architecture.md`, la memoria (`website-lorenzoliva-decisioni`), e questo file (stato + nuova sezione di esecuzione).
- Se si introducono dipendenze o si misura il layout in headless, rimuovere gli artefatti di debug a fine sessione (come fatto con `puppeteer-core`, §14.2/§14.4).

---

## 16. ESITO 15.1 — Skills + sistema icone tech (2026-06-02)

Implementato lo stile **monocromatico tinto** deciso al §15.1. Build statico **10/10** (clean build: la `.next` sporca dà un falso errore `collect-build-traces`/ENOENT, irrilevante per l'export); export verificato (54 svg `brand-icon` in `out/it/dev.html`, GraphQL/Prisma presenti, tinta `txt-c-primary-medium-light` applicata).

**Dipendenza:** `simple-icons` aggiunta a `package.json`.

**File creati:**

- `app/[locale]/(components)/(atoms)/BrandIcon/BrandIcon.tsx` (server component: rende un path simple-icons come svg `fill=currentColor`, colore via classe).

**File modificati:**

- `(css-library-utilities)/color.css` — nuova utility `.txt-c-primary-medium-light` (var `#7a9dc7`).
- `(data)/portfolioProjects.tsx` — `skills` con `icon`=oggetto simple-icons + **ID statici**; aggiunte **GraphQL** e **Prisma**; rimosso `crypto.randomUUID()` per le skill (resta `generateId` per links/portfolio).
- `(components)/(organisms)/PortfolioList/PortfolioList.tsx` — `getIcon` ora mappa requirement→oggetto simple-icons (con `postgresql`, pronto per 15.2) e ritorna `undefined` se sconosciuto; tag resi con `BrandIcon` (salto se senza icona).
- `(routes)/dev/page.tsx` — griglia Skills e tech di "Questo sito" da `<Image>` → `BrandIcon`.
- `(routes)/dev/Dev.css` — selettore `.skills-container img` → `svg`.
- `Architecture.md`, memoria `website-lorenzoliva-decisioni.md` + `MEMORY.md`.

**Scelte applicate:** tinta azzurra `medium-light` (no hover-variant); esperienze invariate (tag testuali `Tag`); PNG `skills-img/` lasciati (inutilizzati nella griglia, restano per i Links LinkedIn/GitHub).

**Decisioni utente 2026-06-02 (15.1 CHIUSA):**

1. **Skill tenute tutte** — GitHub/ReactRouter/Sass/Firebase restano in griglia (niente potatura verso il CV).
2. **Skill "AI-assisted"** resta solo nel racconto dell'esperienza, non entra nella griglia.
3. Validazione visiva a carico dell'utente ("completa e vedo io").

---

## 17. 15.2 — Sottosezione "Progetti personali" + rotta `/dev/freedihare` (analisi 2026-06-02)

> Richiesta utente: prima sottosezione **"Progetti personali"**, primo progetto **Freedihare** (app desktop nutrizione). Mantenere il pattern "Esercitazioni" (logo, breve descrizione, button), ma il button apre una **nuova rotta `/dev/freedihare`** che elabora il README (`0_lorenzoliva_studies/doc_reference/README.html` + `Freedihare-Logo.svg`) con **stile lorenzoliva + cenni dei colori app** (ibridazione). Sotto: contesto verificato, proposta di ibridazione, domande aperte (rispondere in §17.3).

### 17.1 — Contesto verificato sul codice

- **`IPortfolioData` NON ha `category`** (confermato): è modellato per screenshot (`img`) + due link esterni (`linkGithub`/`linkProject`). Freedihare invece vuole logo + 1 button verso rotta interna → forma diversa.
- **Sottosezioni Portfolio attuali** (`dev/page.tsx` §12.5): "Questo sito" (blocco bespoke) + `SubtitlePortfolio("Esercitazioni")` + `PortfolioList(portfolioData)`. Le card esercitazione (`PortfolioList`) rendono: img di sfondo, titolo, icone tech (`getIcon`+`BrandIcon`), descrizione (`ParagraphList`), bottoni GitHub/live.
- **Rotta dedicata = modello `/art`**: `(routes)/art/` ha `page.tsx` + `layout.tsx` + `Art.css`; usa `generateMetadata(buildMetadata(locale, "/art"))`, `unstable_setRequestLocale`, `useTranslations`. Una rotta `/dev/freedihare` = `(routes)/dev/freedihare/page.tsx` (+ css), statica, bilingue.
- **⚠️ NavbarDev su sotto-rotta**: `NavbarDev` si renderizza quando `pathname.includes("dev")` (`NavbarDev.tsx`), quindi comparirebbe anche su `/dev/freedihare`; ma le sue ancore (`#skills`, `#experience`…) puntano alle sezioni di `/dev` → su questa pagina si romperebbero (scroll a id inesistenti). Serve una scelta (vedi Q7).
- **Asset Freedihare**: logo SVG `viewBox 0 0 300 300`, 2 colori brand **teal `#205976` + verde `#C3DB99`**. Palette app (README): bg navy `#0f172a`, accent cyan `#53b6d6`, verde `#c1f8a0`, macro-palette di 8 colori.
- **Lingua**: il README è **solo IT**; la i18n del sito è obbligatoria IT+EN (`CLAUDE.md` §6) → il contenuto EN va prodotto (volume non banale, vedi Q1).

### 17.2 — Proposta di ibridazione (stile lorenzoliva × identità Freedihare)

Principio: **lo "chassis" è lorenzoliva, l'identità Freedihare entra come accento**, così la pagina resta parte del sito ma "sa" di app.

- **Chassis = sito**: tema scuro (`--color-primary-very-dark`), font Zain, utility-class, contenitori in stile `.section-code-page`, `BlurBlue` decorativi, bottoni `.btn`, scale heading (`f-size-1d35-1d65`…) e spaziature del sito.
- **Accento = Freedihare, scoped alla pagina**: poche custom property locali sul wrapper `.freedihare-page` (NON in `globals.css`, per non inquinare la palette globale con colori di una singola app), usate **solo** in `freedihare.css`: `--fh-accent` (cyan `#53b6d6`), `--fh-green` (`#c1f8a0`), `--fh-teal` (`#205976`). Le applico a: occhiello/titoli di sezione, filetti divisori, bordi delle "feature-card" in hover, numeri del flusso "giornata tipo"/"primo accesso". Riprende l'impaginazione della guida originale (h2 con filetto, feature-grid 2col, flow-box numerati) ma con tipografia/spaziatura del sito. _(Nota CSS §7.1: sono custom property semantiche locali, non utility "nome=valore"; coerente con l'eccezione "variabili semantiche". Da confermare comunque, Q3.)_
- **Macro-palette = citazione autentica**: la sezione "I macro tracciati" resa coi **chip colorati originali** (Kcal verde, Proteine corallo, Grassi azzurro, …): è l'unico punto dove i colori-app entrano "pieni", come richiamo fedele all'app.
- **Logo a colori originali** (teal+verde): è brand-content, come i loghi LinkedIn/GitHub nei Links (che restano `next/image`). Sul fondo scuro del sito risalta bene.
- **Struttura `/dev/freedihare`**: hero (logo + tagline "Nutrizione consapevole, sotto controllo." + etimologia _Free+Feeding+Share_ + intro) → "Le 5 sezioni" → blocchi Dashboard/Diario/Alimenti/Pasti/Profilo → Account collegati → Macro-palette → Giornata tipo / Primo accesso (flow numerati) → CTA finale (torna a `/dev` ed eventuale link esterno). Contenuto **curato** (vedi Q2), bilingue.
- **Card "Progetti personali"** (nella sezione `#portfolio`, sopra "Esercitazioni"): stesso linguaggio delle card esercitazione (shadow, radius, descrizione breve) ma con **logo** al posto dello screenshot e **un button "Scopri di più" → `/dev/freedihare`** (Link locale i18n). Implementazione pulita: NON forzare `IPortfolioData` (screenshot+link esterni); usare un **piccolo componente dedicato** `PersonalProjectCard` con dati propri (logo, titolo, descrizione bilingue, route, tech opzionali), riusando le classi CSS esistenti.

### 17.3 — Domande Freedihare (COMPATTATO) — esiti in §17.4, implementati in §18/§18.1

> 10 domande chiuse. Sintesi decisioni: bilingue su contenuto curato · niente emoji, grafica accattivante non statica · colori locali alla pagina · cyan dominante + teal/verde logo + macro coi colori del README · solo button interno + icone tech · componente dedicato (`PersonalProjectCard`, riusabile) · NavbarDev nascosta sulla sotto-rotta · ordine sottosezioni confermato · logo a colori originali · etichette EN tradotte (nomi propri invariati).

### 17.4 — Esito risposte (recepite 2026-06-02)

Q1 bilingue sul renderizzato · Q2 selezione curata, **niente emoji, grafica accattivante non statica** · Q3 colori locali · Q4 cyan dominante **+ teal/verde logo + macro coi colori README** · Q5 solo button interno + icone tech · Q6 componente dedicato riusabile · Q7 nascondi NavbarDev + back-link · Q8 confermato · Q9 sì colori originali · Q10 traduci. Stack confermato: **Electron, React, TypeScript, Node.js, Prisma, PostgreSQL, GraphQL**. Grafiche: l'utente caricherà gli screenshot (vedi §18).

---

## 18. ESITO 15.2 — Progetti personali + /dev/freedihare (2026-06-02)

Build statico **10/10** (12 pagine, `/dev/freedihare` IT+EN). Tutto verificato nell'export.

**File creati:**

- `Interface/IPersonalProject.tsx`, `(data)/personalProjects.tsx` (Freedihare).
- `(components)/(organisms)/PersonalProjectCard/PersonalProjectCard.tsx` + `.css`.
- `(routes)/dev/freedihare/page.tsx` + `Freedihare.css`.
- `public/assets/projects-img/freedihare/freedihare-logo.svg` (copiato da doc_reference).

**File modificati:**

- `(components)/(organisms)/PortfolioList/PortfolioList.tsx` — `getIcon` esteso (`electron`, `nodejs`).
- `(components)/(molecules)/NavbarDev-client/NavbarDev.tsx` — condizione `/\/dev\/?$/` (nascosta sulle sotto-rotte).
- `(routes)/dev/page.tsx` — sottosezione "Progetti personali" tra "Questo sito" e "Esercitazioni".
- `messages/it.json` + `messages/en.json` — chiavi `subtitlePersonalProjects`/`discoverMore` (DevSection) + nuova sezione **`Freedihare`** (IT+EN).
- `Architecture.md`, memoria.

**Ibridazione realizzata:** chassis lorenzoliva (tema scuro, Zain, BlurBlue, `.btn`, utility) + accenti `--fh-*` scoped (cyan/verde/teal). Grafiche CSS: **anello calorie** (richiama il bilancio dell'app), **chip macro** coi colori ufficiali del README, card sezioni con icone `lucide`, flusso "giornata tipo" numerato. Niente emoji, niente `<header>`.

**Screenshot (FATTO 2026-06-02):** l'utente ha caricato 3 PNG **verticali** (dashboard 571×773, diary 592×853, profile 571×874). Essendo portrait (non landscape come ipotizzato), invece dell'affiancamento testo+immagine ho scelto una **vetrina "Uno sguardo all'app"**: 3 cornici in stile finestra affiancate (3 col desktop → 1 mobile), subito dopo la hero. Convertiti in **WebP** (q90, sharp temporaneo poi rimosso): dashboard 30KB, diary 31KB, profile 23KB. PNG originali spostati in `0_lorenzoliva_studies/doc_reference/app-screens-png/` (fuori da `public/`). Nuova chiave i18n `showcaseTitle`; CSS `.fh-showcase`/`.fh-shot-frame`. Build 10/10, vetrina verificata IT+EN.

### 18.1 — Rifiniture /dev/freedihare + card (2026-06-02)

- **Vetrina frame uniformi (richiesta utente):** i 3 frame hanno dimensione identica (`aspect-ratio: 571/874`, il più alto); le immagini più corte restano centrate con `object-fit: contain` (niente crop, spazio vuoto sopra/sotto). Sfondo letterbox = navy app (`--fh-bg #0f172a`).
- **Stato MVP nel copy:** badge verde **"MVP in fase di test"/"MVP in testing"** nella hero (`statusBadge`, classe `.fh-status`); `closingText` e la tagline della card precisano "MVP strutturato, in test, in espansione".
- **Back-link rimossi:** tolti i due "Torna alla pagina dev" (ridondanti con l'header) da `/dev/freedihare`; rimossi `.fh-back`/`.fh-cta` e la chiave i18n `backToDev`.
- **Button "Scopri di più" (card):** ora **`w-full`** come gli altri + icona lucide `ArrowRight`.
- **Card "Progetti personali" senza riquadro (richiesta utente):** rimosso `shadow-light-small radius-20px` dal contenitore esterno (creava un box che le altre voci del Portfolio non hanno); il logo resta thumbnail sul suo pannello, niente padding orizzontale → allineata alle sottosezioni sorelle.

---

## 19. Refactor componentizzazione/struttura (2026-06-02)

Su richiesta utente: ridurre ridondanze e generalizzare. Nessun cambio visivo, build 10/10. Scelti A+B+C+D.

- **A — `(components)/(molecules)/TechIconList`** _(nuovo)_: incapsula il pattern `getIcon`+`BrandIcon`+skip, prima **duplicato in 5 punti** (PortfolioList, dev/page "Questo sito", ExperienceList, PersonalProjectCard, freedihare). Props `tech: string[]`, `size?`, `listClassName?`.
- **B — `(components)/(molecules)/ProjectLinkButton`** _(nuovo)_: button-link esterno con stato disabled, prima **duplicato 3×** (PortfolioList ×2, dev/page). Props `href/label/title/iconClass`.
- **C — freedihare snellita:** array estratti in **`(data)/freedihareContent.tsx`** (`fhPills/fhSections/fhMacros/fhDay/fhShots`, dati puri con `iconKey`) + helper colocato **`(routes)/dev/freedihare/FhSection.tsx`** (titolo+contenuto, elimina l'`<h2>` ripetuto 5×). La pagina è ora quasi solo wiring.
- **D — `(data)/techIcons.tsx`** _(nuovo)_: registro unico **`BRAND_ICONS`** + `getIcon` (prima in `PortfolioList`). Un solo elenco di import `simple-icons` nel progetto; `skills` referenzia `BRAND_ICONS.*`. Risolto l'import organism→organism.

**Effetto:** 5 duplicazioni icone-tech → 1 molecola; 3 duplicazioni button → 1 molecola; `simple-icons` importato in 1 solo file; `getIcon` in `(data)`; freedihare page da 224 a ~190 righe di solo wiring. Verifica export invariata (144 icone-tech su /dev, 60 button, chip ora `<ul.technical-list>`, stack freedihare 7). `Architecture.md` (molecole TechIconList/ProjectLinkButton, data techIcons/freedihareContent) e memoria aggiornate.

---

**STATO 15.2:** ✅ sottosezione "Progetti personali" + Freedihare (card, rotta, vetrina, copy MVP) + refactor. **In corso (§20):** sottosezione **"Collaborazioni"** + campo `category` in `IPortfolioProject`.

---

## 20. 15.2b — Sottosezione "Collaborazioni"

### 20.1 — Scaffolding FATTO (2026-06-02)

**Deciso: NIENTE campo `category`** → si usa un **oggetto raggruppato** (scelta utente, più diretto del filtro; supera la Q4 originale). Struttura e rendering pronti, build 12/12:

- `(data)/portfolioProjects.tsx`: `export const portfolioData = { exercises, collaborations, personalProjects }`. `exercises` = i 14; `collaborations: IPortfolioData[] = []` (vuoto); `personalProjects: IPersonalProject[]` (Freedihare, **spostato qui** → `(data)/personalProjects.tsx` **rimosso**). `thisWebsite`/`skills`/`links` restano export a sé (non liste di progetti).
- `dev/page.tsx`: rendering **esplicito per sottosezione** (opzione Y; `exercises`/`collaborations` → `PortfolioList`, `personalProjects` → `PersonalProjectCard`). **Collaborazioni nascosta finché vuota** (`collaborations.length > 0`). Ordine: Questo sito → Progetti personali → Collaborazioni → Esercitazioni.
- `freedihare/page.tsx`: import → `portfolioData.personalProjects`.
- i18n: `subtitleCollaborations` (IT "Collaborazioni" / EN "Collaborations").

**Decisioni chiuse:** card Collaborazioni = `PortfolioList` (screenshot + tech + link, niente rotta di approfondimento); modello = grouped object; ordine confermato e implementato.

### 20.2 — Domande di CONTENUTO (per popolare Collaborazioni) ⬅️ COMPILARE QUI

> Manca solo il contenuto reale. Le Collaborazioni sono progetti **esterni / di team non legati al lavoro Riverloop** (quello è la sezione Experience). Niente dettagli inventati: uso solo ciò che scrivi qui.

**C1 — Quali progetti?** Per ciascuno: **titolo** · **screenshot** (file in `public/assets/projects-img/`, formato ~quadrato come gli altri) · **tech** (chiavi requirement: react/next/typescript/…) · **descrizione IT/EN** (o tue note → redigo la bozza) · **link** GitHub e/o live · **data** (`YYYY-MM-DD`).
**Risposta:**

> prendi riferimento dalla home esterna di [`https://jobinbox.it/`]; il progetto appartiene a Fabrizia Fisichella con riferimento a [`https://portfolio-rho-drab-24.vercel.app/it`]
> ho caricato l'immagine da utilizzare (logo) in[`website-lorenzoliva-next\0_lorenzoliva_studies\img_reference\JIB_1.2.2.svg`] (attenzione, c'è una parte di logo duplicata, se non riesci a isolare i path del logo mi dici e ti fornisco un svg unico da utilizzare)
> tech stack: React native con typeScript + funcion supabase
> crea la descrizione a partire dal link fornito (it + en)
> link esterno a [`https://jobinbox.it/`]
> data 2026

**C2 — Riclassificare esistenti?** Spostare in Collaborazioni qualcuno dei 14 (es. **HeracleApp**, prototipo di un team di 5; o altri di team)? Quali?
**Risposta:** no

**C3 — NDA / link.** Qualche progetto è riservato (solo descrizione, niente repo/demo)? Per quelli il button resta disabilitato (già gestito da `ProjectLinkButton`).
**Risposta:** unico progetto > solo info fornite in C1

**C4 — Intro sottosezione.** Una riga sotto il titolo "Collaborazioni" (es. "Progetti realizzati in team o per terzi") o solo il sottotitolo come le altre?
**Risposta:** Valuta, intendo inserire lavori svolti in collab con terzi dove non ho preso parte a ideazione, architettura e grosso del lavoro ma lavorato in alcune porzioni e contribuito in generale nel ragionamento (ovviamente questa sdescrizione è troppo lunga, dovresti vedere cosa scrivere)

**Post presentazione progetto**
« La ricerca del lavoro è diventata essa stessa un lavoro. »
È una frase inflazionata, lo so, ma non per questo meno vera.

Cercare lavoro nel 2026 significa perdersi in un labirinto infinito fatto di curriculum inviati su decine di siti diversi e non sapere più che fine fanno. Se riceviamo una chiamata o un'email, è più facile prendere appunti su un post-it che in modo organizzato.

Lo so. Mi è successo.
Ringrazio il mio bisogno di ordine - e le lunghe discussioni con il mio collega Lorenzo Oliva, che ha condiviso con me idee, dubbi, soluzioni e ore di implementazione attiva - per aver risolto il problema.

Dopotutto, perché prendere appunti su ogni candidatura e tenerne traccia a mano, quando è tutto nella mia email ed è pronto per essere riorganizzato in modo pulito e, soprattutto, automatico?

𝗝𝗼𝗯𝗜𝗻𝗕𝗼𝘅 è nato per questo.
Lo colleghi alla tua casella di posta, lui identifica le email dei principali siti di ricerca lavoro e mette ordine per te. Tutto il resto non lo prende neanche in considerazione.

Nello specifico, 𝗝𝗜𝗕 fa due cose:
• tiene traccia delle tue #candidature generando record che contengono informazioni facilmente consultabili ed editabili;
• recupera tutte le #offerte di lavoro che ricevi e crea un feed univoco, sempre aggiornato agli ultimi trenta giorni, che centralizza tutto in un pannello facilmente consultabile.

La cosa bella è che lo fa in automatico.

Ricevi un'email di conferma candidatura o un alert su una nuova offerta?
𝗝𝗜𝗕 lo nota e crea i nuovi record per te, senza che tu faccia niente.

LinkedIn ti avvisa che la tua candidatura è stata visualizzata o rifiutata?
Ti contattano su Indeed per darti informazioni sulla tua candidatura?
𝗝𝗜𝗕 se ne accorge e aggiorna lo status al posto tuo.

L'importante è che tu abbia le notifiche per email attivate sui servizi supportati. Al momento sono soltanto LinkedIn, Indeed e Glassdoor - ma la lista si allungherà periodicamente.

𝗝𝗼𝗯𝗜𝗻𝗕𝗼𝘅 è in open beta: qualsiasi feedback è ben accetto!
( Anzi, più me ne date e meglio è. )

---

### 20.3 — ESITO Collaborazioni + ShowcaseCard (FATTO 2026-06-02)

Risposte recepite (C1 JobInBox · C2 no riclassifica · C3 unico progetto · C4 intro corta). **Card-logo generalizzata** da `PersonalProjectCard` → **`ShowcaseCard`** (interfaccia `IShowcaseProject`: `link {href, labelKey, external}`), usata da Progetti personali (link interno) e Collaborazioni (link esterno). `PersonalProjectCard`/`IPersonalProject` rimossi.

**JobInBox** aggiunto a `portfolioData.collaborations`: descrizione **originale** IT/EN sintetizzata dal post di lancio (non copiata), tech `react·typescript·supabase` (aggiunto `supabase` a `BRAND_ICONS`; React Native → icona React), logo `public/assets/projects-img/jobinbox-logo.svg` (SVG col path duplicato, **da verificare a vista**), button esterno → jobinbox.it. i18n nuove: `visitSite`, `collaborationsIntro`. Build statico **12/12**, Collaborazioni verificata visibile in IT+EN con link `target=_blank`.

**File:** nuovi `Interface/IShowcaseProject.tsx`, `(organisms)/ShowcaseCard/{tsx,css}`; modificati `(data)/portfolioProjects.tsx` (JobInBox + tipi), `(data)/techIcons.tsx` (supabase), `dev/page.tsx` (ShowcaseCard + intro), `messages/*.json`; rimossi `PersonalProjectCard/`, `IPersonalProject.tsx`. **15.2 CHIUSA** (Progetti personali + Collaborazioni).

---

## 21. Rifiniture post-15.2 (2026-06-02)

Tutte verificate, build 12/12, IT+EN.

- **Riordino sottosezioni Portfolio** (scelta utente): ordine finale **Progetti personali → Collaborazioni → Questo sito → Esercitazioni** (il blocco "Questo sito" spostato tra Collaborazioni ed Esercitazioni). `dev/page.tsx`.
- **Sitemap**: aggiunte le voci `/it/dev/freedihare` e `/en/dev/freedihare` (con hreflang) in `public/sitemap.xml` (mancavano).
- **Credito autrice JobInBox**: campo opzionale `author {name, href?}` su `IShowcaseProject`; la card mostra "Progetto di Fabrizia Fisichella" (nome = link sottolineato al portfolio). i18n `projectBy`. Link esterno usato: `portfolio-rho-drab-24.vercel.app/it`.
- **Credito collaboratrice su `/dev/freedihare`**: dopo "Sotto il cofano", riga **"Con la collaborazione di Fabrizia Fisichella"** (link al portfolio). i18n `collaboratorCredit`. (Crediti incrociati: Lorenzo su JobInBox, Fabrizia su Freedihare.)
- **PostgreSQL — decisione tassonomica**: resta **fuori dalle Skills** (usato per lo più via Prisma/GraphQL, non SQL diretto) ma **dentro gli stack** dei progetti (Experience Riverloop, Freedihare). Principio: *Skill = competenza diretta; Stack = composizione reale del progetto*. JobInBox usa `supabase` (Postgres-based, ma la tech usata è Supabase).
- **Posizionamento AI + intro Esperienza**: aggiunto `experienceIntro` (i18n IT+EN) tra titolo "Esperienza" e card, che fa emergere il **metodo** in modo sobrio (progettazione/architettura prima del codice, passi verificabili, coerenza struttura + decisioni documentate) con **una sola riga sull'AI inquadrata sul metodo** ("a supporto del ragionamento e non in sua sostituzione: scelte e revisione critica restano mie"). **Decisione: AI-come-metodo solo a parole** (intro + descrizione Riverloop), **mai logo Claude/AI nella griglia Skills** (rischio percezione "vibe coding" + mismatch di categoria tool-vendor vs stack).
