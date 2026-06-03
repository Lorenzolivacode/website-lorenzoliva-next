import { IDescriptionPData } from "./IPortfolioProject"; // { italian: string; english: string }

// Una collocazione: lo stesso ruolo svolto presso un datore in un dato periodo.
// company e period variano per voce; current è metadato per-collocazione (nessun badge,
// riservato a un indicatore visivo futuro).
export interface IExperiencePlacement {
  company: string; // datore di lavoro (invariato nelle due lingue)
  period: IDescriptionPData; // es. "da gennaio 2025" / "since January 2025" (reso come Tag)
  current: boolean; // questa collocazione è ancora in corso
}

// Forma di una singola esperienza/ruolo mostrata nella sezione /dev #experience.
// role, description e tech sono CONDIVISI da tutte le collocazioni (lo stesso ruolo presso
// più aziende non duplica la descrizione); placements elenca aziende/periodi (uno o più).
// Periodo come stringa (nessuna logica data, "presente"/"present" resta testo per non
// dipendere dal runtime, coerente con lo static export).
export interface IExperience {
  id: string;
  role: IDescriptionPData; // ruolo (bilingue)
  placements: IExperiencePlacement[]; // una o più aziende/periodi
  description: IDescriptionPData; // racconto bilingue condiviso da tutte le collocazioni
  tech: string[]; // chiavi requirement lowercase → icona via getIcon/BrandIcon (stack condiviso)
}
