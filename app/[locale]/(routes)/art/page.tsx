import React from "react";

import { socialNetwork } from "./../../(data)/socialNetwork";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function ArtPage() {
  const t = useTranslations("ArtSection");
  const tHome = useTranslations("Home");
  return (
    <div className="txt-c-primary-dark txt-center">
      <div className="img-bg">
        <Image
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw"
          src="/assets/artPage/img-bg-workart.png"
          alt=""
        />
      </div>
      <h2>{t("maintenancePageLabel")}</h2>
      <h3>{t("checkOutSocialLabel")}</h3>
      <ul className="flex-center gap-20px p-10px">
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
      <Image
        width={80}
        height={80}
        src="/LO-img-3.3.png"
        alt={`${t("imageLabel")}${tHome("myName")}`}
      />
    </div>
  );
}

export default ArtPage;
