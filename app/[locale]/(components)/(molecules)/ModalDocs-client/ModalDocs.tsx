"use client";

import { useEffect, useState } from "react";

import { SectionDocs } from "../../(atoms)/SectionDocs/SectionDocs";

import { useTranslations } from "next-intl";
import { usePathname } from "../../../../../i18n/routing";

export interface IObjDoc {
  id: string;
  doc: string;
  title: string;
  label: () => string;
  section: string;
}

export function ModalDocs({
  typology = "modal",
}: {
  typology?: "modal" | "list";
}) {
  const t = useTranslations("ModalDoc");

  const [pageDev, setPageDev] = useState(false);
  const [pageArt, setPageArt] = useState(false);

  const [docDev, setDocDev] = useState(false);
  const [docArt, setDocArt] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setPageDev(pathname.startsWith("/dev"));
    setPageArt(pathname.startsWith("/art"));
  }, [pathname]);

  const handleDocDev = () => {
    !docDev ? setDocDev(true) : setDocDev(false);
  };

  const handleDocArt = () => {
    !docArt ? setDocArt(true) : setDocArt(false);
  };

  const objDocDev = [
    {
      id: "doc-dev-cv",
      doc: "/doc/dev-doc/CV-Lorenzo-Oliva.pdf",
      title: t("myCv"),
      label: function () {
        return `${this.section} | ${t("viewCvLabel")}`;
      },
      section: t("sectionDev"),
    },
  ];

  const objDocArt = [
    {
      id: "doc-art-cv",
      doc: "/doc/art-doc/Cv-Artistico.pdf",
      title: t("myCv"),
      label: function () {
        return `${this.section} | ${t("viewCvLabel")}`;
      },
      section: t("sectionArt"),
    },
    {
      id: "doc-art-portfolio",
      doc: "/doc/art-doc/Portfolio-artistico-Oliva-Lorenzo.pdf",
      title: t("myPortfolio"),
      label: function () {
        return `${this.section} | ${t("viewPortfolioLabel")}`;
      },
      section: t("sectionArt"),
    },
  ];

  return (
    <div
      className={`flex-column gap-20px txt-c-primary-dark ${
        typology === "modal"
          ? "absolute w-240px bottom-minus20px left-40px translate-y-100 radius-20px-3s4-1 shadow-light-small p-20px p-y-30px bg-primary-very-light border1-p-d"
          : ""
      }`}
    >
      {!pageArt && (
        <SectionDocs
          section={"dev"}
          onClick={handleDocDev}
          flagDoc={docDev}
          objDoc={objDocDev}
        />
      )}
      {!pageDev && (
        <SectionDocs
          section={"art"}
          onClick={handleDocArt}
          flagDoc={docArt}
          objDoc={objDocArt}
        />
      )}
    </div>
  );
}

export default ModalDocs;
