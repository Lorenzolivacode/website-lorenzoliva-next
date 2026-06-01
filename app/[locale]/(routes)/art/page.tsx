import React from "react";

import { socialNetwork } from "./../../(data)/socialNetwork";
import { artworks } from "./../../(data)/artworks";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import ArtGallery from "../../(components)/(organisms)/ArtGallery-client/ArtGallery";

import "./Art.css";

// og:url + canonical propri della pagina /art
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return buildMetadata(locale, "/art");
}

function ArtPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("ArtSection");

  return (
    <section className="art-page flex-column flex-cross-center gap-30px p-20px txt-c-primary-dark txt-center">
      {/* sfondo decorativo della sezione (immagine fissa, opacità ridotta) */}
      <div className="img-bg">
        <Image
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 30vw"
          src="/assets/artPage/img-bg-workart.png"
          alt=""
        />
      </div>

      {/* intro: occhiello + titolo con filetto gold + estratto dall'artist statement.
          NB: uso <div>, non <header> — esiste una regola globale header{height:--header-h}
          (Header.css) che schiaccerebbe questo blocco e lo farebbe sovrapporre alla gallery. */}
      <div className="art-intro flex-column flex-cross-center gap-10px">
        <p className="art-eyebrow">{t("galleryEyebrow")}</p>
        <h1 className="art-page-title f-bold">{t("galleryTitle")}</h1>
        <p className="art-lead">{t("galleryLead")}</p>
      </div>

      {/* descrizione personale (artist statement) sopra la sezione delle opere */}
      <p className="art-statement">{t("galleryStatement")}</p>

      <ArtGallery artworks={artworks} />

      <a
        className="btn change-img-link p-4px radius-8px f-size-0d95-1d05 txt-decoration-none txt-c-inherit p-l-20px flex-cross-center gap-10px art-pdf-link"
        href="/doc/art-doc/Portfolio-artistico-Oliva-Lorenzo.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("viewFullPortfolioLabel")}
      </a>
    </section>
  );
}

export default ArtPage;
