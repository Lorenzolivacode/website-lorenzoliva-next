import {
  siGithub,
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siReactrouter,
  siTailwindcss,
  siSass,
  siNextdotjs,
  siNodedotjs,
  siFirebase,
  siGraphql,
  siPrisma,
  siPostgresql,
  siElectron,
} from "simple-icons";

// Registro unico delle icone-brand (simple-icons), chiave = requirement lowercase.
// Fonte di verità condivisa: alimenta sia la griglia `skills` sia `getIcon` (tag tecnologici
// di progetti/esperienze/progetti personali). Un solo elenco di import simple-icons in tutto il progetto.
export const BRAND_ICONS: Record<string, { title: string; path: string }> = {
  github: siGithub,
  html: siHtml5,
  css: siCss,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  reactrouter: siReactrouter,
  tailwind: siTailwindcss,
  sass: siSass,
  next: siNextdotjs,
  nodejs: siNodedotjs,
  firebase: siFirebase,
  graphql: siGraphql,
  prisma: siPrisma,
  postgresql: siPostgresql,
  electron: siElectron,
};

// requirement sconosciuto → undefined: il chiamante salta l'elemento (niente icona rotta).
export const getIcon = (requirement: string) => BRAND_ICONS[requirement];
