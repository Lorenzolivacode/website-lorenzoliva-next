import "./Dev.css";

import { useTranslations } from "next-intl";
import Image from "next/image";

import {
  portfolioData,
  skills,
  links,
  thisWebsite,
} from "./../../(data)/portfolioProjects";
import PortfolioList, {
  getIcon,
} from "../../(components)/(organisms)/PortfolioList/PortfolioList";
import SubtitlePortfolio from "../../(components)/(atoms)/SubtitlePortfolio/SubtitlePortfolio";
import ParagraphList from "../../(components)/(atoms)/ParagraphList-client/ParagraphList";
import BlurBlue from "../../(components)/(atoms)/BlurBlue/BlurBlue";
import Link from "next/link";

function Dev() {
  const t = useTranslations("DevSection");
  return (
    <div className="code-main-direction-screen w-full">
      {/* <SectionObserver /> */}
      <BlurBlue
        classPosition={"fixed top-0 left-0"}
        width={"200"}
        height={"200"}
      />
      <BlurBlue
        classPosition={"fixed right-0 bottom-0"}
        width={"100"}
        height={"200"}
      />
      <section
        id="skills"
        className="section-code-page flex-center flex-column gap-30px"
      >
        <h2 className="f-bold f-size-2">{t("skillsLabel")}</h2>
        <div className="skills-container flex-wrap flex-center">
          {skills.map((skill) => (
            <div key={skill.id} className="img-skill-container">
              <Image
                width={90}
                height={90}
                src={skill.icon}
                alt={skill.label}
                title={skill.label}
              />
              <p className="skill-label txt-center f-bold f-size-1d2 txt-c-primary-very-light">
                {skill.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="links"
        className="section-code-page flex-center flex-center flex-column gap-30px"
      >
        <h2 className="f-bold f-size-2">{t("linkLabel")}</h2>
        <ul className="flex-column gap-30px w-full">
          {links.map((link) => {
            return (
              <li key={link.id} title={`${t(link.title)}`}>
                <a
                  href={link.url}
                  target={link.url !== "#section-contacts" ? "_blank" : "_self"}
                  rel={
                    link.url !== "#section-contacts"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="link-el flex-center flex-evenly shadow-light-small radius-20px p-8px txt-c-primary-very-dark f-size-1d8 f-bold txt-decoration-none bg-primary-very-light"
                >
                  <Image
                    width={55}
                    height={55}
                    src={link.icon}
                    alt={`Image ${t(link.label)}`}
                  />
                  <p className="f-bold">{t(link.label)}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
      <section
        id="portfolio"
        className="section-code-page flex-center flex-column gap-30px"
      >
        <h1 className="f-bold f-size-2">{t("portfolioLabel")}</h1>
        <SubtitlePortfolio label={t("subtitleThisSite")} />
        <div className="project-list-el carousel-child p-y-12px">
          <div className="project-el-show overflow-hidden shadow-light-small flex-column flex-cross-center flex-evenly relative">
            <div className="img-bg-project-el ">
              <Image
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw"
                src={thisWebsite.img}
                alt={`Image ${t("subtitleThisSite")}`}
                title={`Image ${t("subtitleThisSite")}`}
                className="img-bg-project-el "
              />
            </div>
            <div className="technical-list flex-wrap gap-10px flex-center max-w-70p bg-primary-very-dark-0d6 p-8px radius-8px">
              {thisWebsite.tecnicalRequirements.map((requirement, index) => {
                return (
                  <Image
                    width={30}
                    height={30}
                    key={`${thisWebsite.id}-${index}`}
                    className="w-30px"
                    src={getIcon(requirement)}
                    alt={requirement}
                    title={requirement}
                  />
                );
              })}
            </div>
          </div>
          <div className="project-el-details flex-column flex-between f-size-1d2">
            <ParagraphList
              maxHeight="80"
              description={thisWebsite.description}
            />

            <Link
              href={
                thisWebsite.linkGithub.length >= 2
                  ? thisWebsite.linkGithub
                  : "#"
              }
              target={thisWebsite.linkGithub.length >= 2 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={t("followCode")}
              className={`${
                thisWebsite.linkGithub.length < 2 && "opacity-4"
              } btn change-img-link p-4px radius-8px f-size-1d2 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px`}
            >
              <div className="img-git-30 w-30px ratio-1" />
              {t("lookCode")}
            </Link>
          </div>
        </div>
        <SubtitlePortfolio label={t("subtitleExercises")} />
        <PortfolioList data={portfolioData} />
      </section>
    </div>
  );
}

export default Dev;
