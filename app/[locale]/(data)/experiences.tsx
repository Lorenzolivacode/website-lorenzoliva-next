import { IExperience } from "../Interface/IExperience";

// Esperienze professionali in ambito dev (focus /dev). ID statici e contenuti bilingui.
// Vincolo NDA: si nomina "Riverloop srls", ruolo e tipologie di progetto; niente clienti/repo/screenshot.
export const experiences: IExperience[] = [
  {
    id: "riverloop-fullstack",
    role: {
      italian: "Web Developer Full Stack",
      english: "Full Stack Web Developer",
    },
    company: "Riverloop srls",
    period: {
      italian: "da gennaio 2025",
      english: "since January 2025",
    },
    description: {
      italian:
        "Sviluppo full stack di applicazioni web commissionate in un team ristretto, con piena autonomia: dalla progettazione e dallo studio architetturale fino al rilascio. Ho realizzato gestionali e piattaforme SaaS in ambiti differenti, alcune con funzionalità basate su AI. Lato backend curo in prima persona la modellazione dei dati e le API: PostgreSQL con Prisma e un layer GraphQL (Pothos). Lato frontend sviluppo l'interfaccia in Next.js e React, con attenzione all'UX/UI, definendone spesso il design in autonomia. Integro stabilmente strumenti di AI nel flusso di lavoro (non solo per generare codice, ma per studio, pianificazione e ragionamento architetturale), gestendo il processo in modo strutturato e con revisione critica.",
      english:
        "Full-stack development of commissioned web applications in a small team, with full autonomy: from design and architectural planning through to delivery. I built management systems and SaaS platforms across different sectors, some featuring AI-based functionality. On the backend I personally handle data modelling and APIs: PostgreSQL with Prisma and a GraphQL layer (Pothos). On the frontend I develop the interface in Next.js and React, with care for UX/UI, often defining the design myself. I consistently integrate AI tools into my workflow (not just to generate code, but for study, planning and architectural reasoning), running the process in a structured, critically-reviewed way.",
    },
    tech: ["next", "react", "typescript", "postgresql", "prisma", "graphql"],
    current: true,
  },
  {
    id: "riverloop-docente",
    role: {
      italian: "Docente Web Developer",
      english: "Web Development Instructor",
    },
    company: "Riverloop srls",
    period: {
      italian: "da marzo 2025",
      english: "since March 2025",
    },
    description: {
      italian:
        "Docente di sviluppo web per studenti adulti principianti, in gruppi di circa dieci persone. Tengo lezioni teorico-pratiche strutturate, incentrate su JavaScript, React e Next.js, e preparo personalmente il materiale didattico: slide, esercizi e lezioni organizzate su Notion.",
      english:
        "Web development instructor for adult beginner students, in groups of around ten. I deliver structured theory-and-practice lessons focused on JavaScript, React and Next.js, and I personally prepare the teaching materials: slides, exercises and lessons organised in Notion.",
    },
    tech: ["javascript", "react", "next"],
    current: true,
  },
];
