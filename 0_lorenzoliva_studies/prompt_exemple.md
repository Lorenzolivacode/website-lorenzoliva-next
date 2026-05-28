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
