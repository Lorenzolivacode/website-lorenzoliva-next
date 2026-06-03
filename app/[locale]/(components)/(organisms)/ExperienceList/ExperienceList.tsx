import "./ExperienceList.css";

import { useLocale } from "next-intl";
import { IExperience } from "../../../Interface/IExperience";
import Tag from "../../(atoms)/Tag/Tag";
import TechIconList from "../../(molecules)/TechIconList/TechIconList";

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
          <h3 className="f-bold f-size-1d25-1d5">{exp.role[lang]}</h3>

          {/* Collocazioni: stesso ruolo presso una o più aziende, ognuna col suo periodo. */}
          <ul className="experience-placements flex-column gap-5px">
            {exp.placements.map((p) => (
              <li
                key={p.company}
                className="experience-placement flex-wrap flex-between flex-cross-center gap-10px"
              >
                <p className="f-size-0d95-1d05 txt-c-primary-very-light">
                  {p.company}
                </p>
                <Tag label={p.period[lang]} color="primary" />
              </li>
            ))}
          </ul>

          <p className="f-size-0d95-1d05">{exp.description[lang]}</p>

          <TechIconList
            tech={exp.tech}
            listClassName="experience-tech-list flex-wrap gap-10px flex-cross-center"
          />
        </li>
      ))}
    </ul>
  );
}

export default ExperienceList;
