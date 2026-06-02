import { ReactNode } from "react";

// Sezione della pagina Freedihare: titolo opzionale (con filetto accento) + contenuto.
// Helper locale alla rotta (usa le classi scoped fh-* di Freedihare.css), non riusabile altrove.
function FhSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="fh-section">
      {title && (
        <h2 className="fh-section-title f-bold f-size-1d35-1d65">{title}</h2>
      )}
      {children}
    </div>
  );
}

export default FhSection;
