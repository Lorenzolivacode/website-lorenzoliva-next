import React from "react";
import "./PortfolioList.css";
import { useTranslations } from "next-intl";

import Image from "next/image";
import ParagraphList from "../../(atoms)/ParagraphList-client/ParagraphList";
import TechIconList from "../../(molecules)/TechIconList/TechIconList";
import ProjectLinkButton from "../../(molecules)/ProjectLinkButton/ProjectLinkButton";
import { IPortfolioData } from "../../../Interface/IPortfolioProject";

export function PortfolioList({ data }: { data: IPortfolioData[] }) {
  const t = useTranslations("DevSection");

  return (
    <ul className="carousel carousel-size-full-1 flex-cross-center flex-column gap-20px">
      {data.map((project) => (
        <li
          key={project.id}
          className="project-list-el carousel-child p-y-12px"
        >
          <div className="project-el-show overflow-hidden shadow-light-small flex-column flex-cross-center flex-evenly relative">
            <Image
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw"
              src={project.img}
              alt={`Image ${project.title}`}
              title={`Image ${project.title}`}
              className="img-bg-project-el "
            />
            <h2 className="f-bold bg-primary-very-dark-0d6 p-8px radius-8px">
              {project.title}
            </h2>
            <TechIconList
              tech={project.tecnicalRequirements}
              listClassName="technical-list flex-wrap gap-10px flex-center max-w-70p bg-primary-very-dark-0d6 p-8px radius-8px"
            />
          </div>
          <div className="project-el-details flex-column gap-10px f-size-0d95-1d05">
            <ParagraphList description={project.description} />

            <p className="f-size-0d875">
              {t("exEndLabel")} {project.created}
            </p>

            <ProjectLinkButton
              href={project.linkGithub}
              label={t("lookCode")}
              title={t("followCode")}
              iconClass="img-git-30"
            />
            <ProjectLinkButton
              href={project.linkProject}
              label={t("tryProject")}
              title={t("followProject")}
              iconClass="img-link-30"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PortfolioList;
