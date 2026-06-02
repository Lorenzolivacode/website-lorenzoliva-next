import { IDescriptionPData } from "./IPortfolioProject"; // { italian: string; english: string }

// Forma di un progetto personale mostrato nella sottosezione /dev #portfolio "Progetti personali".
// Diverso da IPortfolioData (screenshot + link esterni): qui c'è un logo e una rotta interna
// di approfondimento. Pattern riutilizzabile per futuri progetti personali.
export interface IPersonalProject {
  id: string;
  title: string; // nome del progetto (invariato nelle due lingue)
  logo: string; // path asset del logo in public/
  tagline: IDescriptionPData; // descrizione breve bilingue per la card
  route: string; // rotta interna di approfondimento (es. "/dev/freedihare")
  tech: string[]; // chiavi requirement lowercase → icona via getIcon/BrandIcon
}
