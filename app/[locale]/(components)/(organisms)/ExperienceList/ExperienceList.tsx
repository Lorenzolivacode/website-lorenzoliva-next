import "./ExperienceList.css";

import { useLocale } from "next-intl";
import { IExperience } from "../../../Interface/IExperience";
import Tag from "../../(atoms)/Tag/Tag";
import BrandIcon from "../../(atoms)/BrandIcon/BrandIcon";
import { getIcon } from "../PortfolioList/PortfolioList";

// Lista delle esperienze professionali (sezione /dev #experience).
// Server component: nessuna interattività; sceglie la lingua dei contenuti bilingui via useLocale.
// La descrizione è mostrata per intero (niente clamp/scroll: la card cresce col contenuto).
function ExperienceList({ data }: { data: IExperience[] }) {
  const locale = useLocale();
  const lang = locale === "en" ? "english" : "italian";

  return (
    <ul className="experience-list flex-column gap-30px w-full">
      {data.map((exp) => (
        <li
          key={exp.id}
          className="experience-card flex-column gap-10px shadow-light-small radius-20px"
        >
          <div className="experience-card-head flex-wrap flex-between flex-cross-center gap-10px">
            <div className="flex-column gap-5px">
              <h3 className="f-bold f-size-1d25-1d5">{exp.role[lang]}</h3>
              <p className="f-size-0d95-1d05 txt-c-primary-very-light">
                {exp.company}
              </p>
            </div>
            <Tag label={exp.period[lang]} color="primary" />
          </div>

          <p className="f-size-0d95-1d05">{exp.description[lang]}</p>

          <ul className="experience-tech-list flex-wrap gap-10px flex-cross-center">
            {exp.tech.map((req, index) => {
              const icon = getIcon(req);
              if (!icon) return null; // requirement senza icona: salto
              return (
                <li key={`${exp.id}-tech-${index}`}>
                  <BrandIcon
                    icon={icon}
                    size={24}
                    className="txt-c-primary-medium-light"
                  />
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default ExperienceList;
