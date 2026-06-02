// Icona-brand monocromatica resa da un path di simple-icons.
// Server component: nessuna logica, riceve l'oggetto icona via prop.
// Il colore arriva dalla classe utility (currentColor → fill): tinta uniforme col sito.
interface BrandIconProps {
  icon: { title?: string; path: string }; // oggetto simple-icons { title, path, ... }
  size?: number; // lato dell'svg in px (72 nella griglia Skills, 24 nei tag)
  title?: string; // nome accessibile (es. label skill); se assente usa icon.title
  className?: string; // utility di colore (es. txt-c-primary-medium-light) + altre
}

function BrandIcon({ icon, size = 24, title, className = "" }: BrandIconProps) {
  const label = title ?? icon.title;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-label={label}
      className={`brand-icon ${className}`}
    >
      {label && <title>{label}</title>}
      <path d={icon.path} />
    </svg>
  );
}

export default BrandIcon;
