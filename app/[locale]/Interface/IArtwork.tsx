import { IDescriptionPData } from "./IPortfolioProject";

// Forma di una singola opera della gallery artistica.
// Le dimensioni width/height sono quelle in pixel della versione "full" (WebP)
// e servono a next/image per il rapporto d'aspetto; thumb e full condividono
// lo stesso aspect ratio, quindi gli stessi valori valgono anche per la thumb.
export interface IArtwork {
  id: string;
  thumb: string; // anteprima leggera per la griglia
  full: string; // versione grande mostrata nella modale
  width: number; // larghezza in px della versione full
  height: number; // altezza in px della versione full
  title: string; // titolo originale dell'opera (resta in italiano nelle due lingue)
  technique: IDescriptionPData; // tecnica (bilingue)
  year: string; // anno di realizzazione
  dimensions: string; // dimensioni dell'opera, riportate dal catalogo
  description: IDescriptionPData; // testo critico (bilingue); può essere vuoto
}
