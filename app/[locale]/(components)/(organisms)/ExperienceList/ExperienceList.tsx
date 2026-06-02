import "./ExperienceList.css";

import { useLocale } from "next-intl";
import { IExperience } from "../../../Interface/IExperience";
import Tag from "../../(atoms)/Tag/Tag";

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
            <p className="experience-period f-size-0d95-1d05 txt-c-primary-very-light">
              {exp.period[lang]}
            </p>
          </div>

          <p className="f-size-0d95-1d05">{exp.description[lang]}</p>

          <ul className="experience-tech-list flex-wrap gap-10px flex-cross-center">
            {exp.tech.map((tech, index) => (
              <li key={`${exp.id}-tech-${index}`}>
                <Tag label={tech} color="primary" />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default ExperienceList;
