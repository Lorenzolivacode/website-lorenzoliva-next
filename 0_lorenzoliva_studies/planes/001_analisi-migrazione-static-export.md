# 001 - Migrazione Next.js Static Export per deploy su Aruba

**Data analisi:** 2026-05-28
**Stato:** PRONTO PER ESECUZIONE
**Obiettivo:** Deployare il sito su Aruba hosting Linux base (shared hosting Apache, no Node.js)
**Decisione:** Next.js Static Export (`output: 'export'`) con adattamento i18n

---

## ISTRUZIONI DI ESECUZIONE PER AGENTE

**Progetto root:** `website-lorenzoliva-next/`
**Prerequisito:** `npm install` deve essere stato eseguito (node_modules presente)

### STEP 1 — Verificare versione next-intl

```bash
node -e "console.log(require('next-intl/package.json').version)"
```

Deve essere >= 3.17. Se inferiore, eseguire `npm install next-intl@latest`.

---

### STEP 2 — Modificare `next.config.mjs`

**File:** `website-lorenzoliva-next/next.config.mjs`

**PRIMA:**

```js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
```

**DOPO:**

```js
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
```

---

### STEP 3 — Eliminare `middleware.ts`

**File da eliminare:** `website-lorenzoliva-next/middleware.ts`

```bash
rm middleware.ts
```

Motivo: middleware non supportato in static export. L'i18n routing funziona comunque tramite `generateStaticParams`.

---

### STEP 4 — Adattare `i18n/request.ts`

**File:** `website-lorenzoliva-next/i18n/request.ts`

**PRIMA:**

```ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!routing.locales.includes(locale as "en" | "it")) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**DOPO:**

```ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "it")) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

Cambiamenti: parametro `locale` -> `requestLocale` (async), aggiunto `locale` nel return.

---

### STEP 5 — Modificare `app/[locale]/layout.tsx`

**File:** `website-lorenzoliva-next/app/[locale]/layout.tsx`

**PRIMA:**

```tsx
import "./globals.css";
import "./layout.css";
import "./(css-library-utilities)/library-import.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
/* import { unstable_setRequestLocale } from "next-intl/server"; */
import Header from "./(components)/(organisms)/Header/Header";
import Footer from "./(components)/(organisms)/Footer/Footer";

export const metadata = {
  title: "Lorenzoliva",
  icons: {
    icon: "/LO-img-3.3.png",
  },
};
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({ locale });

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="main-w-screen min-h-screen flex-center m-auto p-t-110px p-b-20px">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**DOPO:**

```tsx
import "./globals.css";
import "./layout.css";
import "./(css-library-utilities)/library-import.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "./(components)/(organisms)/Header/Header";
import Footer from "./(components)/(organisms)/Footer/Footer";
import { routing } from "../../i18n/routing";

export const metadata = {
  title: "Lorenzoliva",
  icons: {
    icon: "/LO-img-3.3.png",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="main-w-screen min-h-screen flex-center m-auto p-t-110px p-b-20px">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Cambiamenti:
- Import `setRequestLocale` al posto del commento `unstable_setRequestLocale`
- Import `routing` da `../../i18n/routing`
- Aggiunta `generateStaticParams()` che ritorna `[{locale: "it"}, {locale: "en"}]`
- Chiamata `setRequestLocale(locale)` prima di `getMessages`

---

### STEP 6 — Aggiungere `setRequestLocale` nelle page server-side

Le 3 page usano `useTranslations` che in static export richiede `setRequestLocale` nel contesto server.

**ATTENZIONE:** queste page attualmente NON ricevono `params` come prop. Devono essere convertite per ricevere `{ params: { locale } }` e chiamare `setRequestLocale(locale)`.

#### 6a. `app/[locale]/page.tsx` (Home)

**File:** `website-lorenzoliva-next/app/[locale]/page.tsx`

**PRIMA:**

```tsx
import { useTranslations } from "next-intl";
import "./home.css";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import ButtonPhoto from "./(components)/(molecules)/ButtonPhoto-client/ButtonPhoto";

export default function Home() {
  const t = useTranslations("Home");
  const tLay = useTranslations("Layout");
```

**DOPO:**

```tsx
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "./home.css";
import Image from "next/image";
import { Link } from "../../i18n/routing";
import ButtonPhoto from "./(components)/(molecules)/ButtonPhoto-client/ButtonPhoto";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("Home");
  const tLay = useTranslations("Layout");
```

#### 6b. `app/[locale]/(routes)/dev/page.tsx`

**File:** `website-lorenzoliva-next/app/[locale]/(routes)/dev/page.tsx`

**PRIMA:**

```tsx
import "./Dev.css";

import { useTranslations } from "next-intl";
import Image from "next/image";
// ... altri import ...

function Dev() {
  const t = useTranslations("DevSection");
```

**DOPO:**

```tsx
import "./Dev.css";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
// ... altri import ...

function Dev({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("DevSection");
```

#### 6c. `app/[locale]/(routes)/art/page.tsx`

**File:** `website-lorenzoliva-next/app/[locale]/(routes)/art/page.tsx`

**PRIMA:**

```tsx
import React from "react";

import { socialNetwork } from "./../../(data)/socialNetwork";

import { useTranslations } from "next-intl";
import Image from "next/image";

function ArtPage() {
  const t = useTranslations("ArtSection");
  const tHome = useTranslations("Home");
```

**DOPO:**

```tsx
import React from "react";

import { socialNetwork } from "./../../(data)/socialNetwork";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";

function ArtPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations("ArtSection");
  const tHome = useTranslations("Home");
```

---

### STEP 7 — Redirect root con localStorage

**File:** `website-lorenzoliva-next/app/page.js`

**PRIMA:**

```js
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/it");
}
```

**DOPO (riscrittura completa, rinominare in `page.tsx`):**

```tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "it";
    router.replace(`/${savedLocale}`);
  }, [router]);

  return null;
}
```

Nota: rinominare il file da `page.js` a `page.tsx`. Logica: legge localStorage, fallback a "it".

---

### STEP 8 — Salvare lingua in localStorage al cambio lingua

#### 8a. `SwitchLanguageInline-client/SwitchLanguageInline.tsx`

**File:** `website-lorenzoliva-next/app/[locale]/(components)/(atoms)/SwitchLanguageInline-client/SwitchLanguageInline.tsx`

Nel metodo `handlerChangeLanguage`, aggiungere il salvataggio:

**PRIMA:**

```tsx
const handlerChangeLanguage = (language: string) => {
  router.replace(`/${language}/${newPath}`);
};
```

**DOPO:**

```tsx
const handlerChangeLanguage = (language: string) => {
  localStorage.setItem("locale", language);
  router.replace(`/${language}/${newPath}`);
};
```

#### 8b. `SelectLanguage-client/SelectLanguage.tsx`

**File:** `website-lorenzoliva-next/app/[locale]/(components)/(atoms)/SelectLanguage-client/SelectLanguage.tsx`

**PRIMA:**

```tsx
const handlerChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  router.replace(`/${value}/${newPath}`);
};
```

**DOPO:**

```tsx
const handlerChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  localStorage.setItem("locale", value);
  router.replace(`/${value}/${newPath}`);
};
```

---

### STEP 9 — Build e verifica

```bash
cd website-lorenzoliva-next
npm run build
```

**Risultato atteso:** cartella `out/` generata con questa struttura:

```
out/
├── index.html              # redirect client-side (localStorage)
├── 404.html                # pagina 404 generata da Next.js
├── it/
│   ├── index.html          # Home IT
│   ├── dev/
│   │   └── index.html      # Dev IT
│   └── art/
│       └── index.html      # Art IT
├── en/
│   ├── index.html          # Home EN
│   ├── dev/
│   │   └── index.html      # Dev EN
│   └── art/
│       └── index.html      # Art EN
├── _next/
│   └── static/             # JS/CSS bundle
├── assets/                 # immagini
└── doc/                    # PDF
```

**Verifica:** se il build fallisce, leggere l'errore, correggere, e rebuilddare.

**Test locale:**

```bash
npx serve out
```

Verificare manualmente nel browser:
- `http://localhost:3000/` -> redirect a `/it`
- `http://localhost:3000/it` -> Home italiano
- `http://localhost:3000/en` -> Home inglese
- `http://localhost:3000/it/dev` -> Portfolio dev
- `http://localhost:3000/en/art` -> Art page inglese
- Cambio lingua salva in localStorage e redirige correttamente
- Navigazione da root dopo cambio lingua rispetta la scelta

---

### STEP 10 — Creare `.htaccess` per Aruba

**File da creare:** `website-lorenzoliva-next/public/.htaccess`

Nota: messo in `public/` cosi' viene copiato automaticamente in `out/` durante il build.

```apacheconf
ErrorDocument 404 /404.html
```

---

### STEP 11 — Deploy (manuale, utente)

1. Upload via FTP/SFTP del contenuto della cartella `out/` nella document root di Aruba
2. Verificare che `.htaccess` sia presente nella root
3. Testare le URL sul dominio live

---

## BACKGROUND (riferimento, non necessario per l'esecuzione)

### Contesto

Sito portfolio personale Next.js 14 (App Router) con next-intl per bilinguismo IT/EN.
Aruba hosting base = shared hosting Apache, no Node.js. Serve output completamente statico.

### Alternative scartate

| Opzione                            | Tempo stimato | Motivo esclusione                                                                            |
| ---------------------------------- | ------------- | -------------------------------------------------------------------------------------------- |
| React + React Router + Vite        | 12-16h        | 25+ file da riscrivere, i18n da rifare, SEO peggiore (SPA), serve .htaccess                 |
| Hook custom i18n + localStorage    | Variabile     | Flash of untranslated content, SEO pessimo, 16+ componenti da riscrivere, reinventa la ruota |

### Stato progetto

- **Stack:** Next.js 14.2.13, TypeScript (strict: false), CSS utility library custom, next-intl ^3.20.0
- **Route:** 3 pagine (Home, Dev, Art) x 2 lingue = 6 pagine statiche
- **Componenti:** 34 totali (15 client, 19 server), Atomic Design
- **Dati:** hardcoded, nessun API/database/auth
- **next/image:** usato in 12 file, con `unoptimized: true` diventa `<img>` standard, zero modifiche ai componenti
- **Layout dev:** non esiste. **Layout art:** solo presentazionale, nessuna modifica.
- **Assets:** ~3MB immagini + 86MB PDF portfolio artistico (lasciare cosi')
- **Aruba SSL:** certificato DV Wildcard (Actalis) incluso e pre-installato

### Decisioni prese

- **Redirect root:** Opzione B — localStorage (prima visita -> `/it`, visite successive -> lingua salvata)
- **Dominio:** root (nessun `basePath`)
- **404:** Next.js genera `404.html`, `.htaccess` con `ErrorDocument 404 /404.html`
- **PDF 86MB:** lasciare invariato per ora

### Rischi

| Rischio                                               | Probabilita' | Mitigazione                                                      |
| ----------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| Incompatibilita' versione next-intl con static export  | Bassa        | Step 1 verifica versione                                         |
| next/image con `fill` non funziona senza ottimizzazione | Molto bassa  | `fill` e' CSS, non dipende dal server. Verificare in Step 9      |
| Path errati degli assets dopo export                   | Bassa        | Test con `npx serve out` in Step 9                               |

### Stima tempo agente

| Fase                             | Tempo   |
| -------------------------------- | ------- |
| Step 1-8 (modifiche codice)      | ~10 min |
| Step 9 (build + fix + test)      | ~10 min |
| Step 10 (.htaccess)              | ~1 min  |
| **Totale agente**                | **~20 min** |
| Step 11 (deploy manuale utente)  | ~15 min |
