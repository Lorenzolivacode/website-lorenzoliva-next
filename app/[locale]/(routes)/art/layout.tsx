import React from "react";

import "./Art.css";

// Wrapper della pagina Art. Lo sfondo chiaro "galleria bianca" è uno strato
// fisso a tutto schermo (.art-bg-fixed): copre l'intero viewport a prescindere
// dalla larghezza del <main> globale (50%), mentre il contenuto resta in flusso
// normale e può scrollare. Colonna centrata orizzontalmente, ancorata in alto.
function ArtLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="art-clearance min-h-screen w-full flex-column flex-cross-center">
      <div className="art-bg-fixed" aria-hidden="true" />
      {children}
    </div>
  );
}

export default ArtLayout;
