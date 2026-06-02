import React from "react";
import Image from "next/image";
import { LucideIcon } from "lucide-react";
import { Link } from "../../../../../i18n/routing";

interface RoundedElProps {
  isActive: boolean;
  title: string;
  alt?: string; // usato solo quando si passa un'immagine (src)
  src?: string; // icona come immagine (es. trigger del menu)
  Icon?: LucideIcon; // icona come componente lucide (voci del menu dev)
  href?: string;
  onClick?: () => void;
  pointerClass?: boolean;
}
function RoundedIconEl({
  isActive,
  title,
  alt = "",
  src,
  Icon,
  href,
  onClick,
  pointerClass = true,
}: RoundedElProps) {
  // txt-c-primary-very-dark fissa il colore dell'icona lucide (stroke=currentColor):
  // dentro un <Link>/<a> senza colore esplicito erediterebbe il colore dei link visitati (viola).
  // Replica il colore scuro degli SVG originali (#080d13), coerente sui due stati.
  const roundedElClass = `txt-c-primary-very-dark radius-50p flex-center ratio-1 hover-scale-1d1 ${
    pointerClass ? "pointer" : ""
  } ${
    isActive ? " shadow-light-ms bg-radial-p-sat-ml-l" : "bg-primary-medium"
  }`;

  // glifo: componente lucide se fornito, altrimenti immagine (retro-compatibilità col trigger)
  const glyph = Icon ? (
    <Icon size={24} aria-hidden />
  ) : (
    <Image alt={alt} width={24} height={24} src={src!} />
  );

  return (
    <div className="flex-column gap-10px p-10px p-x-24px w-100px h-70px">
      {!href ? (
        <div onClick={onClick} title={title} className={roundedElClass}>
          {glyph}
        </div>
      ) : (
        <Link title={title} href={href} className={roundedElClass}>
          {glyph}
        </Link>
      )}
      <div className=" flex-center radius-5px bg-primary-very-dark-0d6">
        <p className="txt-center">{title}</p>
      </div>
    </div>
  );
}

export default RoundedIconEl;
