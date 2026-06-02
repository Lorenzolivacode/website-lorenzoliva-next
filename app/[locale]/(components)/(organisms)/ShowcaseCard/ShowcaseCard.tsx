import "./ShowcaseCard.css";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "../../../../../i18n/routing";
import { IShowcaseProject } from "../../../Interface/IShowcaseProject";
import TechIconList from "../../(molecules)/TechIconList/TechIconList";

// Card-logo riusabile per "Progetti personali" e "Collaborazioni".
// Server component: logo + descrizione + icone tech + un button. Il button è interno
// (Link i18n, rotta di approfondimento) oppure esterno (<a> _blank al sito) in base a link.external.
function ShowcaseCard({ project }: { project: IShowcaseProject }) {
  const locale = useLocale();
  const lang = locale === "en" ? "english" : "italian";
  const t = useTranslations("DevSection");

  const { href, labelKey, external } = project.link;
  const label = t(labelKey);
  const btnClass =
    "btn change-img-link w-full p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px";

  return (
    <article className="showcase-card flex-wrap flex-cross-start gap-20px w-full">
      <div className="showcase-card-logo flex-center radius-20px bg-primary-very-dark-0d6">
        <Image src={project.logo} alt={project.title} width={110} height={110} />
      </div>

      <div className="showcase-card-body flex-column gap-10px">
        <h3 className="f-bold f-size-1d25-1d5">{project.title}</h3>
        <p className="f-size-0d95-1d05">{project.tagline[lang]}</p>

        <TechIconList
          tech={project.tech}
          listClassName="showcase-card-tech flex-wrap gap-10px flex-cross-center"
        />

        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className={btnClass}
          >
            <ExternalLink size={18} aria-hidden />
            {label}
          </a>
        ) : (
          <Link href={href} title={label} className={btnClass}>
            <ArrowRight size={18} aria-hidden />
            {label}
          </Link>
        )}
      </div>
    </article>
  );
}

export default ShowcaseCard;
