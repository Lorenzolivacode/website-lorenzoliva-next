"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "../../../../../i18n/routing";
import { socialNetwork } from "../../../(data)/socialNetwork";

import "./SectionFooter.css";
import { useEffect, useState } from "react";
import Image from "next/image";

export function SectionFooter() {
  const [pageDev, setPageDev] = useState(false);
  const [pageArt, setPageArt] = useState(false);
  const t = useTranslations("Layout");
  const pathname = usePathname();

  useEffect(() => {
    setPageDev(pathname.startsWith("/dev"));
    setPageArt(pathname.startsWith("/art"));
  }, [pathname]);

  return (
    <section
      id="section-contacts"
      className="sections-footer-direction-screen flex-around"
    >
      <div className="section-footer">
        <h3 className="f-bold">{t("contactsLabel")}</h3>
        <ul>
          <li>
            {t("phoneLabel")}
            {t("phoneNumber")}
          </li>
          {!pageArt && (
            <li>
              {t("mailDevLabel")}
              {t("mailDev")}
            </li>
          )}
          {!pageDev && (
            <li>
              {t("mailArtLabel")}
              {t("mailArt")}
            </li>
          )}
          {pageArt && (
            <li>
              <ul className="flex-center gap-20px p-10px p-b-0">
                {socialNetwork.map((socialNetwork) => {
                  return (
                    <li key={socialNetwork.id}>
                      <a
                        href={socialNetwork.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          width={40}
                          height={40}
                          src={socialNetwork.icon}
                          alt={socialNetwork.label}
                          title={socialNetwork.label}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          )}
        </ul>
      </div>

      {/* <div className="section-footer">
      <h3 className="f-bold">Informazioni personali</h3>
      <ul>
        <li>Luogo: Palermo</li>
        <li>
          <p>Età: {age}</p>
        </li>
      </ul>
    </div> */}

      {/* <form className="section-footer">
      <h3 className="f-bold">{t("mailFormLabel")}</h3>
      <input
        type="email"
        placeholder={t("emailPlaceholder")}
        className="border-br-1-p-m-l radius-8px p-4px bg-primary-very-light txt-c-primary-dark"
      />
      <textarea
        name=""
        id=""
        placeholder={t("txtAreaPlaceholder")}
        className="border-br-1-p-m-l radius-8px p-4px bg-primary-very-light txt-c-primary-dark"
      ></textarea>
      <button type="submit" className="btn radius-20px">
        {t("btnSend")}
      </button>
    </form> */}
    </section>
  );
}

export default SectionFooter;
