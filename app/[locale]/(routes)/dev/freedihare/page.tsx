import "./Freedihare.css";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import {
  LayoutDashboard,
  LineChart,
  Database,
  Heart,
  UserRound,
  Users,
  LucideIcon,
} from "lucide-react";

import { buildMetadata } from "../../../seo";
import BlurBlue from "../../../(components)/(atoms)/BlurBlue/BlurBlue";
import TechIconList from "../../../(components)/(molecules)/TechIconList/TechIconList";
import { portfolioData } from "../../../(data)/portfolioProjects";
import {
  fhPills,
  fhSections,
  fhMacros,
  fhDay,
  fhShots,
} from "../../../(data)/freedihareContent";
import FhSection from "./FhSection";

// mappa iconKey (dato) → componente lucide (UI): i dati restano puri
const SECTION_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  diary: LineChart,
  foods: Database,
  meals: Heart,
  profile: UserRound,
  sharing: Users,
};

// og:url + canonical propri della pagina di approfondimento
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return buildMetadata(locale, "/dev/freedihare");
}

// Scheda di approfondimento del progetto personale Freedihare.
// Chassis = stile lorenzoliva (tema scuro, utility, BlurBlue); identità Freedihare come accento
// scoped (.freedihare-page tiene le custom property --fh-*). Niente <header> (regola globale lo
// schiaccerebbe); blocchi <div> (FhSection) per non interferire col SectionObserver di /dev.
function FreedipharePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Freedihare");

  const logo = "/assets/projects-img/freedihare/freedihare-logo.svg";
  const freedihare = portfolioData.personalProjects.find(
    (p) => p.id === "freedihare"
  );

  return (
    <div className="freedihare-page w-full">
      <BlurBlue classPosition={"fixed top-0 left-0"} width={"200"} height={"200"} />
      <BlurBlue classPosition={"fixed right-0 bottom-0"} width={"100"} height={"200"} />

      {/* HERO (div, non header: regola globale header{height} lo schiaccerebbe) */}
      <div className="fh-hero">
        <div className="fh-hero-text">
          <p className="fh-eyebrow">{t("eyebrow")}</p>
          <h1 className="fh-title f-bold">Freedihare</h1>
          <p className="fh-wordmark">{t("wordmark")}</p>
          <p className="fh-tagline f-size-1d25-1d5">{t("heroTagline")}</p>
          <span className="fh-status f-size-0d875 f-bold">{t("statusBadge")}</span>
          <p className="f-size-0d95-1d05">{t("heroLead")}</p>
          <p className="f-size-0d95-1d05">{t("heroIntro")}</p>
        </div>

        <div className="fh-hero-aside">
          <Image src={logo} alt="Freedihare" width={150} height={150} />
          {/* anello calorie: grafica CSS che richiama il bilancio in tempo reale dell'app */}
          <div className="fh-ring" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle className="fh-ring-track" cx="60" cy="60" r="52" />
              <circle className="fh-ring-value" cx="60" cy="60" r="52" />
            </svg>
            <div className="fh-ring-center">
              <span className="fh-ring-num">1850</span>
              <span className="fh-ring-unit">kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* VETRINA: screenshot reali dell'app (verticali) in cornici "finestra" */}
      <FhSection title={t("showcaseTitle")}>
        <ul className="fh-showcase">
          {fhShots.map((s) => (
            <li key={s.cap} className="fh-shot">
              <div className="fh-shot-frame">
                <Image
                  src={s.src}
                  alt={t(s.cap)}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 768px) 90vw, 30vw"
                />
              </div>
              <span className="fh-shot-cap">{t(s.cap)}</span>
            </li>
          ))}
        </ul>
      </FhSection>

      {/* PANORAMICA: le 5 sezioni */}
      <FhSection title={t("overviewTitle")}>
        <p className="f-size-0d95-1d05">{t("overviewLead")}</p>
        <ul className="fh-pills">
          {fhPills.map((p) => (
            <li key={p.label} className="fh-pill">
              <span className="fh-pill-label f-bold">{t(p.label)}</span>
              <span className="fh-pill-sub f-size-0d875">{t(p.sub)}</span>
            </li>
          ))}
        </ul>
      </FhSection>

      {/* BLOCCHI SEZIONE: card con icona lucide */}
      <FhSection>
        <ul className="fh-grid">
          {fhSections.map((s) => {
            const Icon = SECTION_ICONS[s.iconKey];
            return (
              <li key={s.title} className="fh-card">
                <span className="fh-card-icon flex-center radius-50p">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="f-bold f-size-1d25-1d5">{t(s.title)}</h3>
                <p className="f-size-0d95-1d05">{t(s.text)}</p>
              </li>
            );
          })}
        </ul>
      </FhSection>

      {/* MACRO: chip coi colori reali dell'app */}
      <FhSection title={t("macrosTitle")}>
        <p className="f-size-0d95-1d05">{t("macrosText")}</p>
        <ul className="fh-macros">
          {fhMacros.map((m) => (
            <li key={m.label} className={`fh-macro ${m.cls} f-size-0d875 f-bold`}>
              {t(m.label)}
            </li>
          ))}
        </ul>
      </FhSection>

      {/* GIORNATA TIPO: flusso numerato */}
      <FhSection title={t("dayTitle")}>
        <ol className="fh-flow">
          {fhDay.map((k, i) => (
            <li key={k} className="fh-flow-step">
              <span className="fh-flow-num flex-center radius-50p f-bold">
                {i + 1}
              </span>
              <span className="f-size-0d95-1d05">{t(k)}</span>
            </li>
          ))}
        </ol>
      </FhSection>

      {/* SOTTO IL COFANO: stack tecnico */}
      <FhSection title={t("closingTitle")}>
        <p className="f-size-0d95-1d05">{t("closingText")}</p>
        {freedihare && (
          <TechIconList tech={freedihare.tech} size={28} listClassName="fh-tech" />
        )}
      </FhSection>
    </div>
  );
}

export default FreedipharePage;
