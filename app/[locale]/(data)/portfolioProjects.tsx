import { BRAND_ICONS } from "./techIcons";
import { IPortfolioData } from "../Interface/IPortfolioProject";
import { IPersonalProject } from "../Interface/IPersonalProject";

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Competenze rese nella griglia /dev #skills. ID statici; icona = oggetto simple-icons
// (path monocromatico), tinto via classe utility nel rendering (non più asset PNG a colori).
// Elenco allineato al CV: aggiunte GraphQL e Prisma rispetto al set precedente.
export const skills = [
  { id: "skill-github", label: "GitHub", icon: BRAND_ICONS.github },
  { id: "skill-html", label: "HTML", icon: BRAND_ICONS.html },
  { id: "skill-css", label: "CSS", icon: BRAND_ICONS.css },
  { id: "skill-sass", label: "Sass", icon: BRAND_ICONS.sass },
  { id: "skill-tailwind", label: "Tailwind", icon: BRAND_ICONS.tailwind },
  { id: "skill-javascript", label: "JavaScript", icon: BRAND_ICONS.javascript },
  { id: "skill-typescript", label: "TypeScript", icon: BRAND_ICONS.typescript },
  { id: "skill-react", label: "React", icon: BRAND_ICONS.react },
  { id: "skill-reactrouter", label: "ReactRouter", icon: BRAND_ICONS.reactrouter },
  { id: "skill-nextjs", label: "NextJs", icon: BRAND_ICONS.next },
  { id: "skill-nodejs", label: "Node.js", icon: BRAND_ICONS.nodejs },
  { id: "skill-firebase", label: "Google Firebase", icon: BRAND_ICONS.firebase },
  { id: "skill-graphql", label: "GraphQL", icon: BRAND_ICONS.graphql },
  { id: "skill-prisma", label: "Prisma", icon: BRAND_ICONS.prisma },
  { id: "skill-electron", label: "Electron", icon: BRAND_ICONS.electron },
];

export const links = [
  {
    icon: "/assets/skills-img/LinkedIn-Logo.png",
    url: "https://www.linkedin.com/in/lorenzoliva/",
    title: "visitLinkedinProfile",
    label: "linkedinLabel",
    id: generateId(),
  },
  {
    icon: "/assets/skills-img/GitHub-Dark-Logo.png",
    url: "https://github.com/Lorenzolivacode",
    title: "visitGithubProfile",
    label: "gitHubLabel",
    id: generateId(),
  },
];

const githubUrlBase = "https://github.com/Lorenzolivacode/";

export const thisWebsite = {
  id: generateId(),
  title: "",
  tecnicalRequirements: ["next", "typescript", "css"],
  img: "/assets/projects-img/This-screen.webp",
  description: {
    italian:
      "Questo sito è stato realizzato utilizzando Next.js e TypeScript, sfruttando la libreria next-intl (i18n) per una gestione efficiente del supporto multilingua. La stilizzazione è implementata tramite una libreria di classi utility personalizzata, progettata per garantire un design coerente e scalabile in tutto il sito. Il progetto segue le migliori pratiche di sviluppo web moderno, ottimizzando sia il rendering lato client che server per migliorare le prestazioni e l'esperienza utente.",
    english:
      "This website was built using Next.js and TypeScript, leveraging the power of next-intl (i18n) for seamless multilingual support. The styling is implemented with a custom utility class library, specifically designed to ensure a consistent and scalable design system across the site. The project follows modern web development practices, optimizing both client and server-side rendering for improved performance and user experience.",
  },
  linkGithub: `${githubUrlBase}website-lorenzoliva-next`,
  linkProject: "",
  created: "2024-10-07",
};

// Esercitazioni (i 14 progetti formativi). Forma IPortfolioData (screenshot + link esterni).
const exercises = [
  {
    id: generateId(),
    title: "SCB - Simple contacts book",
    tecnicalRequirements: ["next", "css", "typescript", "firebase"],
    img: "/assets/projects-img/Scb-screen.webp",
    description: {
      italian:
        "SCB è un'applicazione web progettata per la gestione di contatti personali. Permette agli utenti di aggiungere, modificare, visualizzare ed eliminare contatti in modo semplice e intuitivo, con un'interfaccia moderna e un'architettura basata su Google Firebase e Next.js.",
      english:
        "SCB is a web application designed for managing personal contacts. It allows users to add, edit, view, and delete contacts easily and intuitively, featuring a modern interface and an architecture powered by Google Firebase and Next.js.",
    },
    linkGithub: `${githubUrlBase}SCB-Simple-Contacts-Book`,
    linkProject: "https://scb-simple-contacts-book.vercel.app/it",
    created: "2024-11-15",
  },
  {
    id: generateId(),
    title: "HeracleApp",
    tecnicalRequirements: ["next", "sass", "typescript", "tailwind"],
    img: "/assets/projects-img/Heraclea-screen.webp",
    description: {
      italian:
        "HeracleApp è un prototipo sviluppato da un team di cinque persone, concepito con un approccio mobile first. L'applicazione offre funzionalità come login, accesso a informazioni dettagliate, ascolto di audioguide, simulazione dell'acquisto di biglietti e suggerimenti per esperienze locali. L’obiettivo principale è valorizzare il patrimonio territoriale e culturale di questo antico e affascinante luogo, attualmente privo di una solida presenza online.",
      english:
        "HeracleApp is a prototype developed by a team of five, designed with a mobile-first approach. The application provides features such as login, access to detailed information, audio guides, simulated ticket purchasing, and recommendations for nearby experiences. The primary goal is to enhance the territorial and cultural value of this ancient and captivating location, which currently lacks significant online visibility.",
    },
    linkGithub: `${githubUrlBase}heraclea-final-project-cb10-team-c`,
    linkProject: "https://heraclea.vercel.app/it",
    created: "2024-09-22",
  },
  {
    id: generateId(),
    title: "Ai Story teller",
    tecnicalRequirements: ["next", "sass", "typescript"],
    img: "/assets/projects-img/ai-storyteller-screen.webp",
    description: {
      italian:
        "Web app che, date delle info dall'utente, genera un racconto tramite Gemini.",
      english:
        "Web app that, given information from the user, generates a story via Gemini.",
    },
    linkGithub: `${githubUrlBase}ai-storyteller`,
    linkProject: "https://ai-storyteller-three.vercel.app/",
    created: "2024-09-07",
  },
  {
    id: generateId(),
    title: "ViewArt",
    tecnicalRequirements: ["react", "reactrouter", "tailwind"],
    img: "/assets/projects-img/VA-screen.webp",
    description: {
      italian:
        "Web app gestionale di opere d'arte, sfrutta un fake server per utilizzare, modificare o aggiungere dati.",
      english:
        "Web app for managing works of art, uses a fake server to use, modify or add data.",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-07-22-Project-ViewArt`,
    linkProject: "",
    created: "2024-07-22",
  },
  {
    id: generateId(),
    title: "Advice app",
    tecnicalRequirements: ["css", "react"],
    img: "/assets/projects-img/Advice-screen.webp",
    description: {
      italian: "Applicazione che genera casualmente una frase ad ogni click.",
      english: "Application that generates a sentences randomly on each click.",
    },
    linkGithub: `${githubUrlBase}advice-app`,
    linkProject: "https://advice-app-rosy.vercel.app/",
    created: "2024-07-15",
  },
  {
    id: generateId(),
    title: "D'ohnut shop",
    tecnicalRequirements: ["css", "react"],
    img: "/assets/projects-img/Donut-screen.webp",
    description: {
      italian:
        "Applicazione per un finto shop che permette di selezionare il numero di prodotti da acquistare, vedere il costo totale e sfogliare le immagini del prodotto.",
      english:
        "Fake shop application that allows you to select the number of products to purchase, see the total cost and browse product images.",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-07-11-E-commerce`,
    linkProject: "https://dohnutshop.vercel.app/",
    created: "2024-07-11",
  },
  {
    id: generateId(),
    title: "List Artists",
    tecnicalRequirements: ["css", "react"],
    img: "/assets/projects-img/ListArtists-screen.webp",
    description: {
      italian:
        "Web app che permette di filtrare una lista di artisti preferiti e l'aggiunzione di nuovi o rimozione (temporanea).",
      english:
        "Web app that allows you to filter a list of favorite artists and add new ones or remove them (temporarily).",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-07-09-Esercitazione-Form-ListArtist`,
    linkProject: "https://list-artist.vercel.app/",
    created: "2024-07-09",
  },
  {
    id: generateId(),
    title: "To d'oh List",
    tecnicalRequirements: ["css", "react"],
    img: "/assets/projects-img/todohlist-screen.webp",
    description: {
      italian:
        "Web app di una to do list che permette di aggiungere e rimuovere to do (temporaneamente).",
      english:
        "To do list web app that allows you to add and remove to dos (temporarily).",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-07-08-Esercitazione-ToDo`,
    linkProject: "https://todoh-list.vercel.app/",
    created: "2024-07-08",
  },
  {
    id: generateId(),
    title: "Calculator",
    tecnicalRequirements: ["css", "react"],
    img: "/assets/projects-img/Calc-screen.webp",
    description: {
      italian:
        "Calcolatrice che permette l'utilizzo delle principali operazioni.",
      english: "Calculator that allows the use of the main operations.",
    },
    linkGithub: `${githubUrlBase}calculator`,
    linkProject: "https://calculator-rho-teal-47.vercel.app/",
    created: "2024-06-27",
  },
  {
    id: generateId(),
    title: "Ultimate Weather",
    tecnicalRequirements: ["html", "css", "javascript"],
    img: "/assets/projects-img/Ultimate-Weather-screen.webp",
    description: {
      italian:
        "Web App meteo che permette di conoscere le condizioni atmosferiche delle principali città del mondo, di fare ricerche e filtrare. Utilizza le chiamate API per un DB pubblico.",
      english:
        "Weather Web App that allows you to know the weather conditions of the main cities in the world, to do searches and filter. It uses API calls for a public DB.",
    },
    linkGithub: `${githubUrlBase}Code-Week-Ultimate-Weather/tree/main`,
    linkProject: "",
    created: "2024-06-24",
  },
  {
    id: generateId(),
    title: "Movie DB",
    tecnicalRequirements: ["html", "css", "javascript"],
    img: "/assets/projects-img/Movie-screen.webp",
    description: {
      italian:
        "Web App che permette di consultare una lista di film e serie tv, sfrutta le chiamate API ad un DB esterno.",
      english:
        "Web App that allows you to consult a list of films and TV series, uses API calls to an external DB.",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-06-10-Esercitazione`,
    linkProject: "",
    created: "2024-06-10",
  },
  {
    id: generateId(),
    title: "Timer BOOM",
    tecnicalRequirements: ["html", "css", "javascript"],
    img: "/assets/projects-img/Boom-screen.webp",
    description: {
      italian:
        "Applicativo che mostra un orologio ed un conto alla rovescia. Primo approccio con SetTimeout.",
      english:
        "Application that shows a clock and a countdown. First approach with SetTimeout.",
    },
    linkGithub: `${githubUrlBase}timer-boom`,
    linkProject: "https://timer-boom.vercel.app/",
    created: "2024-06-04",
  },
  {
    id: generateId(),
    title: "ToDoToDay",
    tecnicalRequirements: ["html", "css", "javascript"],
    img: "/assets/projects-img/Todotoday-screen.webp",
    description: {
      italian:
        "Web App per una ToDo list, permette inserimento e rimozione di nuove ToDo, di specificare un grado di importanza e di utilizzare vari filtri.",
      english:
        "Web App for a ToDo list, allows you to insert and remove new ToDos, specify a level of importance and use various filters.",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-05-27-Project%20ToDo`,
    linkProject: "",
    created: "2024-05-27",
  },
  {
    id: generateId(),
    title: "TicketArtOne",
    tecnicalRequirements: ["html", "css"],
    img: "/assets/projects-img/TicketArtOne-screen.webp",
    description: {
      italian:
        "Landing page statica di una finta biglietteria online per mostre d'arte.",
      english:
        "Static landing page of a fake online ticket office for art exhibitions.",
    },
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-05-08-Esercitazione-sito`,
    linkProject: "",
    created: "2024-05-27",
  },
];

// Collaborazioni: progetti esterni / di team non legati al lavoro Riverloop.
// Stessa forma delle esercitazioni (IPortfolioData). Vuoto finché non si aggiungono progetti reali.
const collaborations: IPortfolioData[] = [];

// Progetti personali (forma propria IPersonalProject: logo + rotta di approfondimento, niente
// screenshot/link esterni). Resi da PersonalProjectCard.
const personalProjects: IPersonalProject[] = [
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

// Fonte unica dei dati del portfolio /dev, raggruppati per sottosezione.
// exercises/collaborations → card PortfolioList; personalProjects → card PersonalProjectCard.
// (thisWebsite resta export a sé: è un singolo elemento in evidenza, non una lista.)
export const portfolioData = {
  exercises,
  collaborations,
  personalProjects,
};
