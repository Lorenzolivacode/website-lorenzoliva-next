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

## 13. Domande mirate per arricchire le descrizioni esperienze ⬅️ COMPILARE QUI

> Motivo: la bozza §12.9 è onesta ma **generica** (parafrasa il CV). Per renderla concreta e credibile per un recruiter servono dettagli reali. Rispondi in bullet/telegrafico, salta ciò che non si applica. **Vincolo NDA (§8.4): niente nomi clienti / repo / screenshot.** L'agente userà **solo** ciò che è scritto qui — non inventa dettagli. A risposte date, riscrive la §12.9 in versione concreta IT/EN.

### A — Riverloop, Full Stack (esperienza principale)

1. **Tipi di progetto / domini** (senza nomi clienti): gestionali, dashboard, e-commerce, booking, CMS, portali…? Quali davvero?
   **Risposta:** Gestionale per le scuole, saas per elaborazione testi e aiuto studio da testi con AI, saas/gestionale per ristoranti (ti serve sapere il contesto, non entrare nel merito dei progetti, fa altre domande se devi)
2. **Backend gestito in prima persona:** schema/modelli **Prisma** + migrazioni? API/route handlers o server actions? **autenticazione** (quale)? integrazioni terze (pagamenti, email, mappe, storage)? Quale **DB** (Postgres/MySQL/…)?
   **Risposta:** gestito in prima persona, db postgres gestito con prisma e photos (graphql)
3. **GraphQL** (è nel CV): usato a Riverloop o solo da formazione? (decide se citarlo)
   **Risposta:** su tutti i progetti con riverloop e nei progetti personali (non ancora aggiunti al sito)
4. **Frontend:** design system / libreria componenti riusabile? responsive, accessibilità, performance, animazioni? Partite da Figma / pixel-perfect?
   **Risposta:** poche reference, soprattutto gestione UX/UI al momento
5. **Team & metodo:** quante persone? Tuo ruolo (feature in autonomia, code review, mentoring junior)? Git flow / PR / sprint?
   **Risposta:** team di 2 persone (me compreso), stesso livello, autonomia totale, niente mentoring (solo poco all'inizio) o code review, sprint autogestiti, progettazione del lavoro, sugli ultimi progetti (per ristoranti) anche studio architetturale
6. **Quantificabile** (anche soft): n° progetti consegnati, riduzione tempi, riuso componenti tra progetti…?
   **Risposta:** i menzionati portati a termine, niente o poco riutilizzo; 2-3 mesi in solitaria sugli ultimi due progetti

### B — Riverloop, Docente

7. **A chi insegni** (livello: principianti / bootcamp / aziendale) e **n° studenti** indicativo?
   **Risposta:** studenti adulti, intorno alla decina, principianti
8. **Cosa insegni** (HTML/CSS/JS, React, Next, Git…) e **come** (lezioni live, code-along, review progetti, supporto 1:1)?
   **Risposta:** lezioni teorico-pratiche strutturate, ho parlato per lo più di JS, react e next.js
9. Hai **creato materiale** tuo (esercizi, curriculum, slide)?
   **Risposta:** materiale elaborato personalmente: slide, esercizi, lezioni su Notion

### C — Lavorare con l'AI come skill (AI-assisted / agentic development)

> Da inquadrare come competenza professionale moderna, non come "uso ChatGPT".

10. **Framing/tono preferito:** "Sviluppo AI-assisted" / "Pair programming con agenti AI (Claude Code)" / "Workflow agentici" / altro?
    **Risposta:** hai modo di valutare in base a ciò che trovi in memoria? faccio molto studio e pianificazione con AI, non "devo fare questo, vai"
11. **Cosa ci fai davvero** quotidianamente: scaffolding, refactoring, review, debugging, architettura/decisioni, documentazione, automazioni?
    **Risposta:** rifatti a 10 e valuta, un po' tutto con occhio attento
12. **Dove la collochi:** (a) voce nella **griglia Skills** — nota: la griglia usa loghi brand PNG; per l'AI non c'è asset logo → si userebbe un'icona lucide (`Sparkles`/`Bot`), piccola deviazione da valutare; (b) **riga dentro la descrizione Riverloop**; (c) **entrambe**.
    **Risposta:** suggerisci. in eseprienza, valutare in che modo altrove

**Note libere aggiuntive:** le skills andranno aggiornate in seguito in base a ciò che è segnato nel cv

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

- **Dove:** array `skills` in `(data)/portfolioProjects.tsx` (`{ id, label, icon }`, `icon` = path asset in `public/assets/skills-img/`). Reso nella `<section id="skills">` di `dev/page.tsx` (griglia immagini, hover mostra label).
- **Skill attuali:** GitHub, HTML, CSS, JavaScript, React, ReactRouter, Tailwind, Sass, TypeScript, NextJs, Google Firebase.
- **Dal CV** risultano anche **GraphQL** e **Prisma** (già citati come testo nei tech delle esperienze). Per aggiungerli alla griglia servono i **loghi** (asset PNG/SVG in `skills-img/`): da reperire/ottimizzare. Allineare l'elenco a quanto dichiarato nel CV.
- **Skill "AI-assisted development" (rinviata da §12.9):** valutare se inserirla qui. La griglia usa loghi brand; per l'AI non esiste un logo → usare un'icona **lucide** (`Sparkles`/`Bot`), coerente con l'adozione di lucide nel menu. Inquadrarla sul **metodo** (studio/pianificazione/architettura + revisione critica), non come slogan. NB: la griglia oggi rende `<Image src=...>`; per un'icona lucide servirà una piccola variante di rendering nella cella skills (componente o ramo condizionale), oppure un mini-atomo.
- **`getIcon`** (`PortfolioList`) mappa `requirement`→logo per i **tag dei progetti**: NON ha prisma/graphql. Se le nuove sottosezioni Portfolio (15.2) useranno tag-icona per quelle tech, va esteso (oppure si usa l'atomo `Tag` testuale).

### 15.2 — Due sottosezioni nel Portfolio

- **Cosa sono (decisione di prodotto già presa):** sopra le **Esercitazioni** vanno **Collaborazioni** e **Progetti personali** (memoria `website-lorenzoliva-decisioni` + `suggestions/001…` punto 12.3 + §8.8 di questo doc). Le "due sottosezioni" sono presumibilmente queste.
- **Predisposizione prevista:** campo `category` in `IPortfolioProject` (default `"exercise"`); ogni sottosezione filtra `portfolioData` per categoria. Oggi `IPortfolioProject` NON ha ancora `category`: andrà aggiunto (e i 14 progetti restano `"exercise"`).
- **Riuso UI:** restano valide le card portfolio esistenti (`.project-list-el` / `.project-el-show` / `.project-el-details`, `SubtitlePortfolio` per i titoli di sottosezione, `ParagraphList`, `getIcon`). Per i tag tecnologici valutare il nuovo atomo **`Tag`** (oggi i progetti usano icone via `getIcon`; coerenza da decidere con l'utente).
- **Sono SOTTOsezioni** dentro la `<section id="portfolio">` (come "Questo sito" ed "Esercitazioni", separate da `SubtitlePortfolio`): quindi **non** servono nuove voci in `devSections`/NavbarDev, a meno che non si vogliano ancore di menu dedicate (in tal caso aggiungere voci a `devSections` con icona lucide e `isPageSection` adeguato).
- **Coerenza tassonomica:** l'esperienza Riverloop sta in **Experience** (ruoli/timeline), non in Collaborazioni. Le "Collaborazioni" sono progetti esterni; se commissionati vale comunque l'NDA. Chiedere all'utente quali progetti reali popolano le due sottosezioni e i relativi contenuti bilingui.
- **i18n:** nuovi sottotitoli/etichette in `DevSection` (o sezione dedicata), sempre IT+EN.

### 15.3 — Promemoria operativi a fine lavoro (per entrambi)

- `next build` → export statico **10/10**, ispezionare `out/` nei due locale.
- Aggiornare `Architecture.md`, la memoria (`website-lorenzoliva-decisioni`), e questo file (stato + nuova sezione di esecuzione).
- Se si introducono dipendenze o si misura il layout in headless, rimuovere gli artefatti di debug a fine sessione (come fatto con `puppeteer-core`, §14.2/§14.4).
