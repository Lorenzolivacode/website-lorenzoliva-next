"use client";

import React, { useEffect, useState } from "react";
import RoundedIconEl from "../../(atoms)/RoundedIconEl/RoundedIconEl";
import { usePathname } from "next/navigation";

import HashProvider, { useHash } from "../../../(Provider)/HashContext";
import SectionObserver from "../../(atoms)/SectionObserver-client/SectionObserver";

import "./NavbarDev.css";
import { useTranslations } from "next-intl";

function NavDevContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  const [capitalizeHash, setCapitalizeHash] = useState("");
  const [indexOfHash, setIndexOfHash] = useState(-1);

  const [pathCompletly, setPathCompletly] = useState(0);

  const { currentHash } = useHash();

  const pathname = usePathname();
  const t = useTranslations("DevSection");

  useEffect(() => {
    const hash = currentHash.slice(1);
    const capitalizeHash =
      hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase();
    const indexOfHash = labels.indexOf(capitalizeHash);

    setCapitalizeHash(capitalizeHash);
    setIndexOfHash(indexOfHash);

    if (hash === "footer-end") {
      setPathCompletly(100);
      return;
    }

    const percentage = 100 * (indexOfHash / (labels.length - 1));
    setPathCompletly(percentage);
  }, [currentHash]);

  const labels = ["Skills", "Links", "Portfolio", "Contacts"];

  const navDevList = labels.map((label) => ({
    id: `nd-${label.toLowerCase()}`,
    label,
    link: `#${label.toLowerCase()}`,
    icon: `/assets/nav-icon/nav-dev-icon/${label.toLowerCase()}-icon.svg`,
  }));

  const compareIndex = (label: string) => {
    const capitalizeLabel =
      label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    /* const hash = currentHash.slice(1);
    const capitalizeHash =
      hash.charAt(0).toUpperCase() + hash.slice(1).toLowerCase(); */

    const indexOfLabel = labels.indexOf(capitalizeLabel);
    /* const indexOfHash = labels.indexOf(capitalizeHash); */

    return indexOfLabel <= indexOfHash || capitalizeHash === "Footer-end";
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
            alt={"ciao"}
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
                        isActive={compareIndex(liEl.label) ? true : false}
                        href={liEl.link}
                        src={liEl.icon}
                        alt={liEl.label}
                        title={
                          liEl.label === "Contacts"
                            ? t("contactsLabel")
                            : liEl.label
                        }
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
