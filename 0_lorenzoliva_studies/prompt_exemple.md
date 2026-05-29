**Pre-new plane**

## Da piano UX

> **Obiettivo:** Voglio [
>
> > ].
> > Analizza freedihare-2R-first-app\architecture.md, comprendi la struttura dei dati nel db, l'obiettivo della mia richiesta e come si riflette sui componenti utilizzati. Riepiloga brevemente quanto richiesto; tieni sempre fede a freedihare-2R-first-app\CLAUDE.md e suggerisci le modifiche da effettuare

## Da fix UI

> **Obiettivo:** Voglio [risolvere gli issue a priorità MEDIO in [`freedihare-2R-first-app\_freediehere_studies\report\UX_critical_audit.md`], analizza il file, i componenti e le logiche che riguardano questi issue].
>
> > Analizza freedihare-2R-first-app\architecture.md, comprendi la struttura dei dati nel db, l'obiettivo della mia richiesta e come si riflette sui componenti utilizzati. Riepiloga brevemente quanto richiesto; tieni sempre fede a freedihare-2R-first-app\CLAUDE.md.
> > Se necessario, elabora delle domande al termine del file per comprendere meglio contesto e obiettivi, poi suggerisci le modifiche da effettuare

## Nuovo obiettivo

> **Obiettivo:** Ho bisogno di [
> refactorare lo style di app\src\components\molecules\FoodDetailCard.tsx
> nel contesto di FoodSelectList utilizzato da mealModal l'item risulta troppo ingombrante.
> Dobbiamo:

- valutare quali correzioni (minime) applicare allo style per far in modo che risulti un po' più compatto e visivamente ordinato
- inserire una versione compatta che elimina tutti i dati superflui, quindi:

  > - comprendiamo quali dati e con quali elementi sono mostrati
  > - analizziamo questi e facciamo proposte di taglio/riduzione condizionale
  > - inseriamo una nuova props boolean isCompact (default false) che nasconda gli elementi stabiliti
  > - inseriamo in foodSelectList un toggle per nascondere/mostrare tutti gli elementi superflui di FoodDetailCard
  > - da mealModal diciamo a foodSelectList che il toggle sta di default a true (nascondi tutto)

  > Crea un nuovo file in freedihare-2R-first-app_freediehere_studies\planes elaborando delle domande al termine del file per comprendere meglio contesto e obiettivi e per iniziare an analizzare gli elementi del componente
  >
  > > ].
  >
  > > Analizza freedihare-2R-first-app\architecture.md, comprendi la struttura dei dati nel db, l'obiettivo della mia richiesta e come si riflette sui componenti utilizzati. Riepiloga brevemente quanto richiesto; tieni sempre fede a freedihare-2R-first-app\CLAUDE.md.
  > > Se necessario, elabora delle domande per comprendere meglio contesto e obiettivi, poi suggerisci le modifiche da effettuare

**Look plan**

> Analizza [_freediehere_studies\planes\TODO_45_guide_page.md], il contesto dei file che lo riguardano,dimmi se hai domande per chiarire oltre il 90% l'obiettivo e le scelte per l'implementazione, dimmi se puoi riscontrare difficoltà, criticità col codice esistente o falle nel piano. Infine dammi un feedback su quanto analizzato e/o suggerimenti a riguardo.

## Ottimizza analisi per new agent

Aggiorna e ottimizza il file di analisi per la corretta lettura del file e per favorire la totale comprensione di contesto e obiettivi da parte del nuovo agente.

## Ottimizza piano per new agent

Ottimizza il piano per la corretta lettura del file e per favorire la totale comprensione di contesto, obiettivi e task da completare da parte di un nuovo agente.

## Prompt per nuovo agente

Forniscimi un prompt per indirizzare il nuovo agente verso la corretta implementazione del piano

## Nuovi TODO - formato

Aggiungi a freedihare-2R-first-app_freediehere_studies\TODO_FIX_list.md, seguendo lo stesso pattern già presente, questi nuovi TODO:

- [Priorità bassa] segnalazione da parte di utenti di qualsiasi record presente in db ad esso visibile, creabile ed utilizzabile (es. food, detail, recipe, brand, shop, category, subcategory, ecc)

  > un utente può creare vari tipi di record con dato potenzialmente fallaci: di conseguenza dobbiamo pensare un metodo di segnalazione e il conseguente specchietto di segnalazione in pagina admin
  - tag nickname || nome utente per ricette o detail (manca sicuramente in FoodRowButto, verificare altrove)

  - rendere disable (con "?" informativo) il button modifica o elimina di detail e recipe se l'utente non può effettuare le operazioni (non ne è proprietario o altri casi)

  - [Priorità bassa] modificare tutti i punti di success (es. toast) dove il cole utilizzato non è --color-success col colore corretto

- punto
  > sottopunto

## checklist TEST

Scrivi una checklist di test al termine del file in modo da verificare e validare quanto implementato.

## Fantasy Fei

crea [ un ulteriore sezione da aggiungere ad AppShell utile ] per [ la visualizzazione dati e statistiche utente e per comprendere l'utilizzo dell'app; visibile e accessibile solo a user ADMIN]. e dentro... beh: considera l'applicazione nella sua interezza, cerca online come sono fatte questo tipo di sezioni in modo efficiente, complete e graficamente WOW e poi sbizzarrisciti! assicurati di fare un buon adattamento desktop, tablet e mobile, ma divertiti tantissimo con quella pagina!

> Utilizza sempre componenti già esistenti in freedihare-2R-first-app\app\src\components

> Analizza freedihare-2R-first-app\backend\prisma\schema.prisma per comprendere al meglio le relazioni fra i model dei dati da poter utilizzare
>
> > Analizza freedihare-2R-first-app\architecture.md, comprendi la struttura dei dati nel db, l'obiettivo della mia richiesta e come si riflette sui componenti utilizzati. Riepiloga brevemente quanto richiesto; tieni sempre fede a freedihare-2R-first-app\CLAUDE.md.
> > Se necessario, elabora delle domande al termine del file per comprendere meglio contesto e obiettivi, poi suggerisci le modifiche da effettuare

---

## website-lorenzoliva — Punto 3 (Pagina Art — opzione B)

Lavoriamo su website-lorenzoliva-next. Procediamo con la PRIORITÀ ALTA, punto 3
(Pagina Art incompleta) dei suggerimenti in:
website-lorenzoliva-next/0_lorenzoliva_studies/suggestions/001_suggerimenti-miglioramento-sito.md

Contesto: il punto 1 (SEO/metadati) e il punto 2 (accessibilità) sono GIÀ FATTI e
verificati — non rifarli. Vedi i blocchi "✅ FATTO" sotto i punti 1 e 2 in quel file
(contengono le decisioni prese, le nuove utility CSS e le chiavi i18n già introdotte:
es. `.sr-only`, `.pointer-events-none`, `.skip-link`, `:focus-visible`, sezione i18n
`Seo`, chiavi `Layout.*` per a11y). Non duplicarle né contraddirle.

Prima di iniziare leggi, in quel file: il punto 3 PER INTERO, il punto 12.1
(coerenza tema dark↔light — impatta direttamente la gallery), la sezione
"DECISIONI E ASSUNZIONI" e "LAVORO GIÀ SVOLTO (UI resizing)". Leggi anche
CLAUDE.md (in particolare §5 data layer, §6 i18n, §7.1 convenzione CSS nome=valore
— REGOLA CRITICA, §8 static export) e Architecture.md.

Vincoli chiave già decisi:
- Opzione B (CONFERMATA): gallery minimale con 5-8 immagini rappresentative estratte
  dal PDF `public/doc/art-doc/Portfolio-artistico-Oliva-Lorenzo.pdf` + i social già
  presenti. La sezione Art resta SECONDARIA rispetto a Dev: curata e finita, ma senza
  investirci quanto sul portfolio dev. Niente redesign del resto del sito.
- Static export: niente middleware/server/route handler/server action a runtime.
  L'eventuale estrazione/ottimizzazione immagini dal PDF va fatta con un tool
  usa-e-getta (come per l'OG image del punto 1) → NESSUNA dipendenza runtime aggiunta;
  gli asset finali (WebP) vivono in `public/assets/artPage/`.
- Ogni stringa user-facing va in i18n con la STESSA chiave in it.json E en.json
  (riusa la sezione esistente `ArtSection` prima di crearne una nuova).
- Convenzione CSS: il nome della utility È il suo valore. MAI cambiare il valore
  dietro un nome esistente → crea una nuova classe. Se servono nuove utility
  (es. per una griglia/masonry), proponi nome/file PRIMA di scriverle invece di
  indovinare; conferma che una classe esista prima di usarla. Colori SOLO da
  variabili CSS in globals.css.

Stato attuale (verifica sul codice, le righe possono essere cambiate):
`app/[locale]/(routes)/art/page.tsx` mostra `ArtSection.maintenancePageLabel`
("in manutenzione") + `checkOutSocialLabel` + i social (`socialNetwork.tsx`) + l'immagine
`LO-img-3.3.png`; ha già `generateMetadata` via `buildMetadata(locale, "/art")` (NON
toccare la logica SEO). `art/layout.tsx` è solo un wrapper CSS (`art-bg` bianco,
`art-clearance`). Le chiavi `ArtSection` attuali: `maintenancePageLabel`,
`checkOutSocialLabel`, `imageLabel`.

Il punto 3 (opzione B) include:
- Estrarre 5-8 immagini dal PDF e salvarle ottimizzate (WebP) in `public/assets/artPage/`.
- Sostituire il blocco "in manutenzione" con una gallery responsive (griglia/masonry)
  coerente con lo stile del sito; usare `next/image` con `width`/`height` o `fill`+`sizes`
  (immagini `unoptimized`, §8).
- Mantenere i social e il link al PDF completo (già in `ModalDocs`).
- Aggiungere le chiavi i18n in `ArtSection` (titolo sezione, eventuali didascalie, alt
  delle immagini) in IT+EN e rimuovere l'uso di `maintenancePageLabel`.

Affrontiamo UNO step alla volta, fermandoti per conferma tra uno e l'altro.
Parti mostrandomi un PIANO prima di scrivere codice: raggruppa il lavoro in
sotto-step logici (es. estrazione/ottimizzazione immagini, struttura JSX della gallery,
CSS responsive, i18n + rimozione "manutenzione", tema), segnala dove servono nuove
utility CSS o nuove chiavi i18n, e DIMMI quali voci richiedono una mia decisione, in
particolare: (a) TEMA della gallery — sfondo chiaro "galleria bianca" o uniformato al
dark del resto (punto 12.1); (b) QUALI 5-8 immagini estrarre dal PDF e in che ordine;
(c) layout (griglia regolare vs masonry) e se servono didascalie; (d) testo del titolo
sezione e delle eventuali didascalie/alt; (e) se mantenere o meno l'immagine `LO-img-3.3.png`.
Verifica il tutto con un build statico alla fine (`npm run build`, type-check ed eslint
puliti, e controllo sull'export `out/`).

---
