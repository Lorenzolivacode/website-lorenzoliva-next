# CLAUDE.md — Frontend Engineering Rules
## website-lorenzoliva-next

> These rules describe how this project is actually built. Follow them in every implementation, refactor, and code review.
> For the full structural map (directory tree, routes, component inventory, i18n flow), read `Architecture.md` first.

---

## 0. What this project is

A bilingual (IT/EN) personal portfolio site built with **Next.js 14 App Router**, output as a **fully static export**.

- **No backend, no database, no authentication, no API.**
- All content is **hardcoded** in TSX data files.
- Build target is `output: "export"` → static HTML/JS deployed to Aruba (Apache, no Node runtime).

Every decision below follows from this: there is no server at runtime, so nothing may depend on one.

---

## 1. Architecture Principles

The frontend is:
- **Static-first** — must work as a static export; never rely on a server at runtime
- **Modular** — each unit has a single, clear responsibility
- **Atomic Design** — components organized as atoms → molecules → organisms
- **Bilingual** — every user-facing string flows through next-intl (IT + EN), never hardcoded in JSX
- **Reusability-oriented** — build to reuse, not to duplicate
- **UI/logic separated** — visual components hold no business logic and no data

---

## 2. Project Structure

```
app/
├─ layout.tsx                 → root layout (global CSS, html shell)
├─ page.tsx                   → "/" client redirect to /{locale}
├─ not-found.tsx              → global 404
├─ fonts/                     → Geist / GeistMono local fonts
│
└─ [locale]/                  → dynamic segment: "it" | "en"
   ├─ layout.tsx              → NextIntlClientProvider + Header + <main> + Footer
   ├─ page.tsx                → Home
   ├─ globals.css, layout.css, home.css
   ├─ (routes)/               → route group (no URL impact)
   │  ├─ dev/page.tsx + Dev.css
   │  └─ art/page.tsx + layout.tsx
   ├─ (components)/
   │  ├─ (atoms)/             → base UI (BlurBlue, RoundedIconEl, …)
   │  ├─ (molecules)/         → atom compositions (Navbar, ModalDocs, …)
   │  └─ (organisms)/         → full sections (Header, Footer, PortfolioList)
   ├─ (css-library-utilities)/ → custom utility-class CSS library
   ├─ (data)/                 → hardcoded data (portfolioProjects, socialNetwork)
   ├─ (Provider)/             → React context providers (HashContext)
   └─ Interface/              → shared TypeScript interfaces

i18n/        → routing.ts (locales + locale-aware Link/navigation), request.ts (loads messages)
messages/    → it.json, en.json (translation keys)
public/      → assets/ (images, icons), doc/ (PDF dev + art)
```

**Code placement — mandatory:**

| Code type                         | Location                                              |
|-----------------------------------|-------------------------------------------------------|
| Reusable UI                       | `(components)/(atoms\|molecules\|organisms)/Name/Name.tsx` |
| Component-local styles            | colocated `Name.css` next to the component            |
| Hardcoded content / data          | `(data)/*.tsx`                                         |
| React context / shared state      | `(Provider)/*.tsx`                                     |
| Shared types / interfaces         | `Interface/*.tsx`                                      |
| Global CSS variables, reset       | `[locale]/globals.css`                                |
| Reusable utility classes          | `(css-library-utilities)/*.css`                       |
| Page-level CSS                    | colocated with the page (`home.css`, `Dev.css`, …)    |
| Translations                      | `messages/it.json` **and** `messages/en.json`         |
| i18n config / locale navigation   | `i18n/`                                                |

There is **no `utils/` folder** in this project. Don't invent one — small helpers either belong to the component that uses them (see `getIcon` exported from `PortfolioList`) or to `(data)`. If genuinely cross-cutting logic appears, propose its location before creating a new top-level folder.

---

## 3. Component Naming & Conventions

Each component lives in its **own folder** named after it, containing `Name.tsx` and (optionally) `Name.css`.

- **Server components are the default.** Do not add `"use client"` unless the component needs hooks, browser APIs, or event handlers.
- **Client components** go in a folder suffixed `-client` (e.g. `Navbar-client/`, `ModalDocs-client/`) and start with `"use client"`.
- Place a component in `(atoms)`, `(molecules)`, or `(organisms)` by composition depth — atoms are leaves, organisms compose molecules/atoms.
- The parenthesized folder names are **route groups**: they organize files without affecting the URL. Don't rename them to non-parenthesized forms.

---

## 4. React Component Rules

A UI component:
- **Must** be reusable and receive data only via typed props
- **May** contain UI variants for the same component (e.g. `isDirectionY`, `isActive`)
- **Must NOT** contain business logic or fetch/transform data
- **Must NOT** hardcode user-facing text — use `useTranslations` (see §6)
- **Must NOT** be nested matryoshka-style (e.g. `Card > TitleCard > TitleContent`)

```tsx
// (atoms)/SubtitlePortfolio/SubtitlePortfolio.tsx — server component, props only
function SubtitlePortfolio({ label }: { label: string }) {
  return <h3 className="f-bold f-size-1d8 txt-center">{label}</h3>;
}
export default SubtitlePortfolio;
```

```tsx
// (molecules)/...-client — interactivity → "use client"
"use client";
import { usePathname } from "../../../../../i18n/routing";
// hooks/handlers allowed here, never in server components
```

---

## 5. Data Layer (replaces GraphQL)

There is no API. All content is **static and hardcoded**.

- Lists, projects, skills, links, socials live **only** in `(data)/*.tsx`.
- Shared shapes go in `Interface/` (e.g. `IPortfolioData` in `Interface/IPortfolioProject.tsx`).
- Bilingual content is modeled as an object, **not** branched in JSX:
  ```ts
  description: { italian: string; english: string }
  ```
  Components pick the right field via `useLocale()` (see `ParagraphList`).
- Components receive data via props (`<PortfolioList data={portfolioData} />`) — they never import data files to "look things up" themselves, except pages, which are the wiring layer.

---

## 6. Internationalization (i18n) — mandatory

Every user-facing string is bilingual. Adding or changing text means touching **both** `messages/it.json` and `messages/en.json` with the **same keys**.

- In components: `const t = useTranslations("SectionName")` then `t("key")`.
- For locale-dependent logic (not text): `useLocale()`.
- For links and navigation use the **locale-aware** `Link`, `usePathname`, `useRouter`, `redirect` from `i18n/routing` — **never** plain `next/link` / `next/navigation` for in-app, locale-scoped navigation. (Plain `next/link` is acceptable only for external/anchor links, as in `Dev` page.)
- Pages and layouts under `[locale]` must call `unstable_setRequestLocale(locale)` so static rendering picks the right locale.
- Top-level message sections currently: `Layout`, `Home`, `DevSection`, `ArtSection`, `ModalDoc`. Reuse an existing section before adding a new one.

**Forbidden:** hardcoded Italian/English strings in JSX; a key added to one locale file but not the other.

---

## 7. Styling Rules

This project uses a **custom CSS utility-class library — there is no Tailwind** (the Tailwind logo in `skills` is portfolio content, not a dependency).

- Utility classes come from `(css-library-utilities)/` (e.g. `flex-center`, `gap-30px`, `radius-50p`, `bg-primary-medium`, `txt-c-primary-dark`, `p-10px`). Compose these on `className`.
- **Colors come only from CSS variables** defined in `globals.css` (`--color-primary-*`, `--color-secondary-*`) and surfaced through `color.css` classes. No raw hex/rgb in components.
- If a utility you need doesn't exist, add it to the appropriate file in `(css-library-utilities)/` (animation, border, color, components, display, flex, font, layout, position, size, spacing) and import via `library-import.css`.
- Component- or page-specific styles go in a **colocated `.css`** imported at the top of the component (`import "./Navbar.css"`).
- Inline `style={...}` is acceptable only for dynamic values that can't be a class (e.g. `objectFit` on `next/image`), not for colors or static layout.

### 7.1 The utility name IS its value — never break this contract

The library is **self-describing, Tailwind-style**: a class name declares its own value. This is the single most important rule of the styling system.

- `f-size-1` = `font-size: 1rem`. `gap-30px` = `gap: 30px`. `w-50p` = `width: 50%`. `p-t-110px` = `padding-top: 110px`. `radius-8px` = `border-radius: 8px`.
- **NEVER change the value behind an existing name.** Editing `.f-size-1` to `0.875rem` makes the name lie — every `f-size-1` in the JSX now silently renders the wrong size. This is forbidden.
- **To get a new value, create a new class** whose name encodes that value, then use it in the JSX. Do not repurpose an existing one.

**Name-encoding scheme** (follow it exactly when adding classes):
- `.` in a number → `d`: `0.875rem` → `f-size-0d875`; `1.2rem` → `f-size-1d2`.
- unit suffix: `px` → `…px` (`w-45px`), `%` → `…p` (`w-45p`), `rem` → no suffix on `f-size-*` (the rem is implied).
- negative → `minus` or `--` per existing examples (`bottom-minus20px`, `left--20px`). Match the prefix already used in that file.
- **Fixed value** → single number: `f-size-0d875` = `font-size: 0.875rem`.
- **Fluid value (`clamp()`)** → encode BOTH bounds, `f-size-<min>-<max>` (first number = clamp min, second = clamp max): `f-size-0d95-1d05` = `clamp(0.95rem, …, 1.05rem)`. Only the middle "preferred" term (e.g. `0.9rem + 0.25vw`) is left out of the name — encoding it would be unreadable; the name stays honest about the *bounds*, which is what matters when composing a layout.

**Exceptions (these legitimately don't follow name=value):**
- **Component classes** (`.btn`, `.btn-hamb`, `.img-container`, `.section-code-page`, …) describe a *thing*, not a value — their dimensions can change freely.
- **Semantic CSS variables** (`--header-h`, `--header-clearance` in `globals.css`) describe a *role* — change the variable to rescale every consumer at once. Prefer these for cross-cutting dimensions.

**When unsure about the right name for a new utility (encoding, file, or whether one already exists): STOP and ask the user** rather than guessing. Before using any utility class, confirm it actually exists in `(css-library-utilities)/` — an invented class fails silently (no error, just wrong rendering).

---

## 8. Static Export Constraints — do not break the build

The site ships as static HTML (`output: "export"`). Respect these hard limits:

- **No `middleware.ts`**, no route handlers, no server actions, no runtime server code (none exist — keep it that way).
- **No data fetching at request time.** `generateStaticParams` enumerates locales at build; everything else is static.
- **Images must stay unoptimized** (`images.unoptimized: true`). Use `next/image` with explicit `width`/`height` or `fill` + `sizes`; assets live under `public/`.
- Root `/` redirects to `/{locale}` **client-side** (`app/page.tsx`, reading saved locale from `localStorage`) — keep redirect logic client-side, never server-redirect.
- Deployment notes live in `0_lorenzoliva_studies/docs/001_deploy-aruba-static-export.md` — consult it before changing build/output config.

---

## 9. TypeScript Reality

`tsconfig.json` has **`strict: false`** and `allowJs: true`. The compiler will *not* catch missing types for you.

- **Type all new props explicitly** (inline `{ x }: { x: string }` or an `interface` in `Interface/`), as most components already do.
- Don't rely on the type checker as a safety net; don't assume existing untyped spots (e.g. `({ children })` in `HashContext`) are the standard to copy.
- Avoid `any`. Prefer descriptive interfaces for data shapes.

---

## 10. Code Size Limits

| Element     | Limit          |
|-------------|----------------|
| Function    | ~40–80 lines   |
| Component   | ~200–300 lines |

**If a limit is exceeded → split into smaller atoms/molecules.**

---

## 11. Code Comments

Comments must:
- Be written **in Italian**
- Explain **what** and **why**, only when the logic is non-obvious
- Be concise

```tsx
// link interno: uso Link da i18n/routing per preservare la lingua   ✔
// assegno il valore                                                  ✗
```

---

## 12. Mandatory Best Practices

Always:
- Keep the export **static** — verify nothing introduces a server dependency
- Keep **UI and logic/data separated**
- Route **every** string through next-intl, in both locales
- Use **descriptive names** for variables, functions, types
- Avoid **logic duplication**; prefer **pure functions** and **early return**
- Default to **server components**; opt into `"use client"` only when needed

---

## 13. Forbidden

| Forbidden pattern                                              |
|----------------------------------------------------------------|
| Server/runtime code that breaks `output: "export"`            |
| Hardcoded user-facing strings (bypassing next-intl)           |
| A translation key in one locale file but not the other        |
| Tailwind classes or raw hex/rgb colors in components          |
| Changing the value behind an existing utility name (breaks name=value, §7.1) |
| Using a utility class without confirming it exists (silent failure) |
| Colors not sourced from `globals.css` CSS variables           |
| `next/link` / `next/navigation` for locale-scoped in-app nav  |
| Business logic or data fetching inside UI components          |
| `"use client"` on components that don't need it               |
| Matryoshka-nested components                                  |
| Giant functions / monolithic components (over §10 limits)     |
| Inventing a `utils/` (or other) top-level folder unprompted   |

---

## 14. Response Protocol (Claude's Workflow)

When receiving a task, follow this sequence:

1. **Read** `Architecture.md` and the relevant existing files before writing code
2. **Identify** the correct location for each piece of code (see §2)
3. **Decide** server vs client component (§3) and where text/data/styles live (§5–7)
4. **Check** no rule from §3–13 is violated — especially static-export (§8) and i18n (§6)
5. **Write** the minimal, focused change — no unrequested additions
6. **Update both** `messages/it.json` and `messages/en.json` when text changes
7. **Split** anything exceeding the §10 limits
8. Add comments only in **Italian**, only when logic is non-trivial

Do not:
- Refactor code that was not part of the task
- Add features not explicitly requested
- Add error handling for impossible scenarios (there's no server to fail)
- Create abstractions for one-off operations

---

## 15. Documentation Maintenance

When structure, routes, components, or the i18n/data model change, update **`Architecture.md`** accordingly — it is the source-of-truth map for this project. Internal notes and plans live under `0_lorenzoliva_studies/`.
