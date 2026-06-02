import { IDescriptionPData } from "./IPortfolioProject"; // { italian: string; english: string }

// Forma di una singola esperienza lavorativa mostrata nella sezione /dev #experience.
// Contenuti bilingui come oggetto { italian, english }; periodo come stringa (nessuna logica data,
// "presente"/"present" resta testo per non dipendere dal runtime, coerente con lo static export).
export interface IExperience {
  id: string;
  role: IDescriptionPData; // ruolo (bilingue)
  company: string; // datore di lavoro (invariato nelle due lingue)
  period: IDescriptionPData; // es. "Gen 2025 – presente" / "Jan 2025 – present"
  description: IDescriptionPData; // racconto bilingue dell'esperienza
  tech: string[]; // tag tecnologici come testo (pill)
  current: boolean; // ruolo ancora in corso → badge "In corso"
}
