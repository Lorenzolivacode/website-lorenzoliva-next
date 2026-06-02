// Forma di una voce della navigazione /dev (menu NavbarDev + barra di avanzamento).
// È la fonte unica condivisa tra dev/page.tsx (ordine) e NavbarDev (menu/barra/i18n).
export interface IDevSection {
  id: string; // ancora della sezione: il link è derivato come `#${id}`
  titleKey: string; // chiave i18n (sezione DevSection) per l'etichetta corta del menu
  iconKey: string; // chiave per la mappa icone lucide nel client (non il componente: i dati non importano UI)
  isPageSection: boolean; // true = <section> nella pagina; false = voce solo-menu (contacts vive nel footer)
}
