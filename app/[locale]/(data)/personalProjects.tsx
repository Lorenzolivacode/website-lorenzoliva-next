import { IPersonalProject } from "../Interface/IPersonalProject";

// Progetti personali (sottosezione /dev #portfolio). ID statici, contenuti bilingui.
// La card mostra logo + descrizione breve + icone tech + button verso la rotta di approfondimento.
export const personalProjects: IPersonalProject[] = [
  {
    id: "freedihare",
    title: "Freedihare",
    logo: "/assets/projects-img/freedihare/freedihare-logo.svg",
    tagline: {
      italian:
        "Applicazione desktop per pianificare, registrare e analizzare la propria alimentazione giorno per giorno: calorie, macro, obiettivi e trend nel tempo, con condivisione tra account collegati. Attualmente un MVP strutturato in fase di test, in continua espansione.",
      english:
        "Desktop application to plan, log and analyse your daily nutrition: calories, macros, goals and trends over time, with sharing between linked accounts. Currently a structured MVP in testing, being actively expanded.",
    },
    route: "/dev/freedihare",
    tech: [
      "electron",
      "react",
      "typescript",
      "nodejs",
      "prisma",
      "postgresql",
      "graphql",
    ],
  },
];
