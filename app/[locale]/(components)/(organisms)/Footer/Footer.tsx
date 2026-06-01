import { useTranslations } from "next-intl";
import SectionFooter from "../../(molecules)/SectionFooter-client/SectionFooter";

export function Footer() {
  const t = useTranslations("Layout");
  // anno calcolato a build time: il sito è static export, nessuna dipendenza runtime
  const year = new Date().getFullYear();
  return (
    <footer className="flex-column gap-50px w-full bg-primary-very-light p-20px z-i-100 txt-c-primary-dark">
      <SectionFooter />
      <section
        id="footer-end"
        className="txt-center f-lighter f-size-0d875 txt-c-primary-dark"
      >
        <p>{t("footerLabel1")}</p>
        <p>{t("footerLabel2")}</p>
        <p>{t("vatLabel")}</p>
        <p>
          {t("copyrightLabel")} {year}
        </p>
      </section>
    </footer>
  );
}

export default Footer;
