import "./Tag.css";

// Tag generico riutilizzabile: etichetta testuale con sfondo semi-trasparente.
// Il colore arriva via prop (palette del progetto). Per aggiungere un colore:
// nuova voce in TAG_COLOR_CLASS con utility bg semi-trasparente + testo esistenti.
const TAG_COLOR_CLASS = {
  primary:
    "bg-primary-medium-light-0d3 border1-p-m-l-0d5 txt-c-primary-very-light",
};

type TagColor = keyof typeof TAG_COLOR_CLASS;

function Tag({ label, color = "primary" }: { label: string; color?: TagColor }) {
  return (
    <span className={`tag f-size-0d875 radius-8px ${TAG_COLOR_CLASS[color]}`}>
      {label}
    </span>
  );
}

export default Tag;
