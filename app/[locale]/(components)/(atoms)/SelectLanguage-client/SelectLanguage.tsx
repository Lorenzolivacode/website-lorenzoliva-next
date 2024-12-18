"use client";

import React, { ChangeEvent } from "react";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "../../../../../i18n/routing";

function SelectLanguage() {
  const t = useTranslations("Layout");

  const router = useRouter();
  const pathname = usePathname();
  const newPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const locale = useLocale();

  const handlerChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.replace(`/${value}/${newPath}`);
  };
  return (
    <>
      <label htmlFor="selectLanguage" className="diplay-none">
        {t("selectedLabel")}
      </label>
      <select
        id="selectLanguage"
        name={t("languageLabel")}
        title={t("selectedLabel")}
        onChange={handlerChangeLanguage}
        value={locale}
        className="bg-primary-very-light txt-c-primary-very-dark shadow-p-very-dark border-none radius-5px p-4px"
      >
        <option value="it" title={t("italianLabel")}>
          {t("flagIt")}
        </option>
        <option value="en" title={t("englishLabel")}>
          {t("flagEn")}
        </option>
      </select>
    </>
  );
}

export default SelectLanguage;
