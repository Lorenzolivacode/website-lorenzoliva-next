"use client";

import React, { useEffect, useState } from "react";
import RoundedIconEl from "../../(atoms)/RoundedIconEl/RoundedIconEl";
import { usePathname } from "next/navigation";
import {
  Wrench,
  Link2,
  Briefcase,
  FolderGit2,
  Mail,
  LucideIcon,
} from "lucide-react";

import HashProvider, { useHash } from "../../../(Provider)/HashContext";
import SectionObserver from "../../(atoms)/SectionObserver-client/SectionObserver";
import { devSections } from "../../../(data)/devSections";

import "./NavbarDev.css";
import { useTranslations } from "next-intl";

// mappa chiave-icona → componente lucide: la UI vive qui, i dati (devSections) restano puri
const DEV_ICONS: Record<string, LucideIcon> = {
  skills: Wrench,
  links: Link2,
  experience: Briefcase,
  portfolio: FolderGit2,
  contacts: Mail,
};

function NavDevContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  const [hashId, setHashId] = useState("");
  const [indexOfHash, setIndexOfHash] = useState(-1);

  const [pathCompletly, setPathCompletly] = useState(0);

  const { currentHash } = useHash();

  const pathname = usePathname();
  const t = useTranslations("DevSection");

  useEffect(() => {
    const hash = currentHash.slice(1);
    const index = devSections.findIndex((section) => section.id === hash);

    setHashId(hash);
    setIndexOfHash(index);

    if (hash === "footer-end") {
      setPathCompletly(100);
      return;
    }

    // se l'hash non è tra le sezioni (index -1) la percentuale resta 0, mai negativa
    const percentage = 100 * (index / (devSections.length - 1));
    setPathCompletly(percentage < 0 ? 0 : percentage);
  }, [currentHash]);

  const navDevList = devSections.map((section) => ({
    id: `nd-${section.id}`,
    sectionId: section.id,
    link: `#${section.id}`,
    icon: DEV_ICONS[section.iconKey],
    titleKey: section.titleKey,
  }));

  // una voce è "attiva" se precede o coincide con la sezione corrente (o se siamo a fine pagina)
  const compareIndex = (sectionId: string) => {
    const indexOfLabel = devSections.findIndex(
      (section) => section.id === sectionId
    );
    return indexOfLabel <= indexOfHash || hashId === "footer-end";
  };

  const handleMenu = () => {
    if (isMenuOpen !== isModalOn) {
      return;
    }
    setIsModalOn(!isModalOn);
    isMenuOpen
      ? setTimeout(() => {
          setIsMenuOpen(false);
        }, 1500)
      : setIsMenuOpen(true);
  };

  return (
    <>
      {pathname.includes("dev") && (
        <div className=" z-i--10">
          <RoundedIconEl
            src={"/assets/nav-icon/nav-dev-icon/path-icon.png"}
            alt={t("goTo")}
            title={t("goTo")}
            isActive={true}
            onClick={handleMenu}
            pointerClass={isMenuOpen === isModalOn}
          />

          {isMenuOpen && (
            <div
              className={`${
                !isModalOn ? "h-0-to-full-4s-reverse" : "h-0-to-full-3s"
              } nav-dev-container overflow-hidden absolute top-120px flex-cross-center radius-8px p-b-40px bg-primary-very-dark-0d6 z-i--10`}
            >
              <div className="nav-dev-container-before" />
              <div className="h-line-path absolute top-15px left-50p translate-x--50 w-15px opacity-25 bg-primary-medium-light-0d5 opacity-8 z-i--10">
                <div
                  style={{ height: `${pathCompletly}%` }}
                  className="shadow-light-ms bg-x-p-sat-ml-l z-i--10"
                />
              </div>
              <ul className="navbar-dev flex-column flex-between h-75screen">
                {navDevList.map((liEl) => {
                  return (
                    <li key={liEl.id}>
                      <RoundedIconEl
                        isActive={compareIndex(liEl.sectionId)}
                        href={liEl.link}
                        Icon={liEl.icon}
                        title={t(liEl.titleKey)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function NavbarDev() {
  return (
    <HashProvider>
      <NavDevContent />
      <SectionObserver />
    </HashProvider>
  );
}

export default NavbarDev;
