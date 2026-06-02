import { IDescriptionPData } from "./IPortfolioProject"; // { italian: string; english: string }

// Progetto "in evidenza" reso come card-logo (sottosezioni /dev #portfolio:
// "Progetti personali" e "Collaborazioni"). Forma distinta da IPortfolioData (screenshot +
// doppio link esterno): qui logo + UN solo link, interno (rotta di approfondimento) o esterno (sito).
export interface IShowcaseProject {
  id: string;
  title: string; // nome del progetto (invariato nelle due lingue)
  logo: string; // path asset del logo in public/
  tagline: IDescriptionPData; // descrizione breve bilingue
  tech: string[]; // chiavi requirement lowercase → icona via getIcon/BrandIcon
  link: {
    href: string; // rotta interna (es. "/dev/freedihare") oppure URL esterno
    labelKey: string; // chiave i18n (DevSection) del button
    external: boolean; // true → <a> esterno (_blank); false → Link i18n interno
  };
}
