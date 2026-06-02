/* "use client"; */

import React from "react";
import "./PortfolioList.css";
import { useTranslations } from "next-intl";

import { portfolioData } from "../../../(data)/portfolioProjects";

import Image from "next/image";
import ParagraphList from "../../(atoms)/ParagraphList-client/ParagraphList";
import BrandIcon from "../../(atoms)/BrandIcon/BrandIcon";
import { IPortfolioData } from "../../../Interface/IPortfolioProject";
import {
  siHtml5,
  siCss,
  siJavascript,
  siReact,
  siReactrouter,
  siTailwindcss,
  siSass,
  siTypescript,
  siNextdotjs,
  siNodedotjs,
  siFirebase,
  siGraphql,
  siPrisma,
  siPostgresql,
  siElectron,
} from "simple-icons";

// mappa requirement (stringa lowercase nei dati progetto) → icona simple-icons.
// Ritorna undefined per un requirement sconosciuto: il chiamante salta l'elemento (niente icona rotta).
const ICON_BY_REQUIREMENT: Record<string, { title: string; path: string }> = {
  html: siHtml5,
  css: siCss,
  javascript: siJavascript,
  react: siReact,
  reactrouter: siReactrouter,
  tailwind: siTailwindcss,
  sass: siSass,
  typescript: siTypescript,
  next: siNextdotjs,
  nodejs: siNodedotjs,
  firebase: siFirebase,
  graphql: siGraphql,
  prisma: siPrisma,
  postgresql: siPostgresql,
  electron: siElectron,
};

export const getIcon = (requirement: string) => ICON_BY_REQUIREMENT[requirement];

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
            <div className="technical-list flex-wrap gap-10px flex-center max-w-70p bg-primary-very-dark-0d6 p-8px radius-8px">
              {project.tecnicalRequirements.map((requirement, index) => {
                const icon = getIcon(requirement);
                if (!icon) return null; // requirement senza icona: salto (niente svg vuoto)
                return (
                  <BrandIcon
                    key={`${project.id}-${index}`}
                    icon={icon}
                    size={24}
                    title={requirement}
                    className="txt-c-primary-medium-light"
                  />
                );
              })}
            </div>
          </div>
          <div className="project-el-details flex-column gap-10px f-size-0d95-1d05">
            <ParagraphList description={project.description} />

            <p className="f-size-0d875">
              {t("exEndLabel")} {project.created}
            </p>

            <a
              href={project.linkGithub.length >= 2 ? project.linkGithub : "#"}
              target={project.linkGithub.length >= 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={t("followCode")}
              aria-disabled={project.linkGithub.length < 2 ? true : undefined}
              tabIndex={project.linkGithub.length < 2 ? -1 : undefined}
              className={`${
                project.linkGithub.length < 2 ? "opacity-4 pointer-events-none" : ""
              } btn change-img-link p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
            >
              <div className="img-git-30 w-30px ratio-1" />
              {/* <Image
                width={30}
                height={30}
                src={"/assets/skills-img/GitHub-Dark-Logo-30px.png"}
                alt="GitHub"
              /> */}
              {t("lookCode")}
            </a>

            <a
              href={project.linkProject.length >= 2 ? project.linkProject : "#"}
              target={project.linkProject.length >= 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={t("followProject")}
              aria-disabled={project.linkProject.length < 2 ? true : undefined}
              tabIndex={project.linkProject.length < 2 ? -1 : undefined}
              className={`${
                project.linkProject.length < 2 ? "opacity-4 pointer-events-none" : ""
              } btn change-img-link p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
            >
              <div className="img-link-30 w-30px ratio-1" />
              {/* <Image
                width={30}
                height={30}
                src={"/assets/skills-img/Link-D-Logo.png"}
                alt="Project"
              /> */}
              {t("tryProject")}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PortfolioList;
