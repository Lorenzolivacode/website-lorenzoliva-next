import "./PersonalProjectCard.css";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "../../../../../i18n/routing";
import { IPersonalProject } from "../../../Interface/IPersonalProject";
import TechIconList from "../../(molecules)/TechIconList/TechIconList";

// Card di un progetto personale (sottosezione /dev #portfolio "Progetti personali").
// Server component: sceglie la lingua via useLocale; logo + descrizione + icone tech + CTA interna.
function PersonalProjectCard({ project }: { project: IPersonalProject }) {
  const locale = useLocale();
  const lang = locale === "en" ? "english" : "italian";
  const t = useTranslations("DevSection");

  return (
    <article className="personal-card flex-wrap flex-cross-start gap-20px w-full">
      <div className="personal-card-logo flex-center radius-20px bg-primary-very-dark-0d6">
        <Image
          src={project.logo}
          alt={project.title}
          width={110}
          height={110}
        />
      </div>

      <div className="personal-card-body flex-column gap-10px">
        <h3 className="f-bold f-size-1d25-1d5">{project.title}</h3>
        <p className="f-size-0d95-1d05">{project.tagline[lang]}</p>

        <TechIconList
          tech={project.tech}
          listClassName="personal-card-tech flex-wrap gap-10px flex-cross-center"
        />

        <Link
          href={project.route}
          title={t("discoverMore")}
          className="btn change-img-link w-full p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px"
        >
          <ArrowRight size={18} aria-hidden />
          {t("discoverMore")}
        </Link>
      </div>
    </article>
  );
}

export default PersonalProjectCard;
