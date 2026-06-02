import { IDescriptionPData } from "./IPortfolioProject"; // { italian: string; english: string }

// Forma di una singola esperienza lavorativa mostrata nella sezione /dev #experience.
// Contenuti bilingui come oggetto { italian, english }; periodo come stringa (nessuna logica data,
// "presente"/"present" resta testo per non dipendere dal runtime, coerente con lo static export).
export interface IExperience {
  id: string;
  role: IDescriptionPData; // ruolo (bilingue)
  company: string; // datore di lavoro (invariato nelle due lingue)
  period: IDescriptionPData; // es. "da gennaio 2025" / "since January 2025" (reso come Tag)
  description: IDescriptionPData; // racconto bilingue dell'esperienza
  tech: string[]; // chiavi requirement lowercase → icona via getIcon/BrandIcon
  current: boolean; // ruolo ancora in corso (metadato: nessun badge, riservato a un indicatore visivo futuro)
}
