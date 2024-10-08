/* "use client"; */

import React from "react";
import "./PortfolioList.css";
import { useTranslations } from "next-intl";

import { portfolioData } from "../../../(data)/portfolioProjects";

import Image from "next/image";
import ParagraphList from "../../(atoms)/ParagraphList-client/ParagraphList";
import { IPortfolioData } from "../../../Interface/IPortfolioProject";

export const getIcon = (requirement: string) => {
  switch (requirement) {
    case "html":
      return "/assets/skills-img/Html-Logo.png";
    case "css":
      return "/assets/skills-img/Css-Logo.png";
    case "javascript":
      return "/assets/skills-img/Js-Logo.png";
    case "react":
      return "/assets/skills-img/React-Logo.png";
    case "reactrouter":
      return "/assets/skills-img/React-Router-Logo.png";
    case "tailwind":
      return "/assets/skills-img/Tailwind-Logo.png";
    case "sass":
      return "/assets/skills-img/Sass-Logo.png";
    case "typescript":
      return "/assets/skills-img/Typescript-Logo.png";
    case "next":
      return "/assets/skills-img/Next-bl-Logo.png";
  }
};

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
                /* console.log(project.title, ": ", requirement); */
                return (
                  <Image
                    width={30}
                    height={30}
                    key={`${project.id}-${index}`}
                    className="w-30px"
                    src={getIcon(requirement)}
                    alt={requirement}
                    title={requirement}
                  />
                );
              })}
            </div>
          </div>
          <div className="project-el-details flex-column gap-10px f-size-1d2">
            <ParagraphList description={project.description} />

            <p className="f-size-1">
              {t("exEndLabel")} {project.created}
            </p>

            <a
              href={project.linkGithub.length >= 2 ? project.linkGithub : "#"}
              target={project.linkGithub.length >= 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={t("followCode")}
              className={`${
                project.linkGithub.length < 2 && "opacity-4"
              } btn change-img-link p-4px radius-8px f-size-1d2 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
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
              className={`${
                project.linkProject.length < 2 && "opacity-4"
              } btn change-img-link p-4px radius-8px f-size-1d2 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
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
