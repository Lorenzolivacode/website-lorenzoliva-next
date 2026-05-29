# 001 - Deploy su Aruba — Next.js Static Export

**Data:** 2026-05-28
**Tipo:** guida operativa (non un piano da eseguire, ma un riferimento per deploy)

---

## PREREQUISITI

Prima di usare questa guida, verificare che:

1. La migrazione a static export sia stata completata (vedi `planes/001_analisi-migrazione-static-export.md`)
2. `next.config.mjs` contenga `output: "export"` e `images: { unoptimized: true }`
3. `middleware.ts` sia stato rimosso
4. `public/.htaccess` esista con `ErrorDocument 404 /404.html`
5. `npm run build` generi con successo la cartella `out/`

**Se la migrazione non e' stata ancora eseguita, NON procedere con il deploy.** Eseguire prima il piano in `planes/001_analisi-migrazione-static-export.md`.

---

## CONTESTO

| Chiave              | Valore                                                    |
| ------------------- | --------------------------------------------------------- |
| Progetto            | `website-lorenzoliva-next/`                               |
| Stack               | Next.js 14.2.13, TypeScript, next-intl ^3.20.0           |
| Config export       | `output: "export"` in `next.config.mjs`                  |
| Hosting target      | Aruba Linux shared hosting (Apache, no Node.js, no SSH)   |
| SSL                 | Certificato DV Wildcard (Actalis), pre-installato         |
| Document root Aruba | `/htdocs/`                                                |
| Build command        | `cd website-lorenzoliva-next && npm run build`           |
| Build output        | `website-lorenzoliva-next/out/`                           |

---

## STRUTTURA OUTPUT

Dopo `npm run build`, la cartella `out/` contiene:

```
out/
├── .htaccess             # copiato da public/.htaccess (ErrorDocument 404)
├── index.html            # redirect client-side (localStorage -> /it o /en)
├── 404.html              # pagina errore generata da Next.js
├── LO-img-3.3.png        # favicon
├── it.html               # Home IT
├── en.html               # Home EN
├── it/
│   ├── art.html          # Art IT
│   └── dev.html          # Dev IT
├── en/
│   ├── art.html          # Art EN
│   └── dev.html          # Dev EN
├── _next/
│   └── static/           # JS/CSS bundle (hash nei nomi file, cache-safe)
├── assets/               # immagini (WebP, PNG, JPG, SVG) — ~3MB
└── doc/                  # PDF (dev-doc ~188KB, art-doc ~86MB)
```

**Regola chiave:** caricare il CONTENUTO di `out/` dentro `/htdocs/`, non la cartella `out/` stessa.

Risultato su Aruba:
```
/htdocs/
├── .htaccess
├── index.html        → https://dominio.it/
├── it.html           → https://dominio.it/it
├── en.html           → https://dominio.it/en
├── it/dev.html       → https://dominio.it/it/dev
├── it/art.html       → https://dominio.it/it/art
├── en/dev.html       → https://dominio.it/en/dev
├── en/art.html       → https://dominio.it/en/art
├── 404.html          → qualsiasi URL non valido
├── _next/static/...
├── assets/...
└── doc/...
```

---

## OPZIONE A — FTP manuale

**Quando usarla:** primo deploy, deploy occasionali, debug.

### Procedura

```
1. Build locale
   > cd website-lorenzoliva-next
   > npm run build

2. Aprire client FTP (FileZilla o WinSCP)
   - Host: credenziali dal pannello Aruba
   - Protocollo: FTP o FTPS (porta 21)

3. Navigare in /htdocs/ sul server remoto

4. Se deploy precedente esiste:
   - Svuotare /htdocs/ per evitare file orfani
   - ATTENZIONE: non eliminare file non gestiti dal build se presenti

5. Caricare tutto il contenuto di out/ dentro /htdocs/
   - Includere .htaccess (file nascosto!)
   - FileZilla: Server > Forza la visualizzazione dei file nascosti
   - WinSCP: Opzioni > Preferenze > Pannelli > Mostra file nascosti

6. Verificare post-deploy (vedi checklist sotto)
```

**Tempo stimato:** ~5-10 min (build) + ~10-20 min (upload FTP, dipende dalla connessione e dal PDF da 86MB)

---

## OPZIONE B — GitHub Actions (deploy automatico)

**Quando usarla:** deploy continuo. Ad ogni push su `main`, build + upload automatico.

### Step 1 — GitHub Secrets

Percorso: repository GitHub > `Settings` > `Secrets and variables` > `Actions` > `New repository secret`

| Nome       | Valore                                   | Esempio               |
| ---------- | ---------------------------------------- | --------------------- |
| `FTP_HOST` | Host FTP Aruba                           | `ftp.lorenzoliva.it`  |
| `FTP_USER` | Username FTP                             | dal pannello Aruba    |
| `FTP_PASS` | Password FTP                             | dal pannello Aruba    |

### Step 2 — Creare il workflow

**File:** `.github/workflows/deploy-aruba.yml` (nella root del repository, NON dentro `website-lorenzoliva-next/`)

```yaml
name: Deploy to Aruba
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install and build
        run: cd website-lorenzoliva-next && npm ci && npm run build

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASS }}
          local-dir: website-lorenzoliva-next/out/
          server-dir: /htdocs/
          dangerous-clean-slate: true
```

### Note

- `dangerous-clean-slate: true` — svuota `/htdocs/` prima di caricare. Rimuovere se in `/htdocs/` ci sono file non gestiti dal build
- Il deploy avviene solo su push al branch `main`
- Tempo stimato: ~2-3 min (build) + ~5-15 min (upload FTP)
- Monitoraggio: tab `Actions` nel repository GitHub

---

## CHECKLIST POST-DEPLOY

Verificare nel browser dopo ogni deploy:

| URL                             | Risultato atteso                                        |
| ------------------------------- | ------------------------------------------------------- |
| `https://dominio.it/`          | Redirect a `/it` (prima visita) o lingua salvata        |
| `https://dominio.it/it`        | Home italiano                                           |
| `https://dominio.it/en`        | Home inglese                                            |
| `https://dominio.it/it/dev`    | Portfolio dev italiano                                  |
| `https://dominio.it/en/dev`    | Portfolio dev inglese                                   |
| `https://dominio.it/it/art`    | Art page italiano                                       |
| `https://dominio.it/en/art`    | Art page inglese                                        |
| `https://dominio.it/xyz`       | Pagina 404                                              |
| Cambio lingua (selettore)       | URL cambia, lingua salvata in localStorage              |
| Ritorno su `/` dopo cambio     | Rispetta la lingua scelta precedentemente               |
| PDF download (sezione documenti) | Download funzionante                                   |
| HTTPS                           | Certificato valido, nessun mixed content                |

---

## REBUILD

Per rigenerare `out/` dopo modifiche al codice:

```bash
cd website-lorenzoliva-next
npm run build
```

La cartella `out/` viene ricreata da zero ad ogni build. Dopo il rebuild, ridepoyare su Aruba con il metodo scelto (A o B).

---

## TROUBLESHOOTING

| Problema                              | Causa probabile                           | Soluzione                                                  |
| ------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| 404 su tutte le pagine                | Contenuto non in `/htdocs/` o `.htaccess` mancante | Verificare che i file siano direttamente in `/htdocs/`, non in `/htdocs/out/` |
| CSS/JS non caricati                   | Path `_next/static/` mancante o incompleto | Verificare che `_next/` sia stato caricato intero via FTP  |
| Immagini rotte                        | Cartella `assets/` non caricata           | Verificare upload di `assets/` in `/htdocs/assets/`        |
| Redirect root non funziona            | `index.html` mancante o JS bloccato      | Verificare che `index.html` sia in `/htdocs/` e che la console browser non mostri errori |
| Mixed content warning (HTTPS)         | Risorse caricate via `http://`            | Cercare URL `http://` hardcoded nel codice e correggerli   |
| Upload FTP lentissimo                 | PDF da 86MB in `doc/art-doc/`             | Caricare il PDF separatamente o escluderlo dal primo upload |
| GitHub Action fallisce                | Secrets non configurati o nome errato     | Verificare nomi esatti: `FTP_HOST`, `FTP_USER`, `FTP_PASS` |
