"use client";

import React from "react";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "../../../../../i18n/routing";

import Image from "next/image";

function SelectLanguage() {
  const t = useTranslations("Layout");

  const router = useRouter();
  const pathname = usePathname();
  const newPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const locale = useLocale();

  const languages = [
    {
      label: "IT",
      value: "it",
      SrcImg: "/assets/nav-icon/flag-ico/IT-Flag.png",
      altImg: t("italianLabel"),
    },
    {
      label: "EN",
      value: "en",
      SrcImg: "/assets/nav-icon/flag-ico/GB-Flag.png",
      altImg: t("englishLabel"),
    },
  ];

  const handlerChangeLanguage = (language: string) => {
    router.replace(`/${language}/${newPath}`);
  };
  return (
    <>
      <label htmlFor="selectLanguage" className="diplay-none">
        {t("selectedLabel")}
      </label>
      <ul
        id="selectLanguage"
        title={t("selectedLabel")}
        className="flex flex-cross-center gap-15px txt-c-primary-very-dark"
      >
        {languages.map((language, index) => {
          return (
            <React.Fragment key={language.value}>
              <li
                id={language.value}
                key={language.value + 1}
                title={language.altImg}
                onClick={() => handlerChangeLanguage(language.value)}
                className={`flex-column flex-cross-center pointer ${
                  locale !== language.value && "opacity-6"
                }`}
              >
                <p className="f-bold">{language.label}</p>
                <Image
                  alt={language.altImg}
                  width={15}
                  height={15}
                  src={language.SrcImg}
                  className="drop-shadow-p-very-dark"
                ></Image>
              </li>
              {index + 1 !== languages.length && (
                <div
                  key={crypto.randomUUID()}
                  className="w-2px h-25px radius-20px bg-primary-dark"
                />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

export default SelectLanguage;
