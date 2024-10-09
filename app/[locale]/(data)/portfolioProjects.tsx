import { useTranslations } from "next-intl";

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const skills = [
  {
    id: crypto.randomUUID(),
    label: "GitHub",
    icon: "/assets/skills-img/GitHub-Light-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "HTML",
    icon: "/assets/skills-img/Html-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "CSS",
    icon: "/assets/skills-img/Css-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "JavaScript",
    icon: "/assets/skills-img/Js-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "React",
    icon: "/assets/skills-img/React-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "ReactRouter",
    icon: "/assets/skills-img/React-Router-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "Tailwind",
    icon: "/assets/skills-img/Tailwind-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "Sass",
    icon: "/assets/skills-img/Sass-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "TypeScript",
    icon: "/assets/skills-img/Typescript-Logo.png",
  },
  {
    id: crypto.randomUUID(),
    label: "NextJs",
    icon: "/assets/skills-img/Next-bl-Logo.png",
  },
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
  {
    icon: "/assets/skills-img/Contacts-Dark-Logo.png",
    url: "#section-contacts",
    title: "goToContacts",
    label: "contactsLabel",
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

export const portfolioData = [
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
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-07-15-Esercitazione2`,
    linkProject: "https://www.lorenzoliva.it/advice-app/",
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
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-06-27-Esercitazione`,
    linkProject: "/calculator/",
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
    linkGithub: `${githubUrlBase}Edgemony-exercises/tree/main/2024-06-04-Esercitazione2`,
    linkProject: "https://www.lorenzoliva.it/timer-boom/",
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
    linkProject: "https://www.lorenzoliva.it/todotoday/",
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
    linkProject: "https://www.lorenzoliva.it/ticketartone/",
    created: "2024-05-27",
  },
];
