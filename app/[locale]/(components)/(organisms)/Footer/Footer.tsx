import { useTranslations } from "next-intl";
import SectionFooter from "../../(molecules)/SectionFooter-client/SectionFooter";

export function Footer() {
  const t = useTranslations("Layout");
  return (
    <footer className="flex-column gap-50px w-full bg-primary-very-light p-20px z-i-100 txt-c-primary-dark">
      <SectionFooter />
      <section
        id="footer-end"
        className="txt-center f-lighter txt-c-primary-dark"
      >
        <p>{t("footerLabel1")}</p>
        <p>{t("footerLabel2")}</p>
        <p>{t("copyrightLabel")}</p>
      </section>
    </footer>
  );
}

export default Footer;
