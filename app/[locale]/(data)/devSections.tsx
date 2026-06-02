import { IDevSection } from "../Interface/IDevSection";

// Fonte unica delle voci /dev. L'ordine qui è l'ordine visivo in pagina e nel menu
// e guida la barra di avanzamento di NavbarDev (indice / lunghezza).
// isPageSection=false → voce solo-menu: "contacts" non è una <section> di /dev, vive nel footer.
export const devSections: IDevSection[] = [
  { id: "skills", titleKey: "navSkills", iconKey: "skills", isPageSection: true },
  {
    id: "experience",
    titleKey: "navExperience",
    iconKey: "experience",
    isPageSection: true,
  },
  {
    id: "portfolio",
    titleKey: "navPortfolio",
    iconKey: "portfolio",
    isPageSection: true,
  },
  { id: "links", titleKey: "navLinks", iconKey: "links", isPageSection: true },
  {
    id: "contacts",
    titleKey: "navContacts",
    iconKey: "contacts",
    isPageSection: false,
  },
];
