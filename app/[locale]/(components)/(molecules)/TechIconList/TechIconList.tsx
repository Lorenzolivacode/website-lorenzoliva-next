import BrandIcon from "../../(atoms)/BrandIcon/BrandIcon";
import { getIcon } from "../../../(data)/techIcons";

// Lista di icone tecnologiche da chiavi requirement (es. "react", "prisma").
// Fonte unica del pattern getIcon + BrandIcon + skip-se-mancante, prima duplicato in 5 punti.
// Server component. `listClassName` permette a ogni chiamante di dare il proprio contenitore.
interface TechIconListProps {
  tech: string[];
  size?: number;
  listClassName?: string;
  iconClassName?: string;
}

function TechIconList({
  tech,
  size = 24,
  listClassName = "flex-wrap gap-10px flex-cross-center",
  iconClassName = "txt-c-primary-medium-light",
}: TechIconListProps) {
  return (
    <ul className={listClassName}>
      {tech.map((req, index) => {
        const icon = getIcon(req);
        if (!icon) return null; // requirement senza icona: salto
        return (
          <li key={`${req}-${index}`}>
            <BrandIcon icon={icon} size={size} className={iconClassName} />
          </li>
        );
      })}
    </ul>
  );
}

export default TechIconList;
