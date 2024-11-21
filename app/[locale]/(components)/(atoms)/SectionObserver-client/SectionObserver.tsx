"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHash } from "../../../(Provider)/HashContext";

function SectionObserver() {
  const { setCurrentHash } = useHash();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Controllo se siamo lato client
      const sections = document.querySelectorAll("section");
      const options = {
        //oggetto opzionale che definisce le impostazioni dell’osservatore.
        root: null,
        //root: indica l’elemento principale in cui osservare.
        //Se impostato a null, utilizza la finestra del browser come area di osservazione.
        threshold: 0.5,
        //threshold: indica la percentuale di visibilità richiesta per attivare l’evento callback.
        //Può essere un valore singolo (come 0.5) o un array di valori (es. [0, 0.5, 1]).
      };

      const observer = new IntersectionObserver((entries) => {
        //IntersectionObserver è un'API di JavaScript che permette di monitorare quando
        //un elemento del DOM entra o esce dalla viewport o da un altro elemento contenitore.
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;

            // Usa history.replaceState per aggiornare l'hash senza lo "scatto"
            window.history.replaceState(null, "", `#${sectionId}`);
            //La funzione window.history.replaceState è parte dell’API della History del browser.
            //Consente di modificare la barra degli indirizzi senza ricaricare la pagina
            //né scatenare azioni come lo scrolling automatico

            //Sintassi: window.history.replaceState(stateObject, title, url);
            //- stateObject: Oggetto che rappresenta lo stato che vuoi associare a questo nuovo URL.
            //È utile per mantenere dati specifici tra i cambiamenti di URL, ma se non ti serve,
            //puoi impostarlo su null.
            //- title: Il titolo della pagina (solitamente ignorato dai browser,
            //quindi può essere una stringa vuota "").
            //- url: Il nuovo URL da visualizzare nella barra degli indirizzi.
            //Può essere un path completo o parziale, come #sectionId per cambiare solo l'hash.
            setCurrentHash(`#${sectionId}`);
          }
        });
      }, options);

      sections.forEach((section) => observer.observe(section));
      return () => sections.forEach((section) => observer.unobserve(section));
    }
  }, [pathname]);

  return null;
}

export default SectionObserver;
