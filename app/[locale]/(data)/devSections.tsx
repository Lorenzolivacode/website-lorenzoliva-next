import { IDevSection } from "../Interface/IDevSection";

// Fonte unica delle voci /dev. L'ordine qui è l'ordine visivo in pagina e nel menu
// e guida la barra di avanzamento di NavbarDev (indice / lunghezza).
// isPageSection=false → voce solo-menu: "contacts" non è una <section> di /dev, vive nel footer.
// ⚠️ GUARDIA: l'ordine delle voci isPageSection:true DEVE combaciare con l'ordine delle
// <section> in (routes)/dev/page.tsx (la pagina non itera questo array, le sezioni sono JSX
// esplicito). Se riordini/aggiungi una sezione, aggiorna ENTRAMBI i file o la barra si disallinea.
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
